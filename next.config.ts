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
  // async rewrites() {
  //   return [
  //     {
  //       source: "/_fah/images/:path*",
  //       destination:
  //         "https://us-central1-fir-testing-89aa3.cloudfunctions.net/ext-image-processing-api-handler/:path*",
  //     },
  //   ];
  // },
};

export default nextConfig;
