import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [
    react(),
    // VitePWA({
    //   manifest: {
    //     name: "Tapciify web",
    //     short_name: "Tapciify",
    //     icons: [
    //       {
    //         src: "pwa-64x64.png",
    //         sizes: "64x64",
    //         type: "image/png",
    //       },
    //       {
    //         src: "pwa-192x192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //       {
    //         src: "pwa-512x512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //         purpose: "any",
    //       },
    //       {
    //         src: "maskable-icon-512x512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //         purpose: "maskable",
    //       },
    //     ],
    //   },
    // }),
  ],
});
