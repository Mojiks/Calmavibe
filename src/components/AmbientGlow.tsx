// src/components/AmbientGlow.tsx

export default function AmbientGlow() {
  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        z-[1]
        overflow-hidden
      "
    >
      {/* =========================================
          DESTELLO VERDE
      ========================================= */}

      <div
        className="
          ambient-glow
          ambient-glow-green
          absolute
          left-[25%]
          top-[35%]
          h-[360px]
          w-[360px]
        "
      />

      {/* =========================================
          DESTELLO DORADO
      ========================================= */}

      <div
        className="
          ambient-glow
          ambient-glow-gold
          absolute
          right-[8%]
          top-[12%]
          h-[430px]
          w-[430px]
        "
        style={{
          animationDelay: "-4s",
        }}
      />

      {/* =========================================
          DESTELLO CÁLIDO CENTRAL
      ========================================= */}

      <div
        className="
          ambient-glow
          ambient-glow-warm
          absolute
          left-[48%]
          top-[8%]
          h-[300px]
          w-[300px]
        "
        style={{
          animationDelay: "-7s",
        }}
      />

      {/* =========================================
          BRILLO INFERIOR
      ========================================= */}

      <div
        className="
          ambient-glow
          ambient-glow-green
          absolute
          bottom-[-15%]
          left-[42%]
          h-[460px]
          w-[460px]
        "
        style={{
          animationDelay: "-2s",
        }}
      />

      {/* =========================================
          PEQUEÑO DESTELLO LEJANO
      ========================================= */}

      <div
        className="
          ambient-glow
          ambient-glow-gold
          absolute
          left-[5%]
          top-[15%]
          h-[220px]
          w-[220px]
        "
        style={{
          animationDelay: "-9s",
        }}
      />
    </div>
  );
}