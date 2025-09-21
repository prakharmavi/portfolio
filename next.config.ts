import type { NextConfig } from "next";
import createMDX from "@next/mdx";

// Extend NextConfig to include `allowedDevOrigins`
interface NextConfigWithDevOrigins extends NextConfig {
  allowedDevOrigins?: string[];
}

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

const nextConfig: NextConfigWithDevOrigins = {
  reactStrictMode: true,

  // Allow dev asset requests from these origins
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://web.prakhar.ca",
    "https://web.prakhar.ca",
  ],

  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
