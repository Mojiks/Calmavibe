import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">

      {/* 🔥 FONDO GLOBAL */}
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-center lg:bg-right scale-105 animate-[slowZoom_20s_ease-in-out_infinite]"
        style={{
          backgroundImage: "url('/images/calmavibe-hero-zen.webp')",
        }}
      />

      {/* 🔥 OVERLAY */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

      {/* 🔥 CONTENIDO */}
      <div className="relative z-10 min-h-screen text-white">
        {children}
      </div>

      {/* 🔥 ANIMACIÓN GLOBAL */}
      <style>{`
        @keyframes slowZoom {
          0% { transform: scale(1.05); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1.05); }
        }
      `}</style>

    </div>
  );
}