// src/components/home/BottomWidgets.tsx

import type { Page } from "../../types/navigation";

import BreathingWidget from "./widgets/BreathingWidget";
import GamesWidget from "./widgets/GamesWidget";
import MoodWidget from "./widgets/MoodWidget";
import Mindfulness from "./widgets/Mindfulness";

interface BottomWidgetsProps {
  setPage: (page: Page) => void;
}

export default function BottomWidgets({
  setPage,
}: BottomWidgetsProps) {
  return (
    <div className="grid grid-cols-4 gap-3">

      <div
        className="
          h-[305px]
          rounded-[20px]
          border
          border-white/10
          bg-black/30
          backdrop-blur-3xl
          overflow-hidden
        "
      >
        <MoodWidget />
      </div>

      <div
        id="breathing-widget"
        className="
          h-[305px]
          rounded-[20px]
          border
          border-white/10
          bg-black/30
          backdrop-blur-3xl
          overflow-hidden
        "
      >
        <BreathingWidget />
      </div>

      <div
        className="
          h-[305px]
          rounded-[20px]
          border
          border-white/10
          bg-black/30
          backdrop-blur-3xl
          overflow-hidden
        "
      >
        <Mindfulness />
      </div>

      <div
        className="
          h-[305px]
          rounded-[20px]
          border
          border-white/10
          bg-black/30
          backdrop-blur-3xl
          overflow-hidden
        "
      >
        <GamesWidget setPage={setPage} />
      </div>

    </div>
  );
}