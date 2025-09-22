import Image from "next/image";

type AvatarFrameProps = {
  src?: string;
  alt?: string;
  sizeClass?: string; // Tailwind size utility, e.g., "size-36 md:size-44"
  shape?: "circle" | "square"; // Controls container shape
};

export default function AvatarFrame({ src, alt, sizeClass, shape = "circle" }: AvatarFrameProps) {
  const shapeClass = shape === "circle" ? "rounded-full" : "rounded-none";
  return (
    <div
      className={`relative ${sizeClass ?? "size-36 md:size-44"} ${shapeClass} border border-gray-200 bg-gray-50 overflow-hidden shadow-sm`}
      aria-label={alt ?? "3D avatar placeholder"}
    >
      {/* Visual backdrop */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#f8fafc,transparent_55%)]"
        aria-hidden
      />

      {src ? (
        <Image src={src} alt={alt ?? "Avatar"} fill className="object-cover" />
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          <span className="text-xs text-gray-400">Your 3D Avatar</span>
        </div>
      )}
    </div>
  );
}
