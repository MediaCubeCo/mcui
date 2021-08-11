<template>
    <mc-field-select
        v-model="selectedOptionValue"
        :options="computedOptions"
        :internal-search="!isAjax"
        :placeholder="filter.placeholder || placeholders.choose"
        :disabled="relationType === 'exists'"
        class="mc-filter-type-relation"
        name="relation_select"
        @search-change="handleSearchChange"
    >
        <div slot="header" class="mc-filter-type-relation__header">
            <mc-title>{{ placeholders.condition }}</mc-title>
            <div class="mc-filter-type-relation__buttons">
                <mc-button
                    v-for="relation in relations"
                    :key="relation"
                    :variation="relationType === relation ? 'blue' : 'dark-gray-outline'"
                    @click="() => changeRelationType(relation)"
                >
                    {{ placeholders.actions[`${relation === 'exists' ? 'empty' : relation}`] }}
                </mc-button>
            </div>
        </div>
    </mc-field-select>
</template>

<script>
import _uniqWith from 'lodash/uniqWith'
import _isEqual from 'lodash/isEqual'
import _debounce from 'lodash/debounce'
import _isEmpty from 'lodash/isEmpty'
import McButton from '../../../elements/McButton/McButton'
import McTitle from '../../../elements/McTitle/McTitle'
import McFieldSelect from '../../../elements/McField/McFieldSelect/McFieldSelect'

export default {
    name: 'McFilterTypeRelation',
    components: {
        McButton,
        McTitle,
        McFieldSelect,
    },
    props: {
        /**
         *  Значение
         */
        value: {
            // type: [String, Number],
            default: null,
        },
        /**
         *  Объект выбранного
         *  фильтра
         */
        filter: {
            type: Object,
            default: () => {},
        },
        /**
         *  Переводы локализаций
         */
        placeholders: {
            type: Object,
            required: true,
        },
        /**
         *  Текущее значение
         *  добавленных фильтров
         */
        currentValues: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            relations: ['is', 'is_not', 'exists'],
            relationType: 'is',
            ajaxOptions: [],
        }
    },
    computed: {
        computedOptions() {
            let options = this.isAjax ? this.ajaxOptions : this.filter.options || []

            if (!_isEmpty(this.currentValues) && this.filter.value in this.currentValues) {
                const category = this.currentValues[this.filter.value]
                let selected = []
                for (let [key, val] of Object.entries(category)) {
                    if (key === 'exists') {
                        return []
                    }
                    selected = [...selected, ...(Array.isArray(val) ? val : [[val]])]
                }
                options = options.filter(o => !selected.includes(o.value))
            }

            return options
        },
        isAjax() {
            return typeof this.filter.getAjaxOptions === 'function'
        },
        selectedOptionValue: {
            get() {
                let val = this.value
                if (val) {
                    for (let [relationKey, relationVal] of Object.entries(this.value)) {
                        if (relationKey === 'exists') {
                            val = null
                        } else {
                            val = relationVal[0]
                        }
                    }
                    if (this.isAjax && val) {
                        this.addAjaxOption(val)
                    }
                }
                return val
            },
            set(val) {
                if (this.relationType === 'exists') return
                this.setValue(val)
            },
        },
    },
    watch: {
        value: {
            handler(val) {
                if (val) {
                    for (let relationKey of Object.keys(val)) {
                        this.relationType = relationKey
                    }
                }
            },
            immediate: true,
        },
        filter() {
            this.relationType = 'is'
        },
    },
    methods: {
        changeRelationType(relation) {
            if (this.relationType === relation) return
            this.relationType = relation
            this.setValue(this.selectedOptionValue)
        },
        async setAjaxOptions(value) {
            this.ajaxOptions = await this.filter.getAjaxOptions(value)
        },
        async addAjaxOption(value) {
            const option = await this.filter.getAjaxOne(value)
            this.ajaxOptions = _uniqWith([...this.ajaxOptions, option], _isEqual)
        },
        handleSearchChange(value) {
            if (!this.isAjax || !value) return
            this.debounceHandler(this.setAjaxOptions.bind(null, value))
        },
        debounceHandler: _debounce(method => method(), 500),
        setValue(value) {
            let currentValue = null
            let currentValueName = null
            const hasVal = value || Number.isInteger(value)
            if (this.relationType !== 'exists' && hasVal) {
                const selectedOption = this.computedOptions.find(o => String(o.value) === String(value))
                currentValue = { [this.relationType]: [String(value)] }
                currentValueName = { [this.relationType]: { [String(value)]: selectedOption.name } }
            }

            if (this.relationType === 'exists' && !this.currentValues[this.filter.value]) {
                currentValue = { ['exists']: [0] }
                currentValueName = { ['exists']: [0] }
            }
            /**
             * Событие по изменению значения
             */
            this.$emit('input', currentValue, currentValueName)
        },
    },
}
</script>

<style lang="scss">
.mc-filter-type-relation {
    $block-name: &;
    width: 300px;
    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: -$space-50;
        margin-top: -$space-50;
    }
    &__buttons {
        display: flex;
        @include child-indent-right($space-50);
        .mc-button {
            height: $size-300;
            padding: $space-50 $space-150;
        }
    }
}
</style>
