"use client";

import { useState, type FormEvent } from "react";

import FastmanPanel from "@/components/FastmanPanel";
import { NoiseBackground } from "@/components/ui/noise-background";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useFastmanAnswer } from "@/lib/useFastmanAnswer";

type AskMeInputProps = {
  placeholder?: string;
  appearance?: "quiet" | "glow";
};

const sampleQuestions = [
  "How did you build Vroomly?",
  "Why Svelte for Fastman?",
  "How does HireSpark handle calls?",
  "What's running this portfolio?",
];

export default function AskMeInput({ placeholder, appearance = "glow" }: AskMeInputProps) {
  const [query, setQuery] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const { ask, error, messages, status } = useFastmanAnswer();

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

  const input = (
    <PlaceholdersAndVanishInput
      placeholders={placeholder ? [placeholder] : sampleQuestions}
      onChange={(event) => setQuery(event.target.value)}
      onSubmit={handleSubmit}
    />
  );

  return (
    <div className="w-full">
      {appearance === "quiet" ? (
        <div className="overflow-hidden rounded-md border border-border transition-colors focus-within:border-ring focus-within:ring-1 focus-within:ring-ring">
          {input}
        </div>
      ) : (
        <NoiseBackground containerClassName="w-full rounded-lg p-[2px]" className="overflow-hidden rounded-[6px]">
          {input}
        </NoiseBackground>
      )}
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
