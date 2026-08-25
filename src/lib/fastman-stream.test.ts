import { describe, expect, it, vi } from "vitest";

import { readFastmanStream } from "./fastman-stream";

describe("readFastmanStream", () => {
  it("joins content split across network chunks", async () => {
    const encoder = new TextEncoder();
    const body = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode('{"type":"content","data":"Hel'));
        controller.enqueue(encoder.encode('lo"}\n{"type":"content","data":" there"}\n'));
        controller.close();
      },
    });
    const onContent = vi.fn();

    await readFastmanStream(new Response(body), onContent);

    expect(onContent.mock.calls.flat()).toEqual(["Hello", " there"]);
  });

  it("reports streamed API errors", async () => {
    const body = '{"type":"tool-call-error","data":{"message":"Search failed."}}\n';

    await expect(readFastmanStream(new Response(body), vi.fn())).rejects.toThrow(
      "Search failed.",
    );
  });
});
