import { ArrowLeft, RotateCcw } from "lucide-react";

export default function CalmResult({
  initialIntensity,
  finalIntensity,
  experienceTitle,
  onAgain,
  onHome,
}: {
  initialIntensity: number;
  finalIntensity: number;
  experienceTitle: string;
  onAgain: () => void;
  onHome: () => void;
}) {
  const delta = finalIntensity - initialIntensity;

  const message =
    delta < 0
      ? "Bajó un poco. Ese pequeño cambio también cuenta."
      : delta === 0
        ? "Está bien. No todas las experiencias producen un cambio inmediato."
        : "Gracias por notarlo. No vamos a forzar este ejercicio. Podemos probar algo diferente.";

  return (
    <section className="mx-auto w-full max-w-2xl rounded-[30px] border border-white/10 bg-black/35 p-6 text-center shadow-2xl backdrop-blur-2xl sm:p-9">
      <p className="text-[11px] uppercase tracking-[0.2em] text-[#D8C27A]/70">Después</p>
      <h2 className="mt-3 text-3xl font-light text-white">¿Cómo te sientes ahora?</h2>
      <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-white/60">No hay una respuesta correcta. Solo queremos observar qué cambió, si cambió algo.</p>

      <div className="mt-7 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
          <p className="text-xs text-white/40">Antes</p>
          <p className="mt-1 text-3xl font-light text-white">{initialIntensity}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
          <p className="text-xs text-white/40">Ahora</p>
          <p className="mt-1 text-3xl font-light text-white">{finalIntensity}</p>
        </div>
      </div>

      <p className="mt-6 text-base leading-7 text-white/75">{message}</p>
      <p className="mt-2 text-xs text-white/35">Experiencia: {experienceTitle}</p>

      <div className="mt-7 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={onAgain}
          className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white/75 hover:bg-white/[0.08]"
        >
          <RotateCcw size={16} /> Probar otra vez
        </button>
        <button
          type="button"
          onClick={onHome}
          className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-[#CBE7A5]/20 bg-[#718354]/75 px-4 text-sm text-white hover:bg-[#7D9160]"
        >
          <ArrowLeft size={16} /> Volver a Calmavibe
        </button>
      </div>
    </section>
  );
}
