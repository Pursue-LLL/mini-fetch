# MiniFetch

miniyfetch 是一个轻量级的 JavaScript HTTP 请求库，用于发送异步 HTTP 请求。

- 用于需要兼容低版本浏览器的库或项目使用
- 可直接打包到项目内，避免引入 axios 等较重的库
- 支持 ssr 场景下使用

## 安装

使用 npm 安装该包:

``` shell
npm install miniyfetch
```

## 使用方法

从包中导入 `fetch` 函数:

```javascript
import fetch from 'miniyfetch';
```

### 示例：发起 GET 请求

```javascript
fetch('https://api.example.com/data')
  .then(response => {
    // 处理响应
  })
  .catch(error => {
    // 处理错误
  });
```

### 示例：发送 POST 请求

```javascript
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  data: {
    name: 'John Doe',
    age: 30
  }
};

fetch('https://api.example.com/user', options)
  .then(response => {
    // 处理响应
  })
  .catch(error => {
    // 处理错误
  });
```

## API

### fetch(url, options, responseType)

发送 HTTP 请求。

- `url` (string): 请求的 URL。
- `options` (object): 请求选项，包括方法、头部和请求体等。
  - `method` (string, 可选): 请求的方法，默认为 'GET'。
  - `headers` (object, 可选): 请求头部的对象，每个属性表示一个请求头的名称和对应的值。
  - `data` (object|string, 可选): 请求的主体数据，通常在发送带有请求体的 POST、PUT 等请求时使用。
- `responseType` (string, 可选): 响应的数据类型，默认为 'json'，其他值会被处理为字符串。

返回一个 Promise 对象，用于处理请求结果。Promise 解析后会返回响应数据，Promise 拒绝后会返回错误对象。

## 环境支持

支持浏览器和 NODE 环境

- 在浏览器环境下，使用 XMLHttpRequest 实现。
- 在 Node.js 环境下，使用 http 模块实现。
