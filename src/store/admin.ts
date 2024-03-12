import { AdminApi } from "~/apis/admin";
import { defineStore } from "pinia";
import { ref } from "vue";
import { kAuthToken, kSuccess } from "~/config";

const useAdminStore = defineStore('kAdmin', () => {
    const admin = ref<AdminApi.ILoginAdminRes | undefined>(undefined)

    /**
     * 同步信息
     * @returns 
     */
    const sync = async () => {
        const token = localStorage.getItem(kAuthToken)
        if (!token) return false
        const { code, data } = await AdminApi.sync()
        if (code === kSuccess) admin.value = data
        return code === kSuccess
    }

    /**
     * 用户登出
     */
    const logOut = async () => {
        await AdminApi.out()
        localStorage.removeItem(kAuthToken)
        admin.value = undefined
    }

    /**
     * 用户登录
     * @param req
     */
    const login = async (req: AdminApi.ILoginAdmin) => {
        const { code, data } = await AdminApi.loginAdmin(req)
        if (code === kSuccess) admin.value = data
        return code === kSuccess
    }

    /**
     * 账户注册
     * @param req
     * @returns
     */
    const codeLogin = async (req: AdminApi.ICodeLoginAdmin) => {
        const { code, data } = await AdminApi.codeLoginAdmin(req)
        if (code === kSuccess) admin.value = data
        return code === kSuccess
    }

    /**
     * 账户注册
     * @param req
     * @returns
     */
    const newAdmin = async (req: AdminApi.INewAdmin) => {
        const { code } = await AdminApi.newAdmin(req)
        return code === kSuccess
    }

    return {
        admin,

        login,
        logOut,
        sync,
        codeLogin,
        newAdmin
    }
})

export default useAdminStore