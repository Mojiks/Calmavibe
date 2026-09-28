export type CalmExperienceKind =
  | "grounding"
  | "breathing"
  | "thoughts"
  | "self-compassion"
  | "reflection"
  | "movement";

export type CalmExperience = {
  id: string;
  title: string;
  kind: CalmExperienceKind;
  durationMinutes: number;
  description: string;
  steps: string[];
  whenToUse: string;
  caution?: string;
  alternativeId?: string;
};

export const calmavibeExperiences: CalmExperience[] = [
  {
    id: "cinco-sentidos",
    title: "Cinco sentidos",
    kind: "grounding",
    durationMinutes: 3,
    description: "Volvamos al lugar donde estás, usando lo que tus sentidos ya pueden encontrar.",
    steps: [
      "Mira dos cosas que puedas describir.",
      "Escucha dos sonidos, sin perseguirlos.",
      "Nota un punto de contacto: pies, manos o ropa.",
      "Mira alrededor una última vez y reconoce dónde estás.",
    ],
    whenToUse: "Cuando necesitas volver al presente o bajar la activación sin centrarte en la respiración.",
  },
  {
    id: "respira-conmigo",
    title: "Respira conmigo",
    kind: "breathing",
    durationMinutes: 2,
    description: "Sigue una onda suave. No tienes que respirar perfecto; solo acompasar el ritmo si te resulta cómodo.",
    steps: [
      "Cuando la onda crezca, permite una inhalación cómoda.",
      "Cuando disminuya, deja salir el aire sin forzarlo.",
      "Repite varias veces y luego vuelve a tu ritmo natural.",
    ],
    whenToUse: "Cuando quieres una guía sencilla para desacelerar.",
    caution: "Si concentrarte en la respiración te incomoda, detén la experiencia y prueba Cinco sentidos.",
    alternativeId: "cinco-sentidos",
  },
  {
    id: "deja-pasar",
    title: "Deja pasar",
    kind: "thoughts",
    durationMinutes: 3,
    description: "No necesitas eliminar un pensamiento. Solo practica dejarlo continuar su camino.",
    steps: [
      "Cuando aparezca un pensamiento, imagina que está pasando frente a ti.",
      "No lo persigas ni intentes terminarlo.",
      "Vuelve a una sensación del entorno.",
      "Repite cada vez que tu atención se vaya.",
    ],
    whenToUse: "Cuando la mente se queda enganchada en un pensamiento repetitivo.",
  },
  {
    id: "rompe-el-bucle",
    title: "Rompe el bucle",
    kind: "thoughts",
    durationMinutes: 4,
    description: "Separa lo que sabes de lo que tu mente está completando.",
    steps: [
      "Escribe o piensa una frase sobre lo que está ocurriendo.",
      "Ahora separa: ¿qué sé realmente?",
      "¿Qué estoy imaginando o anticipando?",
      "¿Qué no puedo saber todavía?",
      "Vuelve solo a lo que sí puedes hacer ahora.",
    ],
    whenToUse: "Cuando una preocupación mezcla hechos, predicciones y posibilidades.",
  },
  {
    id: "otra-voz",
    title: "Otra voz",
    kind: "self-compassion",
    durationMinutes: 4,
    description: "Responde a la autocrítica como hablarías con alguien que quieres cuidar.",
    steps: [
      "Identifica una frase dura que te estés diciendo.",
      "Pregúntate qué tono tiene esa frase.",
      "Reescríbela con honestidad, pero sin crueldad.",
      "Lee tu nueva frase una vez y deja que repose.",
    ],
    whenToUse: "Cuando la exigencia o la autocrítica están ocupando demasiado espacio.",
  },
  {
    id: "un-pequeno-paso",
    title: "Un pequeño paso",
    kind: "reflection",
    durationMinutes: 2,
    description: "No necesitas resolver el día. Solo elegir el siguiente movimiento posible.",
    steps: [
      "Piensa en lo que más pesa ahora.",
      "Pregúntate qué parte sí puedes tocar durante los próximos diez minutos.",
      "Elige una acción pequeña, concreta y amable.",
      "Déjala ser suficiente por ahora.",
    ],
    whenToUse: "Cuando todo parece demasiado grande y necesitas reducirlo a algo manejable.",
  },
  {
    id: "la-mochila",
    title: "La mochila",
    kind: "reflection",
    durationMinutes: 3,
    description: "Distingue lo que estás cargando de lo que puedes dejar por un momento.",
    steps: [
      "Imagina una mochila con todo lo que llevas hoy.",
      "Nombra una cosa que necesitas atender.",
      "Nombra otra que puedes dejar para después.",
      "Imagina apoyar esa segunda carga durante un rato.",
    ],
    whenToUse: "Cuando tienes demasiadas preocupaciones simultáneas.",
  },
];

export function getCalmExperience(id: string) {
  return calmavibeExperiences.find((experience) => experience.id === id) ?? null;
}
