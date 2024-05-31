<template>
    <label class="mc-field-radio-button" :class="classes">
        <input v-bind="inputProps" @change="handleChange" />
        <span class="mc-field-radio-button__icon_wrapper">
            <mc-svg-icon
                :name="checkedDefault ? activeIcon : 'circle'"
                :color="iconColor"
                :size="iconSize"
                class="mc-field-radio-button__icon"
            />
        </span>
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
import McSvgIcon from '../../../McSvgIcon/McSvgIcon.vue'
export default {
    name: 'McFieldRadioButton',
    components: {
        McTitle,
        McSvgIcon,
    },
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
        /**
         * цвет
         */
        color: {
            type: String,
            default: 'purple',
        },
        iconSize: {
            type: String,
            default: '250',
        },
    },
    computed: {
        classes() {
            return {
                'mc-field-radio-button--disabled': this.disabled,
                'mc-field-radio-button--empty': !this.label && !this.$slots.default,
            }
        },
        activeIcon() {
            switch (this.activeVariation) {
                case 'checkmark': {
                    return 'check_circle_solid'
                }
                default: {
                    return 'radio--checked'
                }
            }
        },
        iconColor() {
            switch (true) {
                case this.disabled:
                    return 'outline-gray'
                case this.checkedDefault:
                    return this.color
                default:
                    return 'gray'
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
@import '../../../../styles/mixins';
.mc-field-radio-button {
    $block-name: &;
    display: inline-block;
    min-width: $size-250;
    min-height: $size-250;
    @include reset();
    position: relative;
    padding-inline-start: $space-300;
    line-height: $line-height-200;
    font-size: $font-size-200;
    cursor: pointer;

    &__icon {
        &_wrapper {
            z-index: 1;
            @include position(absolute, 0 null null 0);
        }
    }

    &__text {
        display: inline-block;
        margin: 2px 0;
    }

    &__input {
        display: none;
    }

    &--disabled {
        cursor: auto;

        #{$block-name}__input {
            & ~ #{$block-name}__icon_wrapper {
                .mc-svg-icon {
                    border-radius: $radius-circle;
                    background-color: $color-hover-gray;
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
