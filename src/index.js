/**
 * imagePdf 图片或文字信息转成PDF文件
 * @param {Array} images: [{
 *  type 插入类型，image 图片类型，text 文字类型。默认 image
 *  data 插入内容，image 时可为 base64 信息，或 src 地址；text 时为文字内容
 *  width 图片宽，图片信息为 src 时可不传
 *  height 图片高，
 *  options: { 文字配置信息，非必须
 *   FontSize: 20, 文字大小
 *  }
 * }],
 * @param {String} title 下载pdf文件的名称
 * @param {Object} options { 配置信息
 *  fontFamily: 'Microsoft YaHei' 字体名称
 * }
 * @return promise.then
 * 支持图片 base64 方式
 * 支持图片 src 方式
 * 支持中文文字
 * 支持分页，避免图片内容被截断
 * 支持异步回调
 */
import jsPDF from 'jspdf'
import initFont from 'jspdf-font'

// A4纸宽高
const a4Page = {
    width: 595.28,
    height: 841.89
}

// pdf页面间距
// 设置height在长图拼接时有重复图片片段问题
const padding = {
    width: 20,
    height: 0
}

// 生成的pdf的宽高
const pdfPage = {
    width: a4Page.width - padding.width * 2,
    height: a4Page.height - padding.height * 2
}

let pdf
let fontFamily
const defaultFontFamly = 'Microsoft YaHei'

// pdf插入内容的位置
let pdfPostion = padding.height

// 插入图片
const addImage = img => {
    const imgPage = {
        width: pdfPage.width,
        height: img.height / img.width * pdfPage.width
    }
    if (imgPage.height > pdfPage.height) { // 图片高于一页pdf高度时，将图片截断生成多页pdf
        let _pdfPostion = pdfPostion
        let imgHeight = imgPage.height
        while (imgHeight > 0) {
            pdf.addImage(img.data, 'jpeg', padding.width, _pdfPostion, imgPage.width, imgPage.height)
            _pdfPostion -= pdfPage.height;
            imgHeight += _pdfPostion;
            if (imgHeight > 0) {
                pdf.addPage();
                pdfPostion = imgHeight
                _pdfPostion += padding.height
            }
        }
    } else { // 否则将图片插入到pdf中，若pdf剩余高度不足以插入整张图时，新增一页并将插入位置重置
        if (pdfPostion + imgPage.height > pdfPage.height) {
            pdf.addPage()
            pdfPostion = padding.height
        }
        pdf.addImage(img.data, 'jpeg', padding.width, pdfPostion, imgPage.width, imgPage.height)
        pdfPostion += imgPage.height
    }
}

// 插入文字
const addText = text => {
    const {FontSize = 16} = text.options
    if (pdfPostion + FontSize > pdfPage.height) {
        pdf.addPage()
        pdfPostion = padding.height
    }
    Object.keys(text.options).forEach(key => {
        pdf[`set${key}`](text.options[key])
    })
    pdf.setFont(fontFamily)
    pdf.text(padding.width, pdfPostion + FontSize, text.data)
    pdfPostion += FontSize
}

/**
 * base64图片数组生成pdf
 * @param {*} images base64图片数组
 * @param {*} title 下载pdf文件的名称
 * @param {*} options 配置信息
 */
const savePdf = (images, title, options) => {
    images.forEach(img => {
        switch (img.type) {
            case 'image':
                addImage(img)
                break
            case 'text':
                addText(img)
                break
            default:
                break
        }
    })
    return pdf.save(`${title}.pdf`, {
        returnPromise: true
    })
}

/**
 * 图片转为base64信息
 * img: 图片dom
 */
const getBase64Image = img => {
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext("2d")
    ctx.drawImage(img, 0, 0, img.width, img.height)
    return canvas.toDataURL('image/jpeg', 0.5)
}

/**
 * 处理src图片转为base64并执行生成pdf
 * @param {*} images 图片数组，可为 base64 信息，或 src 地址
 * @param {*} title 下载pdf文件的名称
 * @param {*} options 配置信息
 */

const imagePdf = (images, title = 'hollton', options = {}) => {
    fontFamily = options.fontFamily || defaultFontFamly
    initFont(jsPDF.API, fontFamily)
    pdf = new jsPDF('', 'pt', 'a4')

    let newImages = []
    let index = 0
    const formatImages = (index, resolve, reject) => {
        if (index < images.length) {
            const img = images[index]
            let _img = {
                type: img.type || 'image',
                data: img.data || '',
                width: img.width || 100,
                height: img.height || 100,
                options: img.options || {}
            }
            if(_img.type === 'image' && _img.data.indexOf('data:image/') === -1) {
                const newImg = new Image()
                newImg.onload = () => {
                    _img.data = getBase64Image(newImg)
                    _img.width = newImg.width
                    _img.height = newImg.height
                    newImages.push(_img)
                    formatImages(++index, resolve, reject)
                }
                newImg.onerror = () => {
                    formatImages(++index, resolve, reject)
                }
                newImg.setAttribute('crossOrigin', 'anonymous')
                newImg.src = _img.data
            } else {
                newImages.push(_img)
                formatImages(++index, resolve, reject)
            }
        } else {
            savePdf(newImages, title, options)
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                reject(error)
            })
        }
    }
    
    const promise = new Promise((resolve, reject) => {
        formatImages(index, result => {
            resolve(result)
        }, error => {
            reject(error)
        })
    })
    return promise
}

export { imagePdf }
export default imagePdf
