<h1 align="center">command-line-toolbox</h1>

<p align="center">🛠 收集开发中可能会高频使用的工具</p

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

* create: 创建新项目,支持模板(`ospoon/starter-ts`);
* antdv: 安装 `ant-design-vue@4.x` 到 `vue-vite-ts` 项目;
* vite: 桥接 `vite` ,创建 `vite` 内置模板项目;
* tree: 打印目录树,默认忽略`.git`, `.github`, `.vscode`, `node_modules` 和 `dist`;
* rm: 借助 `rimraf` 删除文件或文件夹;
* image: 借助 `sharp` 实现图片质量压缩, 支持格式`jpeg`, `jp2`, `jxl`, `webp`, `avif`, `heif`, `tiff`, `png`;
* gitignore: 为项目生成`.gitignore`文件;

PS: 因 `sharp` 限制, **NodeJS** 版本需满足 "^18.17.0 || ^20.3.0 || >=21.0.0";

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
