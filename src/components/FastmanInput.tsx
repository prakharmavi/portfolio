"use client";

import { useState } from "react";

export default function FastmanInput() {
  const [query, setQuery] = useState("");

  return (
    <div className="not-prose my-8">
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
        <p className="mb-3 text-sm font-medium text-gray-500">Try asking Prakhar something</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (query.trim()) {
              window.open(
                `https://fastman.vercel.app?q=${encodeURIComponent(query.trim())}`,
                "_blank",
                "noopener,noreferrer"
              );
            } else {
              window.open("https://fastman.vercel.app", "_blank", "noopener,noreferrer");
            }
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What's your background?"
            className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            Ask
          </button>
        </form>
      </div>
    </div>
  );
}
