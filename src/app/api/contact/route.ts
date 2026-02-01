import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

function getClientIp(headers: Headers): string | undefined {
  const cf = headers.get("CF-Connecting-IP");
  if (cf) return cf;
  const xff = headers.get("X-Forwarded-For");
  if (xff) return xff.split(",")[0]?.trim();
  return undefined;
}

export async function POST(req: Request) {
  try {
    // Basic rate limiting: 5 requests / 10 minutes per IP
    const ip = getClientIp(req.headers) ?? "global";
    if (!rateLimitOk(ip)) {
      return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
    }

    const form = await req.formData();
    const name = form.get("name");
    const email = form.get("email");
    const message = form.get("message");
    const honeypot = form.get("website");

    // Honeypot check — real users never fill this hidden field
    if (honeypot && typeof honeypot === "string" && honeypot.trim().length > 0) {
      // Silently reject but return 200 so bots think it succeeded
      return NextResponse.json({ ok: true });
    }

    // Input validation and normalization
    const nameStr = typeof name === "string" ? name.trim() : "";
    const emailStr = typeof email === "string" ? email.trim() : "";
    const messageStr = typeof message === "string" ? message.trim() : "";

    if (!nameStr || !emailStr || !messageStr) {
      return NextResponse.json({ ok: false, error: "missing-fields" }, { status: 400 });
    }

    if (nameStr.length > 80 || emailStr.length > 120 || messageStr.length > 2000) {
      return NextResponse.json({ ok: false, error: "input-too-long" }, { status: 400 });
    }

    const emailOk = /.+@.+\..+/.test(emailStr);
    if (!emailOk) {
      return NextResponse.json({ ok: false, error: "invalid-email" }, { status: 400 });
    }

    // Send via Resend API.
    const resendKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || process.env.NEXT_PUBLIC_EMAIL || "hello@prakhar.ca";
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

    if (!resendKey) {
      return NextResponse.json({ ok: false, error: "mail-not-configured" }, { status: 500 });
    }

    const subject = `New contact from ${nameStr}`;
    const text = `Name: ${nameStr}\nEmail: ${emailStr}\n\n${messageStr}`;
    const html = `
      <div style="font-family:ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\"; line-height:1.5;">
        <h2 style="margin:0 0 8px;">New contact</h2>
        <p style="margin:0 0 4px;"><strong>Name:</strong> ${escapeHtml(nameStr)}</p>
        <p style="margin:0 0 12px;"><strong>Email:</strong> ${escapeHtml(emailStr)}</p>
        <pre style="white-space:pre-wrap; font:inherit; background:#f8fafc; padding:12px; border-radius:8px; border:1px solid #e5e7eb;">${escapeHtml(messageStr)}</pre>
      </div>
    `;

    const idempotencyKey = randomUUID();
    const mailResp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify({
        from: `Prakhar Portfolio <${fromEmail}>`,
        to: [toEmail],
        subject,
        text,
        html,
        reply_to: emailStr,
      }),
    });

    if (!mailResp.ok) {
      let err: unknown = null;
      try {
        err = await mailResp.json();
      } catch {}
      console.error("Resend mail error", err);
      return NextResponse.json({ ok: false, error: "mail-failed", details: err }, { status: 502 });
    }

    const data: unknown = await mailResp.json().catch(() => ({}));

    // Fire a thank-you email to the sender. Do not fail the request if this fails.
    let ackSent = false;
    try {
      const ackSubject = `Thanks${nameStr ? ", " + nameStr : ""} — I received your message`;
      const ackText = `Hi${nameStr ? " " + nameStr : ""},\n\nThanks for reaching out. I received your message and will get back to you at this address.\n\n— Prakhar`;
      const ackHtml = `
        <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,Helvetica Neue,Arial;line-height:1.6;">
          <p>Hi${nameStr ? " " + escapeHtml(nameStr) : ""},</p>
          <p>Thanks for reaching out. I received your message and will get back to you at this address.</p>
          <p style="margin-top:12px;color:#6b7280;font-size:12px;">This is an automated receipt. If you didn't submit the form, you can ignore this email.</p>
          <p style="margin-top:16px;">— Prakhar</p>
        </div>
      `;

      const ackResp = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
          "Idempotency-Key": randomUUID(),
        },
        body: JSON.stringify({
          from: `Prakhar Portfolio <${fromEmail}>`,
          to: [emailStr],
          subject: ackSubject,
          text: ackText,
          html: ackHtml,
          reply_to: toEmail,
        }),
      });
      if (ackResp.ok) ackSent = true;
    } catch {}

    const id = (data as { id?: string } | undefined)?.id ?? null;
    return NextResponse.json({ ok: true, id, ackSent });
  } catch {
    return NextResponse.json({ ok: false, error: "internal-error" }, { status: 500 });
  }
}

// --- simple in-memory rate limit state ---
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_HITS = 5;
const hits = new Map<string, { count: number; reset: number }>();

function rateLimitOk(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || now > entry.reset) {
    hits.set(key, { count: 1, reset: now + WINDOW_MS });
    return true;
  }
  if (entry.count < MAX_HITS) {
    entry.count += 1;
    return true;
  }
  return false;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
