"use client";

import { useEffect, useRef } from "react";

import type { AnswerStatus } from "@/lib/useFastmanAnswer";
import type { FastmanMessage } from "@/types/api";

type FastmanConversationProps = {
  error: string;
  messages: FastmanMessage[];
  status: AnswerStatus;
};

export default function FastmanConversation(props: FastmanConversationProps) {
  const { error, messages, status } = props;
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    container.current?.scrollTo({ top: container.current.scrollHeight });
  }, [error, messages, status]);

  const awaitingAnswer = status === "loading" && messages.at(-1)?.role === "user";

  return (
    <div
      ref={container}
      aria-live="polite"
      aria-busy={status === "loading"}
      className="min-h-40 flex-1 space-y-3 overflow-y-auto bg-gray-50/70 px-4 py-5"
    >
      {messages.map((message, index) =>
        message.role === "user" ? (
          <p
            key={index}
            className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-gray-900 px-4 py-2.5 text-sm leading-5 text-white"
          >
            {message.content}
          </p>
        ) : (
          <div key={index} className="flex items-start gap-2.5">
            <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full border border-gray-200 bg-white text-[10px] font-semibold text-gray-700">
              P
            </span>
            <p className="max-w-[88%] rounded-2xl rounded-tl-md border border-gray-200 bg-white px-4 py-3 text-sm leading-6 whitespace-pre-wrap text-gray-700 shadow-sm">
              {message.content}
              {status === "loading" && index === messages.length - 1 && (
                <span className="ml-1 inline-block size-1.5 animate-pulse rounded-full bg-gray-400" />
              )}
            </p>
          </div>
        ),
      )}
      {(awaitingAnswer || status === "error") && (
        <div className="flex items-start gap-2.5">
          <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full border border-gray-200 bg-white text-[10px] font-semibold text-gray-700">
            P
          </span>
          <p className="rounded-2xl rounded-tl-md border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 shadow-sm">
            {awaitingAnswer ? "Looking through my work..." : error}
          </p>
        </div>
      )}
    </div>
  );
}
