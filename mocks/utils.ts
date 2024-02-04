import { join } from 'node:path'
import { normalizePath } from 'vite'

/**
 * 获取最终的请求前缀
 *
 * @param [requestBaseUrl] - 应用级请求前缀
 * @param moduleBaseUrl - 模块级请求前缀
 * @returns requestBaseUrl 和 moduleBaseUrl 拼接后的请求前缀
 */
export function getBaseUrl({
  requestBaseUrl,
  moduleBaseUrl,
}: {
  /**
   * 应用级请求前缀
   *
   * @default '/api'
   */
  requestBaseUrl: string

  /**
   * 模块级请求前缀
   *
   * @default '/'
   */
  moduleBaseUrl: string
}): string {
  requestBaseUrl = requestBaseUrl || '/api'
  moduleBaseUrl = moduleBaseUrl || '/'
  const baseUrl = normalizePath(join(requestBaseUrl, moduleBaseUrl))
  return baseUrl
}
