import { resolve } from 'path'
import { defineConfig } from '@playwright/experimental-ct-vue'

import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  // testDir: './test',
  use: {
    trace: 'on-first-retry',
    ctViteConfig: {
      plugins: [
        vue(),
        AutoImport({
          imports: [
            'vue',
            'vue-router',
            '@vueuse/head',
            'pinia',
            {
              '@/store': ['useStore'],
            },
          ],
          // eslintrc: {
          //   enabled: true,
          // },
        }),
        Components({
          dirs: ['src/views/login'],
          extensions: ['vue'],
        }),
      ],
      resolve: {
        alias: {
          '@': resolve(__dirname, './src'),
        },
      },
      server: {
        host: '0.0.0.0',
        port: 1002,
        open: false,
        proxy: {
          '/api': {
            target: 'http://localhost:3002',
            changeOrigin: true, // 允许跨域
            rewrite: path => path.replace('/api/', '/'),
          },
        },
      },
      build: {
        reportCompressedSize: false,
        sourcemap: false,
        commonjsOptions: {
          ignoreTryCatch: false,
        },
      },
    },
  },
})
