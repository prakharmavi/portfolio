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
      <div className="not-prose my-8">
        <button
          onClick={() => setShowDemo(true)}
          className="group relative w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-50 transition-all hover:border-gray-300 hover:shadow-md"
        >
          <div className="flex flex-col items-center justify-center gap-3 py-12 px-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-white transition-transform group-hover:scale-110">
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
            <span className="text-sm font-medium text-gray-700">
              Launch interactive demo
            </span>
            <span className="text-xs text-gray-400">{url}</span>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="not-prose my-8">
      <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
            </div>
            <span className="ml-2 text-xs text-gray-500 font-mono">
              {url}
            </span>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:text-gray-700 underline"
          >
            Open in new tab
          </a>
        </div>
        <div className="relative" style={{ height }}>
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
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
