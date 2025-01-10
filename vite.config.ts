// vite.config.js

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";
import path from "path";
// import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import { VuetifyResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";

const proxyObject = {
  target: "http://localhost:8080",
  ws: true,
  changeOrigin: true,
};
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        // Vuetify
        VuetifyResolver(),
      ],
    }),
  ],
  resolve: {
    alias:
      // Issue caused by https://github.com/vitejs/vite-plugin-vue2/issues/55
      // when we switch to vue 3 { "@": path.resolve(__dirname, "./src"), },
      [
        { find: "@", replacement: path.resolve(__dirname, "./src") },
        // required to ensure that the vuetify types can be resolved
        {
          find: "vuetify/types",
          replacement: path.resolve(__dirname, "./src"),
        },
      ],
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
  server: {
    port: 8081,
    proxy: {
      "/api": {
        // target: "https://dev.orgbook.gov.bc.ca",
        target: "http://host.docker.internal:8080",
        changeOrigin: true,
      },
    },
  },
  build: {
    target: "esnext", //browsers can handle the latest ES features
  },
});
