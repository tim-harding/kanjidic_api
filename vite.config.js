const path = require("path")
const { defineConfig } = require("vite")
const solidPlugin = require("vite-plugin-solid")

// Note to self: I set things up such that Typescript is transpiled with TSC for production
// rather than esbuild. This is because esbuild doesn't handle const enums properly
// and the output is artifically large. 

module.exports = defineConfig({
  // Information on why this is set up the way it is:
  // https://vitejs.dev/guide/build.html#library-mode
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
    lib: {
      entry: path.resolve(__dirname, "distTs/lib/index.js"),
      name: "kanjidic_api",
      fileName: (format) => `kanjidic_api.${format}.js`
    },
  },
  plugins: [solidPlugin()],
})