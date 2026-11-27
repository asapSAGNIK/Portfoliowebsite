import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sagnik Chowdhury — Full-Stack & AI Engineer",
    short_name: "Sagnik",
    description:
      "Portfolio, selected builds, and resume of Sagnik Chowdhury, a full-stack and AI engineer in Kolkata.",
    start_url: "/",
    display: "standalone",
    background_color: "#0e0e10",
    theme_color: "#0e0e10",
    icons: [
      {
        src: "/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
