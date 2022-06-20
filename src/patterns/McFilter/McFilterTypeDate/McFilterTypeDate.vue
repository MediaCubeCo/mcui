<template>
    <mc-date-picker
        v-model="period"
        :placeholders="placeholders.calendar"
        :placeholder="filter.placeholder || placeholders.choose"
        :use-timezone="useTimezone"
        name="condition_dates"
        class="mc-filter-type-date"
        range
    />
</template>

<script>
import _isEmpty from 'lodash/isEmpty'
import McDatePicker from '../../../elements/McDatePicker/McDatePicker'
export default {
    name: 'McFilterTypeDate',
    components: {
        McDatePicker,
    },
    props: {
        /**
         *  Значение
         */
        value: {
            type: Object,
            default: () => {},
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
        useTimezone: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        period: {
            get() {
                return this.value ? [this.value.more, this.value.less] : []
            },
            set(val) {
                const period = !_isEmpty(val) ? { more: val[0], less: val[1] } : {}
                /**
                 * Событие по изменению периода
                 */
                this.$emit('input', period)
            },
        },
    },
}
</script>

<style lang="scss">
.mc-filter-type-Date {
    $block-name: &;
    width: 300px;
}
</style>
