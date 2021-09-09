import { defineConfig } from "vite"

// Note to self: I set things up such that Typescript is transpiled with TSC for production
// rather than esbuild. This is because esbuild doesn't handle const enums properly
// and the output is artifically large. 

export default defineConfig({
  // Information on why this is set up the way it is:
  // https://vitejs.dev/guide/build.html#library-mode
  build: {
    target: "esnext",
    lib: {
      entry: "./dist_ts/index.js",
      name: "kanjidic_api",
      fileName: (format) => `kanjidic_api.${format}.js`,
    },
  },
})