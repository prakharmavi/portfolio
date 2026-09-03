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
    const request = new Request("https://www.pmavi.com/api/chat", {
      method: "POST",
      headers: { Origin: "https://www.pmavi.com" },
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

  it("rejects requests that do not come from the portfolio origin", async () => {
    const upstreamFetch = vi.fn();
    vi.stubGlobal("fetch", upstreamFetch);
    const request = new Request("https://www.pmavi.com/api/chat", {
      method: "POST",
      body: JSON.stringify({
        messages: [{ role: "user", content: "What is Fastman?" }],
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(403);
    expect(upstreamFetch).not.toHaveBeenCalled();
  });

  it("limits each client IP to ten requests per minute", async () => {
    const upstreamFetch = vi.fn(() =>
      Promise.resolve(new Response('{"type":"content","data":"Answer"}\n')),
    );
    vi.stubGlobal("fetch", upstreamFetch);

    const headers = {
      Origin: "https://www.pmavi.com",
      "X-Vercel-Forwarded-For": "203.0.113.42",
    };
    const body = JSON.stringify({
      messages: [{ role: "user", content: "What is Fastman?" }],
    });

    for (let index = 0; index < 10; index += 1) {
      const response = await POST(
        new Request("https://www.pmavi.com/api/chat", { method: "POST", headers, body }),
      );
      expect(response.status).toBe(200);
    }

    const blocked = await POST(
      new Request("https://www.pmavi.com/api/chat", { method: "POST", headers, body }),
    );

    expect(blocked.status).toBe(429);
    expect(blocked.headers.get("Retry-After")).toBe("60");
    expect(upstreamFetch).toHaveBeenCalledTimes(10);
  });
});
