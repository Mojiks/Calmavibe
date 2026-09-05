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
    <div className="relative min-h-screen overflow-x-hidden pb-24 lg:pb-0">
      <Background />
      <AmbientGlow />
      <FloatingParticles />

      <div
        className="
          relative
          z-10
          min-h-screen
          px-4
          py-5
          sm:px-6
          lg:px-8
        "
      >
        <TopBar />

        <div
          className="
            mt-4
            grid
            grid-cols-1
            items-start
            gap-5
            md:grid-cols-2
            lg:mt-2
            lg:grid-cols-[minmax(0,1fr)_330px]
            lg:gap-8
          "
        >
          <Hero />
          <SoundPanel />
        </div>

        <div className="mt-7 lg:mt-6">
          <QuickCards setPage={setPage} />
        </div>

        <div className="mt-5 lg:mt-3">
          <BottomWidgets setPage={setPage} />
        </div>

        <HomeFooter />
      </div>
    </div>
  );
}
