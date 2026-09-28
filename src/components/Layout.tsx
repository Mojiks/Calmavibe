import type { ReactNode } from "react";

import Background from "./Background";
import AmbientGlow from "./AmbientGlow";
import FloatingParticles from "./FloatingParticles";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Background />
      <AmbientGlow />
      <FloatingParticles />
      <main className="relative z-10 min-h-screen text-white fade-in">
        {children}
      </main>
    </>
  );
}
