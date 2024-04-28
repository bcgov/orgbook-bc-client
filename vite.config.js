import path from 'path';
import { defineConfig } from "vite";
// import vue from '@vitejs/plugin-vue';
import vue2 from '@vitejs/plugin-vue2';

// Only required for Vuetify2
import { VuetifyResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';

// https:://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue2(),
        Components({
            resolvers: [
                VuetifyResolver()
            ]
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src")
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                    @import "@/styles/style.scss";
                `,
            }
        }
    },
    build: {
        sourcemap: true
    },
    server: {
        proxy: {
            "/api": {
                target: "https://orgbook.gov.bc.ca",
                // target: "http://localhost:8080",
                changeOrigin: true
            },
        }
    }
})