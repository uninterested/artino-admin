import { Post } from '~/utils/http'

export namespace CodeApi {
    /**
     * 发送验证码
     * @param req 
     * @returns 
     */
    export const sendCode = async (req: ISendCodeReq): Promise<IResponse<undefined>> => {
        return Post('/api/code/send', req)
    }

    export enum EType {
        /** 注册 */
        REGISTER = 0,
        /** 重置密码 */
        RESETPASSWORD = 1,
        /** 快速登录 */
        FASTLOGIN = 2
    }

    export interface ISendCodeReq {
        /** 账号 */
        account: string
        /** 类别 */
        type: EType
    }
}