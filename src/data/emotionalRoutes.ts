export type CalmEmotion =
  | "ansiedad"
  | "mente-rapida"
  | "estres"
  | "tristeza"
  | "miedo"
  | "enojo"
  | "dolor"
  | "desconexion"
  | "no-se";

export type CalmPattern =
  | "pensamiento"
  | "cuerpo"
  | "anticipacion"
  | "soledad"
  | "critica"
  | "desconexion"
  | "sin-patron";

export type CalmNeed =
  | "calmarme"
  | "desconectarme"
  | "desahogarme"
  | "entender"
  | "moverme"
  | "respirar"
  | "distraerme"
  | "acompanado";

export type CalmRoute = {
  id: CalmEmotion;
  label: string;
  description: string;
  patterns: Array<{ id: CalmPattern; label: string }>;
};

export const emotionalRoutes: CalmRoute[] = [
  {
    id: "ansiedad",
    label: "Ansiedad",
    description: "Siento inquietud, alerta o una sensación difícil de bajar.",
    patterns: [
      { id: "pensamiento", label: "Mi mente va muy rápido" },
      { id: "cuerpo", label: "Lo siento mucho en mi cuerpo" },
      { id: "anticipacion", label: "Tengo miedo de que ocurra algo" },
      { id: "pensamiento", label: "No puedo dejar de pensar" },
      { id: "sin-patron", label: "No sé exactamente qué pasa" },
    ],
  },
  {
    id: "mente-rapida",
    label: "Mi mente no para",
    description: "Hay demasiados pensamientos dando vueltas.",
    patterns: [
      { id: "pensamiento", label: "Estoy dando vueltas a lo mismo" },
      { id: "anticipacion", label: "Estoy imaginando escenarios" },
      { id: "critica", label: "Estoy siendo muy duro/a conmigo" },
      { id: "sin-patron", label: "Tengo demasiadas cosas en la cabeza" },
    ],
  },
  {
    id: "estres",
    label: "Estrés o tensión",
    description: "Siento presión, cansancio o tensión acumulada.",
    patterns: [
      { id: "cuerpo", label: "Mi cuerpo está tenso" },
      { id: "pensamiento", label: "No puedo desconectar" },
      { id: "critica", label: "Me estoy exigiendo demasiado" },
      { id: "sin-patron", label: "Solo necesito bajar el ritmo" },
    ],
  },
  {
    id: "tristeza",
    label: "Tristeza",
    description: "Hay un peso emocional, vacío o ganas de aislarme.",
    patterns: [
      { id: "soledad", label: "Me siento solo/a" },
      { id: "cuerpo", label: "Lo siento como un peso en el cuerpo" },
      { id: "pensamiento", label: "No dejo de pensar en lo que pasó" },
      { id: "sin-patron", label: "No sé qué necesito" },
    ],
  },
  {
    id: "miedo",
    label: "Miedo",
    description: "Algo me preocupa o siento que necesito protegerme.",
    patterns: [
      { id: "anticipacion", label: "Estoy anticipando lo peor" },
      { id: "cuerpo", label: "Mi cuerpo está en alerta" },
      { id: "pensamiento", label: "No puedo dejar de imaginarlo" },
      { id: "sin-patron", label: "Solo necesito sentirme más presente" },
    ],
  },
  {
    id: "enojo",
    label: "Enojo",
    description: "Hay mucha energía, irritación o ganas de reaccionar.",
    patterns: [
      { id: "cuerpo", label: "Lo siento en el cuerpo" },
      { id: "pensamiento", label: "Estoy repasando lo que pasó" },
      { id: "critica", label: "Estoy muy duro/a con alguien o conmigo" },
      { id: "sin-patron", label: "Necesito bajar la intensidad primero" },
    ],
  },
  {
    id: "dolor",
    label: "Algo me lastimó",
    description: "Hay algo que sigue pesando y necesito un poco de espacio.",
    patterns: [
      { id: "pensamiento", label: "No puedo dejar de volver a ello" },
      { id: "soledad", label: "Quiero sentirme acompañado/a" },
      { id: "cuerpo", label: "Lo siento físicamente" },
      { id: "sin-patron", label: "Solo quiero estar un momento" },
    ],
  },
  {
    id: "desconexion",
    label: "Me siento desconectado/a",
    description: "Me cuesta sentirme presente o conectado/a con lo que ocurre.",
    patterns: [
      { id: "desconexion", label: "Todo se siente lejano" },
      { id: "cuerpo", label: "No siento mucho mi cuerpo" },
      { id: "sin-patron", label: "Necesito volver al entorno" },
    ],
  },
  {
    id: "no-se",
    label: "No sé qué siento",
    description: "No necesito ponerle un nombre todavía.",
    patterns: [
      { id: "sin-patron", label: "No puedo identificarlo" },
      { id: "cuerpo", label: "Solo noto algo en mi cuerpo" },
      { id: "pensamiento", label: "Tengo la cabeza llena" },
      { id: "desconexion", label: "Me siento apagado/a o lejos" },
    ],
  },
];

export const needs: Array<{ id: CalmNeed; label: string }> = [
  { id: "calmarme", label: "Calmarme" },
  { id: "desconectarme", label: "Desconectarme un momento" },
  { id: "desahogarme", label: "Desahogarme" },
  { id: "entender", label: "Entender lo que siento" },
  { id: "moverme", label: "Moverme" },
  { id: "respirar", label: "Respirar" },
  { id: "distraerme", label: "Distraerme" },
  { id: "acompanado", label: "Simplemente estar acompañado/a" },
];
