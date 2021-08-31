const path = require("path")
const vue = require("@vitejs/plugin-vue")
const { defineConfig } = require("vite")

// Note to self: I set things up such that Typescript is transpiled with TSC for production
// rather than esbuild. This is because esbuild doesn't handle const enums properly
// and the output is artifically large. 

module.exports = defineConfig({
  // Information on why this is set up the way it is:
  // https://vitejs.dev/guide/build.html#library-mode
  build: {
    lib: {
      entry: path.resolve(__dirname, "distTs/lib/index.js"),
      name: "kanjidic_api",
      fileName: (format) => `kanjidic_api.${format}.js`
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn"t be bundled
      // into your library
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue"
        }
      }
    }
  },
})