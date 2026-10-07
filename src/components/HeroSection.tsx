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
    <section aria-labelledby="hero-heading" className="w-full overflow-hidden bg-black">
      <div className="relative isolate min-h-svh">
        <div className="pointer-events-none relative z-10 mx-auto w-full max-w-6xl px-6 pt-32 pb-8 md:px-10 md:pt-36 lg:flex lg:min-h-svh lg:items-center lg:pb-16">
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
