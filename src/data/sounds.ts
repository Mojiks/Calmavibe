export type SoundTrack = {
  name: string;
  file: string;
  category?: string;
};

export const sounds: SoundTrack[] = [
  { name: "16hz Beta", file: "/sounds/16hzbetabinaural.mp3", category: "Frecuencias" },
  { name: "Cuencos Tibetanos", file: "/sounds/cuencostibetanos.mp3", category: "Meditación" },
  { name: "528Hz", file: "/sounds/frecuenciaambiente528hz.mp3", category: "Frecuencias" },
  { name: "Aliento de Buda", file: "/sounds/alientodebuda.mp3", category: "Meditación" },
  { name: "Sueño Profundo", file: "/sounds/frecuenciasuenoprofundo.mp3", category: "Sueño" },
  { name: "Meditación", file: "/sounds/meditacion.mp3", category: "Meditación" },
  { name: "Cascada", file: "/sounds/meditacionconcascada.mp3", category: "Naturaleza" },
  { name: "Naturaleza Tibetana", file: "/sounds/naturalezatibetana.mp3", category: "Naturaleza" },
  { name: "Océano Cósmico", file: "/sounds/oceanocosmico.mp3", category: "Ambiente" },
  { name: "Sueño Relajante", file: "/sounds/suenorelajante.mp3", category: "Sueño" },
  { name: "Lluvia", file: "/sounds/susurrodelluvia.mp3", category: "Naturaleza" },
  { name: "Tormenta", file: "/sounds/tormentaenigmatica.mp3", category: "Naturaleza" },
];
