import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import 'xe-utils'
import VXETable from 'vxe-table'
import VueSlideoutPanel from 'vue2-slideout-panel'
import VueBus from 'vue-bus'
import Toasted from 'vue-toasted'
import PortalVue from 'portal-vue'
import VueJSModal from 'vue-js-modal'

import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

import 'dayjs/locale/en'
import 'dayjs/locale/es'
import 'dayjs/locale/pt'
import 'dayjs/locale/th'
import 'dayjs/locale/ru'

dayjs.extend(timezone)
dayjs.extend(utc)

// for fix error: `Property or method "toJSON" is not defined on the instance but referenced during render`
Vue.prototype.toJSON = function() {
    return this
}
Vue.use(VueLazyload)
Vue.use(VXETable)
Vue.use(VueJSModal)
Vue.use(VueSlideoutPanel)
Vue.use(VueBus)
Vue.use(Toasted, {
    theme: 'toasted-primary',
    position: 'bottom-center',
    duration: 3000,
    className: ['mc-toast', 'mc-toast--primary'],
    keepOnHover: true,
})
Vue.use(PortalVue)
Vue.use({
    install(ctx) {
        ctx.prototype.$dayjs = dayjs
    },
})

export { dayjs }
