import Image from "next/image";

export default function HeroPortrait() {
  return (
    <div className="relative aspect-[4/5] w-20 overflow-hidden [mask-image:linear-gradient(to_bottom,black_80%,transparent)] lg:order-last lg:aspect-auto lg:h-full lg:min-h-[34rem] lg:w-full lg:self-end lg:overflow-visible lg:[mask-image:none]">
      <Image
        src="/images/prakhar-hero-cutout.png"
        alt="Prakhar Mavi"
        fill
        priority
        sizes="(min-width: 1152px) 550px, (min-width: 1024px) 48vw, 80px"
        className="object-contain object-bottom lg:origin-bottom lg:scale-110"
      />
    </div>
  );
}
