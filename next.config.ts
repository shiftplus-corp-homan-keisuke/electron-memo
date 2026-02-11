import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: isProd ? "export" : undefined,
  images: {
    unoptimized: true,
  },
  // For Electron: use relative paths in production only
  assetPrefix: isProd ? "./" : undefined,
  trailingSlash: true,
};

export default nextConfig;
