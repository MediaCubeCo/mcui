import { text, boolean, object, select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import McSideBarButton from './McSideBarButton'
import {BUTTON_VARIATIONS, COLORS, SVG_ICONS} from '../../../helpers/storybook_consts'

const wrapper = () => {
    return {
        template: `<div style="background-color: #202427; width: 216px;">
        <story />
    </div>`,
    }
}

export default {
    title: 'patterns/McSideBar/McSideBarButton',
    component: McSideBarButton,
    parameters: {
        componentSubtitle: 'Status: In Progress',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=350%3A0',
        },
    },
    decorators: [wrapper],
}

const getUniqueProps = key => {
    return {
        to: {
            default: object('to', { name: 'test', params: { id: 123 } }, key),
        },
        href: {
            default: text('href', 'https://mediacube.agency/', key),
        },
        icon: {
            default: select('icon', SVG_ICONS, 'group', key),
        },
        iconColor: {
            default: text('iconColor', 'currentColor', key),
        },
        title: {
            default: text('title', 'Users', key),
        },
        compact: {
            default: boolean('compact', false, key),
        },
        info: {
            default: text('info', '1234', key),
        },
        variation: {
            default: select('variation', BUTTON_VARIATIONS, null, key),
        },
        secondaryColor: {
            default: select('secondaryColor', COLORS, null, key),
        },
        exact: {
            default: boolean('exact', false, key),
        },
        withTooltip: {
            default: boolean('withTooltip (if compact)', false, key),
        },
        withSubmenu: {
            default: boolean('withSubmenu', false, key),
        },
        withIndicator: {
            default: boolean('withIndicator', false, key),
        },
        disabled: {
            default: boolean('disabled', false, key),
        },
        isActive: {
            default: boolean('isActive', false, key),
        },
    }
}

const getCommonTags = ctx => {
    return {
        to: ctx.to,
        href: ctx.href,
        icon: ctx.icon,
        iconColor: ctx.iconColor,
        title: ctx.title,
        compact: ctx.compact,
        info: ctx.info,
        exact: ctx.exact,
        disabled: ctx.disabled,
        variation: ctx.variation,
        secondaryColor: ctx.secondaryColor,
        withTooltip: ctx.withTooltip,
        withSubmenu: ctx.withSubmenu,
        isActive: ctx.isActive,
        withIndicator: ctx.withIndicator,
    }
}

const actionsData = {
    handleClick: action('clicked'),
}

export const Default = () => ({
    components: { McSideBarButton },
    computed: {
        tagBind() {
            return getCommonTags(this)
        },
    },
    props: {
        ...getUniqueProps('default'),
    },
    methods: actionsData,
    template: `<mc-side-bar-button v-bind="tagBind" @click="handleClick" />`,
})
