"use client";

import { useEffect, useState } from "react";

import DistanceMap from "@/components/DistanceMap";

const TORONTO = { lat: 43.6532, lon: -79.3832 };

type Location = {
  lat: number;
  lon: number;
  city?: string;
  country?: string;
};

function distanceFromToronto({ lat, lon }: Location) {
  const toRadians = (value: number) => (value * Math.PI) / 180;
  const earthRadiusKm = 6371;
  const deltaLat = toRadians(lat - TORONTO.lat);
  const deltaLon = toRadians(lon - TORONTO.lon);
  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(toRadians(TORONTO.lat)) *
      Math.cos(toRadians(lat)) *
      Math.sin(deltaLon / 2) ** 2;

  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function DistanceFromToronto() {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/location", { signal: controller.signal })
      .then((response) => response.json())
      .then((data: Record<string, unknown>) => {
        if (typeof data.lat !== "string" || typeof data.lon !== "string") return;
        const lat = Number(data.lat);
        const lon = Number(data.lon);
        if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;
        setLocation({
          lat,
          lon,
          city: typeof data.city === "string" ? data.city : undefined,
          country: typeof data.country === "string" ? data.country : undefined,
        });
      })
      .catch(() => undefined)
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  const place = location
    ? [location.city, location.country].filter(Boolean).join(", ")
    : "";

  return (
    <article className="flex h-full flex-col rounded-[28px] border border-gray-200 bg-white p-3 text-gray-900">
      <div className="flex items-center justify-between px-2 pb-2">
        <h2 className="text-sm font-semibold text-gray-800">Toronto ↔ You</h2>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-[11px] text-gray-600">
          <span className="size-1.5 rounded-full bg-pink-500" aria-hidden />
          Home base
        </span>
      </div>
      <DistanceMap clientLat={location?.lat} clientLon={location?.lon} />
      {!loading && location ? (
        <p className="px-2 pt-2 text-xs leading-relaxed text-gray-600">
          I’m in Toronto 🇨🇦 — roughly{" "}
          <span className="font-bold text-pink-600">
            {distanceFromToronto(location).toFixed(0)} km
          </span>{" "}
          away{place ? ` from you in ${place}.` : " from you."}
        </p>
      ) : null}
    </article>
  );
}
