# ![GitHub](https://github.githubassets.com/favicons/favicon.svg) Workers ghproxy

[简体中文](README.zh-cn.md)

A GitHub reverse proxy running on Cloudflare Workers.

# How to Use

Simply add a prefix to the GitHub file download link.

## ✨ Basic Example

#### Download a GitHub Gist:

`https://workers-ghproxy.tsln19981107.workers.dev/https://gist.githubusercontent.com/tsln1998/586393bf537d4d84117cd9758ada0421/raw/welcome.txt`

## 🪄 Use the Magic!

You can replace any string in the response body by setting the __replace query parameter.

Like this:

- `https://workers-ghproxy.tsln19981107.workers.dev/https://gist.githubusercontent.com/tsln1998/586393bf537d4d84117cd9758ada0421/raw/welcome.txt?__replace={"Hello":"Hi"}`

- `https://workers-ghproxy.tsln19981107.workers.dev/https://gist.githubusercontent.com/tsln1998/586393bf537d4d84117cd9758ada0421/raw/welcome.txt?__replace={"ghproxy":"by Cloudflare"}`

# How to Deploy

Environment requirements:
  - wrangler >= 2.16.0
  - node.js >= 18

```shell
$ git clone https://github.com/tsln1998/workers-ghproxy
$ cd workers-ghproxy
$ yarn dev # or yarn deploy
```

# License

WTFPL
