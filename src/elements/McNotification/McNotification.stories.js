import { text, select, boolean } from '@storybook/addon-knobs'
import { getTokensByType } from '../../utils/getTokens'

import McNotification from './McNotification'
import McTitle from '../McTitle/McTitle'
import McSvgIcon from '../McSvgIcon/McSvgIcon'
import McButton from '../McButton/McButton'
import McGridRow from '../../patterns/McGrid/McGridRow/McGridRow'
import McGridCol from '../../patterns/McGrid/McGridCol/McGridCol'
import { SVG_ICONS } from '../../helpers/storybookVariables'

const tokenColors = getTokensByType('color')

export default {
    title: 'Elements/McNotification',
    component: McNotification,
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=450%3A2514',
        },
    },
}

const getUniqueProps = key => {
    return {
        content: {
            default: text(
                'content',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec purus ipsum, euismod eget diam id.',
                key,
            ),
        },
        variation: {
            default: select('variation', tokenColors, 'purple', key),
        },
        iconName: {
            default: select('iconName', SVG_ICONS, 'info', key),
        },
        title: {
            default: text('title', 'Test title', key),
        },
        isButtonVisible: {
            default: boolean('isButtonVisible', false, key),
        },
        buttonText: {
            default: text('buttonText', 'Ok!', key),
        },
        hideIcon: {
            default: boolean('hideIcon', false, key),
        },
    }
}

const getCommonTags = ctx => {
    return {
        content: ctx.content,
        variation: ctx.variation,
        title: ctx.title,
        isButtonVisible: ctx.isButtonVisible,
        buttonText: ctx.buttonText,
        iconName: ctx.iconName,
        hideIcon: ctx.hideIcon,
    }
}

// mc-notification default
export const Default = () => ({
    components: { McNotification },
    computed: {
        tagBind() {
            return getCommonTags(this)
        },
    },
    props: {
        ...getUniqueProps('default'),
    },
    template: `<mc-notification v-bind="tagBind" />`,
})

// mc-notification with slots
export const WithSlots = () => ({
    components: {
        McNotification,
        McTitle,
        McSvgIcon,
        McButton,
        McGridRow,
        McGridCol,
    },
    computed: {
        tagBind() {
            return {
                ...getCommonTags(this),
            }
        },
    },
    props: {
        ...getUniqueProps('withSlots'),
        hasHeader: {
            default: boolean('slot header', true, 'withSlots'),
        },
        hasLeft: {
            default: boolean('slot left', true, 'withSlots'),
        },
        hasRight: {
            default: boolean('slot right', true, 'withSlots'),
        },
    },
    template: `
        <mc-notification v-bind="tagBind">
            <mc-title v-if="hasHeader" slot="header" variation="subtitle" color="red">Title in Slot</mc-title>
            <mc-svg-icon v-if="hasLeft" name="obs" color="red" slot="left" />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
            Dolor eius expedita harum ipsam magnam minima mollitia, natus 
            soluta temporibus veritatis! Cumque ea eaque excepturi laudantium 
            quaerat, quidem reprehenderit soluta voluptates.
            <div v-if="hasRight" slot="right">
                <mc-grid-row :gutter-x="4">
                    <mc-grid-col>
                        <mc-button variation="green">One</mc-button>
                    </mc-grid-col>
                    <mc-grid-col>
                        <mc-button variation="red">two</mc-button>
                    </mc-grid-col>
                </mc-grid-row>
            </div>
        </mc-notification>
    `,
})
