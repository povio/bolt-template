import { applyEnv, resolveConfigSync } from "@povio/resolve-config";
import tailwindCSS from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
// import { defineConfig as defineViteConfig, mergeConfig } from "vite";
import { defineConfig as defineViteConfig } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";
import tsConfigPaths from "vite-tsconfig-paths";

// import { defineConfig as defineVitestConfig } from "vitest/config";

applyEnv((resolveConfigSync({ module: "spa-deploy" }) as any).default, "__");

const isInTestMode = process.env.VITEST === "true";

// https://vite.dev/config/
const viteConfig = defineViteConfig({
  plugins: [
    tsConfigPaths(),
    !isInTestMode &&
      tanstackRouter({
        target: "react",
        autoCodeSplitting: true,
        routesDirectory: "./src/pages",
      }),
    devtools(),
    viteReact(),
    tailwindCSS(),
    !isInTestMode && devtoolsJson(),
  ],
  server: {
    open: true,
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    target: "esnext",
  },
  optimizeDeps: {
    entries: ["app/**/*.{ts,tsx}"],
  },
  worker: {
    format: "es",
  },
});

// https://vitest.dev/config/
// const vitestConfig = defineVitestConfig({
//   test: {
//     root: "./",
//     watch: false,
//     globals: true,
//     reporters: ["default"],
//   },
// });

// export default mergeConfig(viteConfig, vitestConfig);
export default viteConfig;
