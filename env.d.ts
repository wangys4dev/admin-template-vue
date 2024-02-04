/// <reference types="vite/client" />
interface ImportMetaEnv {
  /**
   * 应用名称, 在 .env 中定义
   *
   * @default 'Admin Template'
   */
  readonly VITE_APP_TITLE: string

  /**
   * 是否启用 mock, 在 .env.development 中定义
   *
   * @default 'true'
   */
  readonly VITE_MOCK_ENABLE: 'true' | 'false'

  /**
   * 应用级请求前缀, 在 .env 中定义
   *
   * @default '/api'
   */
  readonly VITE_REQUEST_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
