import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

import AskMeInput from "@/components/AskMeInput";
import ContactModalTrigger from "@/components/ContactModalTrigger";
import PronunciationButton from "@/components/PronunciationButton";

export default function HeroIntro() {
  return (
    <div>
      <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
        Software developer · Web &amp; mobile
      </p>
      <h1 id="hero-heading" className="mt-5 font-display text-[clamp(3.75rem,8vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.055em] text-foreground">
        Prakhar <span className="lg:block">Mavi.</span>
      </h1>
      <div className="mt-3">
        <PronunciationButton
          text="Pruh-khur Maa-vee"
          phonetic="Pruh-khur Maa-vee"
          audioSrc="/pronunciation.mp3"
        />
      </div>
      <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground sm:text-xl">
        I build web and mobile apps that feel quick, make sense, and keep
        working once people actually start using them.
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-4">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          See my work
          <LuArrowRight className="size-4" aria-hidden />
        </Link>
        <Link
          href="/#about"
          className="inline-flex items-center border-b border-foreground pb-1 text-sm font-medium text-foreground transition-colors hover:border-border hover:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          About me
        </Link>
        <ContactModalTrigger>
          <button
            type="button"
            className="inline-flex items-center border-b border-foreground pb-1 text-sm font-medium text-foreground transition-colors hover:border-border hover:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Contact
          </button>
        </ContactModalTrigger>
      </div>

      <div className="mt-4 max-w-sm">
        <AskMeInput />
      </div>
    </div>
  );
}
