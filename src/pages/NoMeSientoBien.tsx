import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Brain,
  Heart,
  HeartPulse,
  HelpCircle,
  Flame,
  CloudRain,
  EyeOff,
  Shield,
  Sparkles,
  Waves,
} from "lucide-react";
import Layout from "../components/Layout";
import CalmQuestion from "../components/calm/CalmQuestion";
import CalmScale from "../components/calm/CalmScale";
import CalmRecommendation from "../components/calm/CalmRecommendation";
import CalmExperience from "../components/calm/CalmExperience";
import CalmResult from "../components/calm/CalmResult";
import { emotionalRoutes, needs, type CalmEmotion, type CalmNeed, type CalmPattern } from "../data/emotionalRoutes";
import { getCalmExperience } from "../data/calmavibeExperiences";
import { recommendCalmExperience } from "../engine/calmRecommendationEngine";
import type { Page } from "../types/navigation";

const emotionIcons: Record<CalmEmotion, typeof Brain> = {
  ansiedad: Waves,
  "mente-rapida": Brain,
  estres: HeartPulse,
  tristeza: CloudRain,
  miedo: Shield,
  enojo: Flame,
  dolor: Heart,
  desconexion: EyeOff,
  "no-se": HelpCircle,
};

type Step = "welcome" | "emotion" | "pattern" | "intensity" | "need" | "recommendation" | "experience" | "after" | "result";

type SessionRecord = {
  emotion: CalmEmotion;
  pattern: CalmPattern;
  need: CalmNeed;
  initialIntensity: number;
  finalIntensity: number;
  experience: string;
  durationMinutes: number;
  date: string;
};

const STORAGE_KEY = "calmavibe.calm.sessions.v1";

function saveSession(record: SessionRecord) {
  try {
    const current = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as SessionRecord[];
    localStorage.setItem(STORAGE_KEY, JSON.stringify([record, ...current].slice(0, 50)));
  } catch {
    // Calmavibe sigue funcionando aunque el almacenamiento local no esté disponible.
  }
}

