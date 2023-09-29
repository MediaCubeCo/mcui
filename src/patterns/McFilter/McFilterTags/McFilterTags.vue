<template>
    <div class="mc-filter-tags">
        <mc-title>{{ placeholders.added_filters }}</mc-title>
        <div class="mc-filter-tags__body">
            <div class="mc-filter-tags__body-left">
                <mc-grid-row v-if="tagsWithoutFast.length" :gutter-x="4" :gutter-y="8">
                    <mc-grid-col v-for="tag in tagsWithoutFast" :key="tag.id">
                        <mc-filter-chip
                            :tag="tag"
                            :is-active="checkTagIsActive(tag)"
                            closable
                            @click.native="() => onTagClick(tag)"
                            @close="() => onTagClose(tag)"
                        />
                    </mc-grid-col>
                </mc-grid-row>
                <template v-if="relationRows.length">
                    <mc-grid-row v-for="(row, index) in relationRows" :key="index" :gutter-x="4" :gutter-y="8">
                        <mc-grid-col v-for="tag in row" :key="tag.id">
                            <mc-filter-chip
                                :tag="tag"
                                :is-active="checkTagIsActive(tag)"
                                :closable="tag.closable"
                                @click.native="() => onTagClick(tag)"
                                @close="() => onTagClose(tag, row[0].relationKey)"
                            />
                        </mc-grid-col>
                    </mc-grid-row>
                </template>
                <mc-grid-row v-if="fastFilterTags.length" :gutter-x="4" :gutter-y="8">
                    <mc-grid-col v-for="tag in fastFilterTags" :key="tag.id">
                        <mc-tooltip :content="tag.description || ''" placement="top" size="s">
                            <mc-filter-chip :tag="tag" closable @close="() => onTagClose(tag)" />
                        </mc-tooltip>
                    </mc-grid-col>
                </mc-grid-row>
            </div>
            <div class="mc-filter-tags__body-right">
                <mc-button v-if="hasButtonClear" variation="dark-gray-outline" @click="handleClear">
                    {{ placeholders.actions.clear }}
                </mc-button>
            </div>
        </div>
    </div>
</template>

<script>
import _XEUtils from 'xe-utils'
import { isEqual, cloneDeep, isEmpty } from '../../../helpers/functions'
import { dayjs } from '../../../utils/dayjs'

