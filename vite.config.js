import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https:://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          compatConfig: {
            MODE: 2,
          },
        },
      },
    }),
  ],
  resolve: {
    alias: {
      vue: "@vue/compat",
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
                    @import "@/styles/style.scss";
                `,
      },
    },
  },
  build: {
    sourcemap: true,
  },
  server: {
    proxy: {
      "/api": {
        target: "https://orgbook.gov.bc.ca",
        // target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
});
