let fetchImpl;

if (typeof process !== 'undefined' && process.versions?.node) {
  // 在 Node.js 环境下，使用 http 模块实现
  const https = require('http');

  fetchImpl = function (url, options = {}, responseType = 'json') {
    const { method = 'GET', headers = {} } = options;
    return new Promise((resolve, reject) => {
      const { pathname, port, hostname, search } = new URL(url);
      if (responseType === 'json' && method === 'POST') {
        headers['Content-Type'] = 'application/json';
      }
      const requestOptions = {
        hostname,
        path: pathname + search,
        method,
        port,
        headers,
      };

      const req = https.request(requestOptions, (res) => {
        let responseData = '';

        res.on('data', (chunk) => {
          responseData += chunk;
        });

        res.on('end', () => {
          if (responseType === 'json') {
            try {
              responseData = JSON.parse(responseData);
            } catch (error) {
              reject(new Error('Invalid JSON response'));
              return;
            }
          }

          resolve(responseData);
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      if (options.data) {
        try {
          if (Object.prototype.toString.call(options.data) === '[object Object]') {
            options.data = JSON.stringify(options.data);
          }
        } catch (error) {
          reject(new Error('param error'));
        }
        req.write(options.data); // 将请求数据写入请求体
      }

      req.end();
    });
  };
} else if (typeof window !== 'undefined' && typeof XMLHttpRequest !== 'undefined') {
  // 在客户端浏览器环境下，使用 XMLHttpRequest 实现
  fetchImpl = function (url, options = {}, responseType = 'json') {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          let responseData;

          if (responseType === 'json') {
            responseData = xhr.response;
          } else {
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

      xhr.responseType = responseType;
      xhr.open(options.method || 'GET', url, true); // 是否异步

      if (!options.headers?.['Content-Type'] && responseType === 'json' && options.method === 'POST') {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      if (options.headers) {
        for (const header in options.headers) {
          xhr.setRequestHeader(header, options.headers[header]);
        }
      }

      try {
        if (Object.prototype.toString.call(options.data) === '[object Object]') {
          options.data = JSON.stringify(options.data);
        }
      } catch (error) {
        reject(new Error('param error'));
      }
      xhr.send(options.data);
    });
  };
} else {
  throw new Error('Unsupported environment');
}

/**
 * 自定义实现的Fetch函数，用于发送HTTP请求
 * @param {string} url - 请求的URL
 * @param {Object} options - 请求选项，包括方法、头部和请求体等
 * @property {string} [options.method='GET'] - 请求的方法，如 GET、POST、PUT、DELETE 等
 * @property {Object} [options.headers] - 请求头部的对象，每个属性表示一个请求头的名称和对应的值
 * @property {Object | string} [options.data] - 请求的主体数据，通常在发送 POST、PUT 等带有请求体的请求时使用
 * @param {string} [responseType='json'] - 响应的数据类型，默认json，其他会处理为字符串
 * @returns {Promise} - 返回一个Promise对象，用于处理请求结果
 */
export default function fetch(url, options, responseType = 'json') {
  return fetchImpl(url, options, responseType);
}
