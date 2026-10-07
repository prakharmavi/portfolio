import HeroIntro from "@/components/HeroIntro";
import HeroPortrait from "@/components/HeroPortrait";
import HeroProfileLinks from "@/components/HeroProfileLinks";

type HeroSectionProps = {
  githubUrl: string;
  linkedinUrl: string;
  discordUrl: string;
};

export default function HeroSection(props: HeroSectionProps) {
  return (
    <section aria-labelledby="hero-heading" className="w-full overflow-hidden bg-black pt-20">
      <div className="relative isolate min-h-[calc(100svh-5rem)]">
        <div className="pointer-events-none relative z-10 mx-auto w-full max-w-6xl px-6 pt-12 pb-8 md:px-10 md:pt-16 lg:flex lg:min-h-[calc(100svh-5rem)] lg:items-center lg:py-16">
          <div className="pointer-events-auto max-w-xl lg:w-[54%] lg:max-w-none lg:pr-8">
            <HeroIntro />
            <HeroProfileLinks {...props} />
          </div>
        </div>
        <HeroPortrait />
      </div>
    </section>
  );
}
