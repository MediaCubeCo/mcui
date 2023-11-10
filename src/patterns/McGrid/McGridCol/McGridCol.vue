<template>
    <div :class="classes" :style="styles" class="mc-grid-col">
        <!-- @slot Слот контента -->
        <slot />
    </div>
</template>

<script>
import { upperFirst } from '../../../helpers/functions'
const values = ['span', 'order', 'offset', 'push', 'pull']
const sizes = ['xs', 's', 'm', 'l', 'xl', 'xxl']
const props = {}

values.forEach(value => {
    sizes.forEach(size => {
        props[`${value}-${size}`] = { type: Number }
    })
})

export default {
    name: 'McGridCol',
    inject: ['provideData'],
    props: {
        /**
         *  Кол-во колонок (всего 12)
         */
        span: { type: Number },

        /**
         *  Очерёдность
         */
        order: { type: Number },

        /**
         *  Отступ (margin-left)
         */
        offset: { type: Number },

        /**
         *  Отступ (left)
         */
        push: { type: Number },

        /**
         *  Отступ (right)
         */
        pull: { type: Number },

        ...props,

        /**
         *  Автоматически тянущаяся колонка
         *  на всё свободное пространство
         */
        stretchSelf: {
            type: Boolean,
            default: false,
        },

        /**
         *  Основа флекса, которая является начальным размером элемента
         *  (указывать с единицами измерения: px, %...)
         */
        basis: {
            type: String,
            default: 'auto',
        },
    },

    computed: {
        classes() {
            const list = {}
            values.forEach(value => {
                list[`mc-grid-col--${value}-${this[value]}`] = this[value]
                sizes.forEach(size => {
                    const sizeValue = this[`${value}${upperFirst(size)}`]
                    list[`mc-grid-col--${value}-${size}-${sizeValue}`] = sizeValue
                })
            })
            return list
        },

        styles() {
            let colStyle = {}

            if (this.provideData.gutterX !== 0) {
                colStyle['padding-left'] = `${this.provideData.gutterX / 2}px`
                colStyle['padding-right'] = `${this.provideData.gutterX / 2}px`
            }

            if (this.provideData.gutterY !== 0) {
                colStyle['padding-top'] = `${this.provideData.gutterY / 2}px`
                colStyle['padding-bottom'] = `${this.provideData.gutterY / 2}px`
            }

            if (this.stretchSelf) {
                colStyle['flex'] = `1 0 ${this.basis}`
            } else if (this.basis !== 'auto') {
                colStyle['flex'] = `0 0 ${this.basis}`
            }

            return this.order ? { ...colStyle, order: this.order } : colStyle
        },
    },
}
</script>

<style lang="scss">
.mc-grid-col {
    $block-name: &;

    $cols: 12;

    display: block;
    position: relative;
    max-width: 100%;

    @mixin generate-col($viewport: '') {
        @for $i from 1 through $cols {
            &--span#{$viewport}-#{$i} {
                flex: 0 0 calc((#{$i} / #{$cols}) * 100%);
                max-width: calc((#{$i} / #{$cols}) * 100%);
            }

            &--push#{$viewport}-#{$i} {
                inset-inline-start: calc((#{$i} / #{$cols}) * 100%);
            }

            &--pull#{$viewport}-#{$i} {
                inset-inline-end: calc((#{$i} / #{$cols}) * 100%);
            }

            &--offset#{$viewport}-#{$i} {
                margin-inline-start: calc((#{$i} / #{$cols}) * 100%);
            }

            &--order#{$viewport}-#{$i} {
                order: #{$i};
            }
        }
    }

    @include generate-col('');

    @media #{$media-query-xs} {
        @include generate-col('-xs');
    }

    @media #{$media-query-s} {
        @include generate-col('-s');
    }

    @media #{$media-query-m} {
        @include generate-col('-m');
    }

    @media #{$media-query-l} {
        @include generate-col('-l');
    }

    @media #{$media-query-xl} {
        @include generate-col('-xl');
    }
}
</style>
