// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ protocol: "https", hostname: "storage.googleapis.com",  pathname: '**',}],
  }
}

module.exports = nextConfig


// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images: {
//     remotePatterns: [{ protocol: "https", hostname: "storage.googleapis.com",  pathname: '**',}],
//   },
// };

// export default nextConfig;
