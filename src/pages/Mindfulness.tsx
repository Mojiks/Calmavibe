import { useMemo, useState } from "react";
import { ArrowLeft, Clock3, Flower2, Play } from "lucide-react";
import Layout from "../components/Layout";
import CalmExperience from "../components/calm/CalmExperience";
import { mindfulnessCategories, mindfulnessExercises } from "../data/mindfulnessExercises";
import type { MindfulnessCategory, MindfulnessExercise } from "../data/mindfulnessExercises";

export default function Mindfulness() {
  const [category, setCategory] = useState<MindfulnessCategory | "todas">("todas");
  const [selected, setSelected] = useState<MindfulnessExercise | null>(null);

  const filtered = useMemo(
    () =>
      category === "todas"
        ? mindfulnessExercises
        : mindfulnessExercises.filter((exercise) => exercise.category === category),
    [category],
  );

  return (
    <Layout>
      <div className="min-h-screen px-4 pb-28 pt-6 text-white sm:px-6 sm:pt-8 lg:px-8 lg:pb-10">
        <div className="mx-auto w-full max-w-[1400px]">
          {!selected ? (
            <>
              <header className="max-w-3xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#D8C27A]/15 bg-[#D8C27A]/[0.06]">
                    <Flower2 size={20} className="text-[#D8C27A]" />
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#D8C27A]/70">Práctica</p>
                </div>
                <h1 className="mt-5 text-3xl font-light tracking-[-0.04em] sm:text-4xl lg:text-[42px]">Mindfulness</h1>
                <p className="mt-3 text-sm leading-6 text-white/55 sm:text-base">
                  Experiencias breves para practicar presencia, atención y regulación a tu propio ritmo.
                </p>
              </header>

              <div className="mt-7 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
                {mindfulnessCategories.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCategory(item.id)}
                    className={`min-h-10 shrink-0 rounded-full border px-4 text-xs transition ${
                      category === item.id
                        ? "border-[#CBE7A5]/20 bg-[#718354]/70 text-white"
                        : "border-white/10 bg-white/[0.03] text-white/55 hover:bg-white/[0.07] hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((exercise) => (
                  <button
                    key={exercise.id}
                    type="button"
                    onClick={() => setSelected(exercise)}
                    className="group min-w-0 rounded-[22px] border border-white/10 bg-black/30 p-5 text-left backdrop-blur-2xl transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-black/40"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[10px] uppercase tracking-[0.15em] text-[#D8C27A]/65">
                        {exercise.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] text-white/35">
                        <Clock3 size={12} /> {exercise.durationMinutes} min
                      </span>
                    </div>
                    <h2 className="mt-4 text-lg font-medium text-white">{exercise.title}</h2>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-white/50">{exercise.shortDescription}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-xs text-white/65 transition group-hover:text-white">
                      <Play size={14} /> Comenzar
                    </span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="pt-2">
              <CalmExperience
                experience={{
                  id: selected.id,
                  title: selected.title,
                  kind: selected.category === "respiracion" ? "breathing" : "reflection",
                  durationMinutes: selected.durationMinutes,
                  description: selected.shortDescription,
                  steps: selected.guidance,
                  whenToUse: selected.shortDescription,
                  caution: selected.safetyNote,
                }}
                onBack={() => setSelected(null)}
                onFinish={() => setSelected(null)}
              />
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="mx-auto mt-4 flex min-h-10 items-center gap-2 text-xs text-white/40 hover:text-white/70"
              >
                <ArrowLeft size={14} /> Volver a la biblioteca
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
