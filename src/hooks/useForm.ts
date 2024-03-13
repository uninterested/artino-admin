import type { Form } from '@arco-design/web-vue'
import { ref, type Ref } from 'vue'

const useForm = (): Ref<InstanceType<typeof Form> | undefined> => {
    const instance = ref<InstanceType<typeof Form>>()
    return instance
}

export default useForm
