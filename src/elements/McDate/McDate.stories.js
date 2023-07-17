import { text, select, boolean } from '@storybook/addon-knobs'

import McDate from './McDate'
import McSvgIcon from '../McSvgIcon/McSvgIcon'
import McTitle from '../McTitle/McTitle'
import { TITLE_VARIATION } from '../../helpers/storybookVariables'
import { getTokensByType } from '../../utils/getTokens'

export default {
    title: 'Elements/McDate',
    component: McDate,
    parameters: {
        componentSubtitle: 'Status: Ready',
    },
}
const colors = getTokensByType('color')

const getUniqueProps = key => {
    return {
        value: {
            default: text('value', '2019-06-11T16:33:20+03:00', key),
        },
        format: {
            default: text('format', 'DD.MM.YYYY', key),
        },
        size: {
            default: select('size', TITLE_VARIATION, 'body', key),
        },
        ellipsis: {
            default: boolean('ellipsis', true, key),
        },
        uppercase: {
            default: boolean('uppercase', true, key),
        },
        color: {
            default: select('color', colors, 'black', key),
        },
    }
}

const getCommonTags = ctx => {
    return {
        value: ctx.value,
        format: ctx.format,
        size: ctx.size,
        ellipsis: ctx.ellipsis,
        uppercase: ctx.uppercase,
        color: ctx.color,
    }
}

// mc-data default
export const Default = () => ({
    components: {
        McDate,
    },
    computed: {
        tagBind() {
            return getCommonTags(this)
        },
    },
    props: {
        ...getUniqueProps('default'),
    },
    template: `<mc-date v-bind="tagBind" />`,
})

// mc-data with slots
export const WithSlots = () => ({
    components: {
        McDate,
        McSvgIcon,
        McTitle,
    },
    computed: {
        tagBind() {
            return {
                ...getCommonTags(this),
            }
        }
    },
    props: {
        ...getUniqueProps('withSlots'),
        hasPrepend: {
            default: boolean('slot prepend', true, 'withSlots'),
        },
        hasAppend: {
            default: boolean('slot append', true, 'withSlots'),
        },
    },
    template: `
        <mc-date v-bind="tagBind"> 
            <mc-svg-icon v-if="hasPrepend" slot="prepend" size="200" name="event" />
            <mc-title v-if="hasAppend" slot="append" color="red">Date</mc-title>
        </mc-date>
    `,
})

