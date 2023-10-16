<template>
    <mc-date-picker
        v-model="period"
        :placeholders="placeholders.calendar"
        :placeholder="filter.placeholder || placeholders.choose"
        :use-timezone="filter.useTimezone"
        to-format="YYYY-MM-DD"
        name="condition_dates"
        class="mc-filter-type-date"
        range
    />
</template>

<script>
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
    },
    computed: {
        period: {
            get() {
                return this.value ? [this.value.more, this.value.less] : []
            },
            set(val) {
                const period = (val || []).every(d => !!d?.trim()?.length) ? { more: val[0], less: val[1] } : {}
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
