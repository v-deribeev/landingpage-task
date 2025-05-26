// vite.config.js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import path from "path";

const generateUniquePrefix = () =>
  `svgid-${Math.random().toString(36).substring(2, 7)}-`;

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader({
      svgoConfig: {
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                removeTitle: false,
                removeDesc: false,
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: `
@use "@/styles/_variables.sass" as *
@use "@/styles/_mixins.sass" as *
@use "@/styles/_inlineClasses.sass" as *
`,
      },
    },
  },
});
