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

      {/* About */}
      <section
        id="about"
        className="w-full px-6 md:px-10 py-12 md:py-16 scroll-mt-24"
      >
        <div className="max-w-5xl mx-auto space-y-8">
          <article className="relative bg-white border border-gray-200 rounded-[24px] p-6 md:p-8">
            <SectionHeader label="About" title="How I work" />
            <div className="mt-5 space-y-4 text-gray-700">
              <AboutContent />
            </div>
          </article>
        </div>
      </section>

      {/* Projects */}
      <section
        id="projects"
        className="w-full px-6 md:px-10 py-12 md:py-16 scroll-mt-24"
      >
        <div className="max-w-5xl mx-auto">
          <article className="relative bg-white border border-gray-200 rounded-[24px] p-6 md:p-8">
            <SectionHeader
              label="Projects"
              title="Selected work"
              description="Five projects with architecture notes and the decisions behind them."
            />
            <ProjectsGrid />
          </article>
        </div>
      </section>
    </main>
  );
}
