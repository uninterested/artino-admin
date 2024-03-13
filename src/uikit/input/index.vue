<script lang="tsx">
import { Input } from '@arco-design/web-vue'
import { defineComponent, h } from 'vue'
import { useI18n } from 'vue-i18n'


export default defineComponent({
    setup(_, { attrs, slots }) {
        const { t } = useI18n()
        return () => h(Input, {
            allowClear: true,
            placeholder: t('common.input').format(''),
            ...attrs
        }, slots)
    }
})
</script>