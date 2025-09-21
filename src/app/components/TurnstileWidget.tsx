"use client";

import { useEffect, useState } from "react";

type Props = {
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "flexible" | "compact";
  onSuccess?: (token: string) => void;
};

declare global {
  interface Window {
    onTurnstileSuccess?: (token: string) => void;
  }
}

export default function TurnstileWidget({ theme = "light", size = "normal", onSuccess }: Props) {
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
      <p className="text-xs text-red-600">Missing NEXT_PUBLIC_TURNSTILE_SITE_KEY. Add it to .env.local.</p>
    );
  }

  return (
    <div className="space-y-2">
      <div
        className="cf-turnstile"
        data-sitekey={siteKey}
        data-theme={theme}
        data-size={size}
        data-callback="onTurnstileSuccess"
      />
      <p className="text-[11px] text-gray-500" aria-live="polite">
        {token ? "Verification passed." : "Please complete the verification."}
      </p>
    </div>
  );
}

