import { Get, Post } from '~/utils/http'

export namespace AdminApi {

    /**
    * 用户注册
    * @param req
    * @returns
    */
    export const newAdmin = async (req: INewAdmin): Promise<IResponse<undefined>> => {
        return await Post('/api/admin', req)
    }

    /**
     * 用户登录
     * @param req 
     * @returns 
     */
    export const loginAdmin = async (req: ILoginAdmin): Promise<IResponse<ILoginAdminRes>> => {
        return await Post('/api/admin/login', req)
    }

    /**
     * 同步用户信息
     * @returns 
     */
    export const sync = async (): Promise<IResponse<ILoginAdminRes>> => {
        return await Get('/api/admin/sync')
    }

    /**
    * 用户登录
    * @param req 
    * @returns 
    */
    export const codeLoginAdmin = async (req: ICodeLoginAdmin): Promise<IResponse<ILoginAdminRes>> => {
        return await Post('/api/admin/code.login', req)
    }

    /**
     * 账号退出
     * @returns 
     */
    export const out = async () => {
        return await Get('/api/admin/out')
    }

    /**
     * 为用户设置角色
     * @param id 
     * @param req 
     * @returns 
     */
    export const setRole = async (id: string, req: ISetRoleReq): Promise<IResponse<undefined>> => {
        return await Post(`/api/admin/setRole/${id}`, req)
    }


    export interface INewAdmin {
        /** 账号 */
        account: string
        /** 密码 */
        password: string
        /** 验证码 */
        code: string
        /** 昵称 */
        nickName?: string
    }

    export interface ILoginAdmin {
        /** 账号 */
        account: string
        /** 密码 */
        password: string
    }

    export interface ICodeLoginAdmin {
        /** 账号 */
        account: string
        /** 验证码 */
        code: string
    }

    export interface ISetRoleReq {
        /** 是不是管理员 */
        isAdmin?: boolean
        /** 设置的角色 */
        roleIds?: string[]
    }

    export enum ESEX {
        /** 未知 */
        UNKNOWN = 0,
        /** 男 */
        MALE = 1,
        /** 女 */
        FEMALE = 2,
        /** 保密 */
        SECRET = 3
    }

    export interface ILoginAdminRes extends IIdModel {
        /** 昵称 */
        nickName: string
        /** 邮箱 */
        email: string
        /** 手机号 */
        phone: string
        /** 性别 */
        sex: ESEX
        /** 头像 */
        avatar: string
        /** 余额 */
        balance: string
        /** 备注 */
        remark: string
        /** 创建时间 */
        createdAt: string
    }
}
