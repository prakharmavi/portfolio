import Image from "next/image";

export default function HeroPortrait() {
  return (
    <div className="relative -z-10 h-[28rem] overflow-hidden sm:h-[36rem] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[52%]">
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
