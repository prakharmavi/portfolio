"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import type { PillNavItem } from "@/types/pill-nav";

export function usePillAnimations(ease: string, initialLoadAnimation: boolean, items: PillNavItem[]) {
  const rootRef = useRef<HTMLDivElement>(null);
  const timelines = useRef<gsap.core.Timeline[]>([]);
  const tweens = useRef<gsap.core.Tween[]>([]);
  const logoTween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      let disposed = false;
      const layout = () => {
        if (disposed) return;
        tweens.current.forEach(tween => tween.kill());
        timelines.current.forEach(timeline => timeline.kill());
        timelines.current = Array.from(root.querySelectorAll<HTMLElement>(".pill")).map(pill => {
          const circle = pill.querySelector<HTMLElement>(".hover-circle");
          const { width: w, height: h } = pill.getBoundingClientRect();
          const timeline = gsap.timeline({ paused: true });
          if (!circle || !h) return timeline;
          const radius = (w * w / 4 + h * h) / (2 * h);
          const diameter = Math.ceil(2 * radius) + 2;
          const delta = Math.ceil(radius - Math.sqrt(Math.max(0, radius * radius - w * w / 4))) + 1;
          gsap.set(circle, { width: diameter, height: diameter, bottom: -delta,
            xPercent: -50, scale: 0, transformOrigin: `50% ${diameter - delta}px` });
          const label = pill.querySelector(".pill-label");
          const hover = pill.querySelector(".pill-label-hover");
          gsap.set(label, { y: 0 });
          gsap.set(hover, { y: h + 100, opacity: 0 });
          timeline.to(circle, { scale: 1.2, duration: 2, ease }, 0)
            .to(label, { y: -(h + 8), duration: 2, ease }, 0)
            .to(hover, { y: 0, opacity: 1, duration: 2, ease }, 0);
          return timeline;
        });
      };
      layout();
      const observer = new ResizeObserver(layout);
      root.querySelectorAll(".pill").forEach(pill => observer.observe(pill));
      document.fonts.ready.then(layout).catch(() => {});
      if (initialLoadAnimation) {
        const logo = root.querySelector(".pill-logo");
        if (logo) gsap.from(logo, { scale: 0, duration: 0.6, ease });
        gsap.from(root.querySelector(".pill-nav-items"), { clipPath: "inset(0 100% 0 0)", duration: 0.6, ease });
      }
      return () => {
        disposed = true;
        observer.disconnect();
        tweens.current.forEach(tween => tween.kill());
        timelines.current.forEach(timeline => timeline.kill());
        timelines.current = [];
        logoTween.current?.kill();
        gsap.set(root.querySelectorAll(".hover-circle, .pill-label, .pill-label-hover"), { clearProps: "all" });
      };
    }, root);
    return () => media.revert();
  }, [ease, initialLoadAnimation, items]);

  const animatePill = (index: number, enter: boolean) => {
    const timeline = timelines.current[index];
    if (!timeline) return;
    tweens.current[index]?.kill();
    tweens.current[index] = timeline.tweenTo(enter ? timeline.duration() : 0, {
      duration: enter ? 0.3 : 0.2, ease, overwrite: "auto",
    });
  };
  const animateLogo = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const image = rootRef.current?.querySelector(".pill-logo img");
    if (!image) return;
    logoTween.current?.kill();
    gsap.set(image, { rotate: 0 });
    logoTween.current = gsap.to(image, { rotate: 360, duration: 0.2, ease });
  };
  return { rootRef, animatePill, animateLogo };
}
