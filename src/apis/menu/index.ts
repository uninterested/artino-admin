import type { IPageResultProps } from '~/pages/login/types'
import { Delete, Get, Post, Put } from '~/utils/http'

export namespace MenuApi {
    /**
     * 新增菜单
     * @param req 
     * @returns 
     */
    export const newMenu = async (req: INewMenuVO): Promise<IResponse<undefined>> => {
        return await Post('/api/menu', req)
    }

    /**
     * 删除菜单
     * @param id 
     * @returns 
     */
    export const deleteMenu = async (id: string): Promise<IResponse<undefined>> => {
        return await Delete(`/api/menu/${id}`)
    }

    /**
     * 更新菜单
     * @param id id
     * @param req value
     * @returns 
     */
    export const updateMenu = async (id: string, req: Partial<Omit<INewMenuVO, 'parentId' | 'type'>>): Promise<IResponse<undefined>> => {
        return await Put(`/api/menu/${id}`, req)
    }

    /**
     * 获取当前登录用户的可访问的菜单 Tree
     * @returns 
     */
    export const tree = async () => {
        return await Get('/api/menu/tree')
    }

    /**
     * 获取系统的菜单 Tree
     * @returns 
     */
    export const systemTree = async () => {
        return await Get('/api/menu/system.tree')
    }

    /**
     * 获取所有的可访问的菜单列表
     * @returns 
     */
    export const list = async () => {
        return await Get('/api/menu/list')
    }

    /**
     * 分页获取系统的菜单列表
     * @param req 
     * @returns 
     */
    export const systemList = async (req: ISystemMenuListVO): Promise<IResponse<PageRes<AdminMenuListRes>>> => {
        return await Post('/api/menu/system.list', req)
    }


    // interface =====

    export interface AdminMenuListRes extends IIdModel {
        /** 父级菜单id */
        parentId: string
        /** 名称 */
        name: string
        /** 值 */
        value?: string
        /** 图标 */
        icon?: string
        /** 类型 */
        type: EMenuType
        /** 路由 */
        url?: string
        /** 创建时间 */
        createdAt: string
        /** 子菜单 */
        children?: AdminMenuListRes[]
    }

    export enum EMenuType {
        /** 菜单 */
        MENU = 0,
        /** 路由 */
        ROUTE = 1,
        /** 按钮 */
        BUTTON = 2
    }

    export interface INewMenuVO {
        /** 父级id */
        parentId: string
        /** 菜单名 */
        name: string
        /** 菜单类型 */
        type: EMenuType
        /** 菜单值 */
        value?: string
        /** icon */
        icon?: string
        /** 路由 */
        url?: string
    }

    export interface ISystemMenuListVO extends PageReq {
        /** 关键词 */
        keyword?: string
        /** 类别 */
        type?: EMenuType
        /** 创建时间 */
        createdAt?: string[]
    }
}