"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { LuCheck, LuX } from "react-icons/lu";

type ToastKind = "success" | "error" | "info";

type ToastItem = {
  id: string;
  title: string;
  description?: string;
  kind?: ToastKind;
  duration?: number; // ms
};

type ToastContextValue = {
  show: (t: Omit<ToastItem, "id">) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx.show;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const remove = useCallback((id: string) => {
    setToasts((arr) => arr.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    ({ title, description, kind = "success", duration = 4000 }: Omit<ToastItem, "id">) => {
      const id = Math.random().toString(36).slice(2);
      const item: ToastItem = { id, title, description, kind, duration };
      setToasts((arr) => [...arr, item]);
      window.setTimeout(() => remove(id), duration);
    },
    [remove],
  );

  const value = useMemo(() => ({ show }), [show]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Toast container (top-right) */}
      <div className="pointer-events-none fixed top-6 right-6 z-[100] w-full max-w-sm">
        <div className="flex flex-col items-stretch gap-2">
          {toasts.map((t) => (
            <ToastCard key={t.id} item={t} onClose={() => remove(t.id)} />
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
}

function ToastCard({ item, onClose }: { item: ToastItem; onClose: () => void }) {
  const { kind, title, description } = item;
  const Icon = kind === "error" ? LuX : LuCheck;
  const accent = kind === "error" ? "text-red-600" : kind === "info" ? "text-gray-700" : "text-emerald-600";

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-auto relative isolate flex items-start gap-3 rounded-2xl border border-gray-200 bg-white/95 px-4 py-3 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/75"
    >
      <div className={`mt-0.5 ${accent}`}>
        <Icon className="size-4" aria-hidden />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        {description ? <p className="mt-0.5 text-xs text-gray-600">{description}</p> : null}
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss notification"
        className="ml-auto inline-flex size-7 items-center justify-center rounded-full text-gray-500 hover:text-gray-700 focus:outline-hidden"
      >
        <LuX className="size-4" aria-hidden />
      </button>
    </div>
  );
}
