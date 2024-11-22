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

// const vueI18nPlugin = {
// 	name: "vue-i18n",
// 	transform(code, id) {
// 		if (!/vue&type=i18n/.test(id)) {
// 			return;
// 		}
// 		if (/\.ya?ml$/.test(id)) {
// 			code = JSON.stringify(require("js-yaml").load(code.trim()));
// 		}
// 		return `export default Comp => {
//       Comp.i18n = ${code}
//     }`;
// 	},
// };

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // vueI18nPlugin, // ({
    // 	include: path.resolve(__dirname, "./src/i18n/**"),
    // 	strictMessage: false,
    // })
    Components({
      resolvers: [
	// Vuetify
	VuetifyResolver(),
      ],
    }),
  ],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: {
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
  server: {
    proxy: {
      "/api": {
	target: "https://dev.orgbook.gov.bc.ca",
	// Uncomment below to point to a local API
	// target: 'http://host.docker.internal:8080',
	changeOrigin: true,
      },
    },
  },
});
