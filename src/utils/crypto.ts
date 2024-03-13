import CryptoJS, { AES, enc, mode, pad, DES, MD5, SHA256 } from 'crypto-js'



/**
 * aes 加密
 * @param message 
 * @param iv 
 * @param key 
 * @returns 
 */
export const encodeWithAes = (message: string, iv: string, key: string) => {
    const value = AES.encrypt(enc.Utf8.parse(message), enc.Utf8.parse(Md5(key)), {
        iv: enc.Utf8.parse(Md5(iv)),
        mode: mode.CBC,
        padding: pad.Pkcs7
    })
    return value.ciphertext.toString()
}

/**
 * aes 解密
 * @param message 
 * @param iv 
 * @param key 
 * @returns 
 */
export const decodeWithAes = (message: string, iv: string, key: string) => {
    return AES.decrypt(enc.Base64.stringify(enc.Hex.parse(message)), enc.Utf8.parse(Md5(key)), {
        iv: enc.Utf8.parse(Md5(iv)),
        mode: mode.CBC,
        padding: pad.Pkcs7
    }).toString(enc.Utf8).toString()
}


/**
 * des 加密
 * @param message 明文
 * @param key 密钥
 * @returns 
 */
export const encodeWithDes = (message: string, key: string) => {
    const value = DES.encrypt(message, enc.Utf8.parse(Md5(key)), {
        mode: mode.ECB,
        padding: pad.Pkcs7
    }).toString()
    return value
}

/**
 * des 解密
 * @param message 密文
 * @param key 密钥
 * @returns 
 */
export const decodeWithDes = (message: string, key: string) => {
    const value = DES.decrypt(message, enc.Utf8.parse(Md5(key)), {
        mode: mode.ECB,
        padding: pad.Pkcs7
    }).toString(enc.Utf8)
    return value
}

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