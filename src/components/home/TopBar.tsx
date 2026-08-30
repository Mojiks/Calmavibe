import { Search, Smile } from "lucide-react";

export default function TopBar() {
  return (
    <header
      className="
        mb-6
        flex
        items-center
        justify-between
        gap-6
      "
    >
      {/* Izquierda */}

      <div
        className="
          flex
          items-center
          gap-3
          text-white/90
        "
      >
        <span className="text-lg">🌿</span>

        <span
          className="
            text-[17px]
            font-light
          "
        >
          Hola, qué bueno verte por aquí
        </span>
      </div>

      {/* Derecha */}

      <div
        className="
          flex
          items-center
          gap-4
        "
      >
        {/* Buscador */}

        <div
          className="
            flex
            h-14
            w-[330px]
            items-center
            gap-3
            rounded-full
            border
            border-white/10
            bg-white/5
            px-5
            backdrop-blur-2xl
          "
        >
          <Search
            size={18}
            className="text-white/35"
          />

          <input
            type="text"
            placeholder="¿Cómo llegaste hoy?"
            className="
              w-full
              bg-transparent
              text-[16px]
              text-white
              outline-none
              placeholder:text-white/35
            "
          />
        </div>

        {/* Botón */}

        <button
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            bg-[#E6C58A]
            text-[#5D4A2E]
            shadow-lg
            transition-all
            hover:scale-105
          "
        >
          <Smile size={20} />
        </button>
      </div>
    </header>
  );
}