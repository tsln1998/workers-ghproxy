# ![GitHub](https://github.githubassets.com/favicons/favicon.svg) Workers ghproxy

[English](README.md)

一个运行在 Cloudflare Workers 上的 GitHub 反向代理

# 如何使用

直接在 GitHub 文件下载链接上添加前缀即可

## ✨ 基础用例

#### 下载 GitHub Gist:

`https://workers-ghproxy.tsln19981107.workers.dev/https://gist.githubusercontent.com/tsln1998/586393bf537d4d84117cd9758ada0421/raw/welcome.txt`

## 🪄 使用魔法！

你可以替换响应体中的任何字符串，只需要设置 `__replace` 查询参数即可

像下面这样:

- `https://workers-ghproxy.tsln19981107.workers.dev/https://gist.githubusercontent.com/tsln1998/586393bf537d4d84117cd9758ada0421/raw/welcome.txt?__replace={"Hello":"Hi"}`

- `https://workers-ghproxy.tsln19981107.workers.dev/https://gist.githubusercontent.com/tsln1998/586393bf537d4d84117cd9758ada0421/raw/welcome.txt?__replace={"ghproxy":"by Cloudflare"}`

# 如何部署

环境需求:
  - wrangler >= 2.16.0
  - node.js >= 18

```shell
$ git clone https://github.com/tsln1998/workers-ghproxy
$ cd workers-ghproxy
$ yarn dev # or yarn deploy
```

# 开源协议

WTFPL
