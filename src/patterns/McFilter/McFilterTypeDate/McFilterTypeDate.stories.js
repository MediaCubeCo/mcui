import { filters, placeholders } from '../../../mocks/filterMocks'

import McFilterTypeDate from './McFilterTypeDate'

export default {
    title: 'Patterns/McFilter/McFilterTypeDate',
    component: McFilterTypeDate,
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
        McFilterTypeDate,
    },
    data() {
        return {
            value: null,
            filter: filters.find(f => f.type === 'date'),
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
        onDateChange(val) {
            this.value = val
        },
    },
    template: `<mc-filter-type-date v-bind="tagBind" @input="onDateChange" />`,
})

