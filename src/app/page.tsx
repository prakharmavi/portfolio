import Image from "next/image";
import Link from "next/link";
import { LuGithub, LuLinkedin, LuArrowRight } from "react-icons/lu";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiDiscord,
  SiReact,
  SiNodedotjs,
  SiPrisma,
  SiPostgresql,
  SiExpress,
  SiSwift,
} from "react-icons/si";
import PronunciationButton from "../components/PronunciationButton";
import { RainbowButton } from "@/components/ui/rainbow-button";
import SectionHeader from "../components/SectionHeader";
import AboutContent from "@/content/about/content.mdx";
import ProjectsGrid from "@/components/ProjectsGrid";
import ContactModalTrigger from "@/components/ContactModalTrigger";

export default async function Home() {
  const GITHUB_URL =
    process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/prakharmavi";
  const LINKEDIN_URL =
    process.env.NEXT_PUBLIC_LINKEDIN_URL ??
    "https://www.linkedin.com/in/prakharmavi";
  const DISCORD_URL =
    process.env.NEXT_PUBLIC_DISCORD_URL ??
    "https://discord.com/users/parkermavi";
  // const EMAIL = process.env.NEXT_PUBLIC_EMAIL ?? "hello@prakhar.ca";

  return (
    <main className="min-h-dvh w-full">
      {/* Hero */}
      <section className="min-h-dvh w-full flex items-center pt-12 md:pt-20">
        <div className="mx-auto w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 items-center gap-10 md:gap-12 px-6 md:px-10">
          {/* Content left taking 2/3 on desktop */}
          <div className="md:col-span-2 flex items-center">
            <div className="w-full max-w-2xl">
              <p className="text-xs md:text-sm text-gray-500 tracking-wide uppercase">
                Hi, I’m
              </p>
              <h1 className="mt-2 text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-gray-900 leading-[0.95] text-3d">
                Prakhar Mavi
              </h1>
              <div className="mt-3">
                <PronunciationButton
                  text="Pruh-khur Maa-vee"
                  phonetic="Pruh-khur Maa-vee"
                  audioSrc="/pronunciation.mp3"
                />
              </div>
              <p className="mt-5 text-lg md:text-xl text-gray-600 leading-relaxed max-w-prose">
                Software developer turning ideas into fast, user‑friendly apps.
              </p>

              <div className="mt-7 flex items-center gap-3">
                <Link
                  href="/#projects"
                  className="inline-flex items-center gap-2 rounded-full bg-gray-800 text-white px-5 py-2.5 text-sm md:text-base hover:bg-gray-900 focus:outline-hidden"
                >
                  View Projects
                  <LuArrowRight className="size-4" aria-hidden />
                </Link>
                <Link
                  href="/#about"
                  className="inline-flex items-center gap-2 rounded-full bg-gray-800 text-white px-5 py-2.5 text-sm md:text-base hover:bg-gray-900 focus:outline-hidden"
                >
                  About Me
                </Link>
                <ContactModalTrigger>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm md:text-base text-gray-800 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 focus:outline-hidden"
                  >
                    Contact
                  </button>
                </ContactModalTrigger>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3 text-gray-600">
                <span className="text-xs">Core:</span>
                <SiReact className="size-5" title="React / React Native" />
                <SiNextdotjs className="size-5" title="Next.js" />
                <SiTypescript className="size-5" title="TypeScript" />
                <SiNodedotjs className="size-5" title="Node.js" />
                <SiExpress className="size-5" title="Express" />
                <SiPrisma className="size-5" title="Prisma" />
                <SiPostgresql className="size-5" title="PostgreSQL" />
                <SiTailwindcss className="size-5" title="Tailwind CSS" />
                <SiSwift className="size-5" title="Swift (iOS)" />
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub (prakharmavi)"
                  title="GitHub (prakharmavi)"
                  className="inline-flex items-center justify-center size-10 rounded-full bg-[#24292F] text-white shadow-sm hover:brightness-110 focus:outline-hidden"
                >
                  <LuGithub className="size-4" aria-hidden />
                </Link>
                <Link
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn (prakharmavi)"
                  title="LinkedIn (prakharmavi)"
                  className="inline-flex items-center justify-center size-10 rounded-full bg-[#0A66C2] text-white shadow-sm hover:brightness-110 focus:outline-hidden"
                >
                  <LuLinkedin className="size-4" aria-hidden />
                </Link>
                <Link
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Discord (parkermavi)"
                  title="Discord (parkermavi)"
                  className="inline-flex items-center justify-center size-10 rounded-full bg-[#5865F2] text-white shadow-sm hover:brightness-110 focus:outline-hidden"
                >
                  <SiDiscord className="size-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div className="flex items-center justify-center md:justify-end w-full">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
              <Image
                src="/images/software-developer-portfolio-image--t3chat--1.jpg"
                alt="Prakhar Mavi - Software Developer"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About + Tech Stack */}
      <section
        id="about"
        className="w-full px-6 md:px-10 py-12 md:py-16 scroll-mt-24"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <article className="relative bg-white border border-gray-200 rounded-[24px] p-6 md:p-8">
            <SectionHeader label="About" title="A bit about me" />
            <div className="mt-5 space-y-4 text-gray-700">
              <AboutContent />
            </div>
            <div className="mt-6 flex items-center justify-end">
              <RainbowButton asChild size="lg" className="rounded-full">
                <Link
                  href="/about/notes/tech-stack"
                  aria-label="See full tech notes"
                >
                  Full tech notes
                </Link>
              </RainbowButton>
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
              description="A few things I’ve built and shipped. Click a card to read the story."
            />
            <ProjectsGrid />
          </article>
        </div>
      </section>

    </main>
  );
}
