"use client";

import { useCallback, useState } from "react";
import { useToast } from "@/components/ui/toast";

export default function ContactForm() {
  const EMAIL = process.env.NEXT_PUBLIC_EMAIL ?? "hello@prakhar.ca";
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = e.currentTarget;
    const body = new FormData(form);

    try {
      const res = await fetch("/api/contact", { method: "POST", body });
      const json = await res.json();

      if (res.ok && json?.ok) {
        form.reset();
        toast({
          title: "Message sent",
          description: "Thanks for reaching out — I'll reply shortly.",
          kind: "success",
        });
      } else {
        const code: string | undefined = json?.error;
        let msg = "Something went wrong. Please try again.";
        if (code === "rate_limited") msg = "Too many attempts. Please wait a few minutes and try again.";
        else if (code === "invalid-email") msg = "Please enter a valid email address.";
        else if (code === "input-too-long") msg = "Your message is too long. Please shorten it and try again.";
        else if (code === "missing-fields") msg = "Please fill out all fields.";
        else if (code === "mail-not-configured") msg = "Email is not configured. Please email me directly.";
        else if (code === "mail-failed") msg = "Could not send email. Please try again later.";
        setError(msg);
      }
    } catch {
      setError("Network error. Please try again.");
      toast({ title: "Network error", description: "Please try again.", kind: "error" });
    } finally {
      setSubmitting(false);
    }
  }

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }, [EMAIL]);

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <div>
            <label className="block text-xs text-gray-600" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-gray-300"
              placeholder="Ada Lovelace (or your dev alias)"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-gray-300"
              placeholder="you@shipping-soon.dev (real email, promise)"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="mt-1 w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-gray-300"
              placeholder="What are we building? TL;DR, stack, bugs, and dreams welcome."
            />
          </div>
        </div>

        {/* Honeypot field — hidden from real users, bots will fill it */}
        <input
          type="text"
          name="website"
          autoComplete="off"
          tabIndex={-1}
          aria-hidden="true"
          className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden"
        />

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-full bg-gray-900 text-white px-5 py-2.5 text-sm hover:bg-black focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitting ? "Sending…" : "Send message"}
          </button>
        </div>
        {error ? <p className="text-xs text-red-600">{error}</p> : null}
      </form>

      <div className="rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm">
        <p className="text-sm text-gray-700">Prefer email?</p>
        <div className="mt-3 flex items-center gap-2">
          <code className="rounded-full bg-gray-50 px-3 py-1.5 text-sm text-gray-900 border border-gray-200">
            {EMAIL}
          </code>
          <button
            onClick={copy}
            className="inline-flex items-center justify-center rounded-full bg-gray-800 text-white size-9 hover:bg-black focus:outline-hidden"
            type="button"
            aria-label={copied ? "Copied" : "Copy email"}
            title={copied ? "Copied" : "Copy email"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="size-4"
              aria-hidden
            >
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          </button>
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center justify-center rounded-full border border-gray-200 size-9 text-gray-800 hover:bg-gray-50"
            aria-label="Open mail app"
            title="Open mail app"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="size-4"
              aria-hidden
            >
              <path d="m22 7-8.97 5.7a2 2 0 0 1-2.06 0L2 7" />
              <rect width="20" height="14" x="2" y="5" rx="2" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
