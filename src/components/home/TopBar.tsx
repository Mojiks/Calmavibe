import { Search, Smile, Sprout } from "lucide-react";

export default function TopBar() {
  return (
    <header
      className="
        mb-5
        flex
        flex-col
        items-stretch
        gap-4
        lg:mb-6
        lg:flex-row
        lg:items-center
        lg:justify-between
        lg:gap-6
      "
    >
      <div
        className="
          flex
          min-w-0
          items-center
          gap-3
          text-white/90
        "
      >
        <Sprout
          size={18}
          strokeWidth={1.8}
          className="shrink-0 text-[#A7BE84]"
        />

        <span
          className="
            whitespace-nowrap
            text-[16px]
            font-light
            sm:text-[17px]
          "
        >
          Hola, qué bueno verte por aquí
        </span>
      </div>

      <div
        className="
          flex
          w-full
          items-center
          gap-3
          lg:w-auto
          lg:gap-4
        "
      >
        <div
          className="
            flex
            h-12
            min-w-0
            flex-1
            items-center
            gap-3
            rounded-full
            border
            border-white/10
            bg-white/5
            px-4
            backdrop-blur-2xl
            lg:h-14
            lg:w-[330px]
            lg:flex-none
            lg:px-5
          "
        >
          <Search
            size={18}
            className="shrink-0 text-white/35"
          />

          <input
            type="text"
            placeholder="¿Cómo llegaste hoy?"
            className="
              min-w-0
              w-full
              bg-transparent
              text-[15px]
              text-white
              outline-none
              placeholder:text-white/35
              lg:text-[16px]
            "
          />
        </div>

        <button
          type="button"
          aria-label="Estado de ánimo"
          className="
            flex
            h-11
            w-11
            shrink-0
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
