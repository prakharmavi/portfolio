"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuMenu, LuX } from "react-icons/lu";

import ContactModalTrigger from "@/components/ContactModalTrigger";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname.startsWith("/projects/")) return null;

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full border-b border-gray-200 bg-white/95 text-sm backdrop-blur">
      <nav className="relative mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between px-6 py-4 md:flex-nowrap md:px-10">
        <Link
          className="inline-flex flex-none items-baseline font-display text-xl font-semibold tracking-tight text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2"
          href="/"
          aria-label="prakhar — home"
          onClick={() => setOpen(false)}
        >
          <span className="leading-none">prakhar</span>
        </Link>

        <button
          type="button"
          className="flex size-9.5 items-center justify-center text-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 md:hidden"
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
          <div className="mt-3 flex flex-col gap-2 border-t border-gray-200 py-3 md:mt-0 md:flex-row md:items-center md:gap-5 md:border-t-0 md:py-0 md:ps-7">
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
              <button
                type="button"
                className="bg-gray-900 px-4 py-2 text-left text-white hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2"
                onClick={() => setOpen(false)}
              >
                Contact
              </button>
            </ContactModalTrigger>
          </div>
        </div>
      </nav>
    </header>
  );
}
