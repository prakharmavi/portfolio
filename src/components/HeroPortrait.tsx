import Image from "next/image";

export default function HeroPortrait() {
  return (
    <div className="relative min-h-[22rem] overflow-hidden rounded-[28px] lg:min-h-0">
      <Image
        src="/images/software-developer-portfolio-image--t3chat--1.jpg"
        alt="Prakhar Mavi"
        fill
        priority
        sizes="(min-width: 1024px) 22vw, 100vw"
        className="object-cover"
      />
    </div>
  );
}
