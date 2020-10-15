<template>
    <mc-field-text
        v-model="text"
        :placeholder="filter.placeholder || placeholders.enter"
        class="mc-filter-type-text"
        name="condition_text"
    />
</template>

<script>
import McFieldText from '../../../elements/McField/McFieldText/McFieldText'
export default {
    name: 'McFilterTypeText',
    components: {
        McFieldText,
    },
    props: {
        /**
         *  Значение
         */
        value: {
            type: String,
            default: '',
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
        text: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('input', val)
            },
        },
    },
}
</script>

<style lang="scss">
.mc-filter-type-text {
    $block-name: &;
    width: 300px;
}
</style>
