<template>
    <div class="mc-grid-row" :class="classes" :style="styles">
        <!-- @slot Слот для дочерних mc-grid-col -->
        <slot />
    </div>
</template>

<script>
export default {
    name: 'McGridRow',
    provide() {
        const provideData = {}
        const properties = ['gutterX', 'gutterY']
        properties.forEach(property => {
            Object.defineProperty(provideData, property, {
                enumerable: true,
                get: () => this[property],
            })
        })
        return { provideData }
    },
    props: {
        /**
         *  Расстояние между колонками по горизонтали
         */
        gutterX: {
            type: Number,
            default: 0,
        },

        /**
         *  Расстояние между колонками по вертикали
         */
        gutterY: {
            type: Number,
            default: 0,
        },

        /**
         *  Выравнивание по горизонтали
         */
        justify: {
            type: String,
            default: 'left',
            validator: function(value) {
                return ['left', 'right', 'center', 'around', 'between'].indexOf(value) !== -1
            },
        },

        /**
         *  Выравнивание по вертикали
         */
        align: {
            type: String,
            default: 'top',
            validator: function(value) {
                return ['top', 'middle', 'bottom', 'stretch'].indexOf(value) !== -1
            },
        },

        /**
         *  Автоматически тянущиеся колонки
         */
        stretch: {
            type: Boolean,
            default: false,
        },

        /**
         *  Перенос колонок
         */
        wrap: {
            type: Boolean,
            default: true,
        },
    },

    computed: {
        classes() {
            return {
                [`mc-grid-row--justify-${this.justify}`]: this.justify,
                [`mc-grid-row--align-${this.align}`]: this.align,
                ['mc-grid-row--stretch']: this.stretch,
            }
        },

        styles() {
            let result = {}

            if (this.gutterX !== 0) {
                result['margin-left'] = `${-this.gutterX / 2}px`
                result['margin-right'] = `${-this.gutterX / 2}px`
            }

            if (this.gutterY !== 0) {
                result['margin-top'] = `${-this.gutterY / 2}px`
                result['margin-bottom'] = `${-this.gutterY / 2}px`
            }

            if (this.wrap) {
                result['flex-wrap'] = 'wrap'
            }
            let justify
            switch (this.justify) {
                case 'left':
                    justify = 'flex-start'
                    break
                case 'right':
                    justify = 'flex-end'
                    break
                case 'center':
                    justify = 'center'
                    break
                case 'around':
                    justify = 'space-around'
                    break
                case 'between':
                    justify = 'space-between'
                    break
            }
            let align
            switch (this.align) {
                case 'top':
                    align = 'flex-start'
                    break
                case 'middle':
                    align = 'center'
                    break
                case 'bottom':
                    align = 'flex-end'
                    break
                case 'stretch':
                    align = 'stretch'
                    break
            }
            if (align) result['--mc-grid-row-align'] = align
            if (justify) result['--mc-grid-row-justify'] = justify

            return result
        },
    },
}
</script>

<style lang="scss">
.mc-grid-row {
    $block-name: &;
    display: flex;
    flex-direction: row;
    justify-content: var(--mc-grid-row-justify);
    align-items: var(--mc-grid-row-align);
    &--stretch {
        > .mc-grid-col {
            flex: 1;
        }
    }
}
</style>
