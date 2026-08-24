"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const TorontoMap = dynamic(() => import("@/components/TorontoMap"), {
  ssr: false,
  loading: () => <MapPlaceholder label="Loading interactive map…" />,
});

const hasMapboxToken = Boolean(process.env.NEXT_PUBLIC_MAPBOX_TOKEN);

function MapPlaceholder({ label }: { label: string }) {
  return (
    <div className="relative h-full min-h-[11rem] overflow-hidden rounded-2xl border border-gray-200 bg-[#e9eee9]" role="img" aria-label={label}>
      <svg viewBox="0 0 800 360" className="absolute inset-0 size-full" aria-hidden>
        <path d="M0 278C136 240 207 263 325 241c153-29 217-87 475-75v194H0Z" fill="#cfe4ea" />
        <g fill="none" stroke="#fff" strokeWidth="5" opacity=".85">
          <path d="M-30 88 220 151l190-36 162 47 260-88" />
          <path d="M80-20 141 116l20 127" />
          <path d="m278-20 12 110 35 151" />
          <path d="m484-20-30 132 58 124" />
          <path d="m688-20-78 136 44 91" />
        </g>
        <g fill="none" stroke="#c7d0c9" strokeWidth="2">
          <path d="M20 42 224 212 374 41 531 226 768 28" />
          <path d="M3 192 162 57 352 203 486 51 790 244" />
          <path d="M190 0 221 246M390 0l-1 220M590 0l-24 207" />
        </g>
      </svg>
      <div className="absolute left-[51%] top-[47%] -translate-x-1/2 -translate-y-1/2">
        <span className="absolute inset-0 animate-ping rounded-full bg-pink-500/30" />
        <span className="relative block size-4 rounded-full border-[3px] border-white bg-pink-600 shadow-md" />
      </div>
      <div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm backdrop-blur">
        Toronto, Canada
      </div>
    </div>
  );
}

export default function DistanceMap({
  clientLat,
  clientLon,
}: {
  clientLat?: number;
  clientLon?: number;
}) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [nearViewport, setNearViewport] = useState(false);

  useEffect(() => {
    if (!frameRef.current || !hasMapboxToken) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNearViewport(true);
        observer.disconnect();
      },
      { rootMargin: "400px" },
    );
    observer.observe(frameRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={frameRef} className="min-h-0 flex-1">
      {!hasMapboxToken ? (
        <MapPlaceholder label="Map centered on Toronto, Canada" />
      ) : nearViewport ? (
        <TorontoMap clientLat={clientLat} clientLon={clientLon} />
      ) : (
        <MapPlaceholder label="Toronto, Canada" />
      )}
    </div>
  );
}
