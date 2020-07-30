import Vue from "vue"
import VueLazyload from 'vue-lazyload'
import "xe-utils"
import VXETable from "vxe-table"

// for fix error: `Property or method "toJSON" is not defined on the instance but referenced during render`
Vue.prototype.toJSON = function () {
  return this
}
Vue.use(VueLazyload)
Vue.use(VXETable)