import type { MockConfig, MockMethod } from 'vite-plugin-mock'
import type { ATResponse } from './types'
import { getBaseUrl } from './utils'

export default (config: MockConfig): MockMethod[] => {
  const BASE_URL = getBaseUrl({
    requestBaseUrl: config.env.VITE_REQUEST_BASE_URL,
    moduleBaseUrl: '/test',
  })

  return [
    {
      url: `${BASE_URL}/get`,
      method: 'get',
      response: (): ATResponse<Record<string, unknown>> => {
        return {
          code: 0,
          data: {
            data1: 'data1',
            data2: 'data2',
            data3: 'data3',
          },
          message: 'ok',
        }
      },
    },
  ]
}
