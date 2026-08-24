"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const TORONTO: [number, number] = [-79.3832, 43.6532];

export default function TorontoMap({
  clientLat,
  clientLon,
}: {
  clientLat?: number;
  clientLon?: number;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token || !containerRef.current) return;

    mapboxgl.accessToken = token;
    const hasClient = clientLat !== undefined && clientLon !== undefined;
    const client: [number, number] | null = hasClient
      ? [clientLon, clientLat]
      : null;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/standard",
      center: TORONTO,
      zoom: client ? 4 : 9,
    });

    map.on("load", () => {
      new mapboxgl.Marker({ color: "#db2777" }).setLngLat(TORONTO).addTo(map);
      if (!client) return;
      new mapboxgl.Marker().setLngLat(client).addTo(map);
      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: { type: "LineString", coordinates: [TORONTO, client] },
          properties: {},
        },
      });
      map.addLayer({
        id: "route",
        type: "line",
        source: "route",
        paint: { "line-color": "#db2777", "line-width": 2, "line-dasharray": [2, 2] },
      });
      map.fitBounds(new mapboxgl.LngLatBounds().extend(TORONTO).extend(client), {
        padding: 50,
        animate: false,
      });
    });

    return () => map.remove();
  }, [clientLat, clientLon]);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="Map showing the distance between Toronto and your approximate location"
      className="h-full min-h-[11rem] w-full overflow-hidden rounded-2xl border border-gray-200"
    />
  );
}
