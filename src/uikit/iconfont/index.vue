<template>
    <IconFont :class="props.class" :type="props.type" :size="props.size" :rotate="props.rotate" />
</template>
<script setup lang="ts">
import { Icon } from '@arco-design/web-vue'
import { iconfontUrl } from '~/config'
interface IIconFontProps {
    type: string
    size?: string | number
    rotate?: number | undefined
    tintColor?: string
    class?: string
}
const props = defineProps<IIconFontProps>()
const IconFont = Icon.addFromIconFontCn({ src: iconfontUrl })
</script>