"use client";

import { useState, type FormEvent } from "react";
import { LuArrowRight } from "react-icons/lu";

import { useFastmanAnswer } from "@/lib/useFastmanAnswer";

type AskMeInputProps = {
  placeholder?: string;
};

export default function AskMeInput({
  placeholder = "Ask me about a project",
}: AskMeInputProps) {
  const [query, setQuery] = useState("");
  const { answer, ask, error, status } = useFastmanAnswer();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const question = query.trim();
    if (!question) return;
    void ask(question);
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full">
        <div className="flex items-center w-full rounded-full border border-gray-200 bg-white shadow-sm focus-within:border-gray-400 transition-colors">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            maxLength={500}
            className="bg-transparent px-4 py-2.5 text-sm md:text-base text-gray-800 placeholder:text-gray-400 outline-none flex-1 min-w-0"
          />
          <button
            type="submit"
            disabled={!query.trim() || status === "loading"}
            className="inline-flex items-center justify-center size-8 mr-1 rounded-full bg-gray-800 text-white shrink-0 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2"
            aria-label={status === "loading" ? "Answering" : "Ask"}
          >
            <LuArrowRight className="size-3.5" aria-hidden />
          </button>
        </div>
      </form>

      <div aria-live="polite" aria-busy={status === "loading"}>
        {status === "loading" && !answer && (
          <p className="mt-3 px-1 text-sm text-gray-500">Looking through my work...</p>
        )}
        {answer && (
          <p className="mt-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 whitespace-pre-wrap text-gray-700">
            {answer}
          </p>
        )}
        {status === "error" && (
          <p className="mt-3 px-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
}
