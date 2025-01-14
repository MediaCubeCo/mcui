<template>
    <component
        :is="tag"
        ref="mc-button"
        v-tooltip="tooltipOptions"
        v-bind="tagBind"
        class="mc-button"
        :class="classes"
        :exact="exact"
        :style="styles"
        v-on="$listeners"
        @mouseover="animateUp"
        @mouseleave="animateDown"
        @blur="handleBlur"
    >
        <span v-if="$slots['icon-prepend']" class="mc-button__prepend">
            <!-- @slot Слот для вставки в начало -->
            <slot class="mc-button__prepend" name="icon-prepend" />
        </span>
        <span v-if="loading" class="mc-button__loader">
            <mc-svg-icon class="mc-button__loader-icon" type="div" name="loader" />
        </span>
        <span v-if="$slots.default" class="mc-button__text">
            <!-- @slot Слот по умолчанию -->
            <slot />
        </span>
        <span v-if="$slots['icon-append']" class="mc-button__append">
            <!-- @slot Слот для вставки в конец -->
            <slot name="icon-append" />
        </span>
        <div v-if="!isVariationLink" class="mc-button__background" />
    </component>
</template>

<script>
import McSvgIcon from '../McSvgIcon/McSvgIcon'
import { VTooltip } from 'v-tooltip'
import { checkContrastColor } from '../../utils/checkColor'

