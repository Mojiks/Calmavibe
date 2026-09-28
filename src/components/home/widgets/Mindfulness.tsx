import { ArrowRight, Flower2 } from "lucide-react";
import type { Page } from "../../../types/navigation";

export default function Mindfulness({
  setPage,
}: {
  setPage: (page: Page) => void;
}) {
  return (
    <section className="flex h-full flex-col p-5">
      <div className="flex items-center gap-3">
        <Flower2 size={18} className="text-[#D8C27A]" />
        <h3 className="text-[18px] font-semibold text-white">Mindfulness</h3>
      </div>

      <div className="mt-5 flex-1 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
        <div className="relative flex h-full min-h-[170px] flex-col items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-[#D8C27A]/10 via-white/[0.03] to-transparent px-5 text-center">
          <div className="absolute h-24 w-24 rounded-full bg-[#D8C27A]/10 blur-2xl" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-[#D8C27A]/30 bg-black/20">
            <Flower2 size={26} strokeWidth={1.4} className="text-[#D8C27A]/80" />
          </div>
          <p className="relative mt-4 max-w-[220px] text-xs leading-5 text-white/50">
            Prácticas breves de respiración, cuerpo, sentidos, pensamientos y presencia.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setPage("mindfulness")}
        className="mt-3 inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] text-xs text-white/65 transition hover:bg-white/[0.08] hover:text-white"
      >
        Explorar prácticas
        <ArrowRight size={14} />
      </button>
    </section>
  );
}
