import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "storage.googleapis.com", pathname: "**" },
    ],
    unoptimized: true,
  },
  output: "standalone",
  async rewrites() {
    return {
      beforeFiles: [
        // {
        //   source: "/_next/image", // Match /_next/image and anything after
        //   has: [
        //     {
        //       type: "query",
        //       key: "url",
        //       value: "(https?:\\/\\/.*)", // Ensure the URL starts with http or https
        //     },
        //   ],
        //   destination: "http://:url",
        //   basePath: false,
        // },
        // {
        //   source: "/_next/image", // Match /_next/image and anything after
        //   has: [
        //     {
        //       type: "query",
        //       key: "url",
        //       value: "https://(?<imageurl>.*)",
        //     },
        //   ],
        //   destination: ":imageurl",
        //   // destination: "/api/debug-rewrite?url=:imageurl",
        //   basePath: false,
        // },
        // {
        //   source: "/_next/image/:path*", // Match /_next/image and anything after
        //   destination: "https://picsum.photos/200/300",
        // },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
