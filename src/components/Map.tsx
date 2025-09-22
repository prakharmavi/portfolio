"use client";
import useSWR from "swr";
import * as turf from "@turf/turf";

const toronto = [-79.3832, 43.6532]; // Toronto coords

export default function DistanceFromToronto() {
  const { data } = useSWR("/api/location", (url) =>
    fetch(url).then((r) => r.json()),
  );
  if (!data) return <p>Loading...</p>;

  const client = [Number(data.lon), Number(data.lat)];
  const distance = turf.distance(turf.point(toronto), turf.point(client), {
    units: "kilometers",
  });

  return (
    <div className="p-4 bg-gray-900 text-white rounded-xl">
      <p>
        Hello! I’m from Toronto, Canada 🇨🇦 — roughly{" "}
        <span className="text-pink-500 font-bold">
          {distance.toFixed(1)} km
        </span>{" "}
        away from you in {data.city}, {data.country}.
      </p>
    </div>
  );
}
