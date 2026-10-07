"use client";

import { wrapEffect } from "@react-three/postprocessing";
import { Effect } from "postprocessing";
import { Uniform } from "three";
import { ditherFragmentShader } from "./shaders";

class RetroEffectImpl extends Effect {
  constructor({ colorNum = 4, pixelSize = 2 }: { colorNum?: number; pixelSize?: number } = {}) {
    super("RetroEffect", ditherFragmentShader, {
      uniforms: new Map([
        ["colorNum", new Uniform(Math.max(2, colorNum))],
        ["pixelSize", new Uniform(Math.max(1, pixelSize))],
      ]),
    });
  }
  set colorNum(value: number) { this.uniforms.get("colorNum")!.value = Math.max(2, value); }
  get colorNum() { return this.uniforms.get("colorNum")!.value; }
  set pixelSize(value: number) { this.uniforms.get("pixelSize")!.value = Math.max(1, value); }
  get pixelSize() { return this.uniforms.get("pixelSize")!.value; }
}

export const RetroEffect = wrapEffect(RetroEffectImpl);
