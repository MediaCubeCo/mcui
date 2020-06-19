const svgIconsReq = require.context('!!raw-loader!../assets/icons', true, /.\.svg$/)
const svgIcons = svgIconsReq.keys().map(name => ({ name, content: svgIconsReq(name).default }))
export default svgIcons