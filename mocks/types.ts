export interface ATResponse<T> {
  /**
   * 错误码
   *
   * @default 0 - 没有错误
   */
  code: number

  /**
   * 数据
   */
  data: T

  /**
   * 附加信息
   */
  message: string
}
