# image-pdf

[![npm](https://img.shields.io/npm/v/image-pdf.svg)](https://www.npmjs.com/package/image-pdf) 
[![LICENSE MIT](https://img.shields.io/npm/l/image-pdf.svg)](https://www.npmjs.com/package/image-pdf)

image-pdf 图片或文字信息转成PDF文件

## 功能点 Feature
* 支持图片 base64 方式
* 支持图片 src 方式
* 支持文字
* 支持分页，避免图片内容被截断
* 支持异步回调

## 效果 Demo
* [Demo 代码](https://github.com/hollton/image-pdf/blob/master/examples/index.html)
* [生成的 PDF](https://pan.baidu.com/s/17CJ2IBCLCSLdmnxcEud9Tg)

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
*  type 插入类型，image 图片类型，text 文字类型。默认 image
*  data 插入内容，image 时可为 base64 信息，或 src 地址；text 时为文字内容
*  width 图片宽，图片信息为 src 时可不传
*  height 图片高
*  options: { 文字配置信息
*   FontSize: 20, 文字大小
*   Font: 'times', 字体
*   FontType: 'bold' 字体样式 bold加粗，italic斜体，bolditalic加粗斜体
*  }
* }],
* @param {String} title 下载pdf文件的名称
* @param {Object} options 配置信息，待完善

## 返回 Return
```
imagePdf(imagesData, 'title').then(result => {
    console.log(result)
}, error => {
    console.log(error)
})
```