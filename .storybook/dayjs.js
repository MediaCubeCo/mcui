import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

const dayjsLocales = {
    en: () => import(`dayjs/locale/en`),
    es: () => import(`dayjs/locale/es`),
    pt: () => import(`dayjs/locale/pt`),
    th: () => import(`dayjs/locale/th`),
    ru: () => import(`dayjs/locale/ru`),
}

dayjs.extend(timezone)
dayjs.extend(utc)

const dayjsPlugin = {
    install(ctx) {
        ctx.prototype.$dayjs = dayjs
    }
}

export { dayjs, dayjsLocales, dayjsPlugin }
