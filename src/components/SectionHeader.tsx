"use client";

type Props = {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeader({ label, title, description, align = "left", className }: Props) {
  return (
    <header className={`flex flex-col ${align === "center" ? "items-center text-center" : "items-start"} ${className ?? ""}`}>
      <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
      <h2 className="mt-3 font-display text-4xl font-semibold leading-[0.92] tracking-[-0.04em] text-foreground md:text-5xl">{title}</h2>
      {description ? (
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">{description}</p>
      ) : null}
    </header>
  );
}
