export default function CalmScale({
  value,
  onChange,
  label = "Intensidad",
}: {
  value: number;
  onChange: (value: number) => void;
  label?: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/30 p-5 backdrop-blur-2xl sm:p-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm text-white/60">{label}</p>
          <p className="mt-1 text-xs text-white/35">0 = nada · 10 = muchísimo</p>
        </div>
        <span className="text-4xl font-light text-white">{value}</span>
      </div>

      <input
        aria-label={`${label}: ${value} de 10`}
        type="range"
        min={0}
        max={10}
        step={1}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-6 w-full accent-[#A9C982]"
      />

      <div className="mt-2 flex justify-between text-[10px] text-white/35">
        <span>0</span>
        <span>5</span>
        <span>10</span>
      </div>
    </div>
  );
}
