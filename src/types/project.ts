import type { ComponentType } from "react";

export type ProjectLink = {
  label: string;
  url: string;
  type?: "live" | "repo" | "demo" | "press" | "writeup";
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  tags?: string[];
  links?: ProjectLink[];
  featured?: boolean;
  date?: string;
};

export type ProjectEntry = {
  fileSlug: string;
  meta: Project;
  Component: ComponentType<unknown>;
};
