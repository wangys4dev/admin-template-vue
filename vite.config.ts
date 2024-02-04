import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import AutoImport from 'unplugin-auto-import/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

import { viteMockServe as Mock } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/styles/element-plus/index.scss" as *;
            @use "@/assets/styles/variables.scss" as *;
          `,
        },
      },
    },
    plugins: [
      AutoImport({
        dts: './auto-imports.d.ts',
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
        },
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
          }),
        ],
      }),
      Components({
        dirs: [],
        dts: './components.d.ts',
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
          }),
          IconsResolver({
            customCollections: ['custom'],
            enabledCollections: ['ep'],
            prefix: 'icon',
          }),
        ],
        types: [],
      }),
      Icons({
        autoInstall: true,
        customCollections: {
          custom: FileSystemIconLoader('./src/assets/icons'),
        },
      }),
      Mock({
        enable: command === 'serve' && env.VITE_MOCK_ENABLE === 'true',
        ignore: /^.*(?<!\.mock\.ts)$/,
        // 函数形式有问题, 不符合 ignore 语义, 处理逻辑与正则形式不统一
        // 已提 issue ==> https://github.com/vbenjs/vite-plugin-mock/issues/125
        // 已提 pr ==> https://github.com/vbenjs/vite-plugin-mock/pull/128
        // ignore: (fileName) => !fileName.endsWith('.mock.ts'),
        mockPath: 'mocks',
      }),
      vue(),
      vueJsx(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: true,
      open: true,
    },
  }
})
