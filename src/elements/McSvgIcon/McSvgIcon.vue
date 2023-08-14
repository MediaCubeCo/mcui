<template>
    <svg :class="classes" class="mc-svg-icon">
        <use :xlink:href="`${spritePath}#${name}`"></use>
    </svg>
</template>

<script>
import iconsSpriteIcon from '../../assets/icons.svg'

export default {
    name: 'McSvgIcon',
    props: {
        /**
         * Путь к спрайту с иконками
         * */
        spritePath: {
            type: String,
            default: iconsSpriteIcon,
        },
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
            default: '250',
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
    },
}
</script>

<style lang="scss">
.mc-svg-icon {
    @include reset();
    @include reset-text-indents();

    @include size(inherit);

    &--size {
        @each $size, $value in $token-icon-sizes {
            &-#{$size} {
                width: $value;
                height: $value;
                min-width: $value;
                min-height: $value;
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
