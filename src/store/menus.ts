import { defineStore } from "pinia";
import { ref } from "vue";
import { MenuApi } from "~/apis/menu";

const useMenuStores = defineStore('kMenu', () => {
    const cacheKey: string = 'kCacheMenu'

    const tree = ref<MenuApi.AdminMenuListRes[] | undefined | null>(
        localStorage.getItem(cacheKey)
            ? JSON.parse(localStorage.getItem(cacheKey)!)
            : undefined
    )

    const syncMenu = async () => {
        const { data } = await MenuApi.tree()
        if (data) {
            console.log('dddd: ', data)
        } else {
            tree.value = []
        }
    }

    return {
        tree,

        syncMenu
    }
})

export default useMenuStores