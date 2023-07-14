import { text, boolean } from '@storybook/addon-knobs'
import categories from '../../mocks/categories'
import body from '../../mocks/tableInfusersBody'

import McStack from './McStack'
import McAvatar from '../../elements/McAvatar/McAvatar'
import McChip from '../../elements/McChip/McChip'

export default {
    title: 'Patterns/McStack',
    component: McStack,
    parameters: {
        componentSubtitle: 'Status: Ready',
    },
}

const getUniqueProps = key => {
    return {
        limit: {
            default: text('limit', '4', key),
        },
    }
}

const getCommonTags = ctx => {
    return {
        limit: ctx.limit,
        collapsed: ctx.collapsed,
    }
}

export const Default = () => ({
    components: {
        McStack,
        McAvatar,
    },
    computed: {
        tagBind() {
            return getCommonTags(this)
        },
        items() {
            return body
                .map((item, index) => {
                    return {
                        id: item.id,
                        src: index % 2 ? item.image_small : '',
                    }
                })
                .slice(0, 9)
        },
        stackKey() {
            return `stack-key-${this.limit || 0}`
        },
    },
    props: {
        ...getUniqueProps('default'),
        collapsed: {
            default: boolean('collapsed', true, 'default'),
        },
    },
    // methods: actionsData,
    template: `
        <template>
            <mc-stack :key="stackKey" v-bind="tagBind">
                <mc-avatar src="https://avatars3.githubusercontent.com/u/43079603?s=460&v=4" rounded lazy size="400" />
                <mc-avatar v-for="item in items" :key="item.id" rounded lazy size="400" :src="item.src" />
            </mc-stack>
        </template>
    `,
})

export const WithChips = () => ({
    components: {
        McStack,
        McChip,
    },
    computed: {
        tagBind() {
            return getCommonTags(this)
        },
        computedCategories() {
            return categories
        },
    },
    props: {
        ...getUniqueProps('withChips'),
        collapsed: {
            default: boolean('collapsed', false, 'withChips'),
        },
    },
    // methods: actionsData,
    template: `
        <mc-stack v-bind="tagBind">
            <mc-chip v-for="category in computedCategories" :key="category.id" style="width: 150px;" variation="purple">
                {{ category.title }}
            </mc-chip>
        </mc-stack>
    `,
})

export const WithAutoLimit = () => ({
    components: {
        McStack,
        McChip,
    },
    computed: {
        tagBind() {
            return {
                limit: 'auto',
            }
        },
        computedCategories() {
            return categories
        },
    },
    // methods: actionsData,
    template: `
        <mc-stack v-bind="tagBind">
            <mc-chip v-for="category in computedCategories" :key="category.id" style="width: 150px;" variation="purple">
                {{ category.title }}
            </mc-chip>
        </mc-stack>
    `,
})
