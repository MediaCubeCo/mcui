import { text, select, boolean } from '@storybook/addon-knobs'

import McHint from './McHint'
import McTitle from '../McTitle/McTitle'

export default {
    title: 'Elements/McHint',
    component: McHint,
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=450%3A2514',
        },
    },
}

const variations = {
    info: 'info',
    'info-green': 'info-green',
    success: 'success',
    warning: 'warning',
    error: 'error',
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
            default: select('variation', variations, 'info', key),
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
    }
}

const getCommonTags = ctx => {
    return {
        content: ctx.content,
        variation: ctx.variation,
        title: ctx.title,
        isButtonVisible: ctx.isButtonVisible,
        buttonText: ctx.buttonText,
    }
}

// mc-hint default
export const Default = () => ({
    components: { McHint },
    computed: {
        tagBind() {
            return getCommonTags(this)
        },
    },
    props: {
        ...getUniqueProps('default'),
    },
    template: `<mc-hint v-bind="tagBind" />`,
})

// mc-hint with slots
export const WithSlots = () => ({
    components: { McHint, McTitle },
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
    },
    template: `
      <mc-hint v-bind="tagBind">
        <mc-title v-if="hasHeader" slot="header" variation="subtitle" color="red">Title in Slot</mc-title>
      </mc-hint>
    `,
})
