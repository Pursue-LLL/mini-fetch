/**
 * 自定义实现的Fetch函数，用于发送HTTP请求
 * @param {string} url - 请求的URL
 * @param {Object} options - 请求选项，包括方法、头部和请求体等
 * @param {string} [options.method='GET'] - 请求的方法，如 GET、POST、PUT、DELETE 等
 * @param {Object} [options.headers] - 请求头部的对象，每个属性表示一个请求头的名称和对应的值
 * @param {string} [options.body] - 请求的主体数据，通常在发送 POST、PUT 等带有请求体的请求时使用
 * @param {string} [responseType='json'] - 响应的数据类型，可以是 'json'、'text'、'blob' 等
 * @returns {Promise} - 返回一个Promise对象，用于处理请求结果
 */
function fetch(url, options, responseType = 'json') {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // 处理请求完成的回调函数
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        let responseData;

        // 根据响应类型解析数据
        switch (responseType) {
          case 'json':
            responseData = JSON.parse(xhr.responseText);
            break;
          case 'text':
            responseData = xhr.responseText;
            break;
          case 'blob':
            responseData = xhr.response;
            break;
          // 添加其他类型的处理逻辑
          default:
            responseData = xhr.responseText;
        }

        resolve(responseData);
      } else {
        reject(new Error(xhr.statusText));
      }
    };

    xhr.onerror = () => {
      reject(new Error('Network error'));
    };

    xhr.open(options.method || 'GET', url, true);

    // 检查是否为跨域请求
    const isCrossOrigin = url.indexOf(window.location.origin) !== 0;
    if (isCrossOrigin) {
      // 设置Origin头部
      xhr.setRequestHeader('Origin', window.location.origin);
    }

    // 设置请求头
    if (options.headers) {
      for (const header in options.headers) {
        xhr.setRequestHeader(header, options.headers[header]);
      }
    }

    xhr.responseType = responseType;
    try {
      options.body = JSON.stringify(options.body);
    } catch (error) {
      reject(new Error('param error'))
    }
    xhr.send(options.body);
  });
}
