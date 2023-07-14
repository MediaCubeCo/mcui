import { boolean, object } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import McFilterChip from './McFilterChip'

export default {
    title: 'Patterns/McFilter/McFilterChip',
    component: McFilterChip,
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=1801%3A5024',
        },
    },
}

const getUniqueProps = key => {
    return {
        tag: {
            default: object('to', { title: 'Tag name', categoryName: 'categoryName' }, key),
        },
        closable: {
            default: boolean('closable', true, key),
        },
        isActive: {
            default: boolean('isActive', false, key),
        },
    }
}

const getCommonTags = ctx => {
    return {
        tag: ctx.tag,
        closable: ctx.closable,
        isActive: ctx.isActive,
    }
}

const actionsData = {
    handleClose: action('closed'),
    handleClick: action('clicked'),
}

// mc-chip default
export const Default = () => ({
    components: {
        McFilterChip,
    },
    computed: {
        tagBind() {
            return getCommonTags(this)
        }
    },
    props: {
        ...getUniqueProps('default'),
    },
    methods: actionsData,
    template: `<mc-filter-chip v-bind="tagBind" @close="handleClose" @click.native="handleClick" />`,
})

