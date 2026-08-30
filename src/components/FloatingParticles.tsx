// src/components/FloatingParticles.tsx

const particles = [
  {
    left: "8%",
    top: "18%",
    delay: "0s",
    duration: "11s",
    size: 3,
  },
  {
    left: "18%",
    top: "72%",
    delay: "2s",
    duration: "14s",
    size: 2,
  },
  {
    left: "31%",
    top: "28%",
    delay: "4s",
    duration: "12s",
    size: 3,
  },
  {
    left: "47%",
    top: "12%",
    delay: "1s",
    duration: "15s",
    size: 2,
  },
  {
    left: "58%",
    top: "68%",
    delay: "5s",
    duration: "13s",
    size: 3,
  },
  {
    left: "69%",
    top: "34%",
    delay: "3s",
    duration: "16s",
    size: 2,
  },
  {
    left: "79%",
    top: "76%",
    delay: "6s",
    duration: "12s",
    size: 3,
  },
  {
    left: "91%",
    top: "23%",
    delay: "2s",
    duration: "15s",
    size: 2,
  },
  {
    left: "12%",
    top: "45%",
    delay: "7s",
    duration: "17s",
    size: 2,
  },
  {
    left: "39%",
    top: "61%",
    delay: "9s",
    duration: "13s",
    size: 2,
  },
  {
    left: "63%",
    top: "20%",
    delay: "4s",
    duration: "18s",
    size: 3,
  },
  {
    left: "86%",
    top: "57%",
    delay: "8s",
    duration: "14s",
    size: 2,
  },
];

export default function FloatingParticles() {
  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        z-[2]
        overflow-hidden
      "
    >
      {particles.map((particle, index) => (
        <span
          key={index}
          className="
            particle
          "
          style={{
            left: particle.left,
            top: particle.top,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}
    </div>
  );
}