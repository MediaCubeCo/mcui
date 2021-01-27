import { text, select, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import McTooltip from './McTooltip'
import McButton from '../McButton/McButton'
import { getTokensByType } from '../../utils/getTokens'

const wrapper = () => {
    return {
        template: `<div style="display: flex; align-items: center; justify-content: center; height: 200px;">
        <story />
    </div>`,
    }
}

export default {
    title: 'Elements/McTooltip',
    component: McTooltip,
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=108%3A322',
        },
    },
    decorators: [wrapper],
}

const colors = getTokensByType('color')

const positions = ['auto', 'top', 'right', 'bottom', 'left']
let placements = {}
positions.forEach(p => {
    const posVariations = {
        [p]: p,
        [`${p}-start`]: `${p}-start`,
        [`${p}-end`]: `${p}-end`,
    }
    placements = {
        ...placements,
        ...posVariations,
    }
})

const widths = {
    s: 's',
    m: 'm',
    l: 'l',
}

const sizes = {
    s: 's',
    m: 'm',
}
const triggers = {
    hover: 'hover',
    click: 'click',
    focus: 'focus',
    manual: 'manual',
}

const getUniqueProps = key => {
    return {
        content: {
            default: text(
                'content',
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, exercitationem.',
                key,
            ),
        },
        placement: {
            default: select('placement', placements, 'auto', key),
        },
        color: {
            default: select('color', colors, 'black', key),
        },
        maxWidth: {
            default: select('maxWidth', widths, 's', key),
        },
        arrowDisabled: {
            default: boolean('arrowDisabled', false, key),
        },
        size: {
            default: select('size', sizes, 'm', key),
        },
        trigger: {
            default: select('trigger', triggers, 'hover', key),
        },
        show: {
            default: boolean('show', false, key),
        },
        container: {
            default: text('container', 'body', key),
        },
    }
}

const getCommonTags = ctx => {
    return {
        content: ctx.content,
        placement: ctx.placement,
        color: ctx.color,
        'max-width': ctx.maxWidth,
        'arrow-disabled': ctx.arrowDisabled,
        size: ctx.size,
        trigger: ctx.trigger,
        show: ctx.show,
        container: ctx.container,
    }
}

const actionsData = {
    handleClick: action('clicked'),
}

export const Default = () => ({
    components: { McTooltip, McButton },
    computed: {
        tagBind() {
            return getCommonTags(this)
        },
    },
    props: {
        ...getUniqueProps('default'),
    },
    methods: actionsData,
    template: `<mc-tooltip v-bind="tagBind">
      <mc-button @click="handleClick"> Tooltip </mc-button>
  </mc-tooltip>`,
})
