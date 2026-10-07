"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";

const Dither = dynamic(() => import("@/components/dither/Dither"), { ssr: false });

export default function HeroDither() {
  const reducedMotion = useReducedMotion();
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <Dither
        waveColor={[0.42, 0.42, 0.42]}
        backgroundColor={[0, 0, 0]}
        disableAnimation={reducedMotion !== false}
        enableMouseInteraction={reducedMotion === false}
        mouseRadius={0.3}
        colorNum={4}
        pixelSize={2}
        waveAmplitude={0.3}
        waveFrequency={3}
        waveSpeed={0.05}
      />
    </div>
  );
}
