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

export type PublishedProject = Required<
  Pick<
    Project,
    | "slug"
    | "title"
    | "description"
    | "thumbnail"
    | "tags"
    | "links"
    | "featured"
  >
> &
  Pick<Project, "date"> & {
    path: `/projects/${string}`;
  };

export type PublishedProjectDetail = {
  project: PublishedProject;
  Content: ComponentType<unknown>;
};
