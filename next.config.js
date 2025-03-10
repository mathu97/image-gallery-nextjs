// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ protocol: "https", hostname: "storage.googleapis.com",  pathname: '**',}]
  }
}

module.exports = nextConfig

