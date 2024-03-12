/**
 * uuid
 * @returns
 */
export const uuid = (): string => {
    return 'xxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0
        const v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString()
    })
}

/**
 * 当前时间戳
 * @returns
 */
export const timespan = (): string => {
    return Date.now().toString()
}

/**
 * 获取随机长度的字符串
 * @param length
 */
export const randomStr = (length: number = 7, charStart: boolean = false): string => {
    const key = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const ret = []
    while (ret.length < length) {
        const ramdom = (Math.random() * 62) << 0
        ret.push(key[ramdom])
    }
    if (charStart) {
        const idx = ((Math.random() * 52) << 0) + 10
        ret[0] = key[idx]
    }

    return ret.join('')
}

/**
 * 随机字符串 + 字母开头
 * @param length
 * @returns
 */
export const randomChar = (length: number = 7): string => {
    return randomStr(length, true)
}
