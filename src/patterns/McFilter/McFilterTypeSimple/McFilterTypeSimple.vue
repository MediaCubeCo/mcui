<template>
    <mc-field-select
        v-model="selectedOptionValue"
        :options="computedOptions"
        :internal-search="!isAjax"
        :placeholder="computedPlaceholder"
        :loading="loading"
        hide-selected
        class="mc-filter-type-simple"
        name="simple_select"
        @search-change="handleSearchChange"
    >
        <div slot="header" class="mc-filter-type-simple__header">
            <mc-title>{{ placeholders.simple }}</mc-title>
        </div>
    </mc-field-select>
</template>

<script>
import _uniqWith from 'lodash/uniqWith'
import _isEqual from 'lodash/isEqual'
import _debounce from 'lodash/debounce'
import _isEmpty from 'lodash/isEmpty'
import McTitle from '../../../elements/McTitle/McTitle'
import McFieldSelect from '../../../elements/McField/McFieldSelect/McFieldSelect'

export default {
    name: 'McFilterTypeSimple',
    components: {
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
        asd: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            ajaxOptions: [],
            loading: false,
        }
    },
    computed: {
        computedPlaceholder() {
            return this.filter.placeholder || this.filter.is_text ? this.placeholders.enter : this.placeholders.choose
        },
        computedOptions() {
            let options = this.isAjax ? this.ajaxOptions : this.filter.options || []

            if (!_isEmpty(this.currentValues) && this.filter.value in this.currentValues) {
                const category = this.currentValues[this.filter.value]
                let selected = []
                for (let [key, val] of Object.entries(category)) {
                    selected = [...selected, ...(Array.isArray(val) ? val : [[val]])]
                }
                options = options.filter(o => !selected.includes(String(o.value)))
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
                    if (this.isAjax && val) {
                        this.addAjaxOption(val)
                    }
                }
                return val
            },
            set(val) {
                this.setValue(val)
            },
        },
    },
    watch: {
        filter() {
            this.$nextTick(() => (this.ajaxOptions = []))
        },
    },
    methods: {
        async setAjaxOptions(value) {
            this.loading = true
            this.ajaxOptions = await this.filter.getAjaxOptions(value)
            this.loading = false
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
            /**
             * Событие по изменению значения
             */
            this.$emit('input', value, this.computedOptions.find(o => String(o.value) === String(value))?.name)
        },
    },
}
</script>

<style lang="scss">
@import '../../../styles/mixins';
.mc-filter-type-simple {
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
