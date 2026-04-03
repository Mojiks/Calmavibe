
import React, { useState, useEffect, useRef } from 'react';
import { geminiService } from '../services/gemini';

interface GroundingChunk {
  maps?: {
    uri: string;
    title: string;
  };
}

interface MapMarker {
  name: string;
  lat: number;
  lng: number;
  uri: string;
}

const SEARCH_CATEGORIES = [
  { id: 'emergency', label: 'Urgencias', query: 'centros de atención en crisis y urgencias psiquiátricas' },
  { id: 'psychologist', label: 'Psicólogos', query: 'psicólogos y terapeutas para ansiedad' },
  { id: 'clinic', label: 'Clínicas', query: 'clínicas de salud mental y psiquiatría' },
  { id: 'meditation', label: 'Bienestar', query: 'centros de meditación y yoga' }
];

const HELP_LINES = [
  { country: 'México', number: '800 911 2000', label: 'Línea de la Vida' },
  { country: 'España', number: '024', label: 'Atención al Suicidio' },
  { country: 'Argentina', number: '011 5275-1135', label: 'Prevención del Suicidio' },
  { country: 'Colombia', number: '106', label: 'Línea de Esperanza' },
  { country: 'Chile', number: '*4141', label: 'Prevención del Suicidio' }
];

declare const L: any; // Leaflet Global

