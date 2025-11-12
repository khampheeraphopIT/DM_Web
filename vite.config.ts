import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // อนุญาตให้ทุก host เข้าถึงใน dev
    port: 5173,
  },
  preview: {
    host: true, // อนุญาตทุก host
    port: parseInt(process.env.PORT || "4173"),
    allowedHosts: ["caneapi.onrender.com"], // เพิ่ม host ของคุณที่ Render
  },
});
