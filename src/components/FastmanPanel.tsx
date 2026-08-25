"use client";

import { useEffect, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { LuArrowUp, LuX } from "react-icons/lu";

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
      className="fixed inset-x-3 bottom-3 z-[130] flex max-h-[min(36rem,calc(100svh-5rem))] flex-col overflow-hidden rounded-[24px] border border-gray-200 bg-white shadow-[0_24px_80px_-24px_rgba(15,23,42,0.45)] sm:inset-x-auto sm:bottom-20 sm:right-5 sm:w-[28rem]"
    >
      <header className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-full bg-gray-900 text-xs font-semibold text-white">
            P
          </span>
          <div>
            <p className="text-sm font-semibold text-gray-900">Ask Prakhar</p>
            <p className="text-xs text-gray-500">Answers from my work</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close answer"
          className="grid size-8 place-items-center rounded-full text-gray-500 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <LuX className="size-4" aria-hidden />
        </button>
      </header>

      <FastmanConversation error={error} messages={messages} status={status} />

      <form onSubmit={handleSubmit} className="flex gap-2 border-t border-gray-100 bg-white p-3">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Ask a follow-up"
          maxLength={500}
          className="min-w-0 flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-gray-400"
        />
        <button
          type="submit"
          disabled={!query.trim() || status === "loading"}
          aria-label="Send question"
          className="grid size-10 shrink-0 place-items-center rounded-full bg-gray-900 text-white disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <LuArrowUp className="size-4" aria-hidden />
        </button>
      </form>
    </aside>,
    document.body,
  );
}
