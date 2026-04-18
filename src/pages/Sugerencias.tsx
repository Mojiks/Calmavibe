export default function Sugerencias() {
  return (
    <div className="flex items-center justify-center h-full text-white">
      <div className="bg-black/60 p-6 rounded-xl backdrop-blur-md text-center">
        <h2 className="text-xl mb-2">Sugerencias</h2>
        <p className="text-sm text-white/70">
          ¿Tienes alguna idea o mejora?
        </p>

        <a
          href="mailto:calmavibe.app@gmail.com"
          className="mt-4 inline-block px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30"
        >
          Enviar sugerencia
        </a>
      </div>
    </div>
  );
}