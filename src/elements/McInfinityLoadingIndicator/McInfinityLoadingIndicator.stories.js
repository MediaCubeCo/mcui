import { boolean, number } from '@storybook/addon-knobs'

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
            default: number('overlap', 100, {}, 'error'),
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
