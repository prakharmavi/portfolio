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
    <section className="min-h-dvh w-full px-6 pb-12 pt-28 md:px-10 md:pb-16 md:pt-32 lg:flex lg:items-center">
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.6fr)] lg:items-stretch">
        <div className="flex flex-col justify-center py-2 lg:py-4">
          <HeroIntro />
          <HeroProfileLinks {...props} />
        </div>

        <HeroPortrait />
      </div>
    </section>
  );
}
