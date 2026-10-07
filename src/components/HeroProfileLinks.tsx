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
    <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1">
      <Link
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub profile"
        className="inline-flex min-h-11 items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <LuGithub className="size-4" aria-hidden />
        <span>GitHub</span>
      </Link>
      <Link
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn profile"
        className="inline-flex min-h-11 items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <LuLinkedin className="size-4" aria-hidden />
        <span>LinkedIn</span>
      </Link>
      <Link
        href={discordUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Discord profile"
        className="inline-flex min-h-11 items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <SiDiscord className="size-4" aria-hidden />
        <span>Discord</span>
      </Link>
    </div>
  );
}
