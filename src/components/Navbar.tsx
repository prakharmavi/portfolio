"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuMenu, LuX } from "react-icons/lu";

import ContactModalTrigger from "@/components/ContactModalTrigger";
import { RainbowButton } from "@/components/ui/rainbow-button";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname.startsWith("/projects/")) return null;

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full text-sm">
      <nav className="relative mx-6 mt-4 flex w-auto max-w-5xl flex-wrap items-center justify-between rounded-[24px] border border-gray-200 bg-white p-1 ps-4 sm:mx-auto sm:w-full md:flex-nowrap md:py-0">
        <Link
          className="inline-flex flex-none items-baseline rounded-md font-display text-xl font-semibold tracking-tight text-gray-900 text-3d focus-visible:outline-2 focus-visible:outline-offset-2"
          href="/"
          aria-label="prakhar — home"
          onClick={() => setOpen(false)}
        >
          <span className="leading-none">prakhar</span>
        </Link>

        <button
          type="button"
          className="flex size-9.5 items-center justify-center rounded-full border border-gray-200 text-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 md:hidden"
          aria-expanded={open}
          aria-controls="primary-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <LuX className="size-4" aria-hidden /> : <LuMenu className="size-4" aria-hidden />}
        </button>

        <div
          id="primary-navigation"
          className={`${open ? "block" : "hidden"} basis-full md:block md:basis-auto`}
        >
          <div className="mt-3 flex flex-col gap-2 py-2 md:mt-0 md:flex-row md:items-center md:gap-3 md:py-0 md:ps-7">
            <Link
              className="px-4 py-1 text-gray-500 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 md:px-1 md:py-3"
              href="/#about"
              onClick={() => setOpen(false)}
            >
              About
            </Link>
            <Link
              className="px-4 py-1 text-gray-500 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 md:px-1 md:py-3"
              href="/#projects"
              onClick={() => setOpen(false)}
            >
              Projects
            </Link>
            <ContactModalTrigger>
              <RainbowButton asChild size="sm" className="rounded-full">
                <button type="button" aria-label="Contact" onClick={() => setOpen(false)}>
                  Contact
                </button>
              </RainbowButton>
            </ContactModalTrigger>
          </div>
        </div>
      </nav>
    </header>
  );
}
