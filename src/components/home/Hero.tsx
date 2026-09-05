import dailyQuotes from "../../data/dailyQuotes";

export default function Hero() {
  const quote =
    dailyQuotes[
      Math.floor(Math.random() * dailyQuotes.length)
    ];

  return (
    <div className="min-w-0">
      <h1
        className="
          text-[42px]
          leading-[44px]
          font-extralight
          tracking-[-0.045em]
          text-white
          sm:text-[48px]
          sm:leading-[50px]
          lg:text-[54px]
          lg:leading-[56px]
        "
      >
        La calma
        <br />
        también es
        <br />
        progreso.
      </h1>

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
