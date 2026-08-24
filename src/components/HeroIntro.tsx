import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

import AskMeInput from "@/components/AskMeInput";
import ContactModalTrigger from "@/components/ContactModalTrigger";
import PronunciationButton from "@/components/PronunciationButton";

export default function HeroIntro() {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-gray-500">
        Hi, I&apos;m
      </p>
      <h1 className="mt-2 font-display text-5xl font-semibold leading-[0.95] tracking-tight text-gray-900 text-3d sm:text-6xl lg:text-[4rem] xl:text-7xl">
        Prakhar Mavi
      </h1>
      <div className="mt-3">
        <PronunciationButton
          text="Pruh-khur Maa-vee"
          phonetic="Pruh-khur Maa-vee"
          audioSrc="/pronunciation.mp3"
        />
      </div>
      <p className="mt-5 max-w-prose text-lg leading-relaxed text-gray-600">
        I build web and mobile apps. I care about quick response
        times and simple systems that hold up when real people use them.
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-2.5">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 rounded-full bg-gray-800 px-4 py-2.5 text-sm text-white focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          See my work
          <LuArrowRight className="size-4" aria-hidden />
        </Link>
        <Link
          href="/#about"
          className="inline-flex items-center rounded-full bg-gray-800 px-4 py-2.5 text-sm text-white focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          About me
        </Link>
        <ContactModalTrigger>
          <button
            type="button"
            className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2"
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
