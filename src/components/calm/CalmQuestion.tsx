import type { ReactNode } from "react";

export default function CalmQuestion({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="mx-auto w-full max-w-3xl">
      {eyebrow && (
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#D8C27A]/75">
          {eyebrow}
        </p>
      )}
      <h1 className="text-3xl font-light leading-tight tracking-[-0.03em] text-white sm:text-4xl">
        {title}
      </h1>
      {description && (
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60 sm:text-base">
          {description}
        </p>
      )}
      <div className="mt-7">{children}</div>
    </section>
  );
}
