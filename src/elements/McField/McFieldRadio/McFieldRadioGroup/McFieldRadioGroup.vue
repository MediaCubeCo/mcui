<template>
    <div class="mc-field-radio-group" :class="classes">
        <div class="mc-field-radio-group__header">
            <!-- @slot Слот заголовка -->
            <slot name="header">
                <mc-title v-if="title" :ellipsis="false">{{ title }}</mc-title>
            </slot>
        </div>
        <mc-field-radio-button
            v-for="radio in computedOptions"
            :key="radio.id"
            v-bind="radio"
            :name="name"
            @input="handleInput"
        />
        <div v-if="errorText || helpText || $slots.footer" class="mc-field-radio-group__footer">
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
import _XEUtils from 'xe-utils'
import McFieldRadioButton from '../McFieldRadioButton/McFieldRadioButton'
import McTitle from '../../../McTitle/McTitle'
import fieldErrors from '../../../../mixins/fieldErrors'
export default {
    name: 'McFieldRadioGroup',
    components: { McFieldRadioButton, McTitle },
    mixins: [fieldErrors],
    props: {
        /**
         *  Значение
         */
        value: {
            default: null,
        },
        /**
         *  Объект или массив данных
         */
        options: {
            type: Array,
            default: () => [],
        },
        /**
         *  Заголовок:
         *
         */
        title: {
            type: String,
            default: '',
        },
        /**
         *  Вспомогательный текст под инпутом:
         *
         */
        helpText: {
            type: String,
            default: '',
        },
        /**
         *  Ошибки
         *
         */
        errors: {
            type: Array,
            default: () => [],
        },
        /**
         *  Выбранное значение по умолчанию
         */
        defaultValue: {
            type: [String, Number],
            default: '',
        },
        /**
         *  Name
         */
        name: {
            type: String,
            required: true,
        },
        /**
         *  Отключенное состояние
         *  всего списка
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         *  Добавление пользовательского
         *  класса к radio
         */
        radioClassName: {
            type: String,
            default: '',
        },
        /**
         *  Направление списка
         *  `column`, `row`
         */
        direction: {
            type: String,
            default: 'column',
        },
    },
    computed: {
        computedOptions() {
            if (!this.options.length) return []
            return this.options.map(o => {
                const optionData = typeof o === 'object' ? o : { label: o, value: o }
                return {
                    id: _XEUtils.uniqueId(),
                    ...optionData,
                    disabled: this.disabled || optionData.disabled,
                    'checked-default': optionData.value === this.defaultValue,
                    class: this.radioClassName,
                }
            })
        },
        classes() {
            return {
                [`mc-field-radio-group--direction-${this.direction}`]: this.direction,
            }
        },
    },
    methods: {
        handleInput(e) {
            this.toggleErrorVisible()
            this.$emit('input', e.target.value)
            /**
             * Событие по смене выбора
             * @property {event}
             */
            this.$emit('change', e)
        },
    },
}
</script>

<style lang="scss">
@import '../../../../styles/mixins';
.mc-field-radio-group {
    $block-name: &;

    &__header {
        @include reset-text-indents();
        display: block;
        margin-bottom: $space-100;

        &:empty {
            display: none;
        }
    }

    &__footer {
        margin-top: $space-50;
        line-height: $line-height-150;

        &:empty {
            display: none;
        }
    }

    &--direction {
        &-column {
            @include child-indent-bottom($space-100);
            .mc-field-radio-button {
                display: block;
            }
        }
        &-row {
            @include child-indent-right($space-100);
        }
    }
}
</style>