const Directory: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ text: string; chunks: GroundingChunk[] } | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('');
  
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const userMarker = useRef<any>(null);
  const markersLayer = useRef<any>(null);

  // Inicializar ubicación y Mapa
  useEffect(() => {
    const initLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            setUserLocation(coords);
            setMapCenter(coords);
            initMap(coords);
          },
          (err) => {
            console.warn("Acceso a ubicación denegado", err);
            const defaultCoords = { lat: 19.4326, lng: -99.1332 }; // CDMX por defecto
            setMapCenter(defaultCoords);
            initMap(defaultCoords);
          }
        );
      } else {
        const defaultCoords = { lat: 19.4326, lng: -99.1332 };
        setMapCenter(defaultCoords);
        initMap(defaultCoords);
      }
    };

    initMap({ lat: 19.4326, lng: -99.1332 }); // Init with default first to avoid delay
    initLocation();

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  const initMap = (coords: { lat: number; lng: number }) => {
    if (!mapRef.current || mapInstance.current) return;

    mapInstance.current = L.map(mapRef.current, {
      center: [coords.lat, coords.lng],
      zoom: 13,
      zoomControl: true,
      scrollWheelZoom: false // Lighter interaction
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap'
    }).addTo(mapInstance.current);

    markersLayer.current = L.featureGroup().addTo(mapInstance.current);

    userMarker.current = L.marker([coords.lat, coords.lng], {
      icon: L.divIcon({
        className: 'user-location-marker',
        html: `<div class="w-4 h-4 bg-blue-500 border-2 border-white rounded-full shadow-lg animate-pulse"></div>`,
        iconSize: [16, 16],
      })
    }).addTo(mapInstance.current);
  };

  const parseMarkersFromText = (text: string): MapMarker[] => {
    try {
      const markerPrefix = "JSON_MARKERS:";
      const startIndex = text.indexOf(markerPrefix);
      if (startIndex === -1) return [];

      const jsonStr = text.substring(startIndex + markerPrefix.length).trim();
      const cleanedJson = jsonStr.replace(/```json|```/g, '').trim();
      
      const parsed = JSON.parse(cleanedJson);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  };

  const handleSearch = async (query: string, categoryId: string, customLat?: number, customLng?: number) => {
    setLoading(true);
    setActiveCategory(categoryId);

    const lat = customLat || mapCenter?.lat;
    const lng = customLng || mapCenter?.lng;

    const data = await geminiService.searchNearbyPlaces(query, lat, lng);
    setResults({ text: data.text, chunks: data.groundingChunks });

    const markers = parseMarkersFromText(data.text);
    if (markersLayer.current) {
      markersLayer.current.clearLayers();
      
      markers.forEach(m => {
        if (m.lat && m.lng) {
          const marker = L.marker([m.lat, m.lng], {
            icon: L.divIcon({
              className: 'custom-place-marker',
              html: `<div class="w-6 h-6 bg-indigo-600 border-2 border-white rounded-full flex items-center justify-center shadow-xl text-[10px]">📍</div>`,
              iconSize: [24, 24],
            })
          }).addTo(markersLayer.current);
          
          marker.bindPopup(`
            <div class="p-2 min-w-[150px]">
              <h4 class="font-bold text-gray-800 text-sm mb-1">${m.name}</h4>
              <a href="${m.uri}" target="_blank" class="text-xs text-blue-600 font-bold hover:underline">Ver Mapa</a>
            </div>
          `);
        }
      });

      if (markers.length > 0 && mapInstance.current) {
        mapInstance.current.fitBounds(markersLayer.current.getBounds(), { padding: [50, 50] });
      }
    }

    setLoading(false);
  };

  const cleanTextResponse = (text: string) => {
    const markerPrefix = "JSON_MARKERS:";
    const index = text.indexOf(markerPrefix);
    if (index !== -1) return text.substring(0, index).trim();
    return text;
  };

  return (
    <div className="glass-effect rounded-[2.5rem] p-6 md:p-8 shadow-2xl max-w-6xl mx-auto animate-fade-in border border-white/30">
      <div className="mb-8">
        <h2 className="text-4xl font-bold mb-2 italic">Directorio de Apoyo</h2>
        <p className="opacity-80 text-lg font-light">Líneas de ayuda y centros de bienestar cerca de ti.</p>
      </div>

      {/* Líneas de Ayuda Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
        {HELP_LINES.map((line, idx) => (
          <div key={idx} className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col items-center text-center">
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{line.country}</span>
            <span className="text-sm font-bold text-blue-300">{line.number}</span>
            <span className="text-[10px] opacity-80 mt-1">{line.label}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative">
            <div 
              ref={mapRef} 
              className="w-full h-[350px] md:h-[450px] rounded-[2rem] shadow-2xl overflow-hidden border border-white/20"
            ></div>
            <div className="absolute bottom-4 right-4 z-[1000]">
              <button 
                onClick={() => {
                  if (userLocation && mapInstance.current) {
                    mapInstance.current.setView([userLocation.lat, userLocation.lng], 15);
                  }
                }}
                className="bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/30 transition-all border border-white/30 shadow-lg"
              >
                🏠
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {SEARCH_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleSearch(cat.query, cat.id)}
                disabled={loading}
                className={`p-3 rounded-2xl flex flex-col items-center gap-2 transition-all border ${
                  activeCategory === cat.id 
                  ? 'bg-blue-600 border-white shadow-xl' 
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <span className="text-2xl">
                  {cat.id === 'emergency' ? '🆘' : cat.id === 'psychologist' ? '🧠' : cat.id === 'clinic' ? '🏥' : '🧘'}
                </span>
                <span className="text-[9px] font-black uppercase tracking-widest">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-black/20 p-6 rounded-[2rem] border border-white/10 h-full max-h-[600px] overflow-y-auto no-scrollbar">
            {loading ? (
              <div className="h-full flex flex-col items-center justify-center animate-pulse py-10">
                <div className="w-10 h-10 border-2 border-white/10 border-t-white rounded-full animate-spin mb-4"></div>
                <p className="text-sm font-light italic">Buscando referencias...</p>
              </div>
            ) : results ? (
              <div className="animate-fade-in">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span>📍</span> Resultados
                </h3>
                <div className="prose prose-invert max-w-none text-sm opacity-90 leading-relaxed whitespace-pre-wrap font-light mb-6">
                  {cleanTextResponse(results.text)}
                </div>
                <div className="space-y-3">
                  {results.chunks.filter(c => c.maps).map((chunk, idx) => (
                    <a 
                      key={idx} 
                      href={chunk.maps!.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-white/10 hover:bg-white/20 p-4 rounded-xl border border-white/10 transition-all flex justify-between items-center group"
                    >
                      <div className="flex-1">
                        <h4 className="font-bold text-xs text-white leading-tight">{chunk.maps!.title}</h4>
                      </div>
                      <span className="text-xl opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">➔</span>
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-10 opacity-60">
                <span className="text-6xl mb-4">🗺️</span>
                <p className="text-sm font-light">Selecciona una categoría para ver centros de ayuda cercanos.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Directory;
