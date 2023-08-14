import { value, filters, placeholders } from '../../../mocks/filterMocks'

import McFilterTypeRelation from './McFilterTypeRelation'
import { boolean } from '@storybook/addon-knobs'

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
            currentValues: value,
        }
    },
    computed: {
        tagBind() {
            return getCommonTags(this)
        },
        filter() {
            return filters.find(f => f.type === 'relation' && (this.isText ? f.is_text : true))
        },
    },
    props: {
        placeholders: {
            default: placeholders,
        },
        isText: {
            default: boolean('isText', false, 'default')
        },
    },
    methods: {
        onRelationChange(val) {
            this.value = val
        },
    },
    template: `<mc-filter-type-relation v-bind="tagBind" @input="onRelationChange" />`,
})

