<template>
    <component :is="type" :class="classes" class="mc-svg-icon" v-html="svg" />
</template>

<script>
import svgIcons from '../../utils/load-icons'

export default {
    name: 'McSvgIcon',
    props: {
        /**
         * Имя иконки
         * из assets
         */
        name: {
            type: String,
            required: true,
        },
        /**
         * Цвет иконки
         * (по токенам)
         */
        color: {
            type: String,
            default: '',
        },
        /**
         * Заливка иконки
         */
        fill: {
            type: String,
            default: 'currentColor',
        },
        /**
         * Размер
         */
        size: {
            type: String,
            default: '300',
        },
        /**
         * Тип тега
         */
        type: {
            type: String,
            default: 'span',
        },
        /**
         * Толщина линий
         * stroke-width
         */
        weight: {
            type: Number,
            default: 0,
        },
        /**
         * Отображение иконки,
         * если не найдена по имени
         * в 'name'
         */
        defaultName: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            svg: null,
        }
    },
    computed: {
        classes() {
            return {
                [`mc-svg-icon--size-${this.size}`]: !!this.size,
                [`mc-svg-icon--color-${this.color}`]: !!this.color,
            }
        },
        computedWeight() {
            if (this.weight) {
                return this.weight
            }
            switch (parseInt(this.size)) {
                case 200:
                case 250:
                case 300:
                case 400:
                    return 1.5
                default:
                    return 2
            }
        },
    },
    watch: {
        name: {
            handler() {
                this.updateIcon()
            },
            immediate: true,
        },
        fill: {
            handler() {
                this.updateIcon()
            },
            immediate: true,
        },
        color: {
            handler() {
                this.updateIcon()
            },
            immediate: true,
        },
        size: {
            handler() {
                this.updateIcon()
            },
            immediate: true,
        },
        defaultName: {
            handler() {
                this.updateIcon()
            },
            immediate: true,
        },
    },
    methods: {
        updateIcon() {
            let icon = this.getIcon(this.name)
            if (!icon) {
                icon = this.getIcon(this.defaultName)
            }
            if (icon && icon.content) {
                if (icon.content.indexOf('stroke') !== -1) {
                    let filledSvg = icon.content.replace(/stroke=\S+/g, `fill="none" stroke="${this.fill}" `)
                    this.svg = filledSvg.replace(/stroke-width=\S+/g, `stroke-width="${this.computedWeight}" `)
                    return
                }
                this.svg = icon.content.replace(/^<svg /, `<svg style="fill: ${this.fill}"`)
            }
        },
        getIcon(name) {
            return svgIcons.find(i => i.name.slice(2, -4) === name)
        },
    },
}
</script>

<style lang="scss">
.mc-svg-icon {
    @include reset();
    @include reset-text-indents();

    svg {
        @include size(inherit);
    }

    &--size {
        @each $size, $value in $token-icon-sizes {
            &-#{$size} {
                @include size($value);
            }
        }
    }

    &--color {
        @each $color, $value in $token-colors {
            &-#{$color} {
                color: $value;
            }
        }
    }
}
</style>
