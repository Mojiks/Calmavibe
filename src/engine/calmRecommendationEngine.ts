import { getCalmExperience } from "../data/calmavibeExperiences";
import type { CalmEmotion, CalmNeed, CalmPattern } from "../data/emotionalRoutes";

export type CalmRecommendationInput = {
  emotion: CalmEmotion;
  pattern: CalmPattern;
  intensity: number;
  need: CalmNeed;
};

export type CalmRecommendation = {
  experienceId: string;
  reason: string;
  durationMinutes: number;
  caution?: string;
  alternativeId?: string;
};

const scoreExperience = (
  id: string,
  input: CalmRecommendationInput,
) => {
  let score = 0;

  if (input.need === "respirar" && id === "respira-conmigo") score += 8;
  if (input.need === "desconectarme" && id === "deja-pasar") score += 5;
  if (input.need === "entender" && id === "rompe-el-bucle") score += 8;
  if (input.need === "desahogarme" && id === "la-mochila") score += 6;
  if (input.need === "acompanado" && id === "otra-voz") score += 4;
  if (input.need === "distraerme" && id === "cinco-sentidos") score += 6;
  if (input.need === "calmarme" && id === "cinco-sentidos") score += 5;

  if (input.pattern === "pensamiento" && ["deja-pasar", "rompe-el-bucle"].includes(id)) score += 7;
  if (input.pattern === "anticipacion" && id === "rompe-el-bucle") score += 8;
  if (input.pattern === "cuerpo" && ["cinco-sentidos", "respira-conmigo"].includes(id)) score += 6;
  if (input.pattern === "critica" && id === "otra-voz") score += 9;
  if (input.pattern === "desconexion" && id === "cinco-sentidos") score += 10;
  if (input.pattern === "soledad" && id === "otra-voz") score += 3;

  if (input.intensity >= 8) {
    if (id === "cinco-sentidos") score += 9;
    if (id === "respira-conmigo") score -= 3;
    if (id === "rompe-el-bucle") score -= 2;
  }

  if (input.emotion === "enojo" && id === "cinco-sentidos") score += 3;
  if (input.emotion === "tristeza" && id === "la-mochila") score += 4;
  if (input.emotion === "mente-rapida" && id === "deja-pasar") score += 7;
  if (input.emotion === "ansiedad" && id === "cinco-sentidos") score += 5;

  return score;
};

export function recommendCalmExperience(
  input: CalmRecommendationInput,
): CalmRecommendation {
  const candidateIds = [
    "cinco-sentidos",
    "respira-conmigo",
    "deja-pasar",
    "rompe-el-bucle",
    "otra-voz",
    "un-pequeno-paso",
    "la-mochila",
  ];

  const ranked = candidateIds
    .map((id) => ({ id, score: scoreExperience(id, input) }))
    .sort((a, b) => b.score - a.score);

  const selected = getCalmExperience(ranked[0]?.id ?? "cinco-sentidos") ?? getCalmExperience("cinco-sentidos");

  if (!selected) {
    throw new Error("No hay experiencias Calmavibe disponibles.");
  }

  let reason = "Elegimos una experiencia breve para acompañar este momento.";

  if (input.pattern === "pensamiento" || input.pattern === "anticipacion") {
    reason = "Como tu mente está ocupando mucho espacio, empezaremos separando pensamientos de lo que ocurre ahora.";
  } else if (input.pattern === "cuerpo") {
    reason = "Como lo notas especialmente en el cuerpo, empezaremos con una experiencia que te ayude a volver al presente sin exigir demasiado.";
  } else if (input.pattern === "critica") {
    reason = "Como aparece mucha exigencia interna, empezaremos cambiando la forma de responderte, no peleando con lo que sientes.";
  } else if (input.pattern === "desconexion") {
    reason = "Como te cuesta sentirte presente, priorizamos señales externas y sencillas del entorno.";
  }

  return {
    experienceId: selected.id,
    reason,
    durationMinutes: selected.durationMinutes,
    caution: selected.caution,
    alternativeId: selected.alternativeId,
  };
}
