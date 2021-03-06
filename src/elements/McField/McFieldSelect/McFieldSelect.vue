<template>
    <div class="mc-field-select" :class="classes">
        <div :for="name" class="mc-field-select__header">
            <!-- @slot Слот заголовка -->
            <slot name="header">
                <mc-title v-if="title" :ellipsis="false">{{ title }}</mc-title>
            </slot>
        </div>
        <div class="mc-field-select__main">
            <multi-select v-bind="tagBind" @input="handleChange" @tag="handleTag" @search-change="handleSearchChange">
                <template slot="singleLabel" slot-scope="{ option }">
                    <div class="mc-field-select__single-label">
                        <div v-if="hasPrepend" class="mc-field-select__prepend">
                            <mc-avatar v-if="avatar" :src="avatar" />
                            <mc-svg-icon v-else :name="icon" />
                        </div>
                        <div
                            class="mc-field-select__label-text"
                            :class="hasPrepend ? 'mc-field-select__label-text--indent-left' : ''"
                        >
                            {{ option ? option.name : this.placeholder }}
                        </div>
                    </div>
                </template>

                <template v-if="optionsTooltip" slot="option" slot-scope="{ option }">
                    <mc-tooltip
                        class="mc-field-select__options-tooltip-target"
                        max-width="m"
                        color="black"
                        placement="top"
                        :content="option.name"
                    >
                        <span>{{ option.name }}</span>
                    </mc-tooltip>
                </template>
                <!-- @slot Слот для текста, если ничего не найдено -->
                <slot slot="noResult" name="noResult">
                    <span>Ничего не найдено</span>
                </slot>
            </multi-select>
        </div>
        <div v-if="errorText || helpText || $slots.footer" class="mc-field-select__footer">
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
import MultiSelect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import McTitle from '../../McTitle/McTitle'
import McTooltip from '../../McTooltip/McTooltip'
import McAvatar from '../../McAvatar/McAvatar'
import McSvgIcon from '../../McSvgIcon/McSvgIcon'
export default {
    name: 'McFieldSelect',
    components: { McSvgIcon, McAvatar, McTitle, McTooltip, MultiSelect },
    props: {
        /**
         *  Заголовок поля:
         *
         */
        title: {
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
         *  Массив элементов
         *  выпадающего списка
         */
        options: {
            type: Array,
            required: true,
        },
        /**
         *  Выполняется ли поиск из списка
         *  при вводе в инпут
         */
        searchable: {
            type: Boolean,
            default: true,
        },
        /**
         *  Множественный выбор
         */
        multiple: {
            type: Boolean,
            default: false,
        },
        /**
         *  Скрывать из списка
         *  выбранные элементы
         */
        hideSelected: {
            type: Boolean,
            default: false,
        },
        /**
         *  Допустимо ли
         *  пустое значение
         */
        allowEmpty: {
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
         *  Ссылка на аватар/картинку
         *  в начале label
         */
        avatar: {
            type: String,
            default: null,
        },
        /**
         *  Имя иконки
         *  в начале label
         */
        icon: {
            type: String,
            default: null,
        },
        /**
         *  Цвет фона
         */
        backgroundColor: {
            type: String,
            default: null,
        },
        /**
         *  placeholder
         */
        placeholder: {
            type: String,
            default: '',
        },
        /**
         * Направление открытия списка:
         * `above (top), below (bottom), auto`
         */
        openDirection: {
            type: String,
            default: 'bottom',
        },

        taggable: {
            type: Boolean,
            default: false,
        },
        /**
         *  Помечать в списке выбранные
         *  элементы
         */
        showLabels: {
            type: Boolean,
            default: false,
        },

        internalSearch: {
            type: Boolean,
            default: true,
        },
        /**
         *  Значение
         */
        value: {
            default: null,
        },
        /**
         *  Ошибки
         */
        errors: {
            type: Array,
            default: null,
        },
        /**
         *  Name
         */
        name: {
            type: String,
            default: null,
        },
        /**
         *  Если нужен тултип
         *  над элементами списка
         */
        optionsTooltip: {
            type: Boolean,
            default: false,
        },
        /**
         *  Если режим taggable && searchValueInOptions то добавлять введенный тег в опции
         */
        searchValueInOptions: {
            type: Boolean,
            default: true,
        },
        /**
         *  Группировка { label: 'label text', values: Array of objects }
         */
        groupKeys: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            searchValue: null,
        }
    },
    computed: {
        tagBind() {
            return {
                label: 'name',
                trackBy: 'value',
                value: this._value,
                options: this.computedOptions,
                searchable: this.searchable,
                showLabels: this.showLabels,
                multiple: this.multiple,
                hideSelected: this.hideSelected,
                allowEmpty: this.allowEmpty,
                openDirection: this.openDirection,
                taggable: this.taggable,
                tagPlaceholder: '',
                placeholder: this.placeholder,
                disabled: this.disabled,
                internalSearch: this.internalSearch,
                ...(this.groupKeys ? { groupLabel: this.groupKeys.label } : {}),
                ...(this.groupKeys ? { groupValues: this.groupKeys.values } : {}),
            }
        },
        /**
         * Если режим taggable && searchValueInOptions то добавлять введенный тег в опции
         * **/
        computedOptions() {
            let options = this.options
            if (this.searchValueInOptions && this.taggable) {
                const search = this.searchValue
                return search && search.length ? [{ name: search, value: search }, ...options] : options
            }
            return options
        },
        classes() {
            return {
                'mc-field-select--error': this.errorText,
                'mc-field-select--disabled': this.disabled,
                [`mc-field-select--bg-${this.backgroundColor}`]: this.backgroundColor,
                'mc-field-select--is-empty-options-list': this.isEmptyOptionsList,
            }
        },
        _value() {
            if (this.multiple) {
                if (this.value === null) return []
                let result = []
                for (let value of this.value) {
                    let option = this.options.find(o => {
                        if (o.value.hasOwnProperty('id') && o.value.id == value.id) {
                            return true
                        }
                        return o.value == value
                    })
                    if (option !== null) result.push(option)
                }
                return result
            }
            if (this.groupKeys) {
                let ungruppedOptions = []
                for (let option of this.options) {
                    ungruppedOptions.push(...option[this.groupKeys.values])
                }
                return ungruppedOptions.find(o => o.value == this.value)
            }
            return this.options.find(o => o.value == this.value)
        },

        errorText() {
            if (this.errors === null || !this.errors.length) return null
            return this.errors.join(', ')
        },
        isEmptyOptionsList() {
            if ((this.hideSelected && !this.searchValue) || !this.computedOptions.length) {
                if (this.multiple) {
                    return this.options.length === this._value.length
                } else {
                    return this._value && this.options.length === 1
                }
            } else if (this.computedOptions.length === 0) return !this.computedOptions.length
            return false
        },
        hasPrepend() {
            return this.avatar || this.icon
        },
    },
    methods: {
        handleChange(value) {
            /**
             * Истинное значение инпута
             */
            this.$emit('original-input', value)
            if (value !== null) {
                if (this.multiple) {
                    value = value.map(v => v.value)
                } else {
                    value = value.value
                }
            }
            this.emitInput(value)
        },

        handleTag(value) {
            /**
             * Событие по добавлению
             * тега в инпут (по Enter)
             * @property {string}
             */
            this.$emit('tag', value)
        },

        handleSearchChange(value) {
            this.searchValue = value
            /**
             * Событие по вводу данных в инпут
             * @property {string}
             */
            this.$emit('search-change', value)
        },

        emitInput(value) {
            /**
             * Событие инпута (выбранное значение)
             * @property {array, number}
             */
            this.$emit('input', value)
        },
    },
}
</script>

<style lang="scss">
$colors: $token-colors;
$gray-scale: 'gray', 'dark-gray', 'black';
$text-black: scale-color($color-black, $alpha: -10%);
$text-white: scale-color($color-white, $alpha: -10%);

.mc-field-select {
    $block-name: &;

    @include custom-scroll($space-100);
    font-family: $font-family-main;

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

    &__single-label {
        @include reset-text-indents();
        position: relative;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        @include child-indent-right($space-50);
    }

    &__prepend {
        position: absolute;
    }

    &__label-text {
        @include ellipsis();
        font-size: $font-size-200;
        line-height: $line-height-200;
        padding-left: $space-50;
        color: $color-black;
        &--indent-left {
            margin-left: $space-300;
        }
    }

    .multiselect {
        &__placeholder {
            @include ellipsis();
            color: $color-dark-gray;
            font-size: $font-size-200;
            line-height: $line-height-200;
            margin-bottom: $space-150 - 1px;
            padding-top: $space-150 - 1px;
            padding-left: $space-50;
        }

        &__single {
            padding-left: 0;
            margin-bottom: $space-150 - 1px;
            margin-top: $space-150 - 1px;
            background-color: transparent;
            min-height: auto;

            @include input-placeholder() {
                color: $color-dark-gray;
            }
        }

        &__input {
            padding-left: $space-50;
            margin-bottom: $space-150 - 2px;
            padding-top: $space-150 - 1px;
            font-size: $font-size-200;
            line-height: $line-height-200;
            min-height: auto;

            @include input-placeholder() {
                color: $color-dark-gray;
            }
        }

        &__select {
            height: $size-500 - 2px;
            &::before {
                border-color: $text-black transparent transparent;
            }
        }

        &__tags {
            @include reset-text-indents();
            border: 1px solid $color-outline-gray;
            border-radius: $radius-100 !important;
            padding: 0 $space-500 0 $space-100;
            overflow: hidden;
            &:hover {
                border-color: $color-blue;
            }
        }

        &__tags-wrap {
            position: relative;
            padding-top: 4px;
            padding-bottom: 3px;
            top: 0;
            display: flex;
            flex-wrap: wrap;
            margin-top: -1px;
            min-height: $size-500 - 2px;
            @include child-indent-right($space-100);
        }

        &__tag {
            display: inline-flex;
            align-items: center;
            height: $size-300;
            font-family: $font-family-main;
            margin-top: $space-50;
            margin-bottom: $space-50;
            background-color: $color-lighter-blue;
            color: $color-black;
            padding: $size-50 $size-50 $size-50 $size-100;
            border-radius: 100px;
            font-size: $font-size-200;
            line-height: $line-height-200;

            span {
                @include ellipsis();
                flex: 1 1 auto;
                //overflow: visible;
            }
        }

        &__tag-icon {
            @include size($size-200);
            position: relative;
            background-color: $color-blue;
            border-radius: $radius-circle;
            flex: 0 0 auto;

            &:hover {
                background-color: $color-red;
            }

            &::after {
                @include align(true, true, absolute);
                color: $color-white;
            }
        }

        &__content {
            padding: $size-100;
            max-width: 100%;
            font-size: $font-size-200;
            line-height: $line-height-200;
        }

        &__content-wrapper {
            top: calc(100% + #{$size-100});
            border: none;
            border-radius: $radius-150;
            box-shadow: $shadow-s;
            overflow-y: auto;
            overflow-x: hidden;
        }

        &--above {
            .multiselect__content-wrapper {
                bottom: calc(100% + #{$size-100});
                top: auto;
            }
        }

        &__option {
            min-height: $size-500;
            display: flex;
            align-items: center;
            border-radius: $radius-100;
            padding: $space-150;

            span {
                @include ellipsis();
            }

            &--highlight {
                background-color: $color-hover-gray;
                color: $color-black;
            }
            &--selected {
                background-color: $color-lighter-blue;
                color: $color-black;
                font-weight: $font-weight-medium;
            }

            &--group.multiselect__option--disabled {
                background-color: $color-white !important;
            }
        }

        &--active {
            .multiselect {
                &__tags {
                    border-color: $color-blue;
                }
                &__select {
                    &::before {
                        border-color: $color-blue transparent transparent;
                    }
                }
            }
        }
    }

    @each $color, $value in $token-colors {
        &--bg-#{$color} {
            .multiselect {
                &__tags {
                    background-color: fade-out($value, 0.6);
                }

                @if $color != 'white' {
                    &__tags {
                        border-color: transparent;
                    }
                }

                &--active {
                    .multiselect {
                        &__tags {
                            background-color: transparent;
                            @if $color != 'white' {
                                border-color: $value;
                            }
                        }

                        &__select {
                            &:before {
                                border-color: $text-black transparent transparent;
                            }
                        }
                    }
                }
            }

            &#{$block-name}--disabled {
                .multiselect--disabled {
                    .multiselect {
                        &__tags {
                            background-color: fade-out($value, 0.6);
                            @if $color != 'white' {
                                border-color: $color-outline-gray !important;
                            }
                        }

                        &__select {
                            &::before {
                                border-color: $color-outline-gray transparent transparent;
                            }
                        }
                    }
                }
                & #{$block-name}__label-text {
                    color: $color-gray;
                }
            }

            @each $col-g in $gray-scale {
                @if $color == $col-g {
                    #{$block-name}__label-text {
                        color: $text-white;
                    }

                    .multiselect {
                        &__tags {
                            background-color: $value;
                        }

                        &__placeholder {
                            color: $text-white;
                        }

                        &__select {
                            &::before {
                                border-color: $text-white transparent transparent;
                            }
                        }

                        &--active {
                            .multiselect {
                                &__tags {
                                    border-color: $color-black;
                                }
                            }
                        }
                    }

                    &#{$block-name}--disabled {
                        .multiselect--disabled {
                            .multiselect {
                                &__tags {
                                    background-color: $value;
                                }

                                &__select {
                                    &::before {
                                        border-color: fade-out($color-outline-gray, 0.3) transparent transparent;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    &--error {
        .multiselect {
            &__tags {
                border-color: $color-red !important;
            }
        }
    }

    &--is-empty-options-list {
        .multiselect {
            &__content-wrapper {
                display: none !important;
            }
        }
    }

    &--disabled {
        cursor: not-allowed;
        .multiselect--disabled {
            opacity: 1;
            background: transparent;
            .multiselect {
                &__tags {
                    border-color: $color-outline-gray;
                    background-color: $color-hover-gray;
                }

                &__placeholder {
                    color: $color-gray;
                }

                &__single {
                    & #{$block-name}__label-text {
                        color: $color-gray;
                    }
                }

                &__select {
                    background-color: transparent;

                    &::before {
                        border-color: $color-outline-gray transparent transparent;
                    }
                }
            }
        }
    }

    &__options-tooltip-target {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>
