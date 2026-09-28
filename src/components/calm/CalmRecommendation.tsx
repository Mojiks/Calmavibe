import { ArrowRight, Clock3, ShieldCheck } from "lucide-react";
import type { CalmExperience } from "../../data/calmavibeExperiences";

export default function CalmRecommendation({
  experience,
  reason,
  onStart,
}: {
  experience: CalmExperience;
  reason: string;
  onStart: () => void;
}) {
  return (
    <section className="mx-auto w-full max-w-3xl rounded-[28px] border border-white/10 bg-black/35 p-5 shadow-2xl backdrop-blur-2xl sm:p-7">
      <p className="text-[11px] uppercase tracking-[0.2em] text-[#D8C27A]/75">
        Para este momento
      </p>
      <h2 className="mt-3 text-2xl font-light text-white sm:text-3xl">
        {experience.title}
      </h2>
      <p className="mt-2 text-sm leading-6 text-white/65">{experience.description}</p>

      <div className="mt-5 flex flex-wrap gap-2 text-xs text-white/55">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
          <Clock3 size={13} /> {experience.durationMinutes} min
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
          <ShieldCheck size={13} /> Sin diagnóstico
        </span>
      </div>

      <div className="mt-5 rounded-2xl border border-[#A9C982]/10 bg-[#A9C982]/[0.05] p-4">
        <p className="text-sm leading-6 text-white/70">{reason}</p>
      </div>

      <button
        type="button"
        onClick={onStart}
        className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-[#CBE7A5]/20 bg-[#718354]/75 px-5 py-3 text-sm font-medium text-white transition hover:bg-[#7D9160] active:scale-[0.99]"
      >
        Empezar
        <ArrowRight size={17} />
      </button>
    </section>
  );
}
