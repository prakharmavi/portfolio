"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { readFastmanStream } from "@/lib/fastman-stream";
import type { FastmanMessage } from "@/types/api";

export type AnswerStatus = "idle" | "loading" | "done" | "error";

export function useFastmanAnswer() {
  const [messages, setMessages] = useState<FastmanMessage[]>([]);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<AnswerStatus>("idle");
  const activeRequest = useRef<AbortController | null>(null);
  const conversation = useRef<FastmanMessage[]>([]);

  useEffect(() => () => activeRequest.current?.abort(), []);

  const ask = useCallback(async (query: string) => {
    activeRequest.current?.abort();
    const controller = new AbortController();
    activeRequest.current = controller;
    const recentMessages = conversation.current.slice(-18);
    while (
      recentMessages.reduce((total, message) => total + message.content.length, query.length) >
      12_000
    ) {
      recentMessages.shift();
    }
    const requestMessages: FastmanMessage[] = [
      ...recentMessages,
      { role: "user", content: query },
    ];
    conversation.current = requestMessages;
    setMessages(requestMessages);
    setError("");
    setStatus("loading");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: requestMessages }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? "Fastman could not answer right now.");
      }

      let assistantContent = "";
      await readFastmanStream(response, (content) => {
        assistantContent += content;
        const nextMessages: FastmanMessage[] = [
          ...requestMessages,
          { role: "assistant", content: assistantContent },
        ];
        conversation.current = nextMessages;
        setMessages(nextMessages);
      });
      setStatus("done");
    } catch (requestError) {
      if (controller.signal.aborted) return;
      setError(requestError instanceof Error ? requestError.message : "Fastman could not answer.");
      setStatus("error");
    }
  }, []);

  return { ask, error, messages, status };
}
