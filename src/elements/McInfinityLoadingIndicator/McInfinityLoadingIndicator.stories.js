import { boolean, number, text } from '@storybook/addon-knobs'

import McInfinityLoadingIndicator from './McInfinityLoadingIndicator'

export default {
    title: 'Elements/McInfinityLoadingIndicator',
    component: McInfinityLoadingIndicator,
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {},
    },
}

const getCommonTags = ctx => {
    return {
        overlap: ctx.overlap,
        active: ctx.active,
        root: ctx.root,
    }
}

export const Default = () => ({
    data() {
        return {
            text: 'Прокрутите вниз',
        }
    },
    components: { McInfinityLoadingIndicator },
    computed: {
        tagBind() {
            return getCommonTags(this)
        },
    },
    props: {
        overlap: {
            default: number('overlap', 100, {}, 'default'),
        },

        active: {
            default: boolean('active', true, 'default'),
        },
    },
    template: `<div>
        <div style="height: 2000px; background-color: rgba(255, 127, 80, 0.2)">
            <div style="position: sticky; top: 20px; font-size: 20px">{{ text }}</div>
        </div>
        <mc-infinity-loading-indicator 
            v-bind="tagBind"
            @loading="text = 'Событие появления индикатора'"
            @hide="text = 'Прокрутите вниз'" 
        />
    </div>`,
})

export const CustomRoot = () => ({
    data() {
        return {
            text: 'Прокрутите вниз',
        }
    },
    components: { McInfinityLoadingIndicator },
    computed: {
        tagBind() {
            return getCommonTags(this)
        },
    },
    props: {
        overlap: {
            default: number('overlap', 100, {}, 'custom-root'),
        },

        active: {
            default: boolean('active', true, 'custom-root'),
        },
        root: {
            default: text('root', '.placement', 'custom-root'),
        },
    },
    template: `<div class="placement" style="overflow-y: auto; height: 100vh">
        <div style="height: 2000px; background-color: rgba(255, 127, 80, 0.2)">
            <div style="position: sticky; top: 20px; font-size: 20px">{{ text }}</div>
        </div>
        <mc-infinity-loading-indicator 
            v-bind="tagBind"
            @loading="text = 'Событие появления индикатора'"
            @hide="text = 'Прокрутите вниз'" 
        />
    </div>`,
})
