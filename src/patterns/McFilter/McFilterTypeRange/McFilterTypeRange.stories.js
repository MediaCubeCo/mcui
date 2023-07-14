import { filters, placeholders } from '../../../mocks/filterMocks'

import McFilterTypeRange from './McFilterTypeRange'

export default {
    title: 'Patterns/McFilter/McFilterTypeRange',
    component: McFilterTypeRange,
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
    }
}

export const Default = () => ({
    components: {
        McFilterTypeRange,
    },
    data() {
        return {
            value: {},
            filter: filters.find(f => f.type === 'range'),
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
        onRangeChange(val) {
            this.value = val
        },
    },
    template: `<mc-filter-type-range v-bind="tagBind" @input="onRangeChange" />`,
})

