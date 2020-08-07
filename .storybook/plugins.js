import Vue from "vue"
import VueLazyload from 'vue-lazyload'
import "xe-utils"
import VXETable from "vxe-table"
import VueSlideoutPanel from 'vue2-slideout-panel'
import VModal from 'vue-js-modal'

// for fix error: `Property or method "toJSON" is not defined on the instance but referenced during render`
Vue.prototype.toJSON = function () {
  return this
}
Vue.use(VueLazyload)
Vue.use(VXETable)
Vue.use(VueSlideoutPanel)
Vue.use(VModal)