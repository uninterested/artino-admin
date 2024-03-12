import CryptoJS, { MD5 } from 'crypto-js'

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
