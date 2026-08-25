import { afterEach, describe, expect, it, vi } from "vitest";

import { POST } from "./route";

describe("portfolio chat route", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("forwards the existing conversation with a follow-up", async () => {
    const upstreamFetch = vi.fn().mockResolvedValue(
      new Response('{"type":"content","data":"Second answer"}\n', {
        headers: { "Content-Type": "application/x-ndjson" },
      }),
    );
    vi.stubGlobal("fetch", upstreamFetch);
    const messages = [
      { role: "user", content: "What is Fastman?" },
      { role: "assistant", content: "It is my portfolio assistant." },
      { role: "user", content: "What did you build it with?" },
    ];
    const request = new Request("http://localhost/api/chat", {
      method: "POST",
      body: JSON.stringify({ messages }),
    });

    const response = await POST(request);
    const options = upstreamFetch.mock.calls[0]?.[1] as RequestInit;
    const forwarded = JSON.parse(String(options.body)).messages;

    expect(response.status).toBe(200);
    expect(forwarded).toHaveLength(3);
    expect(forwarded.slice(0, 2)).toEqual(messages.slice(0, 2));
    expect(forwarded[2].content).toContain("What did you build it with?");
  });
});
