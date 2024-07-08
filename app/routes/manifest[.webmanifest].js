import { json } from "@remix-run/node";

export const clientLoader = () => {
  return json(
    {
      short_name: "MEGIC",
      name: "MEGIC",
      start_url: "/",
      display: "standalone",
      background_color: "#d3d7dd",
      theme_color: "#c34138",
      icons: [
        {
          src: "icons/512.png",
          type: "image/png",
          sizes: "512x512",
        },
      ],
    },
    {
      headers: {
        "Cache-Control": "public, max-age=600",
        "Content-Type": "application/manifest+json",
      },
    }
  );
};
