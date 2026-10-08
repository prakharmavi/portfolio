"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { gsap } from "gsap";

export function useMobileMenu(rootRef: RefObject<HTMLDivElement | null>, ease: string) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const menu = menuRef.current;
    const lines = buttonRef.current?.querySelectorAll(".hamburger-line");
    if (!menu || !lines) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      gsap.to(lines[0], { rotation: open ? 45 : 0, y: open ? 3 : 0, duration: reduced ? 0 : 0.3, ease });
      gsap.to(lines[1], { rotation: open ? -45 : 0, y: open ? -3 : 0, duration: reduced ? 0 : 0.3, ease });
      gsap.to(menu, {
        autoAlpha: open ? 1 : 0, y: open ? 0 : 10, duration: reduced ? 0 : 0.25, ease,
      });
    });
    return () => context.getTweens().forEach((tween: gsap.core.Tween) => tween.kill());
  }, [open, ease]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 769px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open, rootRef]);

  return { open, setOpen, buttonRef, menuRef };
}
