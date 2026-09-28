import { ArrowLeft, Check, Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { CalmExperience as CalmExperienceData } from "../../data/calmavibeExperiences";

export default function CalmExperience({
  experience,
  onFinish,
  onBack,
}: {
  experience: CalmExperienceData;
  onFinish: () => void;
  onBack: () => void;
}) {
  const [step, setStep] = useState(0);
  const [seconds, setSeconds] = useState(experience.durationMinutes * 60);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running || seconds <= 0) return;
    const timer = window.setInterval(() => {
      setSeconds((current) => {
        const next = Math.max(0, current - 1);
        if (next === 0) setRunning(false);
        return next;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [running, seconds]);

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
    const rest = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${rest}`;
  }, [seconds]);

  const reset = () => {
    setSeconds(experience.durationMinutes * 60);
    setStep(0);
    setRunning(true);
  };

  return (
    <section className="mx-auto w-full max-w-3xl rounded-[30px] border border-white/10 bg-black/35 p-5 shadow-2xl backdrop-blur-2xl sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-xs text-white/65 hover:bg-white/[0.08] hover:text-white"
        >
          <ArrowLeft size={15} /> Volver
        </button>
        <span className="text-xs text-white/35">{formattedTime}</span>
      </div>

      <div className="mt-8 text-center">
        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-[#D8C27A]/20 bg-[#D8C27A]/[0.06] shadow-[0_0_80px_rgba(216,194,122,0.08)] sm:h-36 sm:w-36">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] sm:h-24 sm:w-24">
            {running ? <Pause size={22} className="text-[#D8C27A]/80" /> : <Play size={22} className="ml-0.5 text-[#D8C27A]/80" />}
          </div>
        </div>

        <p className="mt-7 text-[11px] uppercase tracking-[0.2em] text-[#D8C27A]/70">{experience.title}</p>
        <h2 className="mt-3 text-xl font-light text-white sm:text-2xl">{experience.steps[step]}</h2>

        <div className="mx-auto mt-6 flex max-w-md justify-center gap-1.5">
          {experience.steps.map((item, index) => (
            <button
              key={item}
              type="button"
              aria-label={`Ir a paso ${index + 1}`}
              onClick={() => setStep(index)}
              className={`h-1.5 rounded-full transition-all ${index === step ? "w-8 bg-[#A9C982]" : "w-2 bg-white/15"}`}
            />
          ))}
        </div>
      </div>

      {experience.caution && (
        <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-xs leading-5 text-white/50">
          {experience.caution}
        </div>
      )}

      <div className="mt-7 grid grid-cols-1 gap-2 sm:grid-cols-3">
        <button
          type="button"
          onClick={() => setRunning((current) => !current)}
          className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white/75 hover:bg-white/[0.08]"
        >
          {running ? <Pause size={16} /> : <Play size={16} />}
          {running ? "Pausar" : "Continuar"}
        </button>
        <button
          type="button"
          onClick={reset}
          className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white/75 hover:bg-white/[0.08]"
        >
          <RotateCcw size={16} /> Reiniciar
        </button>
        <button
          type="button"
          onClick={() => {
            if (step < experience.steps.length - 1) {
              setStep((current) => current + 1);
            } else {
              onFinish();
            }
          }}
          className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#CBE7A5]/20 bg-[#718354]/75 px-4 text-sm text-white hover:bg-[#7D9160]"
        >
          {step < experience.steps.length - 1 ? "Siguiente" : "Terminar"}
          {step < experience.steps.length - 1 ? <Check size={16} /> : <Check size={16} />}
        </button>
      </div>
    </section>
  );
}
