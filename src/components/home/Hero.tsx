import dailyQuotes from "../../data/dailyQuotes";

export default function Hero() {
  const quote =
    dailyQuotes[
      Math.floor(Math.random() * dailyQuotes.length)
    ];

  return (
    <div>
      {/* Título */}

      <h1
        className="
          text-[54px]
          leading-[56px]
          font-extralight
          tracking-[-0.045em]
          text-white
        "
      >
        La calma
        <br />
        también es
        <br />
        progreso.
      </h1>

      {/* Texto */}

      <p
        className="
          mt-4
          text-[15px]
          font-medium
          text-white
        "
      >
        Respira.
      </p>

      <p
        className="
          mt-1
          max-w-[600px]
          text-[14px]
          leading-6
          text-white/72
        "
      >
        {quote}
      </p>
    </div>
  );
}