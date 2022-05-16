<template>
    <div class="mc-field-checkbox" :class="classes">
        <div v-if="title || $slots.header" class="mc-field-text__header">
            <!-- @slot Слот заголовка -->
            <slot name="header">
                <mc-title :ellipsis="false" weight="medium">{{ title }}</mc-title>
            </slot>
        </div>
        <div class="mc-field-checkbox__input-wrap">
            <label class="mc-field-checkbox__name">
                <mc-svg-icon
                    class="mc-field-checkbox__icon"
                    :name="isChecked ? 'checkbox--checked' : 'checkbox'"
                    :color="isChecked ? 'purple' : 'gray'"
                    :size="checkboxSize"
                />
                <input v-bind="inputProps" @change="handleChange" />
                <span v-if="mainText || $slots.default" class="mc-field-checkbox__name-text">
                    <!-- @slot Слот для пользовательской подписи чекбокса -->
                    <slot>
                        <mc-title tag-name="div" :ellipsis="false">
                            {{ mainText }}
                        </mc-title>
                    </slot>
                </span>
            </label>
            <div class="mc-field-checkbox__footer">
                <mc-title
                    v-if="errorText"
                    tag-name="div"
                    color="red"
                    variation="overline"
                    max-width="100%"
                    :ellipsis="false"
                >
                    {{ errorText }}
                </mc-title>
                <br v-if="errorText" />
                <!-- @slot Слот доп. текста под чекбоксом -->
                <slot name="footer">
                    <mc-title v-if="helpText" tag-name="div" variation="overline" max-width="100%" :ellipsis="false">
                        {{ helpText }}
                    </mc-title>
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
import McTitle from '../../McTitle/McTitle'
import McSvgIcon from '../../McSvgIcon/McSvgIcon'
export default {
    name: 'McFieldCheckbox',
    components: { McTitle, McSvgIcon },
    props: {
        /**
         *  Значение
         *
         */
        value: {
            default: null,
        },

        /**
         *  Name
         *
         */
        name: {
            type: String,
            default: null,
        },

        /**
         *  Выбранное значение
         *
         */
        checkedValue: {
            default: true,
        },

        /**
         *  Невыбранное значение
         *
         */
        uncheckedValue: {
            default: false,
        },

        /**
         *  Ошибки
         *
         */
        errors: {
            type: Array,
            default: null,
        },

        /**
         *  Вспомогательный текст под инпутом:
         *
         */
        helpText: {
            type: String,
            default: null,
        },

        /**
         *  Подпись чекбокса:
         *
         */
        mainText: {
            type: String,
            default: null,
        },

        /**
         *  Заголовок поля:
         *
         */
        title: {
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
        multiple: {
            type: Boolean,
            default: false,
        },
        checkboxSize: {
            type: String,
            default: '250',
        },

        /**
         * Атрибут tabindex для главного элемента
         *
         */
        tabindex: {
            type: [String, Number],
        },
    },
    computed: {
        classes() {
            return {
                'mc-field-checkbox--error': this.errors,
                'mc-field-checkbox--disabled': this.disabled,
                'mc-field-checkbox--empty': !this.mainText && !this.$slots.default,
                [`mc-field-checkbox--size-${this.checkboxSize}`]: !!this.checkboxSize,
            }
        },
        inputProps() {
            return {
                disabled: this.disabled,
                name: this.name,
                checked: this.isChecked,
                tabindex: this.tabindex,
                type: 'checkbox',
                class: 'mc-field-checkbox__input',
            }
        },
        errorText() {
            if (this.errors == null || this.errors.length === 0) return null
            return this.errors.join(', ')
        },
        isChecked() {
            return this.multiple && this.value
                ? this.value.includes(this.checkedValue)
                : this.value === this.checkedValue
        },
    },
    methods: {
        handleChange(e) {
            /**
             * Событие инпута
             * @property {boolean}
             */
            this.$emit(
                'input',
                this.multiple && this.value
                    ? this.value.includes(this.checkedValue)
                        ? this.value.filter(v => v !== this.checkedValue)
                        : [...this.value, this.checkedValue]
                    : e.target.checked
                    ? this.checkedValue
                    : this.uncheckedValue,
            )
        },
    },
}
</script>

<style lang="scss">
.mc-field-checkbox {
    $block-name: &;
    position: relative;
    display: block;
    &--size {
        @each $size, $value in $token-icon-sizes {
            &-#{$size} {
                min-width: $value;
                min-height: $value;
            }
            #{$block-name}__icon {
                @include size($value);
            }
        }
    }

    &__header {
        @include reset-text-indents();
        display: block;
        margin-bottom: $space-100;

        &:empty {
            display: none;
        }
    }

    &__name {
        @include reset();
        position: relative;
        line-height: $line-height-200;
        font-size: $font-size-200;
        display: flex;
        align-items: center;
        cursor: pointer;
        user-select: none;
    }

    &__icon {
        z-index: 1;
        &:hover {
            color: $color-purple;
        }
    }

    &__name-text {
        display: inline-block;
        margin-left: $space-100;
        &:before {
            @include pseudo(none);
            @include size($size-200);
            @include position(absolute, 0 null null 0);
            background-size: 100%;
        }

        .mc-button {
            display: inline;
            white-space: normal;
            vertical-align: top;
            margin-left: 1px;

            &__text {
                white-space: normal;
                display: inline;
            }
        }
    }

    &__input {
        display: none;
    }

    &__footer {
        padding-left: $space-250;
        margin-top: $space-50;
        &:empty {
            display: none;
        }
    }

    &--disabled {
        #{$block-name} {
            &__icon {
                color: $color-outline-gray;
                &:hover {
                    color: $color-outline-gray;
                }
            }
            &__name-text {
                &:before {
                    display: block;
                    border-radius: 2px;
                    background-color: $color-hover-gray;
                }
            }
        }
    }

    &--empty {
        #{$block-name} {
            &__footer,
            &__name {
                padding: 0;
                margin: 0;
            }
        }
    }
}
</style>
