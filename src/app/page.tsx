import SectionHeader from "@/components/SectionHeader";
import AboutContent from "@/content/about/content.mdx";
import ProjectsGrid from "@/components/ProjectsGrid";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";

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
    <>
      <Navbar />
      <main className="min-h-dvh w-full">
        <HeroSection
          githubUrl={GITHUB_URL}
          linkedinUrl={LINKEDIN_URL}
          discordUrl={DISCORD_URL}
        />

        <section
          id="about"
          className="scroll-mt-28 border-t border-border/60 py-14 md:py-24"
        >
          <div className="mx-auto grid max-w-6xl gap-7 px-6 md:px-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <SectionHeader label="About" title="How I work" />
            </div>
            <div className="max-w-[58ch] space-y-5 text-base leading-relaxed text-muted-foreground [&>p:first-child]:text-foreground md:text-lg lg:col-span-7 lg:col-start-6">
              <AboutContent />
            </div>
          </div>
        </section>

        <section
          id="projects"
          className="scroll-mt-28 border-t border-border/60 py-14 md:py-24"
        >
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <SectionHeader
              label="Projects / 05"
              title="Selected work"
              description="Five projects, with the product decisions and implementation details that screenshots miss."
            />
            <ProjectsGrid />
          </div>
        </section>
        <section id="contact" className="scroll-mt-28 border-t border-border/60 py-14 md:py-24">
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <SectionHeader label="Contact" title="Let’s talk." />
            <a
              href={`mailto:${process.env.NEXT_PUBLIC_EMAIL ?? "hello@prakhar.ca"}`}
              className="inline-flex min-h-11 items-center text-lg text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              {process.env.NEXT_PUBLIC_EMAIL ?? "hello@prakhar.ca"}
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
