// src/components/Background.tsx

export default function Background() {
  const particles = [
    { left: "8%", top: "18%", delay: "0s", size: 4 },
    { left: "18%", top: "72%", delay: "2s", size: 3 },
    { left: "31%", top: "28%", delay: "4s", size: 5 },
    { left: "47%", top: "12%", delay: "1s", size: 3 },
    { left: "58%", top: "68%", delay: "5s", size: 5 },
    { left: "69%", top: "34%", delay: "3s", size: 3 },
    { left: "79%", top: "76%", delay: "6s", size: 4 },
    { left: "91%", top: "23%", delay: "2s", size: 3 },

    { left: "14%", top: "42%", delay: "7s", size: 3 },
    { left: "26%", top: "58%", delay: "3s", size: 5 },
    { left: "39%", top: "76%", delay: "5s", size: 3 },
    { left: "52%", top: "45%", delay: "8s", size: 5 },
    { left: "64%", top: "20%", delay: "4s", size: 3 },
    { left: "73%", top: "60%", delay: "1s", size: 4 },
    { left: "84%", top: "40%", delay: "6s", size: 3 },
    { left: "94%", top: "70%", delay: "3s", size: 5 },
  ];

  return (
    <div
      className="
        fixed
        inset-0
        overflow-hidden
        pointer-events-none
        z-0
      "
    >
      {/* =====================================================
          FONDO PRINCIPAL
      ===================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-cover
          bg-center
          bg-no-repeat
        "
        style={{
          backgroundImage: "url('/images/backgrounds/fondo.png')",
        }}
      />

      {/* =====================================================
          OSCURECIMIENTO
      ===================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-black/25
        "
      />

      {/* =====================================================
          DEGRADADO INFERIOR
      ===================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-black/5
          via-transparent
          to-black/50
        "
      />

      {/* =====================================================
          DEGRADADO LATERAL
      ===================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-black/30
          via-transparent
          to-black/10
        "
      />

      {/* =====================================================
          DESTELLO VERDE
      ===================================================== */}

      <div
        className="
          absolute
          left-[25%]
          top-[35%]
          h-[420px]
          w-[420px]
          rounded-full
          bg-[#A8D477]/20
          blur-[105px]
          animate-[calmaGlow1_8s_ease-in-out_infinite]
        "
      />

      {/* =====================================================
          DESTELLO DORADO
      ===================================================== */}

      <div
        className="
          absolute
          right-[4%]
          top-[10%]
          h-[480px]
          w-[480px]
          rounded-full
          bg-[#F2C66D]/22
          blur-[115px]
          animate-[calmaGlow2_7s_ease-in-out_infinite]
        "
      />

      {/* =====================================================
          BRILLO INFERIOR VERDE
      ===================================================== */}

      <div
        className="
          absolute
          bottom-[-12%]
          left-[38%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#8FBF9B]/16
          blur-[125px]
          animate-[calmaGlow3_10s_ease-in-out_infinite]
        "
      />

      {/* =====================================================
          DESTELLO CÁLIDO CENTRAL
      ===================================================== */}

      <div
        className="
          absolute
          left-[43%]
          top-[23%]
          h-[320px]
          w-[320px]
          rounded-full
          bg-[#FFE3A3]/18
          blur-[90px]
          animate-[calmaGlow4_6s_ease-in-out_infinite]
        "
      />

      {/* =====================================================
          DESTELLO LATERAL
      ===================================================== */}

      <div
        className="
          absolute
          left-[8%]
          top-[52%]
          h-[260px]
          w-[260px]
          rounded-full
          bg-[#D7A75B]/15
          blur-[85px]
          animate-[calmaGlow5_9s_ease-in-out_infinite]
        "
      />

      {/* =====================================================
          PARTÍCULAS DE LUZ
      ===================================================== */}

      {particles.map((particle, index) => (
        <span
          key={index}
          className="
            absolute
            rounded-full
            bg-[#FFE8A8]
            shadow-[0_0_8px_rgba(255,232,168,.95),0_0_20px_rgba(255,210,120,.75),0_0_38px_rgba(255,190,90,.45)]
            animate-[floatParticle_10s_ease-in-out_infinite]
          "
          style={{
            left: particle.left,
            top: particle.top,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}