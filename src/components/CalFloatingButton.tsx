"use client";

import { useState } from "react";

export default function CalFloatingButton() {
  const [loading, setLoading] = useState(false);

  async function openCalendar() {
    setLoading(true);
    try {
      const { getCalApi } = await import("@calcom/embed-react");
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", { theme: "light", hideEventTypeDetails: false, layout: "month_view" });
      cal("modal", {
        calLink: "prakhar-mavi/30min",
        config: { layout: "month_view", theme: "light" },
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={openCalendar}
      disabled={loading}
      className="fixed bottom-6 right-6 z-[110] inline-flex items-center gap-3 rounded-full bg-black px-5 py-3 text-sm font-medium text-white shadow-lg hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60"
      aria-label="Schedule a 30-minute call"
    >
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M8 3v4M16 3v4M3 10h18" />
      </svg>
      {loading ? "Opening…" : "Talk to me"}
    </button>
  );
}
