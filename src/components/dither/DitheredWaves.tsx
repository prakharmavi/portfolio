"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { Color, ShaderMaterial, Uniform, Vector2 } from "three";
import type { DitherProps } from "@/types/dither";
import { RetroEffect } from "./RetroEffect";
import { waveFragmentShader, waveVertexShader } from "./shaders";

export default function DitheredWaves(props: Required<DitherProps>) {
  const { viewport, size, gl, invalidate } = useThree();
  const material = useRef<ShaderMaterial>(null);
  const uniforms = useRef({
    time: new Uniform(0),
    resolution: new Uniform(new Vector2(1, 1)),
    waveSpeed: new Uniform(props.waveSpeed),
    waveFrequency: new Uniform(props.waveFrequency),
    waveAmplitude: new Uniform(props.waveAmplitude),
    waveColor: new Uniform(new Color(...props.waveColor)),
    backgroundColor: new Uniform(new Color(...props.backgroundColor)),
    mousePos: new Uniform(new Vector2(-10000, -10000)),
    enableMouseInteraction: new Uniform(0),
    mouseRadius: new Uniform(props.mouseRadius),
  });

  useEffect(() => {
    gl.getDrawingBufferSize(uniforms.current.resolution.value);
    invalidate();
  }, [size, gl, invalidate]);

  useEffect(() => {
    const canvas = gl.domElement;
    const move = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const dpr = gl.getPixelRatio();
      uniforms.current.mousePos.value.set((event.clientX - rect.left) * dpr, (event.clientY - rect.top) * dpr);
      invalidate();
    };
    const leave = () => {
      uniforms.current.mousePos.value.set(-10000, -10000);
      invalidate();
    };
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", leave);
    return () => {
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
    };
  }, [gl, invalidate]);

  useFrame((_, delta) => {
    if (!material.current) return;
    // Three copies the supplied uniforms; update the material actually being rendered.
    const u = material.current.uniforms as typeof uniforms.current;
    gl.getDrawingBufferSize(u.resolution.value);
    u.mousePos.value.copy(uniforms.current.mousePos.value);
    if (!props.disableAnimation) u.time.value += delta;
    u.waveSpeed.value = props.waveSpeed;
    u.waveFrequency.value = props.waveFrequency;
    u.waveAmplitude.value = props.waveAmplitude;
    u.waveColor.value.setRGB(...props.waveColor);
    u.backgroundColor.value.setRGB(...props.backgroundColor);
    u.enableMouseInteraction.value = props.enableMouseInteraction ? 1 : 0;
    u.mouseRadius.value = Math.max(0.001, props.mouseRadius);
  });

  return (
    <>
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial ref={material} vertexShader={waveVertexShader} fragmentShader={waveFragmentShader} uniforms={uniforms.current} />
      </mesh>
      <EffectComposer multisampling={0}>
        <RetroEffect colorNum={props.colorNum} pixelSize={props.pixelSize} />
      </EffectComposer>
    </>
  );
}
