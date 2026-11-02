import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NAGMA.EXE | Nagma",
    short_name: "nagma.exe",
    description: "Portfolio of Nagma, Full Stack Engineer and AI Builder.",
    start_url: "/",
    display: "browser",
    background_color: "#0e0f16",
    theme_color: "#0e0f16",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
