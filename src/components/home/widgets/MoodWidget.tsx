import { Send } from "lucide-react";
import { useState } from "react";

const moods = [
  {
    emoji: "😊",
    label: "Muy bien",
    color: "#7DB26C",
  },
  {
    emoji: "🙂",
    label: "Bien",
    color: "#C8BC53",
  },
  {
    emoji: "😐",
    label: "Regular",
    color: "#E9B24D",
  },
  {
    emoji: "🙁",
    label: "Mal",
    color: "#D66B43",
  },
  {
    emoji: "😢",
    label: "Muy mal",
    color: "#A36BC8",
  },
];

export default function MoodWidget() {
  const [selected, setSelected] = useState<number | null>(null);
  const [text, setText] = useState("");

  const handleSend = () => {
    if (selected === null) return;

        setSelected(null);
    setText("");
  };

  return (
    <div
      className="
        h-full
        flex
        flex-col
      "
    >
      {/* Título */}

      <h3
        className="
          text-[17px]
          font-semibold
          text-white
          text-center
        "
      >
        ¿Cómo llegaste hoy?
      </h3>

      {/* Caritas */}

      <div
        className="
          mt-5
          flex
          justify-center
          gap-4
        "
      >
        {moods.map((mood, index) => (
          <button
            key={mood.label}
            onClick={() => setSelected(index)}
            className="
              flex
              flex-col
              items-center
              transition
              hover:scale-105
            "
          >
            <div
              className={`
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                transition-all
                ${
                  selected === index
                    ? "scale-110 ring-2 ring-white/30"
                    : ""
                }
              `}
              style={{
                background: mood.color,
              }}
            >
              <span className="text-[21px]">
                {mood.emoji}
              </span>
            </div>

            <span
              className="
                mt-2
                text-[11px]
                text-white/85
              "
            >
              {mood.label}
            </span>
          </button>
        ))}
      </div>

      {/* Barra de comentario */}

      <div
        className="
          mt-4
          flex
          items-center
          rounded-full
          bg-white
          px-3
          py-2
        "
      >
        <input
          type="text"
          maxLength={120}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Cuéntanos qué sucede..."
          className="
            flex-1
            bg-transparent
            text-[14px]
            text-[#2A2A2A]
            placeholder:text-[#9A9A9A]
            outline-none
          "
        />

        <button
          onClick={handleSend}
          disabled={selected === null}
          className={`
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            transition
            ${
              selected === null
                ? "bg-[#B7C59B] opacity-50 cursor-not-allowed"
                : "bg-[#839766] hover:bg-[#91A772]"
            }
          `}
        >
          <Send
            size={17}
            className="text-white"
          />
        </button>
      </div>
    </div>
  );
}