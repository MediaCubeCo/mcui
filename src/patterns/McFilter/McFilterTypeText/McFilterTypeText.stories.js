import { filters, placeholders } from '../../../mocks/filterMocks'

import McFilterTypeText from './McFilterTypeText'

export default {
    title: 'Patterns/McFilter/McFilterTypeText',
    component: McFilterTypeText,
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
        McFilterTypeText,
    },
    data() {
        return {
            value: '',
            filter: filters.find(f => f.type === 'text'),
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
        onTextChange(val) {
            this.value = val
        },
    },
    template: `<mc-filter-type-text v-bind="tagBind" @input="onTextChange" />`,
})

