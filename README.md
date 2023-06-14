# MiniFetch

MiniFetch 是一个轻量级的 JavaScript HTTP 请求库，用于发送异步 HTTP 请求。

## 安装

你可以通过以下方式安装 MiniFetch：

### 使用 npm 或 Yarn 安装

```bash
npm install minifetch
```

或

```bash
yarn add minifetch
```

### 直接下载

你可以直接下载 `minifetch.js` 文件，并在你的项目中引入它。

```html
<script src="minifetch.js"></script>
```

## 使用

使用 MiniFetch 非常简单。你可以调用 `fetch` 函数来发送 HTTP 请求。

```javascript
fetch(url, options, responseType)
  .then(response => {
    // 处理成功响应
  })
  .catch(error => {
    // 处理错误
  });
```

### 参数

- `url`：请求的 URL 地址。
- `options`：一个包含请求选项的对象，包括方法、头部和请求体等。
- `responseType`：响应的数据类型，可以是 `'json'`
ASSISTANT -> ALL
、`'text'`、`'blob'` 等，默认为 `'json'`。

#### `options` 对象的属性

- `method`：请求的方法，如 GET、POST、PUT、DELETE 等，默认为 `'GET'`。
- `headers`：请求头部的对象，每个属性表示一个请求头的名称和对应的值。
- `body`：请求的主体数据，通常在发送 POST、PUT 等带有请求体的请求时使用。

### 返回值

`fetch` 函数返回一个 Promise 对象，用于处理请求的结果。你可以使用 `.then()` 处理成功的响应，使用 `.catch()` 处理错误。

### 示例

发送一个 GET 请求：

```javascript
fetch('https://api.example.com/data', {})
  .then(response => {
    // 处理成功响应
  })
  .catch(error => {
    // 处理错误
  });
```

发送一个带有请求体的 POST 请求：

```javascript
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: {
    username: 'example',
    password: 'password'
  }
};

fetch('https://api.example.com/login', options)
  .then(response => {
    // 处理成功响应
  })
  .catch(error => {
    // 处理错误
  });
```
