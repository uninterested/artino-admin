import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export const KLocaleKey: string = 'KLang'

const useLocale = () => {
    const i18n = useI18n()

    const lang = localStorage.getItem(KLocaleKey) || (navigator.language?.includes('zh') ? 'zh-CN' : 'en-US')

    /**
     * 当前的语言
     */
    const current = ref<TLanguage>(lang as TLanguage)

    /**
     * 修改语言
     * @param nextLang 要切换的语言
     * @returns 
     */
    const changeLanguage = (nextLang: TLanguage) => {
        if (current.value === nextLang) return
        current.value = nextLang
        i18n.locale.value = nextLang
        localStorage.setItem(KLocaleKey, nextLang)
    }

    return [
        { current },
        { changeLanguage }
    ]

}

export default useLocale