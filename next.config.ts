import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "storage.googleapis.com", pathname: "**" },
    ],
  },
  output: "standalone",
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/_next/image",
          has: [
            {
              type: "query",
              key: "url",
              value: "http://(?<host>.+)/(?<path>.+)",
            },
          ],
          destination: "http://:host/:path",
          basePath: false,
        },
        {
          source: "/_next/image",
          has: [
            {
              type: "query",
              key: "url",
              value: "https://(?<host>.+)/(?<path>.+)",
            },
          ],
          // destination: "https://picsum.photos/200/300",
          destination: "https://:host/:path",
          basePath: false,
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  // async rewrites() {
  //   return {
  //     beforeFiles: [
  //       // {
  //       //   source: "/_next/image", // Match /_next/image and anything after
  //       //   has: [
  //       //     {
  //       //       type: "query",
  //       //       key: "url",
  //       //       value: "(https?:\\/\\/.*)", // Ensure the URL starts with http or https
  //       //     },
  //       //   ],
  //       //   destination: "http://:url",
  //       //   basePath: false,
  //       // },
  //       // {
  //       //   source: "/_next/image", // Match /_next/image and anything after
  //       //   has: [
  //       //     {
  //       //       type: "query",
  //       //       key: "url",
  //       //       value: "https://(?<imageurl>.*)",
  //       //     },
  //       //   ],
  //       //   destination: ":imageurl",
  //       //   // destination: "/api/debug-rewrite?url=:imageurl",
  //       //   basePath: false,
  //       // },
  //       // {
  //       //   source: "/_next/image/:path*", // Match /_next/image and anything after
  //       //   destination: "https://picsum.photos/200/300",
  //       // },
  //     ],
  //     afterFiles: [],
  //     fallback: [],
  //   };
  // },
};

export default nextConfig;
