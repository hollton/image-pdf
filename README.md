# image-pdf

[![npm](https://img.shields.io/npm/v/image-pdf.svg)](https://www.npmjs.com/package/image-pdf) 
[![LICENSE MIT](https://img.shields.io/npm/l/image-pdf.svg)](https://www.npmjs.com/package/image-pdf)

image-pdf 多张图片生成PDF文件

## 使用 Usage

### npm
```
npm install image-pdf  --save

import {imagePdf} from 'image-pdf'
imagePdf(imagesData, 'title')
```

### script
```
<script src="index.js"></script>

const {imagePdf} = window.imagePdf
imagePdf(imagesData, 'title')
```

## 参数 Params
* @param {Array} images: [{
*  data 图片信息，可为 base64 信息，或 src 地址
*  width 图片宽，图片信息为 src 时可不传
*  height 图片高
* }],
* @param {String} title 下载pdf文件的名称
* @param {Object} options 配置信息，待完善

## 功能点 Feature
* 支持图片 base64 方式
* 支持图片 src 方式
* 支持分页，避免图片内容被截断