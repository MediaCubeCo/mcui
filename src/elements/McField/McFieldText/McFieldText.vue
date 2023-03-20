<template>
    <div class="mc-field-text" :class="classes">
        <label :for="name" class="mc-field-text__header" :class="{ required }">
            <!-- @slot Слот заголовка -->
            <slot name="header">
                <mc-title v-if="title" :ellipsis="false" max-width="100%" weight="medium">{{ title }}</mc-title>
            </slot>
        </label>
        <div class="mc-field-text__inner">
            <div class="mc-field-text__main">
                <div v-if="$slots.prepend" class="mc-field-text__prepend">
                    <!-- @slot Слот в начале инпута -->
                    <slot name="prepend" />
                </div>
                <label class="mc-field-text__input-wrapper">
                    <textarea
                        v-if="isTextarea"
                        v-bind="inputAttrs"
                        :maxlength="maxLength"
                        v-on="listeners"
                        @input="$event => handleInput($event.target.value)"
                    />
                    <textarea-autosize
                        v-else-if="isTextareaAutosize"
                        v-bind="inputAttrs"
                        rows="1"
                        :min-height="minHeight"
                        :max-height="maxHeight"
                        v-on="listeners"
                        @input="handleInput"
                    />

                    <template v-else>
                        <!-- When possible, prefer to use input type="tel" to avoid glitch on android devices -->
                        <imask-input
                            v-if="isMaskVisible"
                            ref="input"
                            v-bind="maskInputAttrs"
                            v-on="listeners"
                            @input="handleInput"
                        />
                        <input
                            v-else
                            ref="input"
                            v-bind="inputAttrs"
                            :type="prettyType"
                            :readonly="readOnly"
                            :maxlength="maxLength"
                            v-on="listeners"
                            @input="prepareHandleInput"
                        />
                    </template>
                </label>
                <div
                    v-if="$slots.append || copy || isPassword"
                    class="mc-field-text__append"
                    :class="{ 'mc-field-text__append--indent-bottom': hasCharCounter }"
                >
                    <!-- @slot Слот в конце инпута -->
                    <slot name="append" />
                    <mc-button v-if="copy" variation="black-link" size="m-compact" @click.prevent="handlerCopy(value)">
                        <mc-svg-icon slot="icon-append" name="copy" />
                    </mc-button>
                    <component v-bind="passwordTooltipProps">
                        <mc-button
                            v-if="isPassword"
                            variation="black-link"
                            size="m-compact"
                            tabindex="-1"
                            type="button"
                            @click.prevent="togglePasswordVisibility"
                        >
                            <mc-svg-icon slot="icon-append" :name="passwordIcon" />
                        </mc-button>
                    </component>
                </div>
                <mc-title
                    v-if="hasCharCounter"
                    class="mc-field-text__char-counter"
                    variation="overline"
                    text-align="right"
                    :color="charCounterColor"
                >
                    {{ charCounterTitle }}
                </mc-title>
            </div>
            <div v-if="$slots.right" class="mc-field-text__right">
                <!-- @slot Слот справа инпута -->
                <slot name="right" />
            </div>
        </div>
        <div v-if="errorText || helpText || $slots.footer" class="mc-field-text__footer">
            <mc-title
                v-if="errorText"
                tag-name="div"
                color="red"
                variation="overline"
                max-width="100%"
                :ellipsis="false"
                class="mc-field-text__error-text"
                v-html="errorText.replace(/-/gm, '&#x2011;')"
            />
            <br v-if="errorText" />
            <!-- @slot Слот доп. текста под инпутом -->
            <slot name="footer">
                <mc-title v-if="helpText" tag-name="div" variation="overline" max-width="100%" :ellipsis="false">
                    {{ helpText }}
                </mc-title>
            </slot>
        </div>
    </div>
</template>

<script>
import _omit from 'lodash/omit'
import { getTokenValue } from '../../../utils/getTokens'
import { IMaskComponent, IMask } from 'vue-imask'

import TextareaAutosize from 'vue-textarea-autosize/src/components/TextareaAutosize.vue'
import McTitle from '../../McTitle/McTitle'
import McButton from '../../McButton/McButton'
import McSvgIcon from '../../McSvgIcon/McSvgIcon'

