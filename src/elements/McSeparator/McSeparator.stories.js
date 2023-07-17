import { select } from '@storybook/addon-knobs'

import McSeparator from './McSeparator'
import { getTokensByType, getTokenGroup } from '../../utils/getTokens'

const wrapper = () => {
    return {
        template: `<div style="width: 100%;"><story /></div>`,
    }
}

export default {
    title: 'Elements/McSeparator',
    component: McSeparator,
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=81%3A788',
        },
    },
    decorators: [wrapper],
}

const tokenColors = getTokensByType('color')
const weights = {
    s: 's',
    m: 'm',
}
const spaces = getTokenGroup('spaces')
const computedSpaces = {
    ...spaces,
    none: '',
}

const getCommonTags = ctx => {
    return {
        weight: ctx.weight,
        color: ctx.color,
        indentTop: ctx.indentTop,
        indentBottom: ctx.indentBottom,
        indentLeft: ctx.indentLeft,
        indentRight: ctx.indentRight,
        indentX: ctx.indentX,
        indentY: ctx.indentY,
    }
}

export const Default = () => ({
    components: {
        McSeparator,
    },
    computed: {
        tagBind() {
            return getCommonTags(this)
        }
    },
    props: {
        weight: {
            default: select('weight', weights, 's', 'default'),
        },
        color: {
            default: select('color', tokenColors, 'outline-gray', 'default'),
        },
        indentTop: {
            default: select('indentTop', computedSpaces, '100', 'default'),
        },
        indentBottom: {
            default: select('indentBottom', computedSpaces, '100', 'default'),
        },
        indentLeft: {
            default: select('indentLeft', computedSpaces, '100', 'default'),
        },
        indentRight: {
            default: select('indentRight', computedSpaces, '100', 'default'),
        },
        indentX: {
            default: select('indentX', computedSpaces, '', 'default'),
        },
        indentY: {
            default: select('indentY', computedSpaces, '', 'default'),
        },
    },
    template: '<mc-separator v-bind="tagBind" />',
})

