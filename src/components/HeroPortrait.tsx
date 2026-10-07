import Image from "next/image";

export default function HeroPortrait() {
  return (
    <div className="absolute inset-y-0 right-0 -z-10 hidden w-[52%] overflow-hidden lg:block">
      <Image
        src="/images/prakhar-hero-natural-cutout.png"
        alt="Portrait of Prakhar Mavi"
        fill
        priority
        sizes="(min-width: 1024px) 52vw, 100vw"
        className="object-cover object-top"
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background to-transparent" />
    </div>
  );
}
