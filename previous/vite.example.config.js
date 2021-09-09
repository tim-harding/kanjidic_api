const { defineConfig } = require("vite")
const { svelte } = require("@sveltejs/vite-plugin-svelte")

module.exports = defineConfig({
  build: {
    target: "esnext",
    outDir: "distExample",
  },
  plugins: [
    svelte(),
  ],
});