import Layout from "../components/Layout";

const estados = [
  {
    emoji: "🫁",
    titulo: "Ansiedad",
    texto: "Respira. Todo pasará.",
  },
  {
    emoji: "😔",
    titulo: "Tristeza",
    texto: "No tienes que cargar todo tú solo.",
  },
  {
    emoji: "😴",
    titulo: "Insomnio",
    texto: "Tu mente merece descansar.",
  },
  {
    emoji: "💭",
    titulo: "Sobrepensar",
    texto: "No todo pensamiento necesita atención.",
  },
  {
    emoji: "🫂",
    titulo: "Soledad",
    texto: "Aunque no lo parezca, no estás solo.",
  },
];

export default function NoMeSientoBien() {
  return (
    <Layout>
      <div className="min-h-screen px-6 py-20 text-white pb-24">

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light mb-4">
            ¿Cómo te sientes?
          </h1>

          <p className="opacity-80 text-lg">
            Elige lo que más se acerque a lo que sientes ahora mismo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">

          {estados.map((estado) => (
            <button
              key={estado.titulo}
              className="
                bg-black/40
                backdrop-blur-md
                border border-white/10
                rounded-2xl
                p-8
                text-left
                hover:bg-white/10
                hover:scale-[1.02]
                transition-all
                duration-300
                shadow-lg
              "
            >

              <div className="text-5xl mb-4">
                {estado.emoji}
              </div>

              <h2 className="text-2xl mb-2 font-medium">
                {estado.titulo}
              </h2>

              <p className="opacity-80 leading-relaxed">
                {estado.texto}
              </p>

            </button>
          ))}

        </div>

      </div>
    </Layout>
  );
}