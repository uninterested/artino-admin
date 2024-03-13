import { ref, type Ref } from 'vue'
import type { IPageMethodProps, IPageResultProps } from '../types'
import { useRoute, useRouter } from 'vue-router'
import useAdminStore from '~/store/admin'
import useForm from '~/hooks/useForm'
import { CodeApi } from '~/apis/code'
import { kSuccess } from '~/config'
import { Md5 } from '~/utils/crypto'
import { Message } from '@arco-design/web-vue'
import { useI18n } from 'vue-i18n'

const usePagehooks = (): [IPageResultProps, IPageMethodProps] => {
  const userStore = useAdminStore()
  const route = useRoute()
  const router = useRouter()
  const { t } = useI18n()

  //#region export variable
  /** 是不是登录面板 */
  const isLogin = ref<boolean>(true)
  /** 是否密码登录 */
  const isPwdLogin = ref<boolean>(false)
  /** register */
  const formDataReg = ref<POJO>({})
  /** register */
  const formRefReg = useForm()
  /** login */
  const formDataLog = ref<POJO>({})
  /** login */
  const formRefLog = useForm()
  /** 登录倒计时 */
  const logCountdown = ref<number>(0)
  /** 注册倒计时 */
  const regCountdown = ref<number>(0)
  /** 是否是扫码 */
  const isScanCode = ref<boolean>(false)
  /** 二维码数据 */
  const qrcode = ref<string | undefined>(undefined)

  //#endregion

  //#region export methods
  /**
   * 登录
   * @returns
   */
  const login = async () => {
    const error = await formRefLog.value?.validate()
    if (error) return
    let success = false
    if (isPwdLogin.value) {
      success = await userStore.login({
        account: formDataLog.value.account,
        password: Md5(formDataLog.value.pwd)
      })
    } else {
      success = await userStore.codeLogin({
        account: formDataLog.value.account,
        code: formDataLog.value.code
      })
    }
    if (success) {
      Message.success(t('user.login.success'))
      const from = route.query.from ? decodeURIComponent(route.query.from as string) : '/'
      router.replace(from as string)
    }
  }

  /**
   * 注册
   */
  const register = async () => {
    const error = await formRefReg.value?.validate()
    if (error) return
    const success = await userStore.newAdmin({
      account: formDataReg.value.account,
      password: Md5(formDataReg.value.pwd),
      code: formDataReg.value.code
    })
    if (success) {
      Message.success(t('user.register.success'))
      isLogin.value = true
      isPwdLogin.value = true
    }
  }

  /**
   * 发送验证码
   * @returns
   */
  const sendCode = async () => {
    const isLoginMode = isLogin.value
    if (isLoginMode) {
      const error = await formRefLog.value?.validateField('account')
      if (error) return
      if (logCountdown.value > 0) return
    } else {
      const error = await formRefReg.value?.validateField('account')
      if (error) return
      if (regCountdown.value > 0) return
    }
    const { code } = await CodeApi.sendCode({
      account: isLoginMode ? formDataLog.value.account : formDataReg.value.account,
      type: isLoginMode ? CodeApi.EType.FASTLOGIN : CodeApi.EType.REGISTER
    })
    if (code === kSuccess) {
      if (isLoginMode) {
        logCountdown.value = 60
        countDown(logCountdown)
      } else {
        regCountdown.value = 60
        countDown(regCountdown)
      }
    }
  }

  /**
   * 倒计时
   * @param value
   */
  const countDown = (value: Ref<number>) => {
    setTimeout(() => {
      if (value.value <= 0) {
        value.value = 0
        return
      }
      value.value--
      countDown(value)
    }, 1000)
  }

  /**
   * 切换扫码登录
   */
  const toggleCodeLogin = () => {
    isScanCode.value = !isScanCode.value
    if (isScanCode.value && !qrcode.value) {
      console.log('333: ', 'fetch')
    }
  }
  //#endregion

  return [
    {
      logCountdown,
      regCountdown,
      isLogin,
      isPwdLogin,
      formDataReg,
      formRefReg,
      formDataLog,
      formRefLog,
      isScanCode,
      qrcode
    },
    {
      login,
      register,
      sendCode,
      toggleCodeLogin
    }
  ]
}

export default usePagehooks
