import { Md5 } from '~/utils/crypto'
import { FileGet, FilePost } from './http'
import { kSuccess, mockFileUrl, storageHost } from '~/config'

export interface IFilelice {
    start: number
    end: number
}

export interface IFileInfoProps {
    /** md5 */
    md5: string
    /** 文件名 */
    fileName: string
    /** 文件大小 */
    size: number
    /** 文件array buffer */
    bf: ArrayBuffer
}

/** 切片大小 */
const kSlicePer = 1 * 1000 * 1000
/** 并发数 */
const kParallelCount = 5

const getFileInfo = (file: File): Promise<IFileInfoProps> => {
    return new Promise((resolve) => {
        const fileReader = new FileReader()
        fileReader.onload = (res) => {
            const result = res.target?.result! as ArrayBuffer
            const md5str = Md5(result)
            resolve({
                md5: md5str,
                size: file.size,
                bf: result,
                fileName: `${md5str}.${file.name.split('.').pop()}`
            })
        }
        fileReader.readAsArrayBuffer(file)
    })
}
const check = async (info: IFileInfoProps): Promise<Primitive> => {
    const { md5, size, fileName, bf } = info
    const headers = {
        hash: md5,
        'content-range': `0-${size}/${size}`,
        filename: fileName
    }
    const { code, data } = await FileGet<POJO>(`${storageHost}/file/check`, headers)
    let slices: IFilelice[] = []
    if (code === kSuccess) {
        if (data!.exists === 'full') {
            return {
                success: true,
                size,
                fileName,
                md5
            }
        } else {
            slices = getFileSlice(data!.exists === 'partical' ? data!.ranges : [`0-${size}`], size)
        }
    } else {
        slices = getFileSlice([`0-${size}`], size)
    }
    const result = await uploadInQueue(slices, bf, headers, size)
    if (!result) return { success: false }
    return {
        success: true,
        size,
        fileName,
        md5
    }
}
/**
 *获取未上传的文件切片
 * @param ranges
 * @param size
 * @returns
 */
const getFileSlice = (ranges: string[], size: number): IFilelice[] => {
    const ret: IFilelice[] = []
    ranges.forEach((range) => {
        const [start, end] = range.split('-')
        const startNum = +start
        const endNum = +end
        const skip = endNum - startNum
        if (skip > kSlicePer) {
            let offset = startNum
            while (offset < endNum) {
                ret.push({
                    start: offset,
                    end: Math.min(offset + kSlicePer, size)
                })
                offset = Math.min(offset + kSlicePer, size)
            }
        } else {
            ret.push({ start: startNum, end: endNum })
        }
    })
    return ret
}
/**
 * 队列上传
 * @param tasks
 * @param bf
 * @param headers
 * @param size
 * @param parallelCount
 * @returns
 */
const uploadInQueue = async (
    tasks: IFilelice[],
    bf: ArrayBuffer,
    headers: POJO,
    size: number,
    parallelCount: number = kParallelCount
): Promise<Primitive> => {
    return new Promise((resolve) => {
        if (tasks.length <= 0) {
            resolve(undefined)
            return
        }
        const upload = async (start: number, end: number) => {
            const result = await FilePost(`${storageHost}/file/bytes`, bf.slice(start, end), {
                ...headers,
                'content-range': `${start}-${end}/${size}`
            })
            return result
        }

        const _runTask = async (slice: IFilelice) => {
            try {
                const { code, data } = await upload(slice.start, slice.end)
                if (code === kSuccess) {
                    if (data) resolve(data)
                } else {
                    tasks.push(slice)
                }
            } catch (e) {
                tasks.push(slice)
            } finally {
                if (tasks.length) {
                    _runTask(tasks.shift()!)
                }
            }
        }
        let i = 0
        while (i < parallelCount && i < tasks.length) {
            _runTask(tasks.shift()!)
            i++
        }
    })
}
/**
 * 上传文件
 * @param file
 * @returns
 */
export const upload = async (file: File): Promise<string | undefined> => {
    if (process.env.NODE_ENV === 'development' && mockFileUrl) {
        return Promise.resolve(mockFileUrl)
    }
    const info = await getFileInfo(file)
    const { success, fileName } = await check(info)
    if (success) return `${storageHost}/file/${fileName}`
    return undefined
}
