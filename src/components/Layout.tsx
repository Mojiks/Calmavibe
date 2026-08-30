import { useEffect, useState, type ReactNode } from "react";

import Background from "./Background";
import AmbientGlow from "./AmbientGlow";
import FloatingParticles from "./FloatingParticles";
import Disclaimer from "./Disclaimer";
import LegalNotice from "./LegalNotice";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({
  children,
}: LayoutProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);

    const timeout = setTimeout(() => {
      setVisible(true);
    }, 120);

    return () => clearTimeout(timeout);
  }, [children]);

  return (
    <>
      {/* Fondo */}
      <Background />

      {/* Iluminación ambiental */}
      <AmbientGlow />

      {/* Partículas */}
      <FloatingParticles />

      {/* Contenido */}
      <main
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
      </main>
    </>
  );
}