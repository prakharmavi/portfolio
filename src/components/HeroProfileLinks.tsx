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
    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
      <Link
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub profile"
        className="inline-flex items-center gap-2 border-b border-gray-300 pb-1 text-sm font-medium text-gray-700 hover:border-gray-900 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <LuGithub className="size-4" aria-hidden />
        <span>GitHub</span>
      </Link>
      <Link
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn profile"
        className="inline-flex items-center gap-2 border-b border-gray-300 pb-1 text-sm font-medium text-gray-700 hover:border-gray-900 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <LuLinkedin className="size-4" aria-hidden />
        <span>LinkedIn</span>
      </Link>
      <Link
        href={discordUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Discord profile"
        className="inline-flex items-center gap-2 border-b border-gray-300 pb-1 text-sm font-medium text-gray-700 hover:border-gray-900 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <SiDiscord className="size-4" aria-hidden />
        <span>Discord</span>
      </Link>
    </div>
  );
}
