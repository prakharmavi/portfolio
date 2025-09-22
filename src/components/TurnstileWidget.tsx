"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type Props = {
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "flexible" | "compact";
  onSuccess?: (token: string) => void;
  label?: string;
  helperText?: string;
  className?: string;
};

declare global {
  interface Window {
    onTurnstileSuccess?: (token: string) => void;
  }
}

export default function TurnstileWidget({
  theme = "light",
  size = "normal",
  onSuccess,
  label = "Verification",
  helperText = "Quick check to keep bots out.",
  className,
}: Props) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    window.onTurnstileSuccess = (t: string) => {
      setToken(t);
      onSuccess?.(t);
    };
    return () => {
      // Cleanup to avoid leaking between navigations
      delete window.onTurnstileSuccess;
    };
  }, [onSuccess]);

  if (!siteKey) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
        Missing NEXT_PUBLIC_TURNSTILE_SITE_KEY. Add it to .env.local.
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-gray-200/80 bg-white/80 px-4 py-4 shadow-sm backdrop-blur transition",
        token ? "border-emerald-200/70 bg-emerald-50/60" : "hover:border-gray-300",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-gray-500">{label}</p>
          <p className="text-sm text-gray-700">{helperText}</p>
        </div>
        <div className="flex size-9 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="size-4"
            aria-hidden
          >
            <path d="M9 12 11 14 15 10" />
            <circle cx="12" cy="12" r="9" />
          </svg>
        </div>
      </div>
      <div className="relative mt-5 flex items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white/90 p-4">
        <div
          className="cf-turnstile"
          data-sitekey={siteKey}
          data-theme={theme}
          data-size={size}
          data-callback="onTurnstileSuccess"
        />
      </div>
      <p className="mt-3 flex items-center gap-2 text-[11px] text-gray-500" aria-live="polite">
        <span
          className={`inline-flex size-5 items-center justify-center rounded-full border ${
            token ? "border-emerald-200 bg-emerald-50 text-emerald-600" : "border-gray-200 bg-gray-50"
          }`}
          aria-hidden
        >
          {token ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="size-3"
            >
              <path d="M9 12 11 14 15 10" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="size-3"
            >
              <circle cx="12" cy="12" r="9" />
            </svg>
          )}
        </span>
        {token ? "Verified — thanks!" : "Complete the check to unlock the form."}
      </p>
    </div>
  );
}
