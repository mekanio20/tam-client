import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";
import AutoImport from "unplugin-auto-import/vite";
import Components from 'unplugin-vue-components/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", "vue-router", "pinia", "@vueuse/core"],
      dirs: ["src/components", "src/views", "src/layouts", "src/composables", "src/stores"],
    }),
    Components({
      dirs: ['src/components', 'src/views', 'src/composables', 'src/stores'],
      deep: true
    })
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
  },
});
