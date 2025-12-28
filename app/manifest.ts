import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dream Map - Transforme sonhos em metas",
    short_name: "Dream Map",
    start_url: "/",
    display: "standalone",
    background_color: "#fefdfb",
    theme_color: "#d4af37",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
