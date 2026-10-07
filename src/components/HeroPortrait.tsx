import Image from "next/image";
import HeroDither from "@/components/HeroDither";
import portrait from "../../public/images/cropped.png";

export default function HeroPortrait() {
  return (
    <div className="absolute inset-0 w-full overflow-hidden lg:left-auto lg:w-[42%]">
      <HeroDither />
      <Image
        src={portrait}
        alt="Portrait of Prakhar Mavi"
        fill
        priority
        sizes="(min-width: 1024px) 42vw, 100vw"
        className="pointer-events-none hidden object-cover object-top lg:block"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-black/55 lg:hidden" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 hidden w-40 bg-linear-to-r from-black to-transparent lg:block" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black to-transparent" />
    </div>
  );
}
