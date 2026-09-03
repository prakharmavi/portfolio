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
    <div className="flex flex-col gap-4 border-y border-gray-900 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-gray-500">
          Prefer email
        </p>
        <a
          href={`mailto:${email}`}
          className="mt-2 inline-block text-base font-medium text-gray-900 underline decoration-gray-300 underline-offset-4 hover:decoration-gray-900"
        >
          {email}
        </a>
      </div>
      <div className="flex gap-2">
        <button
          onClick={copy}
          className="inline-flex size-10 items-center justify-center border border-gray-300 text-gray-900 hover:border-gray-900 focus-visible:outline-2 focus-visible:outline-offset-4"
          type="button"
          aria-label={copied ? "Copied" : "Copy email"}
          title={copied ? "Copied" : "Copy email"}
        >
          <LuCopy className="size-4" aria-hidden />
        </button>
        <a
          href={`mailto:${email}`}
          className="inline-flex size-10 items-center justify-center bg-gray-900 text-white hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-4"
          aria-label="Open mail app"
          title="Open mail app"
        >
          <LuMail className="size-4" aria-hidden />
        </a>
      </div>
    </div>
  );
}
