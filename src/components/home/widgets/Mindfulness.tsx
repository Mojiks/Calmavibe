import { Flower2 } from "lucide-react";

export default function Mindfulness() {
  return (
    <section
      className="
        h-full
        p-5
        flex
        flex-col
      "
    >
      {/* Encabezado */}

      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        <Flower2
          size={18}
          className="text-[#D8C27A]"
        />

        <h3
          className="
            text-[18px]
            font-semibold
            text-white
          "
        >
          Mindfulness
        </h3>
      </div>

      {/* Experiencia en preparación */}

      <div
        className="
          mt-5
          flex-1
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-white/[0.04]
          p-4
          backdrop-blur-xl
        "
      >
        <div
          className="
            relative
            flex
            h-full
            min-h-[170px]
            items-center
            justify-center
            overflow-hidden
            rounded-xl
            border
            border-white/10
            bg-gradient-to-br
            from-[#D8C27A]/10
            via-white/[0.03]
            to-transparent
          "
        >
          <div
            className="
              absolute
              h-24
              w-24
              rounded-full
              bg-[#D8C27A]/10
              blur-2xl
            "
          />

          <div
            className="
              relative
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              border
              border-[#D8C27A]/30
              bg-black/20
            "
          >
            <Flower2
              size={26}
              strokeWidth={1.4}
              className="text-[#D8C27A]/80"
            />
          </div>

          <span
            className="
              absolute
              bottom-3
              left-3
              text-[9px]
              tracking-[0.18em]
              text-white/25
            "
          >
            CALMAVIBE · EN PREPARACIÓN
          </span>
        </div>
      </div>

      <p
        className="
          mt-3
          text-center
          text-[11px]
          text-white/40
        "
      >
        Próximamente más técnicas.
      </p>
    </section>
  );
}