/**
 * Web Font Loader takes care of Vue Design System’s font loading.
 * For full documentation, see: https://github.com/typekit/webfontloader
 */
import WebFont from "webfontloader"

WebFont.load({
  google: {
    families: ["Montserrat:500,600"],
  },
  custom: {
    families: ['Font Awesome\ 5 Icons:400,900', 'Font Awesome\ 5 Brands:400'],
    urls: ['https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css']
  },
})
