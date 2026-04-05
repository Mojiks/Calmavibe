import React, { useEffect, useRef, useState } from 'react';

declare const L: any;

const Directory: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markersLayer = useRef<any>(null);

  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // 📍 Obtener ubicación
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

  // 🗺️ Inicializar mapa
  const initMap = (coords: { lat: number; lng: number }) => {
    if (!mapRef.current || mapInstance.current) return;

    mapInstance.current = L.map(mapRef.current).setView([coords.lat, coords.lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(mapInstance.current);

    markersLayer.current = L.layerGroup().addTo(mapInstance.current);

    // 📍 marcador usuario
    L.marker([coords.lat, coords.lng])
      .addTo(mapInstance.current)
      .bindPopup("Tu ubicación")
      .openPopup();
  };

  // 🏥 Icono personalizado hospital
  const hospitalIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1484/1484848.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });

  // 🏥 Obtener hospitales
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

      data.elements.forEach((el: any) => {
        const lat = el.lat || el.center?.lat;
        const lon = el.lon || el.center?.lon;

        if (!lat || !lon) return;

        const marker = L.marker([lat, lon], { icon: hospitalIcon })
          .addTo(markersLayer.current);

        marker.bindPopup(`
          <div style="font-size:13px">
            <strong>${el.tags?.name || "Hospital cercano"}</strong><br/><br/>
            
            <a href="https://www.google.com/maps?q=${lat},${lon}" target="_blank">
              📍 Abrir en Google Maps
            </a>
            <br/>
            <a href="https://waze.com/ul?ll=${lat},${lon}&navigate=yes" target="_blank">
              🚗 Abrir en Waze
            </a>
          </div>
        `);
      });

      if (mapInstance.current && markersLayer.current.getLayers().length > 0) {
        mapInstance.current.fitBounds(markersLayer.current.getBounds(), {
          padding: [40, 40]
        });
      }

    } catch (error) {
      console.error("Error cargando hospitales:", error);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">

      <h2 className="text-3xl font-bold mb-6 text-center">
        Apoyo Inmediato
      </h2>

      {/* 🚨 MÉXICO */}
      <div className="mb-6 p-4 bg-red-600 text-white rounded-xl text-center">
        <h3 className="text-xl font-bold">Emergencia en México</h3>

        <div className="mt-4 flex flex-col gap-3">

          <a href="tel:911" className="bg-white text-red-600 py-2 rounded-lg font-bold">
            📞 Llamar 911
          </a>

          <a href="tel:5556581111" className="bg-white text-red-600 py-2 rounded-lg font-bold">
            📞 LOCATEL 55 5658 1111
          </a>

          <a href="tel:*0311" className="bg-white text-red-600 py-2 rounded-lg font-bold">
            📞 LOCATEL *0311
          </a>

          <a href="tel:8009112000" className="bg-white text-red-600 py-2 rounded-lg font-bold">
            📞 Línea de la Vida (CONASAMA)
          </a>

        </div>
      </div>

      {/* 🧠 LEYENDA */}
      <div className="mb-4 p-3 bg-white/10 rounded-lg text-sm text-center">
        📍 Los puntos indican hospitales cercanos.<br />
        Toca uno para ver detalles o abrir la ruta en Google Maps o Waze.
      </div>

      {/* 🗺️ MAPA */}
      <div
        ref={mapRef}
        className="w-full h-[450px] rounded-xl border"
      />

    </div>
  );
};

export default Directory;