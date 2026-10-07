import HeroBackdrop from "@/components/HeroBackdrop";
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
    <section className="relative isolate w-full overflow-hidden pt-20" aria-labelledby="hero-name">
      <div className="relative">
        <HeroBackdrop />
        <div className="mx-auto grid min-h-[calc(100svh-5rem)] w-full max-w-6xl items-center gap-6 px-6 py-8 md:px-10 md:py-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-8 lg:py-0">
          <HeroPortrait />
          <div className="relative z-10 min-w-0 max-w-2xl lg:py-16">
            <HeroIntro />
            <HeroProfileLinks {...props} />
          </div>
        </div>
      </div>
    </section>
  );
}
