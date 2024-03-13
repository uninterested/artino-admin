import type { Form } from '@arco-design/web-vue'
import type { Ref } from 'vue'

export interface IPageResultProps {
  logCountdown: Ref<number>
  regCountdown: Ref<number>
  isLogin: Ref<boolean>
  isPwdLogin: Ref<boolean>
  formDataReg: Ref<POJO>
  formRefReg: Ref<InstanceType<typeof Form> | undefined>
  formDataLog: Ref<POJO>
  formRefLog: Ref<InstanceType<typeof Form> | undefined>
  isScanCode: Ref<boolean>
  qrcode: Ref<string | undefined>
}

export interface IPageMethodProps {
  login: AsyncNoop
  register: AsyncNoop
  sendCode: AsyncNoop,
  toggleCodeLogin: Noop
}
