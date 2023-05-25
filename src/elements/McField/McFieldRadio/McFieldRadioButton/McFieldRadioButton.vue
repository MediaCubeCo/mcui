<template>
    <label class="mc-field-radio-button" :class="classes">
        <input v-bind="inputProps" @change="handleChange" />
        <span class="mc-field-radio-button__icon"></span>
        <span v-if="label || $slots.default" class="mc-field-radio-button__text">
            <!-- @slot Слот для пользовательской подписи радио -->
            <slot>
                <mc-title tag-name="div" :ellipsis="false">
                    {{ label }}
                </mc-title>
            </slot>
        </span>
    </label>
</template>

<script>
import McTitle from '../../../McTitle/McTitle'
export default {
    name: 'McFieldRadioButton',
    components: { McTitle },
    props: {
        /**
         *  Значение
         */
        value: {
            default: null,
        },

        /**
         *  Name
         */
        name: {
            type: String,
            required: true,
        },

        /**
         *  Предварительно активированный
         */
        checkedDefault: {
            type: Boolean,
            default: false,
        },

        /**
         *  Подпись радио:
         *
         */
        label: {
            type: String,
            default: null,
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
         * Атрибут tabindex для главного элемента
         *
         */
        tabindex: {
            type: [String, Number],
        },
        /**
         * Вариант активного состояния - circle || checkmark
         * circle - внутри круг
         * checkmark - внутри галочка
         * */
        activeVariation: {
            type: String,
            default: 'circle',
        },
    },
    computed: {
        classes() {
            return {
                'mc-field-radio-button--disabled': this.disabled,
                'mc-field-radio-button--empty': !this.label && !this.$slots.default,
                [`mc-field-radio-button--active-${this.activeVariation}`]: !!this.activeVariation,
            }
        },
        inputProps() {
            return {
                disabled: this.disabled,
                value: this.value,
                name: this.name,
                checked: this.checkedDefault,
                tabindex: this.tabindex,
                class: 'mc-field-radio-button__input',
                type: 'radio',
            }
        },
    },
    methods: {
        handleChange(event) {
            /**
             * Событие инпута
             * @property {boolean}
             */
            this.$emit('input', event)
        },
    },
}
</script>

<style lang="scss">
.mc-field-radio-button {
    $block-name: &;

    display: inline-block;
    min-width: $size-250;
    min-height: $size-250;
    @include reset();
    position: relative;
    padding-left: $space-300;
    line-height: $line-height-200;
    font-size: $font-size-200;
    cursor: pointer;

    &__icon {
        @include position(absolute, 0 null null 0);
        @include size($size-250);
        &::before {
            @include pseudo();
            @include position(null, 0);
            margin: 1px;
            border: 2px solid $color-gray;
            border-radius: $radius-circle;
            transition: border-color $duration-m;
        }
        &:hover::before {
            border-color: $color-purple;
        }

        &::after {
            @include pseudo();
            @include size($size-100);
            @include align(true, true, absolute);
            border-radius: $radius-circle;
            background-color: transparent;
            transition: background-color $duration-m;
        }
    }

    &__text {
        display: inline-block;
        margin: 2px 0;
    }

    &__input {
        display: none;

        &:checked ~ #{$block-name}__icon {
            &::before {
                border-color: $color-purple;
            }
            &::after {
                background-color: $color-purple;
            }
        }
    }

    &--active {
        &-checkmark {
            #{$block-name} {
                &__icon {
                    &:after {
                        content: '✓';
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-weight: $font-weight-bold;
                        // Для выравнивания иконки по центру кнопки
                        line-height: 100%;
                        color: $color-white;
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }

    &--disabled {
        cursor: auto;

        #{$block-name}__input {
            & ~ #{$block-name}__icon {
                &::before {
                    background-color: $color-hover-gray;
                    border-color: $color-outline-gray;
                }
                &::after {
                    background-color: $color-hover-gray;
                }
            }
            &:checked ~ #{$block-name}__icon {
                &::after {
                    background-color: $color-outline-gray;
                }
            }
        }
    }

    &--empty {
        padding: 0;
        margin: 0;
    }
}
</style>
