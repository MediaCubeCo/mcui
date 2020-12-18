<template>
    <label class="mc-field-toggle" :class="classes">
        <span class="mc-field-toggle__text">
            <!-- @slot Слот для тайтла тогглера -->
            <slot />
        </span>
        <span class="mc-field-toggle__wrapper">
            <input
                class="mc-field-toggle__field"
                type="checkbox"
                :checked="_value"
                :disabled="disabled"
                @input="e => change(e.target.checked)"
            />
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
         *  относительно переклбчателя
         */
        textPosition: {
            type: String,
            default: 'left',
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
                color: $color-blue;
            }
        }
        @at-root #{$block-name}--disabled#{$block-name}--colored-text {
            #{$block-name}__text {
                color: $color-outline-gray;
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
                background-color: $color-blue;

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
                background-color: fade-out($color-white, 0.4);
            }
        }
    }
}
</style>
