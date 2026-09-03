"use client";

import { useEffect, useState, type FormEvent } from "react";
import { LuArrowRight } from "react-icons/lu";

import FastmanPanel from "@/components/FastmanPanel";
import { useFastmanAnswer } from "@/lib/useFastmanAnswer";

type AskMeInputProps = {
  placeholder?: string;
};

const sampleQuestions = [
  "How did you build Vroomly?",
  "Why Svelte for Fastman?",
  "How does HireSpark handle calls?",
  "What's running this portfolio?",
];

export default function AskMeInput({ placeholder }: AskMeInputProps) {
  const [query, setQuery] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [sampleIndex, setSampleIndex] = useState(0);
  const { ask, error, messages, status } = useFastmanAnswer();

  useEffect(() => {
    if (placeholder) return;
    const interval = window.setInterval(() => {
      setSampleIndex((current) => (current + 1) % sampleQuestions.length);
    }, 3200);
    return () => window.clearInterval(interval);
  }, [placeholder]);

  function submitQuestion(nextQuestion: string) {
    setPanelOpen(true);
    void ask(nextQuestion);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const nextQuestion = query.trim();
    if (!nextQuestion) return;
    setQuery("");
    submitQuestion(nextQuestion);
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full">
        <div className="flex w-full items-center bg-gray-700 px-3 transition-colors focus-within:bg-gray-600">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder ?? sampleQuestions[sampleIndex]}
            maxLength={500}
            className="min-w-0 flex-1 bg-transparent py-3 pr-3 text-sm text-white outline-none placeholder:text-gray-400 md:text-base"
          />
          <button
            type="submit"
            disabled={!query.trim() || status === "loading"}
            className="inline-flex size-9 shrink-0 items-center justify-center bg-gray-100 text-gray-900 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label={status === "loading" ? "Answering" : "Ask"}
          >
            <LuArrowRight className="size-3.5" aria-hidden />
          </button>
        </div>
      </form>
      {panelOpen && (
        <FastmanPanel
          error={error}
          messages={messages}
          onAsk={submitQuestion}
          onClose={() => setPanelOpen(false)}
          status={status}
        />
      )}
    </div>
  );
}
