import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("react") && id.includes("react-dom")) {
            return "vendor";
          }
          if (id.includes("@tanstack/react-query")) {
            return "query";
          }
          if (id.includes("react-router-dom")) {
            return "router";
          }
        },
      },
    },
  },
});
