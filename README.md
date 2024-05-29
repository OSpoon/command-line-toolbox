<h1 align="center">command-line-toolbox</h1>

<p align="center">🛠 收集开发中可能会高频使用的工具</p>

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

## Install

```bash
# 全局安装
npm install command-line-toolbox -g
```

## Features

| command | description | dependencies |
|-------|-------|-------|
| `clt create` | 创建新项目 | `ospoon/starter-ts` |
| `clt rm` | 递归地删除“path”下的所有文件和文件夹 | `rimraf` |
| `clt kill` | 释放端口对应的进程 |  |
| `clt gitignore` | 生成`.gitignore`文件 |  |
| `clt tree` | 打印目录树 |  |
| `clt antdv` | 安装 `ant-design-vue@4.x` 到 `vue-vite-ts` 项目 | `ant-design-vue` |
| `clt mkcert` | 生成本地可信任的开发证书 | `mkcert` |

### 创建新项目

```bash
# default
clt create

# all options
clt create <project-name> --template=ospoon/starter-ts --description=<description> --force
```

PS: 目前仅内置 `ospoon/starter-ts` 模板.

### 删除文件夹

```bash
# all options
clt rm <path> [<path> ...]
```

### 释放端口

```bash
# all options
clt kill <port>
```

### 生成 `.gitignore` 文件

```bash
# default
clt gitignore

# all options
clt gitignore --template=<name>
```

PS: 模版名称首字母需大写, 模板数据来源[gitignore](https://github.com/github/gitignore).

## License

[MIT](./LICENSE) License © 2023-PRESENT [OSpoon](https://github.com/ospoon)

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/command-line-toolbox?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/command-line-toolbox
[npm-downloads-src]: https://img.shields.io/npm/dm/command-line-toolbox?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/command-line-toolbox
[bundle-src]: https://img.shields.io/bundlephobia/minzip/command-line-toolbox?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=command-line-toolbox
[license-src]: https://img.shields.io/github/license/ospoon/command-line-toolbox.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/ospoon/command-line-toolbox/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/command-line-toolbox
