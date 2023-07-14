import { value, filters, placeholders } from '../../../mocks/filterMocks'

import McFilterTypeRelation from './McFilterTypeRelation'

export default {
    title: 'Patterns/McFilter/McFilterTypeRelation',
    component: McFilterTypeRelation,
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
        McFilterTypeRelation,
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
    template: `<mc-filter-type-relation v-bind="tagBind" @input="onRelationChange" />`,
})

