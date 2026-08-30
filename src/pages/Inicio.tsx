// src/pages/Inicio.tsx

import type { Page } from "../types/navigation";

import Background from "../components/Background";
import AmbientGlow from "../components/AmbientGlow";
import FloatingParticles from "../components/FloatingParticles";

import TopBar from "../components/home/TopBar";
import Hero from "../components/home/Hero";
import QuickCards from "../components/home/QuickCards";
import BottomWidgets from "../components/home/BottomWidgets";
import HomeFooter from "../components/home/HomeFooter";
import SoundPanel from "../components/home/SoundPanel";

interface InicioProps {
  setPage: (page: Page) => void;
}

export default function Inicio({
  setPage,
}: InicioProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">

      <Background />
      <AmbientGlow />
      <FloatingParticles />

      <div
        className="
          relative
          z-10
          min-h-screen
          px-8
          py-5
        "
      >
        <TopBar />

        <div
          className="
            mt-2
            grid
            grid-cols-[minmax(0,1fr)_330px]
            items-start
            gap-8
          "
        >
          <Hero />
          <SoundPanel />
        </div>

        <div className="mt-6">
          <QuickCards setPage={setPage} />
        </div>

        <div className="mt-3">
          <BottomWidgets setPage={setPage} />
        </div>

        <HomeFooter />
      </div>
    </div>
  );
}