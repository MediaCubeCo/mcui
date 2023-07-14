import { text, select, boolean, object, number } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { getTokensByType } from '../../utils/getTokens'

import McButton from './McButton'
import McSvgIcon from '../McSvgIcon/McSvgIcon'
import { setVariationsByColor } from '../../helpers/storybookFunctions'

export default {
    title: 'Elements/McButton',
    component: McButton,
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=1%3A2',
        },
    },
}

const types = {
    button: 'button',
    reset: 'reset',
    submit: 'submit',
    default: null,
}
const sizesArr = ['xs', 's', 'm', 'l']
const sizes = {}
sizesArr.forEach(s => {
    sizes[s] = s
    sizes[`${s}-compact`] = `${s}-compact`
})
const colors = getTokensByType('color')
const variants = setVariationsByColor(['flat', 'invert', 'outline', 'link'])
const positions = {
    left: 'left',
    center: 'center',
    right: 'right',
}
const fontWeights = getTokensByType('font-weight')
const computedFontWeights = { default: '', ...fontWeights }


const getUniqueProps = key => {
    return {
        to: {
            default: object('to', { name: 'test', params: { id: 123 } }, key),
        },
        href: {
            default: text('href', 'https://mediacube.agency/', key),
        },
        nuxt: {
            default: boolean('nuxt', true, key),
        },
        disabled: {
            default: boolean('disabled', false, key),
        },
        loading: {
            default: boolean('loading', false, key),
        },
        iconLoading: {
            default: boolean('iconLoading', false, key),
        },
        type: {
            default: select('type', types, 'default', key),
        },
        variation: {
            default: select('variation', variants, 'purple', key),
        },
        size: {
            default: select('size', sizes, 'm', key),
        },
        shadow: {
            default: boolean('shadow', false, key),
        },
        rounded: {
            default: boolean('rounded', false, key),
        },
        semiRounded: {
            default: boolean('semi-rounded', false, key),
        },
        textAlign: {
            default: select('textAlign', positions, 'center', key),
        },
        fullWidth: {
            default: boolean('fullWidth', false, key),
        },
        isActive: {
            default: boolean('isActive', false, key),
        },
        exact: {
            default: boolean('exact', false, key),
        },
        uppercase: {
            default: boolean('uppercase', false, key),
        },
        defaultTag: {
            default: text('defaultTag', 'button', key),
        },
        secondaryColor: {
            default: select('secondaryColor', { ...colors, none: '' }, '', key),
        },
        underlineLink: {
            default: boolean('underlineLink', false, key),
        },
        bgFlat: {
            default: boolean('bgFlat', false, key),
        },
        weight: {
            default: select('weight', computedFontWeights, 'semi-bold', key),
        },
        animation: {
            default: boolean('animation', false, key)
        },
        animationCustomBg: {
            default: select('animationBg', { ...colors, none: '' }, '', key)
        },
        animationCustomText: {
            default: text('animationText', '', key)
        },
        tabindex: {
            default: number('tabindex', null, {}, key),
        },
    }
}

const getCommonTags = ctx => {
    return {
        to: ctx.to,
        href: ctx.href,
        nuxt: ctx.nuxt,
        disabled: ctx.disabled,
        loading: ctx.loading,
        iconLoading: ctx.iconLoading,
        type: ctx.type,
        variation: ctx.variation,
        size: ctx.size,
        shadow: ctx.shadow,
        rounded: ctx.rounded,
        semiRounded: ctx.semiRounded,
        textAlign: ctx.textAlign,
        fullWidth: ctx.fullWidth,
        isActive: ctx.isActive,
        exact: ctx.exact,
        uppercase: ctx.uppercase,
        defaultTag: ctx.defaultTag,
        secondaryColor: ctx.secondaryColor,
        underlineLink: ctx.underlineLink,
        bgFlat: ctx.bgFlat,
        weight: ctx.weight,
        animation: ctx.animation,
        customAnimation: {
            background: ctx.animationCustomBg,
            text: ctx.animationCustomText,
        },
        tabindex: ctx.tabindex,
    }
}

const actionsData = {
    handleClick: action('clicked'),
}

export const Default = () => ({
    components: { McButton },
    computed: {
        tagBind() {
            return getCommonTags(this)
        },
    },
    props: {
        ...getUniqueProps('default'),
        value: {
            default: text('slot default', 'Default button', 'default'),
        },
    },
    methods: actionsData,
    template: `<mc-button v-bind="tagBind" @click="handleClick"> {{ value }} </mc-button>`,
})

// mc-button with icons
export const WithIcons = () => ({
    components: { McButton, McSvgIcon },
    computed: {
        tagBind() {
            return getCommonTags(this)
        },
    },
    props: {
        ...getUniqueProps('withIcons'),
        value: {
            default: text('slot default', 'Button with icons', 'withIcons'),
        },
        isIconPrepend: {
            default: boolean('slot icon prepend', true, 'withIcons'),
        },
        isIconAppend: {
            default: boolean('slot icon append', true, 'withIcons'),
        },
    },
    methods: actionsData,
    template: `
        <mc-button v-bind="tagBind" @click="handleClick">
          <mc-svg-icon v-if="isIconPrepend" slot="icon-prepend" name="info" />
            {{ value }}
          <mc-svg-icon v-if="isIconAppend" slot="icon-append" name="face" />
        </mc-button>
    `,
})
