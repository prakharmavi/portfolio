import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

// Extend NextConfig to include `allowedDevOrigins`
interface NextConfigWithDevOrigins extends NextConfig {
  allowedDevOrigins?: string[];
}

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [remarkGfm],
  },
});

const nextConfig: NextConfigWithDevOrigins = {
  reactStrictMode: true,

  // Allow dev asset requests from these origins
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://web.pmavi.com",
    "https://web.pmavi.com",
  ],

  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
