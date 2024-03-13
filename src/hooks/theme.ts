const useTheme = (callback?: Noop<boolean>) => {
    const instance = window.matchMedia('(prefers-color-scheme: dark)')
    const isDark = instance.matches

    const addListener = (ev: MediaQueryListEvent) => {
        callback?.(ev.matches)
    }

    if (callback) {
        instance.addEventListener('change', addListener)
    }

    /**
     * 移除监听
     */
    const removeListener = () => {
        instance.removeEventListener('change', addListener)
    }

    return {
        isDark,
        removeListener
    }
}

export default useTheme