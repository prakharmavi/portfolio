import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

import AskMeInput from "@/components/AskMeInput";
import ContactModalTrigger from "@/components/ContactModalTrigger";
import PronunciationButton from "@/components/PronunciationButton";

export default function HeroIntro() {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
        Software developer · Web &amp; mobile
      </p>
      <h1 id="hero-heading" className="mt-5 font-display text-[clamp(2rem,9vw,3.5rem)] font-semibold leading-[1] tracking-[-0.045em] text-foreground lg:text-[clamp(3.5rem,6.5vw,5.5rem)]">
        Prakhar <span className="lg:block">Mavi.</span>
      </h1>
      <div className="mt-4">
        <PronunciationButton
          text="Pruh-khur Maa-vee"
          phonetic="Pruh-khur Maa-vee"
          audioSrc="/pronunciation.mp3"
        />
      </div>
      <p className="mt-6 max-w-sm text-base leading-relaxed text-muted-foreground sm:text-lg">
        I build fast, intuitive web and mobile apps that hold up in everyday use.
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-3">
        <Link
          href="/#projects"
          className="inline-flex min-h-12 items-center gap-3 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          See my work
          <LuArrowRight className="size-4" aria-hidden />
        </Link>
        <ContactModalTrigger>
          <button
            type="button"
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-border px-5 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Contact
          </button>
        </ContactModalTrigger>
      </div>

      <div className="mt-8 max-w-sm border-t border-border/60 pt-5">
        <p className="mb-3 text-xs font-medium text-muted-foreground">
          Curious about my work? Ask a question.
        </p>
        <AskMeInput appearance="quiet" />
      </div>
    </div>
  );
}
