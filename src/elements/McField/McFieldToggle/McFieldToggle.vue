<template>
    <label class="mc-field-toggle" :class="classes">
        <span class="mc-field-toggle__text">
            <!-- @slot Слот для тайтла тогглера -->
            <slot />
        </span>
        <span class="mc-field-toggle__wrapper">
            <input v-bind="inputProps" @input="e => change(e.target.checked)" />
            <span class="mc-field-toggle__slider"></span>
        </span>
    </label>
</template>

<script>
export default {
    name: 'McFieldToggle',
    props: {
        /**
         *  Значение
         *
         */
        value: {
            type: [Boolean, String, Number],
            default: null,
        },
        /**
         *  Выбранное значение
         */
        checkedValue: {
            type: [Boolean, String, Number],
            default: true,
        },
        /**
         *  Невыбранное значение
         */
        uncheckedValue: {
            type: [Boolean, String, Number],
            default: false,
        },
        /**
         *  Изменение цвета текста
         *  при переключении
         */
        coloredText: {
            type: Boolean,
            default: false,
        },
        /**
         *  Отключенное состояние
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         *  Позиция текста
         *  относительно переключателя
         */
        textPosition: {
            type: String,
            default: 'left',
        },
        /**
         * Активный цвет
         */
        color: {
            type: String,
            default: 'purple',
        },

        /**
         * Атрибут tabindex для главного элемента
         */

        tabindex: {
            type: [String, Number],
        },
    },
    computed: {
        _value() {
            return this.value === this.checkedValue
        },
        classes() {
            return {
                'mc-field-toggle--checked': this._value,
                'mc-field-toggle--disabled': this.disabled,
                'mc-field-toggle--colored-text': this.coloredText,
                [`mc-field-toggle--text-position-${this.textPosition}`]: this.textPosition,
                [`mc-field-toggle--color-${this.color}`]: this.color,
            }
        },
        inputProps() {
            return {
                checked: this._value,
                disabled: this.disabled,
                tabindex: this.tabindex,
                class: 'mc-field-toggle__field',
                type: 'checkbox',
            }
        },
    },
    methods: {
        change(checked) {
            /**
             * Событие тоггла
             * @property {boolean}
             */
            this.$emit('input', checked ? this.checkedValue : this.uncheckedValue)
        },
    },
}
</script>

<style lang="scss">
.mc-field-toggle {
    $block-name: &;

    display: flex;
    align-items: center;
    cursor: pointer;

    &__text {
        color: $color-black;
        transition: color $duration-m;
        line-height: $line-height-200;
        font-size: $font-size-200;
        margin-right: $space-100;
        text-align: right;

        &:empty {
            margin-right: 0;
        }
    }

    &--colored-text {
        #{$block-name}__text {
            color: $color-gray;
        }

        @at-root #{$block-name}--checked#{$block-name}--colored-text {
            #{$block-name}__text {
                color: $color-purple;
            }
        }
        @at-root #{$block-name}--disabled#{$block-name}--colored-text {
            #{$block-name}__text {
                color: $color-outline-gray;
            }
        }
        @at-root #{$block-name}--checked#{$block-name}--disabled#{$block-name}--colored-text {
            #{$block-name}__text {
                color: $color-light-purple;
            }
        }
    }

    &--text-position-right {
        #{$block-name}__text {
            order: 2;
            margin-right: 0;
            margin-left: $space-100;
            text-align: left;
        }
    }

    &__wrapper {
        position: relative;
        display: inline-block;
        @include size($size-550, $size-250);
        flex-shrink: 0;
        & > #{$block-name}__field {
            opacity: 0;
            @include size(0);

            &:checked + #{$block-name}__slider {
                background-color: $color-purple;

                &:before {
                    transform: translateX($space-300);
                }
            }
        }

        #{$block-name}__slider {
            @include position(absolute, 0 0 0 0);
            background-color: $color-gray;
            transition: $duration-m;
            border-radius: 100px;

            &::before {
                @include pseudo();
                @include size($size-200);
                @include position(null, null null 2px 2px);
                background-color: $color-white;
                transition: $duration-m;
                border-radius: $radius-circle;
            }
        }
    }

    &--disabled {
        cursor: auto;
        #{$block-name}__slider {
            background-color: $color-outline-gray !important;
            &::before {
                background-color: $color-hover-gray;
            }
        }
    }

    @each $color, $value in $token-colors {
        &--color-#{$color} {
            #{$block-name}__wrapper > #{$block-name}__field:checked + #{$block-name}__slider {
                background-color: $value;
            }
            &#{$block-name}--disabled {
                &#{$block-name}--checked #{$block-name}__slider {
                    @if $color != 'purple' {
                        background-color: $value !important;
                        filter: saturate(50%);
                    } @else {
                        background-color: $color-light-purple !important;
                    }
                }
            }
        }
    }
}
html[direction='rtl'] {
    .mc-field-toggle {
        &__text {
            margin-right: 0;
            margin-left: $space-100;
            &:empty {
                margin-left: 0;
            }
        }
        &--text-position-right {
            .mc-field-toggle__text {
                margin-left: 0;
                margin-right: $space-100;
            }
        }

        &__wrapper {
            & > .mc-field-toggle__field {
                &:checked + .mc-field-toggle__slider {
                    &:before {
                        transform: translateX(-$space-300);
                    }
                }
            }

            .mc-field-toggle__slider {
                &::before {
                    @include position(null, null 2px 2px null);
                }
            }
        }
    }
}
</style>
