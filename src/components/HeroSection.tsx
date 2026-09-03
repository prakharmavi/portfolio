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
    <section className="min-h-dvh w-full pt-20 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(22rem,40vw)]">
      <div className="flex px-6 py-16 md:px-10 md:py-24 lg:items-center lg:py-28 lg:pl-[max(2.5rem,calc((100vw-72rem)/2))] lg:pr-16">
        <div className="max-w-2xl">
          <HeroIntro />
          <HeroProfileLinks {...props} />
        </div>
      </div>
      <HeroPortrait />
    </section>
  );
}
