import type { FastmanStreamEvent } from "../../types/api";

function parseEvent(line: string): FastmanStreamEvent | null {
  if (!line.trim()) return null;

  const value: unknown = JSON.parse(line);
  if (!value || typeof value !== "object" || !("type" in value)) return null;

  const event = value as Record<string, unknown>;
  return typeof event.type === "string"
    ? { type: event.type, data: event.data }
    : null;
}

function eventMessage(data: unknown) {
  if (typeof data === "string") return data;
  if (!data || typeof data !== "object" || !("message" in data)) return null;
  return typeof data.message === "string" ? data.message : null;
}

export async function readFastmanStream(
  response: Response,
  onContent: (content: string) => void,
) {
  if (!response.body) throw new Error("Fastman returned an empty response.");

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  function processLine(line: string) {
    const event = parseEvent(line);
    if (!event) return;
    if (event.type === "content" && typeof event.data === "string") {
      onContent(event.data);
    }
    if (["stream-error", "tool-call-error", "rateLimitError"].includes(event.type)) {
      throw new Error(eventMessage(event.data) ?? "Fastman could not answer right now.");
    }
  }

  while (true) {
    const { value, done } = await reader.read();
    buffer += decoder.decode(value, { stream: !done });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    lines.forEach(processLine);
    if (done) break;
  }

  processLine(buffer);
}
