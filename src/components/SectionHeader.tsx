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
      <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-[-0.035em] text-foreground md:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-4 max-w-[48ch] text-base leading-relaxed text-muted-foreground md:text-lg">{description}</p>
      ) : null}
    </header>
  );
}
