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
  patternTitle?: string;
  patternDescription?: string;
  patterns: Array<{ id: CalmPattern; label: string }>;
};

export const emotionalRoutes: CalmRoute[] = [
  {
    id: "ansiedad",
    label: "Ansiedad",
    description: "La preocupación, la inquietud o la sensación de alerta me cuesta bajarlas.",
    patternTitle: "¿Qué pasa por tu mente?",
    patternDescription: "Aquí no hay respuestas correctas. Elige lo que más se identifique con lo que estás viviendo.",
    patterns: [
      { id: "pensamiento", label: "Mi mente va muy rápido" },
      { id: "cuerpo", label: "Lo siento mucho en mi cuerpo" },
      { id: "anticipacion", label: "Me preocupa que algo malo pueda pasar" },
      { id: "pensamiento", label: "No puedo dejar de pensar" },
      { id: "sin-patron", label: "No sé exactamente qué pasa" },
      { id: "anticipacion", label: "Siento que necesito resolverlo todo ahora" },
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
    description: "Siento que las demandas del día me están sobrepasando.",
    patternTitle: "¿Cómo se está manifestando en ti?",
    patternDescription: "El estrés puede aparecer cuando sentimos que las demandas de la vida superan los recursos que tenemos para afrontarlas. Se puede manifestar en nuestra mente, cuerpo o forma de actuar.",
    patterns: [
      { id: "cuerpo", label: "Mi cuerpo está tenso" },
      { id: "cuerpo", label: "Tengo tensión en el cuello, los hombros o la mandíbula" },
      { id: "pensamiento", label: "Sigo alerta aunque debería estar descansando" },
      { id: "sin-patron", label: "Estoy agotado/a incluso después de descansar" },
      { id: "critica", label: "Me estoy exigiendo demasiado" },
      { id: "sin-patron", label: "Solo necesito bajar el ritmo" },
    ],
  },
  {
    id: "tristeza",
    label: "Tristeza",
    description: "La tristeza puede sentirse en mis pensamientos, mi cuerpo o mi día a día.",
    patternTitle: "¿Cómo estás viviendo lo que sientes?",
    patternDescription: "La tristeza puede sentirse de muchas formas. Elige lo que más identifique a lo que estás sintiendo.",
    patterns: [
      { id: "soledad", label: "Me siento solo/a" },
      { id: "cuerpo", label: "Siento un peso en el cuerpo" },
      { id: "sin-patron", label: "He perdido el interés en cosas que antes disfrutaba" },
      { id: "sin-patron", label: "Siento que todo me cuesta más de lo normal" },
      { id: "pensamiento", label: "No dejo de pensar en lo que pasó" },
      { id: "sin-patron", label: "No sé qué necesito" },
    ],
  },
  {
    id: "miedo",
    label: "Miedo",
    description: "Siento miedo o percibo una amenaza de la que necesito protegerme.",
    patternTitle: "¿Cómo se siente el miedo en ti?",
    patternDescription: "Observa qué está pasando en tu mente y en tu cuerpo, sin exigirte encontrar respuestas.",
    patterns: [
      { id: "anticipacion", label: "Estoy anticipando lo peor" },
      { id: "anticipacion", label: "Siento que algo malo va a pasar" },
      { id: "cuerpo", label: "Mi cuerpo está en alerta" },
      { id: "pensamiento", label: "No puedo dejar de imaginar que algo malo va a pasar" },
      { id: "sin-patron", label: "Siento que necesito escapar de lo que estoy sintiendo" },
      { id: "anticipacion", label: "Me cuesta sentirme tranquilo/a aunque sé que estoy a salvo" },
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
