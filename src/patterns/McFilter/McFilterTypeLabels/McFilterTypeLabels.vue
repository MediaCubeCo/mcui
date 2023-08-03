<template>
    <mc-field-text
        v-model="selectedOptionValue"
        :placeholder="filter.placeholder || placeholders.choose"
        class="mc-filter-type-labels"
        name="labels_text"
    >
        <div slot="header" class="mc-filter-type-labels__header">
            <mc-title>{{ placeholders.condition }}</mc-title>
            <div class="mc-filter-type-labels__buttons">
                <mc-button
                    v-for="relation in relations"
                    :key="relation"
                    :variation="relation_type === relation ? 'purple' : 'dark-gray-outline'"
                    @click="() => changeRelationType(relation)"
                >
                    {{ placeholders.actions[relation] }}
                </mc-button>
            </div>
        </div>
    </mc-field-text>
</template>

<script>
import McButton from '../../../elements/McButton/McButton'
import McTitle from '../../../elements/McTitle/McTitle'
import McFieldText from '../../../elements/McField/McFieldText/McFieldText'

export default {
    name: 'McFilterTypeLabels',
    components: {
        McButton,
        McTitle,
        McFieldText,
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
            relations: ['is', 'is_not'],
            relation_type: 'is',
        }
    },
    computed: {
        selectedOptionValue: {
            get() {
                let val = this.value
                if (val) {
                    for (let [relationKey, relationVal] of Object.entries(this.value)) {
                        [val] = relationVal || []
                    }
                }
                return val
            },
            set(val) {
                let currentValue = null
                let currentValueName = null
                if (val) {
                    currentValue = { [this.relation_type]: [val] }
                    currentValueName = { [this.relation_type]: { [val]: val } }
                }

                this.$emit('input', currentValue, currentValueName)
            },
        },
    },
    watch: {
        filter() {
            this.relation_type = 'is'
        },
    },
    methods: {
        changeRelationType(relation) {
            if (this.relation_type === relation) return
            this.relation_type = relation
        },
    },
}
</script>

<style lang="scss">
.mc-filter-type-labels {
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
