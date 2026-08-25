import type { FastmanMessage } from "@/types/api";

const DEFAULT_FASTMAN_URL = "https://fastman.vercel.app";
const DEFAULT_PORTFOLIO_ORIGIN = "https://www.pmavi.com";
const MAX_MESSAGES = 20;

function isFastmanMessage(value: unknown): value is FastmanMessage {
  if (!value || typeof value !== "object") return false;
  const message = value as Record<string, unknown>;
  return (
    (message.role === "user" || message.role === "assistant") &&
    typeof message.content === "string" &&
    message.content.trim().length > 0 &&
    message.content.length <= (message.role === "user" ? 500 : 4_000)
  );
}

function parseMessages(payload: unknown) {
  if (!payload || typeof payload !== "object" || !("messages" in payload)) return null;
  const messages = (payload as { messages: unknown }).messages;
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
    return null;
  }

  if (!messages.every(isFastmanMessage)) return null;
  const typedMessages: FastmanMessage[] = messages;
  const totalLength = typedMessages.reduce((total, message) => total + message.content.length, 0);
  const lastMessage = typedMessages.at(-1);

  return totalLength <= 12_000 && lastMessage?.role === "user" ? typedMessages : null;
}

function prepareMessages(messages: FastmanMessage[]) {
  const instruction = "Answer in no more than 120 words. Use plain text without Markdown.";
  return messages.map((message, index) =>
    index === messages.length - 1
      ? { ...message, content: `${instruction}\n\n${message.content.trim()}` }
      : message,
  );
}

export async function POST(request: Request) {
  const payload: unknown = await request.json().catch(() => null);
  const messages = parseMessages(payload);

  if (!messages) {
    return Response.json({ error: "The conversation is invalid or too long." }, { status: 400 });
  }

  const fastmanUrl = process.env.FASTMAN_URL ?? DEFAULT_FASTMAN_URL;
  const origin = process.env.FASTMAN_ORIGIN ?? DEFAULT_PORTFOLIO_ORIGIN;

  try {
    const upstream = await fetch(`${fastmanUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Origin: origin },
      body: JSON.stringify({ messages: prepareMessages(messages) }),
      cache: "no-store",
    });

    if (!upstream.ok || !upstream.body) {
      return Response.json({ error: "Fastman could not answer right now." }, { status: 502 });
    }

    return new Response(upstream.body, {
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/x-ndjson",
      },
    });
  } catch {
    return Response.json({ error: "Fastman could not answer right now." }, { status: 502 });
  }
}
