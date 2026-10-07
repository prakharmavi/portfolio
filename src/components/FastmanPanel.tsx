"use client";

import { useEffect, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { LuArrowUpRight, LuX } from "react-icons/lu";

import FastmanConversation from "@/components/FastmanConversation";
import type { AnswerStatus } from "@/lib/useFastmanAnswer";
import type { FastmanMessage } from "@/types/api";

type FastmanPanelProps = {
  error: string;
  messages: FastmanMessage[];
  onAsk: (query: string) => void;
  onClose: () => void;
  status: AnswerStatus;
};
export default function FastmanPanel(props: FastmanPanelProps) {
  const { error, messages, onAsk, onClose, status } = props;
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  useEffect(() => setMounted(true), []);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const nextQuestion = query.trim();
    if (!nextQuestion || status === "loading") return;
    setQuery("");
    onAsk(nextQuestion);
  }
  if (!mounted) return null;

  return createPortal(
    <aside
      role="dialog"
      aria-label="Ask Prakhar"
      className="fixed inset-x-3 bottom-3 z-[130] flex max-h-[min(40rem,calc(100svh-2rem))] flex-col overflow-hidden rounded-lg border border-foreground bg-card shadow-[0_24px_80px_-24px_rgba(0,0,0,0.55)] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[32rem]"
    >
      <header className="flex items-start justify-between border-b border-foreground px-5 py-5">
        <h2 className="font-display text-3xl font-semibold leading-none tracking-[-0.04em] text-foreground">
          Ask about my work
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close answer"
          className="grid size-9 place-items-center border border-border text-muted-foreground hover:border-foreground hover:bg-primary hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <LuX className="size-4" aria-hidden />
        </button>
      </header>

      <FastmanConversation error={error} messages={messages} status={status} />

      <form onSubmit={handleSubmit} className="flex gap-3 border-t border-foreground bg-background p-4">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Ask a follow-up"
          maxLength={500}
          className="min-w-0 flex-1 border-b border-border bg-transparent px-1 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-foreground"
        />
        <button
          type="submit"
          disabled={!query.trim() || status === "loading"}
          aria-label="Send question"
          className="grid size-10 shrink-0 place-items-center bg-primary text-primary-foreground hover:bg-primary/80 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <LuArrowUpRight className="size-4" aria-hidden />
        </button>
      </form>
    </aside>,
    document.body,
  );
}
