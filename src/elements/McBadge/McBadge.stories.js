import { select, boolean, text } from '@storybook/addon-knobs'

import McBadge from './McBadge'
import { setVariationsByColor } from '../../helpers/storybookFunctions'

export default {
    title: 'Elements/McBadge',
    component: McBadge,
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=1%3A2',
        },
    },
}

let variations = setVariationsByColor(['outline'])

const getCommonTags = ctx => {
    return {
        variation: ctx.variation,
        modern: ctx.modern,
        verticalLine: ctx.verticalLine,
    }
}

export const Default = () => ({
    components: {
        McBadge,
    },
    data() {
        return {
            verticalLine: false,
        }
    },
    computed: {
        tagBind() {
            return getCommonTags(this)
        },
    },
    props: {
        variation: {
            default: select('variation', variations, 'dark-green', 'default')
        },
        modern: {
            default: boolean('modern', false, 'default')
        },
        value: {
            default: text('slot default', 'badge content', 'default'),
        },
    },
    template: '<mc-badge v-bind="tagBind">{{ value }}</mc-badge>',
})

export const VerticalLine = () => ({
    components: {
        McBadge,
    },
    data() {
        return {
            verticalLine: true,
        }
    },
    computed: {
        tagBind() {
            return getCommonTags(this)
        },
    },
    props: {
        variation: {
            default: select('variation', variations, 'orange', 'verticalLine')
        },
    },
    template: '<div style="display: flex; width: 50px; height: 100px;"><mc-badge v-bind="tagBind" /></div>',
})

