"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import AvatarFrame from "./AvatarFrame";

type Props = {
  url?: string;
  className?: string;
};

const DynamicHero3D = dynamic(() => import("./Hero3D"), {
  ssr: false,
  loading: () => <AvatarFrame sizeClass="size-44 md:size-64" />,
});

export default function Hero3DClient(props: Props) {
  const [shouldRender3D, setShouldRender3D] = useState(false);

  useEffect(() => {
    const isMobile =
      typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
    const prefersReducedMotion =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    type NavExtras = Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
    const nav = navigator as NavExtras;
    const saveData = nav.connection?.saveData === true;
    const lowMem = typeof nav.deviceMemory === "number" && nav.deviceMemory < 4;

    // Skip entirely for constrained environments
    if (saveData || prefersReducedMotion || (isMobile && lowMem)) {
      return;
    }

    const loadModel = () => setShouldRender3D(true);

    const supportsRIC = typeof window !== "undefined" && "requestIdleCallback" in window;
    if (supportsRIC) {
      const requestIdle = (window as unknown as {
        requestIdleCallback?: (cb: IdleRequestCallback, opts?: { timeout?: number }) => number;
      }).requestIdleCallback;
      const idleId = requestIdle ? requestIdle(loadModel, { timeout: 1500 }) : null;
      return () => {
        const cancelIdle = (window as unknown as { cancelIdleCallback?: (handle: number) => void }).cancelIdleCallback;
        if (idleId !== null && cancelIdle) cancelIdle(idleId);
      };
    }

    const timeout = window.setTimeout(loadModel, 1000);
    return () => window.clearTimeout(timeout);
  }, []);

  if (!shouldRender3D) {
    return <AvatarFrame sizeClass="size-44 md:size-64" />;
  }

  return <DynamicHero3D {...props} />;
}
