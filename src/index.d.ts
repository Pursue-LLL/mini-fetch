/**
 * 自定义实现的Fetch函数，用于发送HTTP请求
 * @param url - 请求的URL
 * @param options - 请求选项，包括方法、头部和请求体等
 * @param responseType - 响应的数据类型，默认json，其他会处理为字符串
 * @returns 返回一个 Promise 对象，用于处理请求结果
 */
declare function fetch<T>(
  url: string,
  options?: {
    method?: string;
    headers?: { [key: string]: string };
    data?: Object | string;
  },
  responseType?: 'json' | string
): Promise<T>;

export default fetch;
