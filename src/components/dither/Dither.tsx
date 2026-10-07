"use client";

import { Canvas } from "@react-three/fiber";
import type { DitherProps } from "@/types/dither";
import DitheredWaves from "./DitheredWaves";
import "./Dither.css";

export default function Dither({
  waveSpeed = 0.05,
  waveFrequency = 3,
  waveAmplitude = 0.3,
  waveColor = [0.5, 0.5, 0.5],
  backgroundColor = [0, 0, 0],
  colorNum = 4,
  pixelSize = 2,
  disableAnimation = false,
  enableMouseInteraction = true,
  mouseRadius = 1,
}: DitherProps) {
  return (
    <Canvas
      className="dither-container"
      camera={{ position: [0, 0, 6] }}
      dpr={1}
      frameloop={disableAnimation ? "demand" : "always"}
      gl={{ antialias: false }}
      fallback={<div className="dither-container" />}
    >
      <DitheredWaves {...{ waveSpeed, waveFrequency, waveAmplitude, waveColor, backgroundColor, colorNum, pixelSize, disableAnimation, enableMouseInteraction, mouseRadius }} />
    </Canvas>
  );
}
