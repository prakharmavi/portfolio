import type { NextConfig } from "next";

// Extend NextConfig to allow `allowedDevOrigins` without type errors while
// Next.js updates the types. This is used to allow cross-origin access to
// /_next/* resources in development (e.g. from web.prakhar.ca).
type NextConfigWithDevOrigins = NextConfig & { allowedDevOrigins?: string[] };

const nextConfig: NextConfigWithDevOrigins = {
  // Allow dev asset requests from these origins (see warning in logs)
  // Add or edit as needed for your setup.
  allowedDevOrigins: [
    "https://web.prakhar.ca",
    "http://web.prakhar.ca",
  ],
};

export default nextConfig;
