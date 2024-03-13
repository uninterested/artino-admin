<script lang="tsx">
import { defineComponent, h, ref } from 'vue'
import { Button } from '@arco-design/web-vue'
import { throttle, debounce } from 'lodash'
type Primitive = string | boolean | number | null | undefined | any
export default defineComponent({
    setup(props, { attrs, slots }) {
        const loading = ref<boolean>(false)
        const mode = attrs.mode

        const onClickFn = (e: MouseEvent) => {
            const clickFn = attrs.onClickFn as ((e?: MouseEvent) => Promise<Primitive> | Primitive)
            const result = clickFn?.(e)
            if (result instanceof Promise) {
                loading.value = true
                result.finally(() => loading.value = false)
            }
        }

        const execFn = !mode ? onClickFn
            : mode === 'throttle' ? throttle(onClickFn, 250, { leading: true, trailing: false })
                : debounce(onClickFn, 250, { leading: false, trailing: true })

        return () => {
            return h(Button, {
                ...attrs,
                loading: loading.value,
                onClick: execFn,
            }, slots)
        }
    },
})
</script>