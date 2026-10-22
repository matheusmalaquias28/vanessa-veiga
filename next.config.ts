import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Site 100% estático: sem Cache Components, para que as páginas desmontem
  // na navegação e os ScrollTriggers/Lenis sejam recriados de forma previsível.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
    qualities: [75, 85],
  },
  turbopack: {
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
