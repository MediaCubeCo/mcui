<template>
    <mc-chip :closable="closable" :variation="computedVariation" :class="classes" size="s" @click="handleChipClick">
        <mc-title v-if="tag.categoryName" weight="semi-bold">{{ computedCategory }}</mc-title>
        <mc-title v-if="tag.title">{{ tag.title }}</mc-title>
    </mc-chip>
</template>
<script>
import McTitle from '../../../elements/McTitle/McTitle'
import McChip from '../../../elements/McChip/McChip'
export default {
    name: 'McFilterChip',
    components: { McChip, McTitle },
    props: {
        /**
         *  Объект тэга
         */
        tag: {
            type: Object,
            required: true,
        },
        /**
         *  Закрывающийся
         */
        closable: {
            type: Boolean,
            default: false,
        },
        /**
         *  Активный
         */
        isActive: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        computedCategory() {
            const append = this.tag.title ? ':' : ''
            return `${this.tag.categoryName}${append}`
        },
        computedVariation() {
            return this.closable ? 'purple-invert' : 'hover-gray'
        },
        classes() {
            return {
                'mc-filter-chip': true,
                'mc-filter-chip--closable': this.closable,
                'mc-filter-chip--is-active': this.isActive,
            }
        },
    },
    methods: {
        handleChipClick(e) {
            /**
             * Событие по закрытию тэга
             */
            this.$emit('close')
            e.stopPropagation()
        },
    },
}
</script>
<style lang="scss">
.mc-filter-chip {
    $block-name: &;
    border-radius: $space-50;

    &--closable {
        border-radius: $space-150;
        &:hover {
            cursor: pointer;
            background-color: fade-out($color-purple, 0.6);
        }
    }
    &--is-active {
        background-color: fade-out($color-purple, 0.6);
    }

    .mc-title {
        width: auto;
    }
}
</style>
