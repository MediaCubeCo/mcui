import { value, filters, placeholders } from '../../../mocks/filterMocks'

import McFilterTypeLabels from './McFilterTypeLabels'

export default {
    title: 'Patterns/McFilter/McFilterTypeLabels',
    component: McFilterTypeLabels,
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=1801%3A5024',
        },
    },
}

const getCommonTags = ctx => {
    return {
        value: ctx.value,
        filter: ctx.filter,
        placeholders: ctx.placeholders,
        currentValues: ctx.currentValues,
    }
}

export const Default = () => ({
    components: {
        McFilterTypeLabels,
    },
    data() {
        return {
            value: null,
            filter: filters.find(f => f.type === 'relation'),
            currentValues: value,
        }
    },
    computed: {
        tagBind() {
            return getCommonTags(this)
        },
    },
    props: {
        placeholders: {
            default: placeholders,
        },
    },
    methods: {
        onRelationChange(val) {
            this.value = val
        },
    },
    template: `<mc-filter-type-labels v-bind="tagBind" @input="onRelationChange" />`,
})

