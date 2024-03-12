<template>
  <ConfigProvider :locale="locale">
    <Skeleton v-if="!initial" />
    <RouterView v-else />
  </ConfigProvider>
</template>

<script setup lang="ts">
import Skeleton from '~/uikit/skeleton.vue'
import { computed, onMounted, ref } from 'vue'
import { ConfigProvider } from '@arco-design/web-vue'
import { RouterView, useRouter } from 'vue-router'
import useLocale from './hooks/locale';
import en from '@arco-design/web-vue/es/locale/lang/en-us'
import zh from '@arco-design/web-vue/es/locale/lang/zh-cn'
import useAdminStore from '~/store/admin';

const router = useRouter()
const initial = ref<boolean>(false)
const [{ current }] = useLocale()
const { sync } = useAdminStore()

const locale = computed(() => {
  switch (current?.value) {
    case 'en-US': return en
    default: return zh
  }
})

/**
 * 同步用户信息
 */
const syncUserInfo = async () => {
  const isSync = await sync()
  initial.value = true
  const { pathname, search } = window.location
  const fullPath = `${pathname}${search}`
  if (!isSync) {
    // 未登录或者登陆失效
    if (pathname !== '/login') router.replace(`/login?from=${encodeURIComponent(fullPath)}`)
  } else {
    router.replace(fullPath || '/')
  }
}

onMounted(() => {
  syncUserInfo()
})


</script>