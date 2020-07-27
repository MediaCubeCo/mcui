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
    urls: ['//use.fontawesome.com/releases/v5.0.8/css/all.css']
  },
})
