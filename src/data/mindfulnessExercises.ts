export type MindfulnessCategory =
  | "respiracion"
  | "cuerpo"
  | "sentidos"
  | "pensamientos"
  | "emociones"
  | "presencia"
  | "autocompasion"
  | "regulacion"
  | "relajacion"
  | "reflexion";

export type MindfulnessExercise = {
  id: string;
  title: string;
  shortDescription: string;
  category: MindfulnessCategory;
  durationMinutes: 1 | 2 | 3 | 4 | 5 | 10 | 15;
  sourceReference?: string;
  guidance: string[];
  safetyNote?: string;
  alternativeId?: string;
};

/**
 * Contenido editorial de Calmavibe.
 *
 * Las referencias de fuente identifican ideas adaptadas del material de apoyo
 * aportado para este proyecto. La redacción y la experiencia digital son
 * originales de Calmavibe y no reproducen los guiones del material fuente.
 */
export const mindfulnessExercises: MindfulnessExercise[] = [
  {
    id: "presencia-tres-respiraciones",
    title: "Tres respiraciones",
    shortDescription: "Una pausa breve para bajar un poco el ritmo.",
    category: "respiracion",
    durationMinutes: 1,
    sourceReference: "Material de apoyo · ejercicio #004",
    guidance: [
      "Quédate como estás y permite que tus hombros se aflojen un poco.",
      "Sigue tres respiraciones a tu propio ritmo, sin intentar hacerlas perfectas.",
      "Al terminar, observa si algo cambió, aunque sea muy pequeño.",
    ],
    safetyNote:
      "Si concentrarte en la respiración te resulta incómodo, puedes cambiar a una experiencia de sentidos externos.",
    alternativeId: "cinco-sentidos",
  },
  {
    id: "cinco-sentidos",
    title: "Cinco sentidos",
    shortDescription: "Vuelve al entorno usando lo que puedes ver, oír y tocar.",
    category: "sentidos",
    durationMinutes: 3,
    sourceReference: "Material de apoyo · ejercicio #005",
    guidance: [
      "Mira a tu alrededor y encuentra dos cosas que puedas describir con detalle.",
      "Escucha dos sonidos, cercanos o lejanos, sin buscarlos demasiado.",
      "Nota el contacto de tus pies, tus manos o la ropa sobre tu piel.",
      "Termina mirando nuevamente el espacio que te rodea.",
    ],
  },
  {
    id: "nombrar-sin-explicar",
    title: "Una palabra para este momento",
    shortDescription: "Reconoce cómo estás sin tener que contar toda la historia.",
    category: "emociones",
    durationMinutes: 2,
    sourceReference: "Material de apoyo · ejercicios #006 y #017",
    guidance: [
      "Elige una sola palabra que se acerque a tu estado de ahora.",
      "No necesitas justificarla ni encontrar la palabra perfecta.",
      "Observa dónde notas algo de ese estado en tu cuerpo, si aparece alguna sensación.",
    ],
  },
  {
    id: "voz-interna",
    title: "Escuchar tu voz interna",
    shortDescription: "Observa cómo te hablas cuando aparece la autocrítica.",
    category: "autocompasion",
    durationMinutes: 4,
    sourceReference: "Material de apoyo · ejercicio #007",
    guidance: [
      "Piensa en una frase que tu mente te repite cuando algo sale mal.",
      "En lugar de discutir con ella, nota su tono: ¿duro, acelerado, exigente o distante?",
      "Ahora imagina decir la misma idea con un tono más humano y útil.",
      "Quédate unos segundos con esa segunda voz.",
    ],
  },
  {
    id: "piloto-automatico",
    title: "Salir del piloto automático",
    shortDescription: "Encuentra un pequeño espacio entre lo que ocurre y tu respuesta.",
    category: "pensamientos",
    durationMinutes: 4,
    sourceReference: "Material de apoyo · ejercicio #008",
    guidance: [
      "Recuerda una reacción automática reciente, sin entrar en todos los detalles.",
      "Identifica qué estaba pasando justo antes de reaccionar.",
      "Nota qué sensación, pensamiento o impulso apareció primero.",
      "Imagina una pausa de unos segundos antes de la próxima respuesta.",
    ],
  },
  {
    id: "escaneo-corporal-breve",
    title: "Escaneo corporal breve",
    shortDescription: "Recorre el cuerpo con curiosidad y sin intentar corregirlo.",
    category: "cuerpo",
    durationMinutes: 3,
    sourceReference: "Material de apoyo · ejercicio #009",
    guidance: [
      "Comienza por los pies y nota el contacto con el suelo.",
      "Sube lentamente por piernas, abdomen, hombros y cuello.",
      "Encuentra un lugar donde notes más tensión o movimiento.",
      "No necesitas cambiarlo: solo reconocerlo y continuar.",
    ],
    safetyNote:
      "Si prestar atención al cuerpo aumenta tu incomodidad, vuelve a mirar y escuchar lo que ocurre a tu alrededor.",
    alternativeId: "cinco-sentidos",
  },
  {
    id: "peso-del-cuerpo",
    title: "El apoyo de tu cuerpo",
    shortDescription: "Percibe el contacto con la silla o el suelo.",
    category: "cuerpo",
    durationMinutes: 1,
    sourceReference: "Material de apoyo · ejercicio #010",
    guidance: [
      "Nota dónde tu cuerpo está siendo sostenido por la silla o el suelo.",
      "Percibe el peso durante unos segundos.",
      "Deja que ese apoyo exista sin tener que hacer nada más.",
    ],
  },
  {
    id: "tacto-presente",
    title: "Tacto y presente",
    shortDescription: "Usa temperatura, textura y presión para volver al aquí y ahora.",
    category: "sentidos",
    durationMinutes: 2,
    sourceReference: "Material de apoyo · ejercicio #011",
    guidance: [
      "Apoya las manos donde te resulte cómodo.",
      "Observa la temperatura y la textura de lo que estás tocando.",
      "Nota la presión del contacto durante unos segundos.",
      "Mira alrededor y reconoce que estás aquí, ahora.",
    ],
    safetyNote:
      "Si el contacto físico te resulta desagradable, cambia a la experiencia de sonidos o de vista.",
    alternativeId: "escucha-entorno",
  },
  {
    id: "escucha-entorno",
    title: "Escuchar el entorno",
    shortDescription: "Deja que los sonidos te devuelvan al espacio donde estás.",
    category: "sentidos",
    durationMinutes: 2,
    sourceReference: "Material de apoyo · ejercicio #012",
    guidance: [
      "Mantén los ojos abiertos y escucha sin buscar un sonido concreto.",
      "Identifica un sonido cercano y uno más lejano.",
      "Observa cómo cambia tu atención cuando dejas de perseguir pensamientos.",
    ],
  },
  {
    id: "respiracion-estructurada",
    title: "Respiración estructurada",
    shortDescription: "Un ritmo sencillo para quienes prefieren una estructura clara.",
    category: "regulacion",
    durationMinutes: 3,
    sourceReference: "Material de apoyo · ejercicio #013",
    guidance: [
      "Si te resulta cómodo, inhala suavemente mientras cuentas cuatro.",
      "Haz una pausa breve y cómoda, sin forzar.",
      "Exhala de forma tranquila y vuelve a tu respiración natural.",
      "Repite unas pocas veces y termina sin retener el aire.",
    ],
    safetyNote:
      "No fuerces la respiración ni retengas el aire si eso genera mareo, angustia o incomodidad. Puedes usar cinco sentidos en su lugar.",
    alternativeId: "cinco-sentidos",
  },
  {
    id: "tension-30-segundos",
    title: "Detectar tensión",
    shortDescription: "Treinta segundos para reconocer dónde estás apretando de más.",
    category: "cuerpo",
    durationMinutes: 1,
    sourceReference: "Material de apoyo · ejercicio #014",
    guidance: [
      "Haz una pausa y pregunta: ¿dónde noto tensión ahora?",
      "Elige un solo punto del cuerpo.",
      "No intentes arreglarlo; simplemente reconoce que está ahí.",
    ],
  },
  {
    id: "momento-sin-historia",
    title: "Este momento, sin historia",
    shortDescription: "Observa la experiencia presente sin reconstruir todo lo ocurrido.",
    category: "pensamientos",
    durationMinutes: 3,
    sourceReference: "Material de apoyo · ejercicio #018",
    guidance: [
      "Durante un momento, deja a un lado la explicación de lo que ocurrió.",
      "Pregúntate qué está sucediendo en ti ahora mismo.",
      "Si no aparece una respuesta clara, eso también está bien.",
      "Vuelve a una sensación sencilla: pies, manos, sonidos o respiración.",
    ],
  },
  {
    id: "anclaje-personal",
    title: "Tu punto de retorno",
    shortDescription: "Elige una señal sencilla que puedas usar para volver al presente.",
    category: "presencia",
    durationMinutes: 4,
    sourceReference: "Material de apoyo · ejercicio #019",
    guidance: [
      "Elige algo sencillo que puedas notar fácilmente: tus pies, una textura o un gesto.",
      "Practica volver a esa señal durante unos segundos.",
      "No tiene que funcionar siempre; solo debe ser fácil de recordar.",
    ],
  },
  {
    id: "manos-presentes",
    title: "Mirar las manos",
    shortDescription: "Una atención visual sencilla para salir un momento del bucle mental.",
    category: "presencia",
    durationMinutes: 2,
    sourceReference: "Material de apoyo · ejercicio #020",
    guidance: [
      "Mira tus manos durante unos segundos.",
      "Encuentra dos detalles: una línea, una textura o una diferencia de temperatura.",
      "Regresa la mirada al entorno y nota cómo estás ahora.",
    ],
  },
  {
    id: "pausa-amable",
    title: "Pausa amable",
    shortDescription: "Una práctica original de Calmavibe para bajar exigencia durante un minuto.",
    category: "autocompasion",
    durationMinutes: 1,
    guidance: [
      "Detén por un momento la necesidad de resolverlo todo.",
      "Pregúntate: ¿qué sería un poco más amable conmigo durante los próximos diez minutos?",
      "Elige una sola cosa pequeña y posible.",
    ],
  },
];

export const mindfulnessCategories: Array<{
  id: MindfulnessCategory | "todas";
  label: string;
}> = [
  { id: "todas", label: "Todas" },
  { id: "respiracion", label: "Respiración" },
  { id: "cuerpo", label: "Cuerpo" },
  { id: "sentidos", label: "Sentidos" },
  { id: "pensamientos", label: "Pensamientos" },
  { id: "emociones", label: "Emociones" },
  { id: "presencia", label: "Presencia" },
  { id: "autocompasion", label: "Autocompasión" },
  { id: "regulacion", label: "Regulación" },
  { id: "reflexion", label: "Reflexión" },
];
