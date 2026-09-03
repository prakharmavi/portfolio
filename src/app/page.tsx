import SectionHeader from "../components/SectionHeader";
import AboutContent from "@/content/about/content.mdx";
import ProjectsGrid from "@/components/ProjectsGrid";
import HeroSection from "@/components/HeroSection";

export default async function Home() {
  const GITHUB_URL =
    process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/prakharmavi";
  const LINKEDIN_URL =
    process.env.NEXT_PUBLIC_LINKEDIN_URL ??
    "https://www.linkedin.com/in/prakharmavi";
  const DISCORD_URL =
    process.env.NEXT_PUBLIC_DISCORD_URL ??
    "https://discord.com/users/parkermavi";
  return (
    <main className="min-h-dvh w-full">
      <HeroSection
        githubUrl={GITHUB_URL}
        linkedinUrl={LINKEDIN_URL}
        discordUrl={DISCORD_URL}
      />

      <section
        id="about"
        className="scroll-mt-24 border-t border-gray-900 px-6 py-20 md:px-10 md:py-28"
      >
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeader label="About" title="How I work" />
          </div>
          <div className="max-w-2xl text-lg leading-relaxed text-gray-700 lg:col-span-7 lg:col-start-6">
            <AboutContent />
          </div>
        </div>
      </section>

      <section
        id="projects"
        className="scroll-mt-24 border-t border-gray-900 bg-[#f7f7f4] px-6 py-20 md:px-10 md:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            label="Projects / 05"
            title="Selected work"
            description="Five projects, with the product decisions and implementation details that screenshots miss."
          />
          <ProjectsGrid />
        </div>
      </section>
    </main>
  );
}
