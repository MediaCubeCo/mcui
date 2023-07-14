import { text, object, boolean } from '@storybook/addon-knobs'
import menuMain from '../../../mocks/menuMain'
import authUser from '../../../mocks/authUser'

import McSideBarCenter from './McSideBarCenter'
import McSideBarButton from '../McSideBarButton/McSideBarButton'

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
    title: 'Patterns/McSideBar/McSideBarCenter',
    component: McSideBarCenter,
    subcomponents: {
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

const getUniqueProps = key => {
    return {
        title: {
            default: text('title', 'Sections', key),
        },
        chatraConfig: {
            default: object('chatraConfig', { id: 'dzDw7eBbL2ramxx25', title: 'Have questions?' }, key),
        },
        compact: {
            default: boolean('compact', false, key),
        },
    }
}

const getCommonTags = ctx => {
    return {
        title: ctx.title,
        menuMain: ctx.menuMain,
        chatraConfig: ctx.chatraConfig,
        user: ctx.user,
        compact: ctx.compact,
    }
}

export const Default = () => ({
    components: {
        McSideBarCenter,
    },
    computed: {
        tagBind() {
            return getCommonTags(this)
        },
        menuMain() {
            return menuMain
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
    template: `<mc-side-bar-center v-bind="tagBind" />`,
})
