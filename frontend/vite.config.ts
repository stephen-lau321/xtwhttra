import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/xtwhttra/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "一街一师一乐器",
        short_name: "街乐",
        description: "找到身边的音乐社交活动",
        theme_color: "#8B5E3C",
        background_color: "#FAF6F1",
        icons: [
          { src: "/xtwhttra/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/xtwhttra/icon-512.png", sizes: "512x512", type: "image/png" },
        ],
      },
    }),
  ],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api/v1"),
      },
    },
  },
});