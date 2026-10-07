"use client";

import { useCallback, useState } from "react";
import { LuCopy, LuMail } from "react-icons/lu";

type Props = {
  email: string;
};

export default function DirectEmail({ email }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }, [email]);

  return (
    <div className="flex flex-col gap-4 border-y border-foreground py-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          Prefer email
        </p>
        <a
          href={`mailto:${email}`}
          className="mt-2 inline-block text-base font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
        >
          {email}
        </a>
      </div>
      <div className="flex gap-2">
        <button
          onClick={copy}
          className="inline-flex size-10 items-center justify-center border border-border text-foreground hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-4"
          type="button"
          aria-label={copied ? "Copied" : "Copy email"}
          title={copied ? "Copied" : "Copy email"}
        >
          <LuCopy className="size-4" aria-hidden />
        </button>
        <a
          href={`mailto:${email}`}
          className="inline-flex size-10 items-center justify-center bg-primary text-primary-foreground hover:bg-primary/80 focus-visible:outline-2 focus-visible:outline-offset-4"
          aria-label="Open mail app"
          title="Open mail app"
        >
          <LuMail className="size-4" aria-hidden />
        </a>
      </div>
    </div>
  );
}
