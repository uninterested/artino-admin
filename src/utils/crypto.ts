import CryptoJS, { MD5, SHA256 } from 'crypto-js'

/**
 * md5加密
 * @param input
 * @returns
 */
export const Md5 = (input: string | number[] | ArrayBuffer): string => {
    if (input instanceof ArrayBuffer || input instanceof Array)
        return MD5(CryptoJS.lib.WordArray.create(input as Primitive))
            .toString()
            .toLowerCase()
    return MD5(input).toString().toLowerCase()
}

/**
 * sha256加密
 * @param input 
 * @returns 
 */
export const Sha256 = (input: CryptoJS.lib.WordArray | string): string => {
    return SHA256(input).toString()
}

/**
 * 获取浏览器指纹
 * @returns 
 */
export const fingerPrint = (): Promise<string> => {

    const createFP = () => {
        const outScreenCanvas = document.createElement('canvas')
        const ctx = outScreenCanvas.getContext("2d")!
        const txt = "BrowserLeaks,com <canvas> 1.0"
        ctx.textBaseline = "top";
        ctx.font = "14px 'Arial'";
        ctx.textBaseline = "alphabetic";
        ctx.fillStyle = "#f60";
        ctx.fillRect(125, 1, 62, 20);
        ctx.fillStyle = "#069";
        ctx.fillText(txt, 2, 15);
        ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
        ctx.fillText(txt, 4, 17);
        const canvasImageData = outScreenCanvas.toDataURL()
        return Sha256(canvasImageData)
    }

    return new Promise((res) => {
        if (window.requestIdleCallback) {
            window.requestIdleCallback(() => {
                res(createFP())
            })
        } else {
            setTimeout(() => {
                res(createFP())
            }, 1000);
        }
    })
}