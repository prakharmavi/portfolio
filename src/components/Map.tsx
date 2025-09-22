"use client";

import { useEffect, useRef } from "react";
import useSWR from "swr";
import * as turf from "@turf/turf";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const toronto: [number, number] = [-79.3832, 43.6532];
const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

if (mapboxToken) {
  mapboxgl.accessToken = mapboxToken;
}

export function TorontoMap({
  clientLat,
  clientLon,
}: {
  clientLat: number;
  clientLon: number;
}) {
  const mapContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapboxToken || !mapContainer.current) {
      return;
    }

    const client: [number, number] = [clientLon, clientLat];

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: toronto,
      zoom: 4,
    });

    map.on("load", () => {
      new mapboxgl.Marker({ color: "#ff007f" }).setLngLat(toronto).addTo(map);
      new mapboxgl.Marker().setLngLat(client).addTo(map);

      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: [toronto, client],
          },
          properties: {},
        },
      });

      map.addLayer({
        id: "route",
        type: "line",
        source: "route",
        paint: {
          "line-color": "#ff007f",
          "line-width": 2,
          "line-dasharray": [2, 2],
        },
      });

      const bounds = new mapboxgl.LngLatBounds();
      bounds.extend(toronto).extend(client);
      map.fitBounds(bounds, { padding: 50, animate: true });
    });

    return () => map.remove();
  }, [clientLat, clientLon]);

  return <div ref={mapContainer} className="h-64 w-full rounded-xl" />;
}

export function DistanceCard({
  clientLat,
  clientLon,
  city,
  country,
}: {
  clientLat: number;
  clientLon: number;
  city?: string;
  country?: string;
}) {
  const client: [number, number] = [clientLon, clientLat];
  const distance = turf.distance(turf.point(toronto), turf.point(client), {
    units: "kilometers",
  });

  return (
    <div className="rounded-2xl bg-gray-900 p-4 text-white">
      {mapboxToken ? (
        <TorontoMap clientLat={clientLat} clientLon={clientLon} />
      ) : (
        <div className="flex h-64 w-full items-center justify-center rounded-xl border border-gray-800 bg-gray-950 text-xs text-gray-500">
          Map unavailable — set NEXT_PUBLIC_MAPBOX_TOKEN
        </div>
      )}
      <p className="mt-4 text-sm leading-relaxed">
        I’m in Toronto 🇨🇦 — roughly{" "}
        <span className="font-bold text-pink-500">
          {distance.toFixed(1)} km
        </span>{" "}
        away
        {city || country ? (
          <span>
            {" "}
            from you{city ? ` in ${city}` : ""}
            {country ? `${city ? "," : " in"} ${country}` : ""}.
          </span>
        ) : (
          " from you."
        )}
      </p>
    </div>
  );
}

export function DistanceFromToronto() {
  const { data } = useSWR("/api/location", (url) =>
    fetch(url).then((r) => r.json()),
  );

  if (!data) {
    return (
      <p className="text-sm text-gray-500">
        Calculating distance from Toronto…
      </p>
    );
  }

  const lat = Number(data.lat);
  const lon = Number(data.lon);

  if (Number.isNaN(lat) || Number.isNaN(lon)) {
    return (
      <p className="text-sm text-gray-500">
        Couldn’t determine your location just yet.
      </p>
    );
  }

  return (
    <DistanceCard
      clientLat={lat}
      clientLon={lon}
      city={data.city}
      country={data.country}
    />
  );
}
