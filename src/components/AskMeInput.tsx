"use client";

import { useState, type FormEvent } from "react";
import { LuArrowRight } from "react-icons/lu";

export default function AskMeInput() {
  const [query, setQuery] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    const fastmanUrl = process.env.NEXT_PUBLIC_FASTMAN_URL ?? "https://fastman.vercel.app";
    window.location.href = `${fastmanUrl}/?q=${encodeURIComponent(query.trim())}`;
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full">
      <div className="flex items-center w-full rounded-full border border-gray-200 bg-white shadow-sm focus-within:border-gray-400 transition-colors">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask anything, blazingly fast"
          className="bg-transparent px-4 py-2.5 text-sm md:text-base text-gray-800 placeholder:text-gray-400 outline-none flex-1 min-w-0"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center size-8 mr-1 rounded-full bg-gray-800 text-white shrink-0 cursor-pointer focus:outline-hidden"
          aria-label="Ask"
        >
          <LuArrowRight className="size-3.5" />
        </button>
      </div>
    </form>
  );
}
