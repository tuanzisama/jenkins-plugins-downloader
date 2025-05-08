import { defineConfig } from 'vite'
import { fileURLToPath, URL } from "node:url";
import vue from '@vitejs/plugin-vue'
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { TDesignResolver } from "unplugin-vue-components/resolvers";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia',],
      resolvers: [TDesignResolver({ library: "vue-next" })]
    }),
    Components({ resolvers: [TDesignResolver({ library: "vue-next" })] }),
  ],
  resolve: {
    alias: [{ find: "@", replacement: fileURLToPath(new URL("./src", import.meta.url)) }],
  },
  server: {
    proxy: {
      '/jks-api': {
        target: 'https://archives.jenkins.io/',
        secure: false,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/jks-api/, ''),
      }
    }
  }
})