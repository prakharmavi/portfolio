import Link from "next/link";
import { LuGithub, LuLinkedin } from "react-icons/lu";
import { SiDiscord } from "react-icons/si";

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
    <div className="mt-7 flex flex-wrap items-center gap-3">
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
  );
}
