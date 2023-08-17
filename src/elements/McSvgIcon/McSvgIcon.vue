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
         * Толщина линий 0-5 если нужно больше, нужно дописать список в стилях
         * stroke-width
         */
        weight: {
            type: Number,
            default: null,
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
                [`mc-svg-icon--weight-${String(this.weight)?.replace('.', '')}`]: !!this.weight,
                [`mc-svg-icon--color-${this.color}`]: !!this.color,
            }
        },
    },
}
</script>

<style lang="scss">
$token-weights: (
    '05': 0.5,
    '1': 1,
    '15': 1.5,
    '2': 2,
    '25': 2.5,
    '3': 3,
    '35': 3.5,
    '4': 4,
    '45': 4.5,
    '5': 5,
);

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

    &--weight {
        @each $weight, $value in $token-weights {
            &-#{$weight} {
                stroke-width: $value;
                use {
                    stroke-width: $value;
                }
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
