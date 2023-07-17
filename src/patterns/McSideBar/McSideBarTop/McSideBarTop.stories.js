import {text, boolean, select} from '@storybook/addon-knobs'
import McSideBarTop from '../McSideBarTop/McSideBarTop'
import menuApps from '../../../mocks/menuApps'
import { SVG_ICONS, TITLE_VARIATION } from '../../../helpers/storybookVariables'

const wrapper = () => {
    return {
        template: `
            <div style="background-color: #202427; width: 216px;">
                <story />
            </div>
        `,
    }
}

export default {
    title: 'Patterns/McSideBar/McSideBarTop',
    component: McSideBarTop,
    parameters: {
        componentSubtitle: 'Status: In progress',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=350%3A0',
        },
    },
    decorators: [wrapper],
}

const getUniqueProps = key => {
    return {
        logoTitle: {
            default: text('logoTitle', 'Dashboard', key),
        },
        logoSrc: {
            default: text('logoSrc', '/img/mc_dashboard.svg', key),
        },
        logoIcon: {
            default: select('logoIcon', SVG_ICONS, 'mc_dashboard', key),
        },
        compact: {
            default: boolean('compact', false, key),
        },
        logoTitleVariation: {
            default: select('logoTitleVariation', TITLE_VARIATION, 'subtitle', key)
        },
        dropdownPosition: {
            default: select('dropdownPosition', ['left', 'right'], 'left', key),
        },
    }
}

const getCommonTags = ctx => {
    return {
        logoTitle: ctx.logoTitle,
        logoSrc: ctx.logoSrc,
        compact: ctx.compact,
        menuApps: ctx.menuApps,
        logoTitleVariation: ctx.logoTitleVariation,
        logoIcon: ctx.logoIcon,
        dropdownPosition: ctx.dropdownPosition,
    }
}

export const Default = () => ({
    components: { McSideBarTop },
    computed: {
        tagBind() {
            return getCommonTags(this)
        },
        menuApps() {
            return menuApps
        },
    },
    props: {
        ...getUniqueProps('default'),
    },
    template: `<mc-side-bar-top v-bind="tagBind" />`,
})
