import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "storage.googleapis.com", pathname: "**" },
    ],
  },
  output: "standalone",
  async headers() {
    return [
      {
        source: "/(_next/static.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
          {
            key: "MATHUSAN_HEADER",
            value: "YES",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
