<template>
    <Spin :size="38" loading class="spin" :tip="t('skeleton.sync')">
        <div class="w-screen h-screen flex flex-col">
            <div class="flex flex-row h-14 border-b border-solid border-alpha px-4 items-center justify-between">
                <div class="bg-alpha w-48 h-10"></div>
                <div class="flex flex-row items-center">
                    <div class="bg-alpha w-16 h-5 mr-3"></div>
                    <div class="bg-alpha w-16 h-5 mr-3"></div>
                    <div class="bg-alpha w-16 h-5 mr-3"></div>
                    <SkeletonShape shape="circle" size="small" />
                </div>
            </div>
            <div class="flex flex-1 overflow-hidden">
                <div class="h-full w-52 border-r border-solid border-alpha">
                    <Skeleton>
                        <Space class="mt-2" direction="vertical" :style="{ width: '100%' }" size="large">
                            <SkeletonLine :rows="tree.length" :widths="tree" :line-height="28" />
                        </Space>
                    </Skeleton>
                </div>
                <div class="h-full flex flex-1 flex-col">
                    <div class="flex mt-3">
                        <div class="flex flex-1 bg-alpha ml-3 h-48 rounded-md"></div>
                        <div class="flex flex-1 bg-alpha ml-3 h-48 rounded-md"></div>
                    </div>
                    <div class="flex mt-4">
                        <div class="bg-alpha h-8 w-20 rounded-tl-md rounded-tr-sm ml-3"></div>
                        <div class="bg-alpha h-8 w-20 rounded-tl-md rounded-tr-sm ml-1"></div>
                        <div class="bg-alpha h-8 w-20 rounded-tl-md rounded-tr-sm ml-1"></div>
                        <div class="bg-alpha h-8 w-20 rounded-tl-md rounded-tr-sm ml-1"></div>
                    </div>
                    <div class="bg-alpha flex flex-1 ml-3 mt-px"></div>
                </div>
            </div>
        </div>
    </Spin>
</template>
<script setup lang="ts">
import { Skeleton, Space, SkeletonLine, SkeletonShape, Spin } from '@arco-design/web-vue'
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const tree = ref<string[]>(new Array(20).fill('').map(() => `${(Math.random() * 100 + 1) / 2 + 50}%`))
const { t } = useI18n()

</script>
<style lang="scss">
.spin {
    .arco-spin-mask {
        background-color: transparent;
    }
}
</style>