VTooltip.options.defaultBoundariesElement = 'window'
export default {
    name: 'McButton',
    components: {
        McSvgIcon,
    },
    directives: {
        tooltip: VTooltip,
    },
    props: {
        /**
         *  Если нужна ссылка внутри приложения:
         * `{name: 'test', params: { id: test.id }}`
         */
        to: {
            default: null,
        },
        /**
         *  Если нужна обычная ссылка:
         * `https://mediacube.agency/`
         */
        href: {
            default: null,
        },
        /**
         *  По умолчанию ожидается использование в `nuxt.js`
         *
         */
        nuxt: {
            type: Boolean,
            default: true,
        },
        /**
         *  Отключенное состояние
         *
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         *  Дизэйблить не меняя внешнего вида
         *
         */
        inactive: {
            type: Boolean,
            default: false,
        },
        /**
         *  Индикация загрузки
         *
         */
        loading: {
            type: Boolean,
            default: false,
        },
        /**
         *  Индикация загрузки
         *  вращением иконки
         */
        iconLoading: {
            type: Boolean,
            default: false,
        },
        /**
         *  Типы:
         *  `button, submit, reset`
         */
        type: {
            type: String,
            default: null,
        },
        /**
         *  Дизайн:
         *  `purple, red, purple-outline, purple-invert, purple-flat и т.д.`
         */
        variation: {
            type: String,
            default: 'main',
        },
        /**
         *  Размеры:
         *  `xs, xs-compact, s, s-compact, m, m-compact, l, l-compact`
         */
        size: {
            type: String,
            default: 'm',
        },
        /**
         *  Тень
         *
         */
        shadow: {
            type: Boolean,
            default: false,
        },
        /**
         *  Круглая
         *
         */
        rounded: {
            type: Boolean,
            default: false,
        },
        /**
         *  Закругленная
         *
         */
        semiRounded: {
            type: Boolean,
            default: false,
        },
        /**
         *  Позиция текста внутри кнопки:
         *  `left, center, right`
         */
        textAlign: {
            type: String,
            default: 'center',
        },
        /**
         *  На всю ширину
         *
         */
        fullWidth: {
            type: Boolean,
            default: false,
        },
        /**
         *  Если нужно активное состояние
         *
         */
        isActive: {
            type: Boolean,
            default: false,
        },
        /**
         *  exact
         *
         */
        exact: {
            type: Boolean,
            default: false,
        },
        /**
         * Заглавные буквы
         */
        uppercase: {
            type: Boolean,
            default: false,
        },
        /**
         * Тег по умолчанию
         */
        defaultTag: {
            type: String,
            default: 'button',
        },
        /**
         * Если нужен другой цвет при взаимодействии
         */
        secondaryColor: {
            type: String,
            default: '',
        },
        /**
         * Если нужна подчёркнутая ссылка
         */
        underlineLink: {
            type: Boolean,
            default: false,
        },
        /**
         * Если нужен постоянный
         * фон у типа 'flat'
         */
        bgFlat: {
            type: Boolean,
            default: false,
        },
        /**
         * Жирность шрифта:
         * `normal, medium, semi-bold`
         */
        weight: {
            type: String,
            default: 'semi-bold',
        },
        /**
         * Нужна ли кастомная анимация для кнопки
         */
        animation: {
            type: Boolean,
            default: false,
        },
        /**
         * Настройка кастомной анимации - смена бг // текста при наведении
         */
        customAnimation: {
            type: Object,
            default: () => ({
                background: null,
                text: null,
            }),
        },
        /**
         * Тултип при наличии
         */
        tooltip: {
            type: String,
            default: null,
        },

        /**
         * Атрибут tabindex для главного элемента
         *
         */
        tabindex: {
            type: [String, Number],
        },
    },
    data: () => ({
        custom_background: null,
    }),
    computed: {
        classes() {
            return {
                [`mc-button--variation-${this.variation}`]: this.variation,
                [`mc-button--size-${this.size}`]: this.size,
                [`mc-button--text-align-${this.textAlign}`]: this.textAlign,
                'mc-button--loading': this.loading,
                'mc-button--icon-loading': this.iconLoading,
                'mc-button--is-active': this.isActive,
                'mc-button--disabled': this.disabled,
                'mc-button--rounded': this.rounded && /-compact$/.test(this.size),
                'mc-button--semi-rounded': this.semiRounded,
                'mc-button--contrast': this.isContrast,
                'mc-button--full-width': this.fullWidth,
                'mc-button--uppercase': this.uppercase,
                'mc-button--shadow': this.shadow,
                'mc-button--secondary-color': !!this.secondaryColor,
                'mc-button--underline-link': this.underlineLink,
                'mc-button--bg-flat': this.bgFlat,
                [`mc-button--type-${this.buttonVariation.type}`]: this.buttonVariation.type,
                'mc-button--inactive': this.inactive,
            }
        },
        buttonVariation() {
            const variation = this.custom_background || this.variation
            const texts = variation.split('-')
            const currentStyle = texts[texts.length - 1]
            let color = variation.replace(`-${currentStyle}`, '')
            switch (currentStyle) {
                case 'flat':
                case 'outline':
                case 'invert':
                case 'link':
                    break
                default: {
                    color = variation
                    break
                }
            }
            return {
                color,
                type: currentStyle,
            }
        },
        /**
         * Так как сейчас мы используем светлую тему, то проверяем контраст цвета на основе белого
         * Проверяем только для main цветов, так как остальные должны подходить по стандарту
         * TODO: сделать проверку контраста для темных тем
         * */
        isContrast() {
            let [color] = this.variation.split('-') || []
            return color.includes('main') && checkContrastColor(color, [255, 255, 255])
        },
        styles() {
            let hoverBrightness
            let textColor
            switch (this.buttonVariation.type) {
                case 'flat':
                case 'outline':
                case 'invert': {
                    if (this.isContrast) textColor = 'black'
                    break
                }
                case 'link':
                    textColor = this.buttonVariation.color
                    break
                default: {
                    switch (this.buttonVariation.color) {
                        case 'yellow':
                        case 'white': {
                            hoverBrightness = '0.9'
                            break
                        }
                        case 'toxic': {
                            break
                        }
                        default: {
                            textColor = this.isContrast ? 'black' : 'white'
                        }
                    }
                    break
                }
            }

            return {
                '--mc-button-secondary-color': this.secondaryColor && `var(--color-${this.secondaryColor})`,
                '--mc-button-background-color': this.variation && `var(--color-${this.buttonVariation.color})`,
                '--mc-button-font-weight': this.weight && `var(--font-weight-${this.weight})`,
                '--mc-button-hover-brightness': hoverBrightness,
                '--mc-button-text-color': textColor && `var(--color-${textColor})`,
            }
        },
        tag() {
            if (this.to && this.$router) {
                return this.nuxt ? 'nuxt-link' : 'router-link'
            } else if (this.href) {
                return 'a'
            }
            return this.defaultTag
        },
        isVariationLink() {
            return this.buttonVariation.type === 'link'
        },
        tagBind() {
            const result = {}
            if (this.to) {
                result.to = this.to
            } else if (this.href) {
                result.href = this.href
            } else if (this.disabled || this.loading) {
                result.disabled = true
            }

            if (this.isVariationLink) result.rel = 'noreferrer'
            result.type = this.type
            result.tabindex = this.tabindex

            return result
        },
        tooltipOptions() {
            return this.tooltip
                ? {
                      content: this.tooltip,
                      placement: 'top',
                      classes: 'mc-tooltip mc-tooltip--width-m mc-tooltip--size-s',
                      trigger: 'hover focus',
                      show: false,
                      container: 'body',
                      template: `<div class="tooltip" role="tooltip"> <div class="tooltip-arrow"></div> <div class="tooltip-inner"><div class="tooltip-inner__content"></div></div> </div>`,
                      innerSelector: '.tooltip-inner__content',
                  }
                : null
        },
    },
    watch: {
        animation() {
            this.setDefault()
        },
    },
    methods: {
        animateUp() {
            if (this.animation) {
                this.customAnimation?.text &&
                    (this.$refs['mc-button'].querySelector('.mc-button__text').innerHTML = this.customAnimation?.text)
                this.custom_background = this.customAnimation?.background
            }
        },
        animateDown() {
            if (this.$refs['mc-button'] && this.animation) {
                this.setDefault()
            }
        },
        setDefault() {
            const defaultSlotText = this.$slots.default && this.$slots.default.find(s => s.text && s.text.trim().length)
            this.$refs['mc-button'].querySelector('.mc-button__text').innerHTML = defaultSlotText
                ? defaultSlotText.text
                : ''
            this.custom_background = null
        },
        handleBlur(e) {
            this.$refs['mc-button'].blur()
            this.$emit('blur', e)
        },
    },
}
</script>

