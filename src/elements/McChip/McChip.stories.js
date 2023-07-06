import { text, select, boolean, number } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { getTokensByType } from '../../utils/getTokens'

import McChip from './McChip'
import McSvgIcon from '../McSvgIcon/McSvgIcon'

export default {
    title: 'Elements/McChip',
    component: McChip,
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=1%3A2',
        },
    },
}

const tokenColors = getTokensByType('color')
let variations = {}
Object.keys(tokenColors).forEach(c => {
    const colorVariations = {
        [c]: c,
        [`${c}-invert`]: `${c}-invert`,
        [`${c}-outline`]: `${c}-outline`,
    }
    variations = {
        ...variations,
        ...colorVariations,
    }
})

const sizes = {
    xs: 'xs',
    s: 's',
    m: 'm',
}

const getUniqueProps = key => {
    return {
        closable: {
            default: boolean('closable', true, key),
        },
        size: {
            default: select('size', sizes, 'm', key),
        },
        textColor: {
            default: select('textColor', { ...tokenColors, default: '' }, '', key),
        },
    }
}

const getCommonTags = ctx => {
    return {
        title: ctx.title,
        closable: ctx.closable,
        variation: ctx.variation,
        counter: ctx.counter,
        size: ctx.size,
        textColor: ctx.textColor,
    }
}

const actionsData = {
    handleClick: action('clicked'),
}

// mc-chip default
export const Default = () => ({
    components: { McChip },
    computed: {
        tagBind() {
            return getCommonTags(this)
        },
    },
    props: {
        ...getUniqueProps('default'),
        title: {
            default: text('title', 'Default', 'default'),
        },
        variation: {
            default: select('variation', variations, 'purple', 'default'),
        },
    },
    methods: actionsData,
    template: `<mc-chip v-bind="tagBind" @click="handleClick" />`,
})

// mc-chip with icon and counter
export const WithIconAndCounter = () => ({
    components: { McChip, McSvgIcon },
    computed: {
        tagBind() {
            return {
                ...getCommonTags(this),
                counter: this.counter,
            }
        },
    },
    props: {
        ...getUniqueProps('withIcon'),
        text: {
            default: text('slot default', 'With icon and counter', 'withIcon'),
        },
        variation: {
            default: select('variation', variations, 'purple-invert', 'withIcon'),
        },
        counter: {
            default: number('counter', 14, {}, 'withIcon'),
        },
        hasIcon: {
            default: boolean('slot icon', true, 'withIcon'),
        },
    },
    methods: actionsData,
    template: `<mc-chip v-bind="tagBind" @click="handleClick"> 
      <mc-svg-icon v-if="hasIcon" slot="icon" size="200" name="favorite" color="red" />
      {{ text }} 
  </mc-chip>`,
})

// mc-chip with custom button icon
export const CustomButton = () => ({
    components: { McChip, McSvgIcon },
    computed: {
        tagBind() {
            return getCommonTags(this)
        },
    },
    props: {
        ...getUniqueProps('customBtn'),
        variation: {
            default: select('variation', variations, 'red', 'customBtn'),
        },
    },
    methods: actionsData,
    template: `<mc-chip v-bind="tagBind" @click="handleClick">
      <mc-svg-icon slot="button" size="200" name="edit_solid" color="white" />
      with custom button icon
  </mc-chip>`,
})
