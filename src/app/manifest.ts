import { config } from "@/config";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: config.appName,
    short_name: config.appShortName,
    description: config.appDescription,
    start_url: "/",
    id: "/",
    icons: [
      {
        src: "/android-chrome-144x144.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/home-1920x1080.png",
        sizes: "1920x1080",
        type: "image/png",
        form_factor: "wide",
        label:
          "Desktop view showing the home page hero section and the first featured project",
      },
      {
        src: "/home-750x1334.png",
        sizes: "750x1334",
        type: "image/png",
        form_factor: "narrow",
        label:
          "Mobile view showing the home page hero section and the first featured project",
      },
    ],
    theme_color: "#12022c",
    background_color: "#12022c",
    display: "standalone",
    categories: ["portfolio", "development", "web development"],
    prefer_related_applications: false,
    display_override: ["window-controls-overlay"],
    launch_handler: {
      client_mode: ["navigate-existing", "auto"],
    },
  };
}
