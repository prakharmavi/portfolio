import type { MDXComponents } from "mdx/types";
import LiveDemo from "@/components/LiveDemo";
import FastmanInput from "@/components/FastmanInput";
import VroomlyBrowse from "@/components/VroomlyBrowse";

const components: MDXComponents = {
  LiveDemo,
  FastmanInput,
  VroomlyBrowse,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
