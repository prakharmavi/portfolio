export type Project = {
  slug: string;
  title: string;
  tags: string[];
  summary: string;
  image: string; // public/ path, e.g. "/window.svg"
  sections: {
    overview: string;
    whatIDid: string;
    howIDidIt: string;
    whatILearned: string;
    outcome: string;
  };
};

export const projects: Project[] = [
  {
    slug: "portfolio-site",
    title: "Portfolio Site",
    tags: ["Next.js", "React", "Tailwind"],
    summary:
      "Personal site built with Next.js 15, React 19, and Tailwind 4 with a focus on clean UI and fast loads.",
    image: "/window.svg",
    sections: {
      overview:
        "This site showcases my work, writing, and experiments. I optimized for speed, clarity, and maintainability.",
      whatIDid:
        "Designed and built the UI, added responsive layout, created a accessible nav, and structured content routing.",
      howIDidIt:
        "Used Next.js App Router, colocated components, and Tailwind utility classes. Leaned on server components where it made sense.",
      whatILearned:
        "Refined patterns for layout composition, image optimization with next/image, and ergonomics for content structuring.",
      outcome:
        "Shipped a fast, minimal portfolio that’s easy to evolve with new projects and notes.",
    },
  },
  {
    slug: "ui-component-kit",
    title: "UI Component Kit",
    tags: ["Design System", "Accessibility"],
    summary:
      "Reusable patterns and components aligned to this site’s design system, emphasizing accessibility and consistency.",
    image: "/file.svg",
    sections: {
      overview:
        "A small set of UI building blocks that keep design consistent across pages and features.",
      whatIDid:
        "Abstracted repeated patterns into components, added states, sizes, and documented usage.",
      howIDidIt:
        "Focused on composable props and Tailwind primitives. Verified color contrast and keyboard interactions.",
      whatILearned:
        "Tradeoffs between abstraction and flexibility; how to keep APIs small but expressive.",
      outcome:
        "Faster iteration speed and a more consistent look and feel across the site.",
    },
  },
  {
    slug: "data-dashboards",
    title: "Data Dashboards",
    tags: ["Charts", "Tables"],
    summary:
      "Lightweight dashboards with filters and tables, prioritizing clarity and performance.",
    image: "/globe.svg",
    sections: {
      overview:
        "Built dashboard views that surface metrics at a glance and allow quick drill‑downs.",
      whatIDid:
        "Implemented tables, filters, and simple charts with accessible interactions and empty states.",
      howIDidIt:
        "Kept dependencies minimal, relied on semantic HTML, and optimized rendering for snappy updates.",
      whatILearned:
        "Balancing visual density with readability; patterns for handling loading and no‑data states.",
      outcome:
        "Clear, responsive dashboards that load quickly and communicate information effectively.",
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

