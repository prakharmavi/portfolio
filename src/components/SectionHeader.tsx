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
      <span className="text-xs md:text-[13px] uppercase tracking-wide text-gray-500">{label}</span>
      <h2 className="mt-1 text-2xl md:text-3xl font-semibold text-gray-900">{title}</h2>
      {description ? (
        <p className="mt-2 text-sm md:text-base text-gray-600 max-w-prose">{description}</p>
      ) : null}
    </header>
  );
}
