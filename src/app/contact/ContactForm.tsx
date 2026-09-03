"use client";

import { useState } from "react";
import { LuArrowUpRight } from "react-icons/lu";

import ContactFields from "@/app/contact/ContactFields";
import DirectEmail from "@/app/contact/DirectEmail";
import { useToast } from "@/components/ui/toast";

const EMAIL = process.env.NEXT_PUBLIC_EMAIL ?? "hello@prakhar.ca";

function messageFor(code?: string) {
  if (code === "rate_limited") return "Too many attempts. Wait a few minutes and try again.";
  if (code === "invalid-email") return "Enter a valid email address.";
  if (code === "input-too-long") return "Shorten your message and try again.";
  if (code === "missing-fields") return "Fill out every field.";
  if (code === "mail-not-configured") return "Email is not configured. Use the address below.";
  if (code === "mail-failed") return "The message did not send. Try again later.";
  return "Something went wrong. Try again.";
}

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = event.currentTarget;
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: new FormData(form),
      });
      const result = await response.json();

      if (response.ok && result?.ok) {
        form.reset();
        toast({
          title: "Message sent",
          description: "Got it. I'll reply within one business day.",
          kind: "success",
        });
      } else {
        setError(messageFor(result?.error));
      }
    } catch {
      setError("The network request failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ContactFields />
        <input
          type="text"
          name="website"
          autoComplete="off"
          tabIndex={-1}
          aria-hidden="true"
          className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
        />
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-3 bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitting ? "Sending..." : "Send message"}
            <LuArrowUpRight className="size-4" aria-hidden />
          </button>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
        </div>
      </form>
      <div className="mt-12">
        <DirectEmail email={EMAIL} />
      </div>
    </div>
  );
}
