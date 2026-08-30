import {
  MoonStar,
  ArrowRight,
} from "lucide-react";

export default function SidebarRefuge() {
  return (
    <section
      className="
        group
        relative
        mx-4
        mt-5
        overflow-hidden
        rounded-[16px]
        border
        border-white/[0.08]
        bg-[#101813]/80
        px-4
        py-4
        shadow-[0_14px_40px_rgba(0,0,0,0.22)]
        backdrop-blur-3xl
        transition-all
        duration-300
        hover:border-[#B8D49A]/15
        hover:bg-[#121C15]/90
      "
    >
      {/* Acento lateral */}

      <div
        className="
          absolute
          bottom-4
          left-0
          top-4
          w-[2px]
          rounded-r-full
          bg-gradient-to-b
          from-transparent
          via-[#A9C982]/50
          to-transparent
        "
      />

      {/* Luz ambiental */}

      <div
        className="
          pointer-events-none
          absolute
          -right-8
          -top-8
          h-24
          w-24
          rounded-full
          bg-[#A9C982]/10
          blur-3xl
        "
      />

      {/* Encabezado */}

      <div className="relative flex items-center gap-3">

        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-[11px]
            border
            border-[#CBE7A5]/10
            bg-gradient-to-br
            from-[#31543B]
            to-[#213528]
            shadow-[inset_0_1px_8px_rgba(203,231,165,0.08)]
          "
        >
          <MoonStar
            size={17}
            strokeWidth={1.6}
            className="text-[#D3E7B0]"
          />
        </div>

        <h3
          className="
            text-[15px]
            font-semibold
            tracking-[-0.01em]
            text-white
          "
        >
          Modo Refugio
        </h3>

      </div>

      {/* Descripción + acceso */}

      <div
        className="
          relative
          mt-4
          flex
          items-end
          justify-between
          gap-3
        "
      >
        <p
          className="
            max-w-[155px]
            text-[12px]
            leading-6
            text-white/55
          "
        >
          Un espacio para respirar y volver a ti.
        </p>

        <button
          type="button"
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-[11px]
            border
            border-white/[0.08]
            bg-white/[0.055]
            text-white/65
            shadow-[0_5px_15px_rgba(0,0,0,0.16)]
            transition-all
            duration-200
            hover:border-[#CBE7A5]/20
            hover:bg-[#CBE7A5]/10
            hover:text-[#DCECC0]
            active:scale-90
          "
        >
          <ArrowRight
            size={15}
            strokeWidth={1.6}
          />
        </button>
      </div>

    </section>
  );
}