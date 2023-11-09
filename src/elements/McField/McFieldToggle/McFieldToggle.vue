<template>
    <label :class="classes" :style="styles">
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
                'mc-field-toggle': true,
                'mc-field-toggle--checked': this._value,
                'mc-field-toggle--disabled': this.disabled,
                'mc-field-toggle--colored-text': this.coloredText,
                [`mc-field-toggle--text-position-${this.textPosition}`]: this.textPosition,
            }
        },
        styles() {
            let disabledColor
            let saturateValue
            switch (this.color) {
                case 'purple': {
                    disabledColor = 'light-purple'
                    break
                }
                default: {
                    disabledColor = this.color
                    saturateValue = '50%'
                }
            }
            return {
                '--mc-field-toggle-color': this.color && `var(--color-${this.color})`,
                '--mc-field-toggle-disabled-color': disabledColor && `var(--color-${disabledColor})`,
                '--mc-field-toggle-saturate-value': saturateValue,
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
    $toggle-indent: $space-50 / 2;
    --mc-field-toggle-color: initial;
    --mc-field-disabled-color: initial;
    --mc-field-toggle-saturate-value: initial;
    display: flex;
    align-items: center;
    cursor: pointer;

    &__text {
        color: $color-black;
        transition: color $duration-m;
        line-height: $line-height-200;
        font-size: $font-size-200;
        margin-inline-end: $space-100;
        text-align: right;

        &:empty {
            margin-inline-end: 0;
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
            margin-inline: $space-100 0;
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
                    inset-inline-start: $space-300 + $toggle-indent;
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
                @include position(null, null null $toggle-indent $toggle-indent);
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
    #{$block-name}__wrapper > #{$block-name}__field:checked + #{$block-name}__slider {
        background-color: var(--mc-field-toggle-color);
    }
    &#{$block-name}--disabled {
        &#{$block-name}--checked #{$block-name}__slider {
            background-color: var(--mc-field-toggle-disabled-color) !important;
            filter: saturate(var(--mc-field-toggle-saturate-value));
        }
    }
}
</style>
