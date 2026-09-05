// src/components/home/BottomWidgets.tsx

import type { Page } from "../../types/navigation";

import BreathingWidget from "./widgets/BreathingWidget";
import GamesWidget from "./widgets/GamesWidget";
import MoodWidget from "./widgets/MoodWidget";
import Mindfulness from "./widgets/Mindfulness";

interface BottomWidgetsProps {
  setPage: (page: Page) => void;
}

const widgetClass = `
  min-h-[305px]
  rounded-[20px]
  border
  border-white/10
  bg-black/30
  backdrop-blur-3xl
  overflow-hidden
  lg:h-[305px]
  lg:min-h-0
`;

export default function BottomWidgets({
  setPage,
}: BottomWidgetsProps) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
      <div className={widgetClass}>
        <MoodWidget />
      </div>

      <div
        id="breathing-widget"
        className={widgetClass}
      >
        <BreathingWidget />
      </div>

      <div className={widgetClass}>
        <Mindfulness />
      </div>

      <div className={widgetClass}>
        <GamesWidget setPage={setPage} />
      </div>
    </div>
  );
}
