"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { readFastmanStream } from "@/lib/fastman-stream";

export type AnswerStatus = "idle" | "loading" | "done" | "error";

export function useFastmanAnswer() {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<AnswerStatus>("idle");
  const activeRequest = useRef<AbortController | null>(null);

  useEffect(() => () => activeRequest.current?.abort(), []);

  const ask = useCallback(async (query: string) => {
    activeRequest.current?.abort();
    const controller = new AbortController();
    activeRequest.current = controller;
    setAnswer("");
    setError("");
    setStatus("loading");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? "Fastman could not answer right now.");
      }

      await readFastmanStream(response, (content) => {
        setAnswer((current) => current + content);
      });
      setStatus("done");
    } catch (requestError) {
      if (controller.signal.aborted) return;
      setError(requestError instanceof Error ? requestError.message : "Fastman could not answer.");
      setStatus("error");
    }
  }, []);

  return { answer, ask, error, status };
}
