import { text, select, number } from '@storybook/addon-knobs'

import McSvgIcon from './McSvgIcon'
import { getTokensByType, getTokenGroup } from '../../utils/getTokens'
import { SVG_ICONS } from '../../helpers/storybookVariables'

export default {
    title: 'Elements/McSvgIcon',
    component: McSvgIcon,
    parameters: {
        componentSubtitle: 'Status: Ready',
    },
}

const iconSizes = getTokenGroup('icon-sizes')
const colors = getTokensByType('color')

export const Icon = () => ({
    components: {
        McSvgIcon,
    },
    props: {
        name: {
            default: select('name', SVG_ICONS, 'add'),
        },
        defaultName: {
            default: select('defaultName', SVG_ICONS, 'add'),
        },
        color: {
            default: select('color', colors, 'red'),
        },
        fill: {
            default: text('fill', 'currentColor'),
        },
        size: {
            default: select('size', iconSizes, '300'),
        },
        weight: {
            default: number('weight', 0, {}),
        },
        type: {
            default: text('type', 'span'),
        },
    },
    template: '<mc-svg-icon :name="name" :size="size" :fill="fill" :color="color" :weight="weight" />',
})
