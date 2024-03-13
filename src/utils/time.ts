import dayjs from 'dayjs'
import { kTimeFmt } from '~/config'

export const fmt = (date?: dayjs.ConfigType) => {
    return dayjs(date).format(kTimeFmt)
}
