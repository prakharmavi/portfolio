import Link from "next/link";

import styles from "@/components/Navbar.module.css";
import NavbarGlassFilter from "@/components/NavbarGlassFilter";

export default function Navbar() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 px-3 sm:top-6 sm:px-6">
      <NavbarGlassFilter />
      <nav
        aria-label="Primary navigation"
        className={`${styles.glass} pointer-events-auto mx-auto flex items-center justify-between gap-2 rounded-full px-3 py-1.5 sm:px-5 sm:py-2`}
      >
        <Link
          className="inline-flex min-h-11 shrink-0 items-center rounded-full px-1 font-display text-lg font-semibold tracking-tight text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 sm:px-2 sm:text-xl"
          href="/"
          aria-label="Prakhar — home"
        >
          Prakhar
        </Link>
        <ul className="flex items-center gap-0.5 sm:gap-2">
          {[
            { href: "/#about", label: "About" },
            { href: "/#projects", label: "Projects" },
            { href: "/#contact", label: "Contact" },
          ].map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="inline-flex min-h-11 items-center rounded-full px-1.5 text-[13px] font-medium text-white/95 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 sm:px-4 sm:text-sm"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
