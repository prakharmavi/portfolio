import type { AskPrakharRequest } from "@/types/api";

const DEFAULT_FASTMAN_URL = "https://fastman.vercel.app";
const DEFAULT_PORTFOLIO_ORIGIN = "https://www.pmavi.com";

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as AskPrakharRequest | null;
  const query = payload?.query?.trim();

  if (!query || query.length > 500) {
    return Response.json({ error: "Ask a question under 500 characters." }, { status: 400 });
  }

  const fastmanUrl = process.env.FASTMAN_URL ?? DEFAULT_FASTMAN_URL;
  const origin = process.env.FASTMAN_ORIGIN ?? DEFAULT_PORTFOLIO_ORIGIN;
  const prompt = `Answer this portfolio visitor in no more than 120 words. Use plain text without Markdown.\n\n${query}`;

  try {
    const upstream = await fetch(`${fastmanUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Origin: origin },
      body: JSON.stringify({ messages: [{ role: "user", content: prompt }] }),
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
