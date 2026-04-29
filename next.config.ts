import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    localPatterns: [
      {
        pathname: "/api/authors/*/image",
      },
      {
        pathname: "/api/books/*/image",
      },
      {
        pathname: "/default-avatar.png",
      },
    ],
  },
};

export default nextConfig;
