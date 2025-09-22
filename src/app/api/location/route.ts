// app/api/location/route.ts
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const lat = req.headers.get("x-vercel-ip-latitude");
  const lon = req.headers.get("x-vercel-ip-longitude");
  const city = req.headers.get("x-vercel-ip-city");
  const country = req.headers.get("x-vercel-ip-country");

  return Response.json({ lat, lon, city, country });
}
