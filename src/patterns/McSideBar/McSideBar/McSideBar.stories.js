import { text, object, boolean, select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import menuMain from '../../../mocks/menuMain'
import authUser from '../../../mocks/authUser'
import menuApps from '../../../mocks/menuApps'

import McSideBar from './McSideBar'
import McSideBarTop from '../McSideBarTop/McSideBarTop'
import McSideBarCenter from '../McSideBarCenter/McSideBarCenter'
import McSideBarBottom from '../McSideBarBottom/McSideBarBottom'
import McSideBarButton from '../McSideBarButton/McSideBarButton'
import { SVG_ICONS, TITLE_VARIATION } from '../../../helpers/storybookVariables'

const wrapper = () => {
    return {
        template: `
            <div style="display: flex; height: 600px;">
                <story />
            </div>
        `,
    }
}

export default {
    title: 'Patterns/McSideBar/McSideBar',
    component: McSideBar,
    subcomponents: {
        McSideBarTop,
        McSideBarCenter,
        McSideBarBottom,
        McSideBarButton,
    },
    parameters: {
        componentSubtitle: 'Status: In progress',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=350%3A0',
        },
    },
    decorators: [wrapper],
}

const variables = {
    black: 'black',
    white: 'white',
}

const getUniqueProps = key => {
    return {
        logoTitle: {
            default: text('logoTitle', 'Dashboard', key),
        },
        logoTitleVariation: {
            default: select('logoTitleVariation', TITLE_VARIATION, 'subtitle', key)
        },
        logoSrc: {
            default: text('logoSrc', '/img/mc_dashboard.svg', key),
        },
        logoIcon: {
            default: select('logoIcon', SVG_ICONS, 'mc_dashboard', key),
        },
        menuMainTitle: {
            default: text('menuMainTitle', 'Sections', key),
        },
        chatraConfig: {
            default: object('chatraConfig', { id: 'dzDw7eBbL2ramxx25', title: 'Have questions?' }, key),
        },
        hideText: {
            default: text('hideText', 'Hide', key),
        },
        compact: {
            default: boolean('compact', false, key),
        },
        variable: {
            default: select('variable', variables, 'black', key),
        },
        width: {
            default: text('width', '216px', key),
        },
        compactWidth: {
            default: text('compactWidth', '56px', key),
        },
        absoluteBreakpoint: {
            default: text('absoluteBreakpoint', 1024, key),
        },
        hiddenBreakpoint: {
            default: text('hiddenBreakpoint', null, key),
        },
    }
}

const getCommonTags = ctx => {
    return {
        logoTitle: ctx.logoTitle,
        logoTitleVariation: ctx.logoTitleVariation,
        logoSrc: ctx.logoSrc,
        logoIcon: ctx.logoIcon,
        menuMainTitle: ctx.menuMainTitle,
        menuMain: ctx.menuMain,
        menuApps: ctx.menuApps,
        chatraConfig: ctx.chatraConfig,
        user: ctx.user,
        hideText: ctx.hideText,
        compact: ctx.compact,
        variable: ctx.variable,
        width: ctx.width,
        compactWidth: ctx.compactWidth,
        absoluteBreakpoint: ctx.absoluteBreakpoint,
        hiddenBreakpoint: ctx.hiddenBreakpoint,
    }
}

const actionsData = {
    handleCompact: action('compact'),
}

export const Default = () => ({
    components: {
        McSideBar,
    },
    computed: {
        tagBind() {
            return getCommonTags(this)
        },
        menuMain() {
            return menuMain
        },
        menuApps() {
            return menuApps
        },
        user() {
            return {
                ...authUser,
                name: `${authUser.first_name}${authUser.last_name ? ` ${authUser.last_name}` : ''}`,
            }
        },
    },
    props: {
        ...getUniqueProps('default'),
    },
    methods: actionsData,
    template: `<mc-side-bar v-bind="tagBind" @compact="handleCompact" />`,
})
