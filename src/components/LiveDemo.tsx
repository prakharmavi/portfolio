"use client";

import { useState } from "react";

type LiveDemoProps = {
  url: string;
  title?: string;
  height?: string;
};

export default function LiveDemo({
  url,
  title = "Live Demo",
  height = "600px",
}: LiveDemoProps) {
  const [loaded, setLoaded] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  if (!showDemo) {
    return (
      <div className="not-prose">
        <button
          onClick={() => setShowDemo(true)}
          className="group relative w-full border-y border-foreground bg-card text-left transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          <div className="flex items-center justify-between gap-6 px-1 py-8 md:py-10">
            <div>
              <span className="block text-lg font-medium">Launch interactive demo</span>
              <span className="mt-1 block font-mono text-xs text-muted-foreground group-hover:text-primary-foreground/70">{url}</span>
            </div>
            <div className="flex size-11 shrink-0 items-center justify-center border border-border transition-transform group-hover:translate-x-1 group-hover:border-primary-foreground">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="not-prose">
      <div className="overflow-hidden border border-foreground">
        <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
            </div>
            <span className="ml-2 text-xs text-muted-foreground font-mono">
              {url}
            </span>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground underline"
          >
            Open in new tab
          </a>
        </div>
        <div className="relative" style={{ height }}>
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-foreground" />
            </div>
          )}
          <iframe
            src={url}
            title={title}
            className="h-full w-full border-0"
            onLoad={() => setLoaded(true)}
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        </div>
      </div>
    </div>
  );
}