import McButton from '../../../elements/McButton/McButton'
import McTooltip from '../../../elements/McTooltip/McTooltip'
import McTitle from '../../../elements/McTitle/McTitle'
import McGridRow from '../../../patterns/McGrid/McGridRow/McGridRow'
import McGridCol from '../../../patterns/McGrid/McGridCol/McGridCol'
import McFilterChip from '../McFilterChip/McFilterChip'
export default {
    name: 'McFilterTags',
    components: {
        McFilterChip,
        McButton,
        McTooltip,
        McTitle,
        McGridRow,
        McGridCol,
    },
    props: {
        /**
         *  Данные фильтра
         */
        value: {
            type: Object,
            default: () => {},
        },
        /**
       *  Типы фильтров
       *
       *  [{
                name: Filter title,
                value: [String] - Filter value(key),
                type: [String] - Filter type(relation / date / text / fast),
                options: [Array] - Filter options,
                getAjaxOne: [Function] - Method for get selected options when filter initialize,
                getAjaxOptions: [Function] - Method for get options by API,
                [default]: [String, Number, Boolean] - Only for fast filter type. Fast filter haven't options, we set default value
                [description]: [String] - Only for fast filter type. Description of fast filter
            }, ...]
       */
        filters: {
            type: Array,
            required: true,
        },
        /**
         *  Переводы локализаций
         */
        placeholders: {
            type: Object,
            required: true,
        },
        /**
         *  Активный тэг
         */
        activeTag: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            simpleValues: {},
            relationValues: {},
            prettyActiveTag: null,
        }
    },
    computed: {
        fastFilterTags() {
            return this.simpleTags.filter(st => st && st.type === 'fast')
        },
        tagsWithoutFast() {
            return this.simpleTags.filter(st => st && st.type !== 'fast')
        },
        simpleTags() {
            const tags = []
            !isEmpty(this.simpleValues) &&
                Object.entries(this.simpleValues).forEach(([key, value]) => {
                    const filter = this.filters.find(f => f.value === key)
                    if (filter && filter.type === 'fast') {
                        tags.push({
                            id: _XEUtils.uniqueId(),
                            categoryName: filter?.name,
                            category: key,
                            type: 'fast',
                            ...filter,
                        })
                    } else if (filter) {
                        const from = value.more
                            ? `${this.placeholders.from} ${this.getFormattedVal(value.more, filter)}`
                            : ''
                        const to = value.less
                            ? `${this.placeholders.to} ${this.getFormattedVal(
                                  filter.type === 'date' && filter.useTimezone
                                      ? dayjs(value.less)
                                            .subtract(1, 'days')
                                            .format()
                                      : value.less,
                                  filter,
                              )}`
                            : ''
                        const space = from && to ? ' ' : ''
                        const title = typeof value === 'object' ? `${from}${space}${to}`.toLowerCase() : value
                        tags.push({
                            id: _XEUtils.uniqueId(),
                            categoryName: filter?.name,
                            title,
                            value,
                            category: key,
                        })
                    }
                })
            return tags
        },
        relationRows() {
            let tags = []
            if (!isEmpty(this.relationValues)) {
                tags = Object.entries(this.relationValues).map(([relationKey, relationVal]) => {
                    if (relationKey === 'exists') {
                        const empties = Object.keys(relationVal).map(key => {
                            const filter = this.filters.find(f => f.value === key)
                            return {
                                id: _XEUtils.uniqueId(),
                                categoryName: filter?.name,
                                value: key,
                                category: key,
                                relationKey,
                                closable: true,
                            }
                        })
                        const head = {
                            id: _XEUtils.uniqueId(),
                            categoryName: this.placeholders.actions.empty,
                            relationKey: 'exists',
                        }
                        return [head, ...empties]
                    }
                    const values = []
                    Object.entries(relationVal).forEach(([categoryKey, categoryVal]) => {
                        const filter = this.filters.find(f => f.value === categoryKey)
                        Object.entries(categoryVal).forEach(([key, val]) => {
                            values.push({
                                id: _XEUtils.uniqueId(),
                                categoryName: filter?.name,
                                title: val,
                                value: key,
                                category: categoryKey,
                                relationKey,
                                closable: true,
                            })
                        })
                    })
                    const head = {
                        id: _XEUtils.uniqueId(),
                        categoryName: this.placeholders.actions[relationKey],
                        relationKey,
                    }
                    return [head, ...values]
                })
            }
            return tags.filter(t => t.length > 1)
        },
        hasButtonClear() {
            return this.relationRows.length || this.simpleTags.length
        },
    },
    watch: {
        value: {
            handler(val) {
                this.splitTags(val)
            },
            immediate: true,
            deep: true,
        },
        activeTag: {
            handler(val) {
                this.prettyActiveTag = val
            },
            immediate: true,
        },
    },
    methods: {
        splitTags(value) {
            this.simpleValues = {}
            this.relationValues = {}
            if (isEmpty(value)) return
            this.addInitTags(value)
        },
        addInitTags(parentVal, parentKey = null) {
            const relationKeys = ['is', 'is_not', 'exists']
            for (let [key, val] of Object.entries(parentVal)) {
                if (relationKeys.includes(key)) {
                    const relationValuesKey = {
                        ...(key in this.relationValues ? this.relationValues[key] : {}),
                        ...(parentKey ? { [parentKey]: val } : {}),
                    }
                    this.$set(this.relationValues, key, relationValuesKey)
                    continue
                }
                if (typeof val !== 'object' && parentKey) {
                    this.$set(this.simpleValues, parentKey, parentVal)
                    continue
                }
                const filter = this.filters.find(f => f.value === key)
                if (filter && filter.type === 'fast') {
                    this.$set(this.simpleValues, key, { value: key })
                    continue
                }
                val && this.addInitTags(val, key)
            }
        },
        onTagClick(tag) {
            this.prettyActiveTag = isEqual(this.prettyActiveTag, tag) ? null : tag
            /**
             * Событие по клику на тэг
             */
            this.$emit('tag-click', tag)
        },
        onTagClose(tag, relationKey = null) {
            const value = cloneDeep(this.value)
            switch (relationKey) {
                case 'exists':
                    delete value[tag.category][relationKey]
                    break
                case 'is':
                case 'is_not':
                    delete value[tag.category][relationKey][tag.value]
                    if (isEmpty(value[tag.category][relationKey])) {
                        delete value[tag.category][relationKey]
                    }
                    break
                default:
                    delete value[tag.category]
                    break
            }

            if (isEmpty(value[tag.category])) {
                delete value[tag.category]
            }
            /**
             * Событие по изменению набора тэгов
             */
            this.$emit('tag-change', value)
        },
        handleClear() {
            /**
             * Событие по очистке всех тэгов
             */
            this.$emit('clear')
        },
        getFormattedVal(val, filter) {
            switch (filter.type) {
                case 'date':
                    return dayjs(val).format('DD.MM.YYYY')
                case 'range':
                    return this.getFormattedNum(val)
                default:
                    return val
            }
        },
        getFormattedNum(num) {
            const numeral = require('numeral')
            if (!numeral) return num
            let decimalsString = ''.padStart(0, '0')
            return numeral(num)
                .format('0,0.' + decimalsString)
                .replace(/,/g, ' ')
        },
        checkTagIsActive(tag) {
            return isEqual(this.prettyActiveTag, tag)
        },
    },
}
</script>

<style lang="scss">
.mc-filter-tags {
    $block-name: &;

    @include child-indent-bottom($space-100);
    &__body {
        display: flex;
        justify-content: space-between;
        padding: $space-100;
        border: 1px solid $color-outline-gray;
        border-radius: $radius-100;
        background-color: $color-white;
        min-height: $space-500;
        &-left {
            flex-grow: 1;
        }
        &-right {
            margin-left: $space-100;
            .mc-button {
                padding: $space-50 $space-150;
                height: $space-300;
            }
        }

        .mc-grid-row {
            &:not(:last-child) {
                margin-bottom: $space-50 !important;
            }
        }
    }
}
</style>