export default function NoMeSientoBien({
  setPage,
}: {
  setPage: (page: Page) => void;
}) {
  const [step, setStep] = useState<Step>("welcome");
  const [emotion, setEmotion] = useState<CalmEmotion | null>(null);
  const [pattern, setPattern] = useState<CalmPattern | null>(null);
  const [intensity, setIntensity] = useState(5);
  const [initialIntensity, setInitialIntensity] = useState(5);
  const [finalIntensity, setFinalIntensity] = useState(5);
  const [need, setNeed] = useState<CalmNeed | null>(null);
  const [experienceStarted, setExperienceStarted] = useState(false);
  const [recommendationId, setRecommendationId] = useState<string | null>(null);
  const [reason, setReason] = useState("");

  const selectedRoute = useMemo(
    () => emotionalRoutes.find((route) => route.id === emotion) ?? null,
    [emotion],
  );

  const recommendation = useMemo(() => {
    if (!emotion || !pattern || !need) return null;
    return recommendCalmExperience({
      emotion,
      pattern,
      intensity: initialIntensity,
      need,
    });
  }, [emotion, pattern, need, initialIntensity]);

  const experience = recommendationId ? getCalmExperience(recommendationId) : null;

  const beginRecommendation = () => {
    if (!emotion || !pattern || !need) return;
    const result = recommendCalmExperience({
      emotion,
      pattern,
      intensity: initialIntensity,
      need,
    });
    setRecommendationId(result.experienceId);
    setReason(result.reason);
    setStep("recommendation");
  };

  const finishExperience = () => {
    setIntensity(initialIntensity);
    setStep("after");
  };

  const commitResult = () => {
    setFinalIntensity(intensity);
    if (!emotion || !pattern || !need || !experience) return;
    saveSession({
      emotion,
      pattern,
      need,
      initialIntensity,
      finalIntensity: intensity,
      experience: experience.id,
      durationMinutes: experience.durationMinutes,
      date: new Date().toISOString(),
    });
    setStep("result");
  };

  return (
    <Layout>
      <div className="min-h-screen px-4 pb-28 pt-6 text-white sm:px-6 sm:pt-8 lg:px-8 lg:pb-10">
        <div className="mx-auto w-full max-w-[1200px]">
          {step !== "welcome" && step !== "result" && (
            <button
              type="button"
              onClick={() => {
                if (step === "emotion") setStep("welcome");
                else if (step === "pattern") setStep("emotion");
                else if (step === "intensity") setStep("pattern");
                else if (step === "need") setStep("intensity");
                else if (step === "recommendation") setStep("need");
                else if (step === "experience") setStep("recommendation");
              }}
              className="mb-6 inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 text-xs text-white/55 hover:bg-white/[0.07] hover:text-white"
            >
              <ArrowLeft size={15} /> Atrás
            </button>
          )}

          {step === "welcome" && (
            <div className="mx-auto max-w-3xl py-10 text-center sm:py-16">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[22px] border border-[#D8C27A]/15 bg-[#D8C27A]/[0.06] shadow-[0_0_70px_rgba(216,194,122,0.08)]">
                <Sparkles size={27} className="text-[#D8C27A]/85" />
              </div>
              <p className="mt-7 text-[11px] uppercase tracking-[0.2em] text-[#D8C27A]/70">Ahora mismo</p>
              <h1 className="mt-4 text-4xl font-light leading-tight tracking-[-0.04em] sm:text-5xl">No me siento bien</h1>
              <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/60 sm:text-lg">
                Estoy aquí contigo. No necesitas explicar todo. Vamos paso a paso.
              </p>
              <button
                type="button"
                onClick={() => setStep("emotion")}
                className="mt-8 min-h-12 rounded-2xl border border-[#CBE7A5]/20 bg-[#718354]/75 px-7 text-sm font-medium text-white transition hover:bg-[#7D9160]"
              >
                Empezar
              </button>
              <p className="mx-auto mt-5 max-w-lg text-xs leading-5 text-white/35">
                Calmavibe no diagnostica ni sustituye atención profesional. Solo te ayuda a encontrar una experiencia de apoyo para este momento.
              </p>
            </div>
          )}

          {step === "emotion" && (
            <CalmQuestion
              eyebrow="Paso 1 de 4"
              title="¿Qué se parece más a lo que estás viviendo?"
              description="No necesitas elegir la palabra perfecta. Elige la que más se acerque ahora."
            >
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {emotionalRoutes.map((route) => {
                  const Icon = emotionIcons[route.id];
                  return (
                    <button
                      key={route.id}
                      type="button"
                      onClick={() => {
                        setEmotion(route.id);
                        setPattern(null);
                        setStep("pattern");
                      }}
                      className="group min-h-[128px] rounded-[22px] border border-white/10 bg-black/30 p-5 text-left backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-black/40"
                    >
                      <Icon size={20} className="text-[#D8C27A]/75" strokeWidth={1.6} />
                      <h2 className="mt-5 text-base font-medium text-white">{route.label}</h2>
                      <p className="mt-1 text-xs leading-5 text-white/45">{route.description}</p>
                    </button>
                  );
                })}
              </div>
            </CalmQuestion>
          )}

          {step === "pattern" && selectedRoute && (
            <CalmQuestion
              eyebrow="Paso 2 de 4"
              title="¿Qué notas más?"
              description="Vamos a acercarnos un poco más, sin analizarte ni ponerte una etiqueta."
            >
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {selectedRoute.patterns.map((item, index) => (
                  <button
                    key={`${item.id}-${index}`}
                    type="button"
                    onClick={() => {
                      setPattern(item.id);
                      setStep("intensity");
                    }}
                    className="min-h-16 rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-left text-sm text-white/75 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/[0.05]"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </CalmQuestion>
          )}

          {step === "intensity" && (
            <CalmQuestion
              eyebrow="Paso 3 de 4"
              title="¿Qué tan intenso se siente ahora?"
              description="No buscamos una medida exacta. Solo una referencia para elegir una experiencia adecuada."
            >
              <CalmScale value={intensity} onChange={setIntensity} />
              {intensity >= 9 && (
                <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs leading-5 text-white/50">
                  Si además sientes que estás en peligro inmediato o que podrías hacerte daño, busca ayuda de emergencia o una persona de confianza ahora mismo. Calmavibe no está diseñado para manejar una emergencia.
                </div>
              )}
              <button
                type="button"
                onClick={() => {
                  setInitialIntensity(intensity);
                  setStep("need");
                }}
                className="mt-5 min-h-12 w-full rounded-2xl border border-[#CBE7A5]/20 bg-[#718354]/75 px-5 text-sm font-medium text-white hover:bg-[#7D9160]"
              >
                Continuar
              </button>
            </CalmQuestion>
          )}

          {step === "need" && (
            <CalmQuestion
              eyebrow="Paso 4 de 4"
              title="¿Qué necesitas ahora?"
              description="Puedes elegir lo que te serviría en este momento, aunque mañana sea diferente."
            >
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {needs.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setNeed(item.id);
                      window.setTimeout(() => {
                        // El estado ya queda preparado para la recomendación.
                      }, 0);
                    }}
                    className={`min-h-16 rounded-2xl border px-4 py-4 text-left text-sm transition ${
                      need === item.id
                        ? "border-[#CBE7A5]/25 bg-[#718354]/25 text-white"
                        : "border-white/10 bg-black/30 text-white/65 hover:bg-white/[0.05]"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                disabled={!need}
                onClick={beginRecommendation}
                className="mt-5 min-h-12 w-full rounded-2xl border border-[#CBE7A5]/20 bg-[#718354]/75 px-5 text-sm font-medium text-white transition hover:bg-[#7D9160] disabled:cursor-not-allowed disabled:opacity-35"
              >
                Ver qué podría acompañarme
              </button>
            </CalmQuestion>
          )}

          {step === "recommendation" && recommendation && experience && (
            <>
              <CalmRecommendation
                experience={experience}
                reason={reason}
                onStart={() => {
                  setExperienceStarted(true);
                  setStep("experience");
                }}
              />
              {recommendation.caution && (
                <p className="mx-auto mt-4 max-w-3xl text-center text-xs leading-5 text-white/35">
                  {recommendation.caution}
                </p>
              )}
            </>
          )}

          {step === "experience" && experience && experienceStarted && (
            <CalmExperience
              experience={experience}
              onBack={() => setStep("recommendation")}
              onFinish={finishExperience}
            />
          )}

          {step === "after" && experience && (
            <CalmQuestion
              eyebrow="Después de la experiencia"
              title="¿Cómo te sientes ahora?"
              description="No hay una respuesta correcta. Solo observa qué tan intenso se siente ahora."
            >
              <CalmScale
                value={intensity}
                onChange={setIntensity}
                label="Intensidad ahora"
              />
              <button
                type="button"
                onClick={commitResult}
                className="mt-5 min-h-12 w-full rounded-2xl border border-[#CBE7A5]/20 bg-[#718354]/75 px-5 text-sm font-medium text-white hover:bg-[#7D9160]"
              >
                Ver mi resultado
              </button>
            </CalmQuestion>
          )}

          {step === "result" && experience && (
            <CalmResult
              initialIntensity={initialIntensity}
              finalIntensity={finalIntensity}
              experienceTitle={experience.title}
              onAgain={() => {
                setStep("recommendation");
                setExperienceStarted(false);
              }}
              onHome={() => setPage("inicio")}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}
