// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ protocol: "https", hostname: "storage.googleapis.com",  pathname: '**',}],
    // unoptimized: false,
  }
}

module.exports = nextConfig

