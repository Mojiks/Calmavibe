import React, { useEffect, useRef, useState } from 'react';

declare const L: any;

const Directory: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markersLayer = useRef<any>(null);

  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          };
          setUserLocation(coords);
          initMap(coords);
          fetchHospitals(coords);
        },
        () => {
          const fallback = { lat: 19.4326, lng: -99.1332 };
          initMap(fallback);
          fetchHospitals(fallback);
        }
      );
    }
  }, []);

  const initMap = (coords: { lat: number; lng: number }) => {
    if (!mapRef.current || mapInstance.current) return;

    mapInstance.current = L.map(mapRef.current).setView([coords.lat, coords.lng], 13);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap & CartoDB'
    }).addTo(mapInstance.current);

    markersLayer.current = L.layerGroup().addTo(mapInstance.current);

    // 📍 usuario
    L.marker([coords.lat, coords.lng]).addTo(mapInstance.current)
      .bindPopup("Tu ubicación")
      .openPopup();
  };

  const fetchHospitals = async (coords: { lat: number; lng: number }) => {
    try {
      const query = `
        [out:json][timeout:25];
        (
          node["amenity"="hospital"](around:5000,${coords.lat},${coords.lng});
          way["amenity"="hospital"](around:5000,${coords.lat},${coords.lng});
          relation["amenity"="hospital"](around:5000,${coords.lat},${coords.lng});
        );
        out center;
      `;

      const response = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: query
      });

      const data = await response.json();

      if (!markersLayer.current) return;

      markersLayer.current.clearLayers();

      if (!data.elements || data.elements.length === 0) {
        console.warn("No hay hospitales cercanos");
        return;
      }

      data.elements.forEach((el: any) => {
        const lat = el.lat || el.center?.lat;
        const lon = el.lon || el.center?.lon;

        if (!lat || !lon) return;

        const marker = L.marker([lat, lon], {
          icon: L.divIcon({
            html: `
              <div style="
                width: 18px;
                height: 18px;
                background: #dc2626;
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                border: 2px solid white;
              "></div>
            `
          })
        }).addTo(markersLayer.current);

        marker.bindPopup(el.tags?.name || "Hospital");
      });

    } catch (error) {
      console.error("Error cargando hospitales:", error);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">

      <h2 className="text-3xl font-bold mb-6">Apoyo Inmediato</h2>

      <div className="mb-6 p-5 bg-red-600 text-white rounded-2xl text-center shadow-lg">
        <h3 className="text-xl font-bold mb-4">Emergencia en México</h3>

        <div className="flex flex-col gap-3">

          <a href="tel:911" className="bg-white text-red-600 py-2 rounded-lg font-bold">
            📞 911 Emergencias
          </a>

          <a href="tel:*0311" className="bg-white text-red-600 py-2 rounded-lg font-bold">
            📞 *0311 LOCATEL
          </a>

          <a href="tel:8009112000" className="bg-white text-red-600 py-2 rounded-lg font-bold">
            📞 Línea de la Vida
          </a>

        </div>
      </div>

      <div
        ref={mapRef}
        className="w-full h-[420px] rounded-2xl border border-white/20 shadow-xl"
      />

    </div>
  );
};

export default Directory;