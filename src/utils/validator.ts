import i18 from '~/locale'

export const required = async (value: string) => {
    if (value === undefined || value === '') return Promise.reject('rule.error.required')
    return Promise.resolve()
}

/**
 * 不能输入特殊字符
 * @param value
 * @param callback
 */
export const specialCharRule = async (value: string) => {
    const reg =
        /^[0-9a-zA-Z\u4E00-\u9FA5`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”、；‘’，。、\s]*$/
    if (reg.test(value)) return Promise.resolve()
    return Promise.reject('rule.error.special.char')
}

/**
 * 不能全是空字符串
 * @param value
 * @returns
 */
export const fullWhiteSpace = async (value: string) => {
    const reg = /\S/gi
    if (!value || reg.test(value)) return Promise.resolve()
    return Promise.reject('rule.error.full.white')
}

/**
 * 不能含有空字符串
 * @param value
 * @returns
 */
export const partialWhiteSpace = async (value: string) => {
    const reg = /^\S*$/gi
    if (!value || reg.test(value)) return Promise.resolve()
    return Promise.reject('rule.error.some.white')
}

/**
 * 手机号
 * @param value
 * @returns
 */
export const phoneCheck = async (value: string) => {
    const reg =
        /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/gi
    if (!value || reg.test(value)) return Promise.resolve()
    return Promise.reject('rule.error.phone')
}

/**
 * xss
 * @param value
 * @returns
 */
export const xssCheck = async (value: string) => {
    const reg = /<(\S*?)[^>]*>.*<\/.*?>/gi
    if (reg.test(value)) return Promise.reject('rule.error.xss')
    return Promise.resolve()
}

/**
 * 网址
 * @param value
 * @returns
 */
export const urlCheck = async (value: string) => {
    const reg =
        /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+).)+([A-Za-z0-9-~/])+$/gi
    if (!value || reg.test(value)) return Promise.resolve()
    return Promise.reject('rule.error.url')
}

/**
 * 邮箱
 * @param value
 * @returns
 */
export const emailCheck = (value: string) => {
    const reg =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi
    if (!value || reg.test(value)) return Promise.resolve()
    return Promise.reject('rule.error.email')
}

/**
 * a-z A-Z 英文
 * @param value
 * @returns
 */
export const charCheck = (value: string) => {
    const reg = /^[a-zA-Z]+$/
    if (!value || reg.test(value)) return Promise.resolve()
    return Promise.reject('rule.error.char')
}

/**
 * a-z A-Z 0-9 并且 字母开头
 * @param value
 * @returns
 */
export const charStartCheck = (value: string) => {
    const reg = /^[a-zA-Z][a-zA-Z0-9_]*$/
    if (!value || reg.test(value)) return Promise.resolve()
    return Promise.reject('rule.error.charstart')
}

/**
 * a-z A-Z 0-9 英文
 * @param value
 * @returns
 */
export const charNumberCheck = (value: string) => {
    const reg = /^[a-zA-Z0-9]+$/
    if (!value || reg.test(value)) return Promise.resolve()
    return Promise.reject('rule.error.charnumber')
}

/**
 * 变量规则
 * @param value
 * @returns
 */
export const variableCheck = (value: string) => {
    const reg = /^[a-zA-Z$_][a-zA-Z\d_]*$/gi
    if (!value || reg.test(value)) return Promise.resolve()
    return Promise.reject('rule.error.variable')
}

// rule check
/**
 * required rule
 * @param field
 * @returns
 */
export const buildRequire = () => {
    const { t } = i18.global
    return {
        required: true,
        message: t('rule.error.required')
    }
}

/**
 * custom rule check
 * @param value
 * @param rules
 * @returns
 */
export const execValidator = async (
    value: Primitive,
    rules: ((value: Primitive) => Promise<void>)[]
): Promise<undefined | string> => {
    try {
        await Promise.all(rules.map((rule) => rule(value)))
        return undefined
    } catch (e) {
        return e as string
    }
}