<style lang="scss">
@import '../../styles/mixins';
@import '../../tokens/durations';
@import '../../tokens/opacities';
@import '../../tokens/font-families';
@import '../../tokens/letter-spacings';
@import '../../tokens/animations';
.mc-button {
    $block-name: &;
    @include reset();
    --mc-button-background-color: #{$color-transparent};
    --mc-button-font-weight: #{$font-weight-normal};
    --mc-button-text-color: #{$color-black};
    --mc-button-hover-brightness: 0.9;
    --mc-button-secondary-color: initial;
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border: none;
    flex-wrap: nowrap;
    max-width: 100%;
    font-family: $font-family-main;
    border-radius: $radius-100;
    white-space: nowrap;
    user-select: none;
    text-decoration: none;
    text-transform: none;
    background: none;
    cursor: pointer;
    outline: 0;
    transition: all $duration-s;
    font-weight: var(--mc-button-font-weight);
    color: var(--mc-button-text-color);
    -webkit-appearance: none;
    -webkit-text-fill-color: currentColor;
    z-index: 0;

    &__loader {
        display: none;
        @include align(true, true, absolute);
        z-index: 1;
        &-icon {
            animation: $animation-spinner;
        }
    }
    &__prepend,
    &__append {
        display: inline-flex;
        align-items: center;
        z-index: 1;
    }
    &--contrast {
        color: var(--mc-button-text-color) !important;
        #{$block-name} {
            &--is-active,
            &.nuxt-link-active {
                color: var(--color-main-dark);
                background-color: transparent;
                border-color: transparent;
                pointer-events: none;
            }
        }
    }
    &__text {
        @include ellipsis($display: inline-block);
        @include layout-flex-fix();
        z-index: 1;
        &:empty {
            display: none;
        }
    }
    @mixin hoverMixin {
        @media #{$media-desktop} {
            &:hover {
                #{$block-name}__background {
                    @content;
                }
            }
        }

        &:active {
            #{$block-name}__background {
                @content;
            }
        }
    }
    @include hoverMixin {
        filter: brightness(var(--mc-button-hover-brightness));
    }

    &--size {
        &-xxs {
            height: $size-300;
            padding: 0 $space-100;
            letter-spacing: normal;
            font-size: $font-size-200;
            line-height: $line-height-200;

            &-compact {
                @include size($size-300);
                padding: $space-50;
                .mc-svg-icon {
                    @include size($size-200);
                }
            }
            .mc-svg-icon {
                @include size($size-200);
            }

            #{$block-name} {
                &__prepend {
                    margin-inline-end: $space-50;
                }
                &__append {
                    margin-inline-start: $space-50;
                }
            }
        }
        &-xs {
            height: $size-400;
            padding: 0 $space-150;
            letter-spacing: normal;
            font-size: $font-size-200;
            line-height: $line-height-200;

            &-compact {
                @include size($size-400);
                padding: 6px;
                .mc-svg-icon {
                    @include size($size-250);
                }
            }
            .mc-svg-icon {
                @include size($size-250);
            }

            #{$block-name} {
                &__prepend {
                    margin-inline-end: $space-50;
                }
                &__append {
                    margin-inline-start: $space-50;
                }
            }
        }
        &-s {
            height: $size-500;
            padding: 0 $space-200;
            letter-spacing: normal;
            font-size: $font-size-200;
            line-height: $line-height-200;

            &-compact {
                @include size($size-500);
                padding: $space-150;
                .mc-svg-icon {
                    @include size($size-250);
                }
            }
            .mc-svg-icon {
                @include size($size-250);
            }

            #{$block-name} {
                &__prepend {
                    margin-inline-end: $space-50;
                }
                &__append {
                    margin-inline-start: $space-50;
                }
            }
        }
        &-m {
            height: $size-500;
            padding: 0 $space-200;
            font-size: $font-size-200;
            line-height: $line-height-200;

            &-compact {
                @include size($size-500);
                padding: $space-100;
                .mc-svg-icon {
                    @include size($size-300);
                }
            }
            .mc-svg-icon {
                @include size($size-300);
            }

            #{$block-name} {
                &__prepend {
                    margin-inline-end: $space-50;
                }
                &__append {
                    margin-inline-start: $space-50;
                }
            }
        }
        &-l {
            height: $size-600;
            padding: $space-150 $space-300;
            font-size: $font-size-200;
            line-height: $line-height-200;

            &-compact {
                @include size($size-600);
                padding: $space-150;
                .mc-svg-icon {
                    @include size($size-300);
                }
            }
            .mc-svg-icon {
                @include size($size-300);
            }

            #{$block-name} {
                &__prepend {
                    margin-inline-end: $space-100;
                }
                &__append {
                    margin-inline-start: $space-100;
                }
            }
        }

        &-s,
        &-m,
        &-l {
            &-compact {
                #{$block-name} {
                    &__prepend,
                    &__append {
                        margin: 0 !important;
                    }
                }
            }
        }
    }

    &__background {
        position: absolute;
        top: 0;
        left: 0;
        @include size(100%);
        opacity: 1 !important;
        border: 1px solid $color-transparent;
        border-radius: inherit;
        background-color: var(--mc-button-background-color);
        transition: all $duration-s;
    }
    &--type {
        &-outline {
            color: var(--mc-button-background-color);
            #{$block-name}__background {
                opacity: 0.6 !important;
                background-color: $color-transparent;
                border-color: var(--mc-button-background-color);
            }
            @media #{$media-desktop} {
                &:hover {
                    #{$block-name}__background {
                        background-color: var(--mc-button-background-color);
                        opacity: 0.2 !important;
                    }
                }
                &:active {
                    #{$block-name}__background {
                        background-color: var(--mc-button-background-color);
                        border: none;
                    }
                }
            }
        }
        &-invert {
            color: var(--mc-button-background-color);
            #{$block-name} {
                &__background {
                    opacity: 0.1 !important;
                }
            }
            // TODO check contast colors
            //&#{$block-name}--contrast {
            //    #{$block-name} {
            //        &__background {
            //            opacity: 0.4 !important;
            //        }
            //    }
            //}
            @include hoverMixin {
                opacity: 0.2 !important;
            }
            //&#{$block-name}--contrast {
            //    @include hoverMixin {
            //        opacity: 0.6 !important;
            //    }
            //}
        }
        &-flat {
            color: var(--mc-button-background-color);
            #{$block-name}__background {
                opacity: 0 !important;
            }
            @include hoverMixin {
                opacity: 0.1 !important;
            }
        }
        &-link {
            color: var(--mc-button-background-color);
            padding: 0;
            @include size(auto);
            border: none;
            user-select: text;
            &#{$block-name}--size-l {
                line-height: $line-height-250;
            }
            &#{$block-name}--contrast {
                filter:  brightness(80%);
            }
            &#{$block-name} {
                &--disabled {
                    opacity: $opacity-disabled;
                    background-color: transparent !important;
                    color: var(--mc-button-background-color) !important;
                    border-color: transparent !important;
                }
            }
            @media #{$media-desktop} {
                &:hover {
                    filter: brightness(0.85);
                }
            }

            &:active {
                filter: brightness(0.85);
            }
            #{$block-name} {
                &__background {
                    display: none;
                }
            }
        }
    }
    &--bg-flat {
        #{$block-name} {
            &__background {
                opacity: 0.1 !important;
            }
        }
    }
    &--shadow {
        box-shadow: 0 3px 10px var(--mc-button-background-color);
    }
    &--underline-link {
        #{$block-name}__text {
            text-decoration: underline !important;
        }
    }

    &--secondary-color {
        @media #{$media-desktop} {
            &:hover {
                color: var(--mc-button-secondary-color);
            }
        }
        &:active {
            color: var(--mc-button-secondary-color);
        }
    }

    &--uppercase {
        text-transform: uppercase;
        letter-spacing: $letter-spacing-m;
    }

    &--is-active,
    &.nuxt-link-active {
        color: var(--color-main);
        background-color: transparent;
        border-color: transparent;
        pointer-events: none;
    }

    &--rounded {
        border-radius: $radius-circle;
    }

    &--semi-rounded {
        border-radius: 50px;
    }

    &--full-width {
        width: 100%;
    }

    &--text-align {
        &-left {
            justify-content: flex-start;
        }
        &-center {
            justify-content: center;
        }
        &-right {
            justify-content: flex-end;
        }
    }

    &--loading,
    &--icon-loading,
    &--disabled {
        pointer-events: none;
    }

    &--loading {
        #{$block-name} {
            &__loader {
                display: inline-block;
            }
        }

        > *:not(#{$block-name}__loader) {
            opacity: 0;
        }
    }
    &--icon-loading {
        #{$block-name} {
            &__append,
            &__prepend {
                .mc-svg-icon {
                    animation: $animation-spinner;
                }
            }
        }
    }

    &--disabled {
        color: $color-outline-gray;
        cursor: not-allowed;
        #{$block-name} {
            &__background {
                background-color: $color-hover-gray;
                border-color: $color-hover-gray;
            }
        }
    }

    &--inactive {
        pointer-events: none;
    }
}
</style>
