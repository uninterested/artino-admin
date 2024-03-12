import { Message } from '@arco-design/web-vue'
import axios, { AxiosError } from 'axios'
import { kAuthToken } from '~/config'

const kTimeOut: number = 30000

const getAuthToken = () => {
    const token = localStorage.getItem(kAuthToken)
    return token ? { [kAuthToken]: token } : undefined
}

const saveToken = (token: string) => {
    if (!token) return
    localStorage.setItem(kAuthToken, token)
}

const buildError = (e: Primitive): IResponse => {
    if (e instanceof AxiosError)
        return {
            code: 400,
            message: e?.code === 'ECONNABORTED' ? '请求超时' : '请求失败'
        }
    return { code: 500, message: e?.message || e }
}

const emitError = (data: IResponse, autoEmit: boolean) => {
    if (!autoEmit || data.code === 200 || !data.message) return
    Message.error(data.message)
}

/**
 * Get请求
 * @param url 路由
 * @param params params
 * @returns
 */
export const Get = async <T>(
    url: string,
    params: POSO = {},
    autoEmit: boolean = true
): Promise<IResponse<T>> => {
    const keys = Object.keys(params || {})
    const query: string = keys.length ? `?${keys.map((k) => `${k}=${params[k]}`).join('&')}` : ''
    try {
        const { data } = await axios<IResponse>({
            url: `${url}${query}`,
            method: 'GET',
            timeout: kTimeOut,
            headers: getAuthToken()
        })
        emitError(data, autoEmit)
        return data
    } catch (e) {
        const err = buildError(e)
        emitError(err, autoEmit)
        return err
    }
}

/**
 * Post请求
 * @param url 路由
 * @param body body
 * @returns
 */
export const Post = async <T = Primitive>(
    url: string,
    body: Primitive = {},
    autoEmit: boolean = true
): Promise<IResponse<T>> => {
    try {
        const { headers, data } = await axios<IResponse>({
            url,
            method: 'POST',
            timeout: kTimeOut,
            data: body,
            headers: getAuthToken()
        })
        saveToken(headers?.[kAuthToken])
        emitError(data, autoEmit)
        return data
    } catch (e) {
        const err = buildError(e)
        emitError(err, autoEmit)
        return err
    }
}

/**
 * Delete请求
 * @param url 路由
 * @returns
 */
export const Delete = async <T = Primitive>(
    url: string,
    autoEmit: boolean = true
): Promise<IResponse<T>> => {
    try {
        const { data } = await axios<IResponse>({
            url,
            method: 'DELETE',
            timeout: kTimeOut,
            headers: getAuthToken()
        })
        emitError(data, autoEmit)
        return data
    } catch (e) {
        const err = buildError(e)
        emitError(err, autoEmit)
        return err
    }
}

/**
 * Put请求
 * @param url 路由
 * @param body 请求参数
 * @returns
 */
export const Put = async <T = Primitive>(
    url: string,
    body?: Primitive,
    autoEmit: boolean = true
): Promise<IResponse<T>> => {
    try {
        const { data } = await axios<IResponse>({
            url,
            method: 'PUT',
            data: body,
            timeout: kTimeOut,
            headers: getAuthToken()
        })
        emitError(data, autoEmit)
        return data
    } catch (e) {
        const err = buildError(e)
        emitError(err, autoEmit)
        return err
    }
}

/**
 * Patch请求
 * @param url
 * @param body
 * @param autoEmit
 * @returns
 */
export const Patch = async <T = Primitive>(
    url: string,
    body?: Primitive,
    autoEmit: boolean = true
): Promise<IResponse<T>> => {
    try {
        const { data } = await axios<IResponse>({
            url,
            method: 'PATCH',
            data: body,
            timeout: kTimeOut,
            headers: getAuthToken()
        })
        emitError(data, autoEmit)
        return data
    } catch (e) {
        const err = buildError(e)
        emitError(err, autoEmit)
        return err
    }
}

/**
 * 获取文件的二进制
 * @param url
 * @returns
 */
export const GetBlob = async (url: string) => {
    try {
        const { data } = await axios({
            url,
            method: 'GET',
            responseType: 'blob'
        })
        return data
    } catch (e) {
        return null
    }
}

/**
 * file get
 * @param url
 * @param headers
 * @returns
 */
export const FileGet = async <T = Primitive>(url: string, headers: POJO): Promise<IResponse<T>> => {
    try {
        const { data } = await axios<IResponse>({
            url,
            method: 'GET',
            timeout: kTimeOut,
            headers: { ...headers }
        })
        return data
    } catch (e) {
        return buildError(e)
    }
}

/**
 * file post
 * @param url
 * @param body
 * @param headers
 * @returns
 */
export const FilePost = async <T = Primitive>(
    url: string,
    body: ArrayBuffer,
    headers: POJO
): Promise<IResponse<T>> => {
    try {
        const { data } = await axios<IResponse<T>>({
            url,
            method: 'POST',
            timeout: kTimeOut,
            data: body,
            headers: { ...headers }
        })
        return data
    } catch (e) {
        return buildError(e)
    }
}
