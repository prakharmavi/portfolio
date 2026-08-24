import Link from "next/link";
import { LuGithub, LuLinkedin } from "react-icons/lu";
import {
  SiDiscord,
  SiExpress,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiSwift,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

type HeroProfileLinksProps = {
  githubUrl: string;
  linkedinUrl: string;
  discordUrl: string;
};

export default function HeroProfileLinks({
  githubUrl,
  linkedinUrl,
  discordUrl,
}: HeroProfileLinksProps) {
  return (
    <div className="mt-7">
      <div className="flex flex-wrap items-center gap-3 text-gray-600">
        <span className="text-xs">Tools I use</span>
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

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
          className="inline-flex size-10 items-center justify-center rounded-full bg-[#24292F] text-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <LuGithub className="size-4" aria-hidden />
        </Link>
        <Link
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
          className="inline-flex size-10 items-center justify-center rounded-full bg-[#0A66C2] text-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <LuLinkedin className="size-4" aria-hidden />
        </Link>
        <Link
          href={discordUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Discord profile"
          className="inline-flex size-10 items-center justify-center rounded-full bg-[#5865F2] text-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <SiDiscord className="size-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
