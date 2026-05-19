import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

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

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
