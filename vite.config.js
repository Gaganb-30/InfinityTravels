import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiUrl = env.VITE_API_URL || 'http://https://infinity-travels-be.onrender.com:5000';

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        // Forward sitemap.xml and robots.txt to backend so crawlers get dynamic content
        '/sitemap.xml': {
          target: apiUrl,
          changeOrigin: true,
        },
        '/robots.txt': {
          target: apiUrl,
          changeOrigin: true,
        },
      },
    },
  };
});
