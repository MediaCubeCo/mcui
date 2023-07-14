import { text, select, boolean } from '@storybook/addon-knobs'

import McTitle from './McTitle'
import McSvgIcon from '../McSvgIcon/McSvgIcon'
import { getTokensByType, getTokenGroup } from '../../utils/getTokens'
import { TITLE_VARIATION } from '../../helpers/storybook_consts'

export default {
    title: 'Elements/McTitle',
    component: McTitle,
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=1%3A4',
        },
    },
}

const colors = getTokensByType('color')

const positions = {
    left: 'left',
    center: 'center',
    right: 'right',
}
const fontWeights = getTokensByType('font-weight')
const lineHeights = getTokenGroup('line-heights')
const computedFontWeights = { default: '', ...fontWeights }
const computedLineHeights = { default: '', ...lineHeights }
const getUniqueProps = key => {
    return {
        variation: {
            default: select('variation', TITLE_VARIATION, 'body', key),
        },
        color: {
            default: select('color', colors, 'black', key),
        },
        tagName: {
            default: text('tagName', 'div', key),
        },
        uppercase: {
            default: boolean('uppercase', false, key),
        },
        textAlign: {
            default: select('textAlign', positions, 'left', key),
        },
        lineHeight: {
            default: select('lineHeight', computedLineHeights, '', key),
        },
        weight: {
            default: select('weight', computedFontWeights, '', key),
        },
        maxWidth: {
            default: text('maxWidth', '', key),
        },
        preline: {
            default: boolean('preline', false, key),
        },
        nowrap: {
            default: boolean('nowrap', false, key),
        },
        plainText: {
            default: boolean('plainText', false, key),
        },
        value: {
            default: text(
                'slot default',
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias autem culpa dignissimos et id minima quae qui sapiente ullam velit?',
                key,
            ),
        },
    }
}

const getCommonTags = ctx => {
    return {
        variation: ctx.variation,
        color: ctx.color,
        ellipsis: ctx.ellipsis,
        preline: ctx.preline,
        plainText: ctx.plainText,
        nowrap: ctx.nowrap,
        'tag-name': ctx.tagName,
        uppercase: ctx.uppercase,
        'text-align': ctx.textAlign,
        'line-height': ctx.lineHeight,
        weight: ctx.weight,
        'max-width': ctx.maxWidth,
    }
}

export const Default = () => ({
    components: { McTitle },
    computed: {
        tagBind() {
            return getCommonTags(this)
        },
    },
    props: {
        ...getUniqueProps('default'),
        ellipsis: {
            default: boolean('ellipsis', true, 'default'),
        },
    },
    template: `<mc-title v-bind="tagBind"> {{ value }} </mc-title>`,
})

// mc-title with icons
export const WithIcons = () => ({
    components: { McTitle, McSvgIcon },
    computed: {
        tagBind() {
            return getCommonTags(this)
        },
    },
    props: {
        ...getUniqueProps('withIcons'),
        ellipsis: {
            default: boolean('ellipsis', false, 'withIcons'),
        },
        isIconPrepend: {
            default: boolean('slot icon prepend', true, 'withIcons'),
        },
        isIconAppend: {
            default: boolean('slot icon append', true, 'withIcons'),
        },
    },
    template: `<mc-title v-bind="tagBind"> 
      <mc-svg-icon v-if="isIconPrepend" slot="icon-prepend" name="info" color="purple" /> 
      {{ value }} 
      <mc-svg-icon v-if="isIconAppend" slot="icon-append" name="face" color="red" /> 
  </mc-title>`,
})
