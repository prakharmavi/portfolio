import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

import AskMeInput from "@/components/AskMeInput";
import ContactModalTrigger from "@/components/ContactModalTrigger";
import PronunciationButton from "@/components/PronunciationButton";

export default function HeroIntro() {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-gray-500">
        Hi, I&apos;m
      </p>
      <h1 className="mt-3 font-display text-6xl font-semibold leading-[0.88] tracking-[-0.055em] text-gray-900 sm:text-7xl lg:text-[5.5rem] xl:text-8xl">
        Prakhar Mavi
      </h1>
      <div className="mt-3">
        <PronunciationButton
          text="Pruh-khur Maa-vee"
          phonetic="Pruh-khur Maa-vee"
          audioSrc="/pronunciation.mp3"
        />
      </div>
      <p className="mt-7 max-w-xl text-xl leading-relaxed text-gray-600 md:text-2xl">
        I build web and mobile apps that feel quick, make sense, and keep
        working once people actually start using them.
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-2.5">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 bg-gray-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          See my work
          <LuArrowRight className="size-4" aria-hidden />
        </Link>
        <Link
          href="/#about"
          className="inline-flex items-center border-b border-gray-900 pb-1 text-sm font-medium text-gray-900 transition-colors hover:border-gray-400 hover:text-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          About me
        </Link>
        <ContactModalTrigger>
          <button
            type="button"
            className="inline-flex items-center border-b border-gray-900 pb-1 text-sm font-medium text-gray-900 transition-colors hover:border-gray-400 hover:text-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2"
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
