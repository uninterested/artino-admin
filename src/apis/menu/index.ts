import { Get, Post } from '~/utils/http'

export namespace MenuApi {
    /**
     * 新增菜单
     * @param req 
     * @returns 
     */
    export const newMenu = async (req: INewMenuVO): Promise<IResponse<undefined>> => {
        return await Post('/api/menu', req)
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
}