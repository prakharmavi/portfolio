import Image from "next/image";

export default function HeroPortrait() {
  return (
    <div className="relative min-h-[28rem] overflow-hidden lg:min-h-full">
      <Image
        src="/images/software-developer-portfolio-image--t3chat--1.jpg"
        alt="Prakhar Mavi"
        fill
        priority
        sizes="(min-width: 1024px) 22vw, 100vw"
        className="object-cover object-center"
      />
    </div>
  );
}
