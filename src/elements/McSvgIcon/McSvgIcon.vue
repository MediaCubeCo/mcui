<template>
    <svg :class="classes" :style="styles">
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
            default: 1.5,
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
        dir: {
            type: String,
            default: 'ltr',
            validator(value) {
                return ['ltr', 'rtl'].includes(value)
            },
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
                'mc-svg-icon': true,
                [`mc-svg-icon--dir-${this.dir}`]: !!this.dir,
            }
        },
        styles() {
            return {
                ['--mc-svg-icon-size']: `var(--size-${this.size})`,
                ['--mc-svg-icon-weight']: String(this.weight)
                    ?.replace('.', '')
                    ?.split('')
                    ?.join('.'),
                ['--mc-svg-icon-color']: this.color && `var(--color-${this.color})`,
            }
        },
    },
}
</script>

<style lang="scss">
.mc-svg-icon {
    --mc-svg-icon-size: #{$size-250};
    --mc-svg-icon-weight: 1.5;
    --mc-svg-icon-color: initial;
    @include reset();
    @include reset-text-indents();

    @include size(inherit);
    width: var(--mc-svg-icon-size);
    height: var(--mc-svg-icon-size);
    min-width: var(--mc-svg-icon-size);
    min-height: var(--mc-svg-icon-size);
    stroke-width: var(--mc-svg-icon-weight);
    use {
        stroke-width: var(--mc-svg-icon-weight);
    }
    color: var(--mc-svg-icon-color);

    &--dir {
        &-rtl {
            transform: scale(-1, 1);
        }
    }
}
</style>
