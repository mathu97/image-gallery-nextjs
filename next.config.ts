import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "storage.googleapis.com", pathname: "**" },
    ],
    loader: "custom",
    loaderFile: "./loader.ts",
  },
};

export default nextConfig;
