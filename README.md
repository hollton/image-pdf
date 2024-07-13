# image-pdf

![](https://flat.badgen.net/npm/v/image-pdf)
![](https://flat.badgen.net/bundlephobia/minzip/image-pdf)
![](https://flat.badgen.net/npm/license/image-pdf)
![](https://flat.badgen.net/npm/dt/image-pdf)

基于 [jsPDF](https://github.com/parallax/jsPDF) 将图片或文字信息转成 PDF 文件，搭配[html2ImageStream](https://github.com/hollton/html2ImageStream)可实现 HTML 页面截图导出为 PDF

## 功能点 Feature
* 支持图片 base64 方式
* 支持图片 src 方式
* 支持中文文字
* 支持分页，避免图片内容被截断
* 支持异步回调

## 效果 Demo
* [CodeSandbox Demo](https://codesandbox.io/s/tm7so)
* [生成的 PDF](https://pan.baidu.com/s/17CJ2IBCLCSLdmnxcEud9Tg)

## 使用 Usage

### npm
```
npm install image-pdf  --save

import imagePdf from 'image-pdf'
imagePdf(imagesData, 'title', options)
```

### script
```
<script src="index.js"></script>

const {imagePdf} = window.imagePdf
imagePdf(imagesData, 'title', options)
```

## 参数 Params

| 参数名      | 描述           | 默认值 | 必填 |
| ---------- | --------        | ----- | --- |
| imagesData | 图片、文字信息  |   -   | Y |
| title      | 生成pdf名称    |   -    | Y |
| options    | 额外配置       |   -   | N |

### imagesData 图片、文字信息
| 参数名  | 描述      | 默认值 | 必填 |
| ------- | --------  | ----- | --- |
| type    | 插入类型  | image | N，image 图片类型，text 文字类型，page 新增空白页 |
| data    | 插入内容  |   -   | Y，type=image 时可为 base64 或 src 地址；type=text时为文字内容 |
| width   | 图片宽度  |   -   | N，data为 图片src 时可不传 |
| height  | 图片高度  |   -   | N，同上 |
| options | 文字配置  |   -   | N |

#### imagesData - options 文字配置
| 参数名      | 描述     | 默认值 | 必填     |
| ----------- | -------- | ----- | --------- |
| fontSize    | 文字大小 | 16    | N，单位px |
| spacing    | 间距     |   5   | N，单位px |
| textIndent | 文字缩进 |   0   | N，单位px |

### options 额外配置
| 参数名      | 描述         | 默认值                    | 必填 |
| ----------- | ------------ | ------------------------- | --- |
| pagePadding | pdf 间距     | { width: 20, height: 25 } | N，单位px |
| initFont    | 中文字体支持 |              -            | N，安装引入'jspdf-font'，支持'SongtiSCBlack'字体 |

## 返回 Return
```
imagePdf(imagesData, 'title', options).then(result => {
    console.log(result)
}, error => {
    console.log(error)
})
```
