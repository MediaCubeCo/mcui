<template>
    <div class="mc-filter-type-range">
        <mc-field-text v-model="more" :placeholder="placeholders.from.toLowerCase()" type="number" name="range_more" />
        <mc-field-text v-model="less" :placeholder="placeholders.to.toLowerCase()" type="number" name="range_less" />
    </div>
</template>

<script>
import McFieldText from '../../../elements/McField/McFieldText/McFieldText'
export default {
    name: 'McFilterTypeRange',
    components: {
        McFieldText,
    },
    props: {
        /**
         *  Значение
         */
        value: {
            type: Object,
            default: () => {
                return {
                    more: null,
                    less: null,
                }
            },
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
    data() {
        return {
            currentMore: null,
            currentLess: null,
        }
    },
    computed: {
        more: {
            get() {
                return this.value && this.value.more
            },
            set(val) {
                this.currentMore = val
                this.emitValue()
            },
        },
        less: {
            get() {
                return this.value && this.value.less
            },
            set(val) {
                this.currentLess = val
                this.emitValue()
            },
        },
    },
    watch: {
        value: {
            handler(val) {
                if (val) {
                    this.currentMore = this.value ? this.value.more : null
                    this.currentLess = this.value ? this.value.less : null
                }
            },
            deep: true,
        },
    },
    methods: {
        emitValue() {
            const hasMore = this.hasValue(this.currentMore)
            const hasLess = this.hasValue(this.currentLess)
            const hasMin = this.hasValue(this.filter.min)
            const hasMax = this.hasValue(this.filter.max)

            let more = hasMore ? Number(this.currentMore) : null
            let less = hasLess ? Number(this.currentLess) : null

            if (more < this.filter.min && hasMin) {
                more = this.filter.min
            }
            if (less > this.filter.max && hasMax) {
                less = this.filter.max
            }
            if (more > this.filter.max && hasMax) {
                more = this.filter.max
            }
            if (less < this.filter.min && hasMin) {
                less = this.filter.min
            }
            const result = {
                ...(hasMore ? { more } : {}),
                ...(hasLess ? { less } : {}),
            }
            this.currentLess = less
            this.currentMore = more

            /**
             * Событие по изменению интервала
             */
            this.$emit('input', result)
        },
        hasValue(val) {
            return val || Number.isInteger(val)
        },
    },
}
</script>

<style lang="scss">
.mc-filter-type-range {
    $block-name: &;
    display: flex;
    @include child-indent-right($space-100);
    .mc-field-text {
        width: 146px;
    }
}
</style>
