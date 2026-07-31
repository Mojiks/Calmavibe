import { ReactNode, useEffect, useState } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);

    const timeout = setTimeout(() => {
      setVisible(true);
    }, 120);

    return () => clearTimeout(timeout);
  }, [children]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">

      {/* =======================
            FONDO PREMIUM
      ======================== */}
      <div
        className="
          absolute
          inset-0
          bg-cover
          bg-center
          bg-no-repeat
          bg-fixed
          scale-105
          animate-[backgroundZoom_30s_ease-in-out_infinite]
        "
        style={{
          backgroundImage: "url('/images/backgrounds/fondo.png')",
        }}
      />

      {/* Oscurece ligeramente */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Degradado cinematográfico */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-black/35
          via-transparent
          to-black/70
        "
      />

      {/* Luz cálida superior */}
      <div
        className="
          absolute
          top-0
          left-1/2
          -translate-x-1/2
          w-[900px]
          h-[500px]
          rounded-full
          bg-yellow-300/10
          blur-[180px]
          animate-pulse
        "
      />

      {/* Contenido */}
      <div
        className={`
          relative
          z-10
          min-h-screen
          text-white
          transition-all
          duration-700
          ease-out
          ${
            visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }
        `}
      >
        {children}
      </div>

      {/* Animación global */}
      <style>{`
        @keyframes backgroundZoom {

          0%{
            transform:scale(1.05);
          }

          50%{
            transform:scale(1.10);
          }

          100%{
            transform:scale(1.05);
          }

        }
      `}</style>

    </div>
  );
}