import { useEffect, useState } from "react";

type HelpLine = {
  label: string;
  phone: string;
};

export default function Ayuda() {
  const [lines, setLines] = useState<HelpLine[]>([]);
  const [country, setCountry] = useState<string>("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setDefault();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();

          const countryCode = data.address.country_code;

          setCountry(countryCode);

          if (countryCode === "mx") {
            setLines([
              { label: "Emergencias", phone: "911" },
              { label: "LOCATEL", phone: "55 5658 1111" },
              { label: "LOCATEL", phone: "*0311" },
              { label: "Línea de la Vida (CONASAMA)", phone: "800 911 2000" },
            ]);
          } else {
            setDefault();
          }
        } catch {
          setDefault();
        }
      },
      () => {
        setDefault();
      }
    );
  }, []);

  const setDefault = () => {
    setLines([{ label: "Emergencias", phone: "911" }]);
  };

  return (
    <div
      className="min-h-screen text-white px-4 py-10 flex flex-col items-center"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* TITULO */}
      <h1 className="text-3xl font-bold mb-6">Apoyo Inmediato</h1>

      {/* TARJETA ROJA */}
      <div className="bg-red-600 w-full max-w-xl rounded-2xl p-6 shadow-lg">
        <h2 className="text-center font-semibold mb-4">
          Emergencia en {country === "mx" ? "México" : "tu ubicación"}
        </h2>

        <div className="flex flex-col gap-3">
          {lines.map((line, i) => (
            <a
              key={i}
              href={`tel:${line.phone}`}
              className="bg-white text-red-600 rounded-xl py-3 text-center font-medium"
            >
              📞 {line.label} — {line.phone}
            </a>
          ))}
        </div>
      </div>

      {/* TEXTO MAPA */}
      <div className="mt-6 bg-black/50 px-4 py-2 rounded-xl text-sm">
        📍 Los puntos indican hospitales cercanos. Toca uno para abrir en Google Maps.
      </div>

      {/* MAPA */}
      <div className="mt-4 w-full max-w-xl h-72 rounded-xl overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps?q=hospitales&output=embed"
        ></iframe>
      </div>
    </div>
  );
}