export default {
    name: 'McFieldText',
    components: {
        McButton,
        McTitle,
        McSvgIcon,
        TextareaAutosize,
        'imask-input': IMaskComponent,
    },
    props: {
        /**
         *  Тип:
         * `textarea, textarea-autosize и
         * нативные как text, password, email и т.д.`
         *
         * кастомный num - разрешает ввод только цифр и дробных чисел, без ислчений ввиде буквы 'E'
         * кастомный int - разрешает ввод только целочисленных значений
         * кастомный amount_format - форматирует ввод числовых данных разделяя на разряды(1 000 000)
         * date - добавляет placeholder, маску и ограничения ввода
         */
        type: {
            type: String,
            default: 'text',
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
         *  Маска поля:
         *
         * tokens - https://imask.js.org/guide.html
         *
         */
        mask: {
            type: String,
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
         *  Отключенное состояние
         *
         */
        disabled: {
            type: Boolean,
            default: false,
        },

        /**
         *  Значение
         *
         */
        value: {
            default: null,
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
         *  Placeholder
         *
         */
        placeholder: {
            type: String,
            default: null,
        },

        /**
         *  Name
         *
         */
        name: {
            type: String,
            required: true,
        },

        /**
         *  textarea-autosize Min height
         *
         */
        minHeight: {
            type: Number,
            default: null,
        },

        /**
         *  textarea-autosize Max height
         *
         */
        maxHeight: {
            type: Number,
            default: null,
        },

        /**
         *  Максимальная длина строки в инпуте
         *
         */
        maxLength: {
            type: Number,
            default: null,
        },

        /**
         *  Состояние копирования
         *
         */
        copy: {
            type: Boolean,
            default: false,
        },

        /**
         *  Автокомплит введённого ранее текста: on, off
         *
         */
        autocomplete: {
            type: String,
            default: 'on',
        },

        /**
         *  только чтение текста
         *
         */
        readOnly: {
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
         * Tooltip для кнопка "показать пароль"
         *
         */
        passwordTooltip: {
            type: String,
            default: null,
        },

        /**
         * Tooltip для кнопка "Скрыть пароль", если не указывать, то будет аналогичен "показать"
         *
         */
        passwordHideTooltip: {
            type: String,
            default: null,
        },

        /**
         * Очищаем данные от маски на выходе
         */
        clearOutput: {
            type: Boolean,
            default: false,
        },

        /**
         * Кастомные настройки для маски
         * См. https://imask.js.org/guide.html
         *
         * Например:
         *  {
         *   autofix: true,
         *    blocks: {
         *      d: {mask: IMask.MaskedRange, placeholderChar: 'd', from: 1, to: 31, maxLength: 2},
         *      m: {mask: IMask.MaskedRange, placeholderChar: 'm', from: 1, to: 12, maxLength: 2},
         *      Y: {mask: IMask.MaskedRange, placeholderChar: 'y', from: 1900, to: 2999, maxLength: 4}
         *    }
         *  }
         */
        maskOptions: {
            type: Object,
            default: null,
        },
        required: {
            type: Boolean,
            default: false,
        },
        /**
         * Для какого языка поле ввода
         */
        locale: {
            type: String,
            default: null,
        },
    },

    data() {
        return {
            prependWidth: 0,
            appendWidth: 0,
            prettyType: this.type,
        }
    },

    computed: {
        classes() {
            return {
                'mc-field-text--error': this.errorText,
                'mc-field-text--textarea': this.isTextarea,
                'mc-field-text--textarea-autosize': this.isTextareaAutosize,
                'mc-field-text--disabled': this.disabled,
                'mc-field-text--copy': this.copy,
                'mc-field-text--rtl': ['ar'].includes(this.locale),
            }
        },

        isMaskVisible() {
            return this.mask || this.maskOptions || this.prettyType === 'date'
        },

        isTextarea() {
            return this.type === 'textarea'
        },

        isTextareaAutosize() {
            return this.type === 'textarea-autosize'
        },

        isPassword() {
            return this.type === 'password'
        },
        isAmountFormat() {
            return this.type === 'amount_format'
        },

        hasCharCounter() {
            return this.maxLength && (this.isTextarea || this.isTextareaAutosize)
        },

        dateMask() {
            return {
                mask: Date,
                autofix: true,
                blocks: {
                    d: { mask: IMask.MaskedRange, placeholderChar: 'd', from: 1, to: 31, maxLength: 2 },
                    m: { mask: IMask.MaskedRange, placeholderChar: 'm', from: 1, to: 12, maxLength: 2 },
                    Y: { mask: IMask.MaskedRange, placeholderChar: 'y', from: 1900, to: 2999, maxLength: 4 },
                },
            }
        },

        maskInputAttrs() {
            return {
                ...this.inputAttrs,
                mask: this.mask,
                lazy: false,
                overwrite: false,
                unmask: this.clearOutput,
                definitions: {
                    '#': /./,
                },
                readonly: this.readOnly,
                maxlength: this.maxLength,
                type: 'tel',
                ...(this.maskOptions ?? {}),
                ...(this.prettyType === 'date' ? this.dateMask : {}),
            }
        },

        computedValue() {
            if (this.isAmountFormat) {
                return this.getAmountFormat(this.value)
            } else return this.value
        },

        inputAttrs() {
            return {
                class: 'mc-field-text__input',
                style: this.inputStyles,
                placeholder: this.placeholder,
                value: this.computedValue,
                disabled: this.disabled,
                name: this.name,
                id: this.name,
                autocomplete: this.autocomplete,
                tabindex: this.tabindex,
            }
        },

        isPasswordType() {
            return this.prettyType === 'password'
        },

        passwordIcon() {
            return this.isPasswordType ? 'visibility' : 'visibility_off'
        },

        charCounter() {
            return this.value ? this.value.length : 0
        },

        charCounterTitle() {
            return `${this.charCounter}/${this.maxLength}`
        },

        charCounterColor() {
            return this.maxLength < this.charCounter ? 'red' : 'dark-gray'
        },

        errorText() {
            if (this.errors === null || !this.errors.length) return null
            return this.errors.join(', ')
        },

        inputStyles() {
            const space = parseInt(getTokenValue('$space-150'))
            let bottomStyle = {}
            if (this.isTextarea || this.isTextareaAutosize) {
                const spaceBottomToken = this.hasCharCounter ? '$space-400' : '$space-150'
                const spaceBottomValue = parseInt(getTokenValue(spaceBottomToken))
                bottomStyle = { paddingBottom: `${spaceBottomValue - 1}px` }
            }
            return {
                paddingLeft: this.prependWidth && `${this.prependWidth + space}px`,
                paddingRight: this.appendWidth && `${this.appendWidth + space}px`,
                ...bottomStyle,
            }
        },

        listeners() {
            return _omit(this.$listeners, 'input')
        },

        passwordTooltipProps() {
            return this.passwordTooltip
                ? {
                      is: 'mc-tooltip',
                      content: this.isPasswordType
                          ? this.passwordTooltip
                          : this.passwordHideTooltip || this.passwordTooltip,
                      placement: 'top',
                      trigger: 'hover focus click',
                      size: 's',
                  }
                : {
                      is: 'div',
                      class: 'mc-field-text__empty-tooltip',
                  }
        },
    },

    mounted() {
        this.calculatePadding()
    },

    methods: {
        prepareHandleInput(e) {
            let value = e.target.value

            switch (this.type) {
                case 'num':
                    const [num] = /-?\d*[\.]?\d*/.exec(String(e.target.value)) || []
                    value = num
                    e.target.value = num
                    break
                case 'int':
                    const [int] = /-?\d*/.exec(String(e.target.value)) || []
                    value = int
                    e.target.value = int
                    break
                case 'amount_format':
                    const prepared_value = this.formattedToNumber(e.target.value)
                    value = prepared_value ? parseFloat(prepared_value) : null
                    e.target.value = this.getAmountFormat(prepared_value)
                    break
            }

            this.handleInput(value)
        },
        formattedToNumber(value) {
            const [first] =
                /\d*[\.]?\d*/.exec(
                    String(value)
                        ?.replace(/ /gm, '')
                        ?.trim(),
                ) || []

            return first
        },
        getAmountFormat(value) {
            const prepared_value = this.formattedToNumber(value)
            const has_dot = !!String(prepared_value)?.match(/\./)

            const [whole, fract] = String(prepared_value)
                .replace(/[^\d\.]/g, '')
                .replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ')
                .split('.')

            const formatted_values = [whole, fract?.replace(/ /gm, '') || '']
            if (has_dot) {
                return formatted_values.join('.')
            }
            return formatted_values.filter(v => !!v).join('.')
        },
        handleInput(value) {
            /**
             * Событие инпута
             * @property {string}
             */
            this.$emit('input', value)
        },

        calculatePadding() {
            this.prependWidth = this.calculateSlotPadding('prepend')
            this.appendWidth = this.calculateSlotPadding('append')
        },

        calculateSlotPadding(name) {
            const tokenSpace = parseInt(getTokenValue('$space-50'))
            let result =
                this.$slots[name] &&
                this.$slots[name].reduce((acc, cur, index) => {
                    const $el = cur.elm || cur
                    const space = index && tokenSpace
                    return acc + $el.getBoundingClientRect().width + space
                }, 0)

            if (name === 'prepend') return result

            /**
             *  Также увеличиваем padding при наличии кнопки копирования и если тип password
             */

            const iconSpace = parseInt(getTokenValue('$space-300'))

            result = result ? result + tokenSpace : tokenSpace
            this.copy && (result += iconSpace)
            this.isPassword && (result += iconSpace)
            return result
        },
        handlerCopy(value) {
            /**
             * Событие по кнопке копирования
             * @property {string}
             */
            this.$emit('copy', value)
        },
        togglePasswordVisibility() {
            this.prettyType = this.isPasswordType ? 'text' : 'password'
        },
    },
}
</script>

<style lang="scss">
.mc-field-text {
    $block-name: &;

    display: block;

    &__header {
        @include reset-text-indents();
        display: block;
        margin-bottom: $space-100;

        &:empty {
            display: none;
        }
        &.required {
            * {
                display: inline;
            }
            & > * {
                &::after {
                    content: '*';
                    position: absolute;
                }
            }
        }
    }

    &__inner {
        display: flex;
        align-items: center;
    }

    &__right {
        flex-shrink: 0;
    }

    &__main {
        position: relative;
        width: 100%;
        @include custom-scroll($space-50);
    }

    &__prepend,
    &__append {
        @include reset-text-indents();
        position: absolute;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;

        &:empty {
            display: none;
        }

        @include child-indent-right($space-50);
    }

    &__prepend {
        left: 0;
        padding: $space-100 $space-50 $space-100 $space-100;
    }

    &__append {
        right: $space-100;
        padding: $space-100 0 $space-100 $space-50;

        &--indent-bottom {
            padding-bottom: $space-400;
        }
    }

    &__char-counter {
        width: auto !important;
        position: absolute;
        right: $space-150;
        bottom: $space-150;
        background-color: $color-transparent;
    }

    &__input-wrapper {
        display: block;
    }

    &__input {
        font-family: $font-family-main;
        display: inline-block;
        vertical-align: middle;
        width: 100%;
        height: $size-500;
        margin: 0;
        border: 1px solid $color-outline-gray;
        border-radius: $radius-100;
        padding: $space-150 - 1px $space-150;
        line-height: $line-height-200;
        font-size: $font-size-200;
        background-color: $color-white;
        -moz-appearance: textfield;
        transition: background-color $duration-s ease, border-color $duration-s ease;
        color: $color-black;

        &:focus,
        &:hover {
            outline: 0;
            border-color: $color-purple;
        }

        &::-webkit-search-cancel-button,
        &::-webkit-search-decoration,
        &::-webkit-inner-spin-button,
        &::-webkit-outer-spin-button {
            -webkit-appearance: none;
        }

        @include input-placeholder() {
            color: $color-gray;
        }
    }

    &__footer {
        margin-top: $space-50;
        line-height: $line-height-150;

        &:empty {
            display: none;
        }
    }

    &--error {
        #{$block-name} {
            &__input {
                border-color: $color-red;
            }
        }
    }

    &--textarea {
        #{$block-name} {
            &__append,
            &__prepend {
                align-items: flex-start;
            }

            &__input {
                height: auto;
                min-height: 92px;
                resize: vertical;
            }
        }
    }

    &--textarea-autosize {
        #{$block-name} {
            &__input {
                height: auto;
            }
        }
    }

    &--disabled {
        #{$block-name} {
            &__input {
                color: $color-gray;
                cursor: not-allowed;
                background-color: $color-hover-gray;
                border-color: $color-outline-gray;
            }
        }
    }

    &--copy {
        #{$block-name} {
            &__input {
                color: $color-dark-gray;
                background-color: $color-hover-gray;
                border-color: $color-outline-gray;
            }
        }
    }

    &--rtl {
        direction: rtl;
    }

    &__empty-tooltip {
        display: contents;
    }
}
html[direction='rtl'] {
    .mc-field-text {
        &__header {
            &.required {
                text-align: right;
            }
        }

        &__char-counter {
            right: unset;
            left: $space-150;
        }
    }
}
</style>
