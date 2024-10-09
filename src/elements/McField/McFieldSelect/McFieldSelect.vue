<template>
    <div :ref="field_key" :dir="dir" :class="classes" :style="styles">
        <div :for="name" class="mc-field-select__header">
            <!-- @slot Слот заголовка -->
            <slot name="header">
                <mc-title v-if="hasTitle" :ellipsis="false" max-width="100%" weight="medium">
                    {{ computedTitle }}
                </mc-title>
            </slot>
        </div>
        <div class="mc-field-select__main">
            <multi-select
                :ref="key"
                v-bind="tagBind"
                @input="handleChange"
                @tag="handleTag"
                @search-change="handleSearchChange"
                @open="handleOpen"
                @close="handleClose"
            >
                <template v-if="isShowLimitToggle" slot="caret">
                    <div :class="computedCaretClass" @click="toggleOptions" />
                </template>
                <template v-if="collapsed && !is_show_all_options" slot="limit">
                    <mc-title variation="body" class="mc-field-select__limit-text">
                        {{ limitText }}
                    </mc-title>
                </template>
                <template slot="singleLabel" slot-scope="{ option }">
                    <mc-preview v-if="optionWithPreview" class="option__desc" size="l">
                        <mc-svg-icon slot="left" :name="option.icon" size="400" />
                        <mc-title slot="top" weight="semi-bold" v-html="option.name" />
                        <!-- Слот для замены стандартной стрелки при выведенном превью -->
                        <slot slot="right" name="arrow" />
                        <mc-title slot="bottom" color="gray">
                            {{ option.text }}
                        </mc-title>
                    </mc-preview>
                    <div v-else class="mc-field-select__single-label">
                        <div v-if="hasPrepend" class="mc-field-select__prepend">
                            <mc-avatar v-if="avatar" :src="avatar" />
                            <mc-svg-icon v-else :name="icon" />
                        </div>
                        <div
                            class="mc-field-select__label-text"
                            :class="hasPrepend ? 'mc-field-select__label-text--indent-left' : ''"
                        >
                            {{ option ? option.name : placeholder }}
                        </div>
                    </div>
                </template>

                <template v-if="optionsTooltip || optionWithPreview" slot="option" slot-scope="{ option }">
                    <mc-preview v-if="optionWithPreview" class="option__desc" size="l">
                        <mc-svg-icon slot="left" :name="option.icon" size="400" />
                        <mc-title slot="top" weight="semi-bold" v-html="option.name" />
                        <mc-title slot="bottom" color="gray">
                            {{ option.text }}
                        </mc-title>
                    </mc-preview>
                    <mc-tooltip
                        v-else
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
                    <span>{{ noResultsText }}</span>
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
                <mc-title
                    v-if="helpText"
                    tag-name="div"
                    variation="overline"
                    color="gray"
                    max-width="100%"
                    :ellipsis="false"
                >
                    {{ helpText }}
                </mc-title>
            </slot>
        </div>
    </div>
</template>

<script>
import MultiSelect from 'vue-multiselect'
import McTitle from '../../McTitle/McTitle'
import McTooltip from '../../McTooltip/McTooltip'
import McAvatar from '../../McAvatar/McAvatar'
import McSvgIcon from '../../McSvgIcon/McSvgIcon'
import McPreview from '../../../patterns/McPreview/McPreview'
import fieldErrors from '../../../mixins/fieldErrors'
import equalFieldHeight from '../../../mixins/equalFieldHeight'
import { LANGUAGES } from '../../../helpers/consts'
export default {
    name: 'McFieldSelect',
    components: { McSvgIcon, McAvatar, McTitle, McTooltip, MultiSelect, McPreview },
    mixins: [fieldErrors, equalFieldHeight],
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
         *  [
         *      {
         *          name: String,
         *          value: String | Number,
         *          text: String - доступен, если optionWithPreview=true
         *          icon: String - доступен, если optionWithPreview=true
         *      }
         *  ]
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
            default: true,
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
            default: 'auto',
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
            required: true,
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
        required: {
            type: Boolean,
            default: false,
        },
        /**
         *  Если айтемам в селекте нужны превью с иконками и описанием
         */
        optionWithPreview: {
            type: Boolean,
            default: false,
        },
        tabindex: {
            type: [String, Number],
            default: null,
        },
        /**
         * Если нужно ограничить максимальную высоту блока с выбранными элементами
         */
        maxHeight: {
            type: String,
            default: null,
        },
        /**
         * Рендерить ли выпадающий список абсолютно, что бы помещался в ограниченном пространстве
         * */
        renderAbsoluteList: {
            type: Boolean,
            default: false,
        },
        /**
         * Для какого языка селект
         */
        locale: {
            type: String,
            default: null,
        },
        /**
         * Текст для пустого селекта, когда неичего не найдено
         */
        noResultsText: {
            type: String,
            default: 'No results',
        },
        /**
         * Показывать ли состояние лоадинга
         */
        loading: {
            type: Boolean,
            default: false,
        },
        /**
         * Ограничить ли отображение выбранных опций
         */
        collapsed: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            searchValue: null,
            key: `field_select_${Date.now()}`,
            field_key: `field-${this.name}`,
            closest_scroll_element: null,
            scroll_resize_observer: null,
            local_options: [],
            custom_limit: 0,
            is_show_all_options: false,
        }
    },
    computed: {
        tagBind() {
            return {
                label: 'name',
                trackBy: 'value',
                value: this._value,
                loading: this.loading,
                options: this.collapsed ? this.visibleOptions : this.computedOptions,
                searchable: this.searchable,
                showLabels: this.showLabels,
                multiple: this.multiple,
                hideSelected: this.hideSelected,
                allowEmpty: this.allowEmpty,
                openDirection: this.openDirection,
                id: this.name,
                taggable: this.taggable,
                tagPlaceholder: '',
                placeholder: this.placeholder,
                disabled: this.disabled,
                internalSearch: this.internalSearch,
                tabindex: +this.tabindex,
                ...(this.groupKeys ? { groupLabel: this.groupKeys.label } : {}),
                ...(this.groupKeys ? { groupValues: this.groupKeys.values } : {}),
                ...(this.collapsed ? { limit: this.is_show_all_options ? this.value?.length : this.custom_limit } : {}),
                class: this.collapsed ? 'mc-field-select__limit' : '',
            }
        },
        visibleOptions() {
            return this.is_show_all_options ? this.computedOptions : this.computedOptions.slice(0, this.custom_limit)
        },
        computedCaretClass() {
            return {
                multiselect__select: true,
                'mc-field-select__limit-toggle': true,
                'mc-field-select__limit-toggle--close': this.is_show_all_options,
            }
        },
        limitText() {
            return `+${+this.value?.length - +this.custom_limit}`
        },
        isShowLimitToggle() {
            return this.collapsed && this.value?.length > this.custom_limit
        },
        hasTitle() {
            return !!this.title
        },
        /**
         * Если режим taggable && searchValueInOptions то добавлять введенный тег в опции
         * **/
        computedOptions() {
            let options = !this.groupKeys
                ? [...this.options, ...this.local_options].filter(
                      (v, i, a) => a.findIndex(afi => afi.value === v.value) === i,
                  )
                : this.options
            if (this.searchValueInOptions && this.taggable) {
                const search = this.searchValue
                return search && search.length ? [{ name: search, value: search }, ...options] : options
            }
            return options
        },
        rtl() {
            return LANGUAGES.rtl.includes(this.locale)
        },
        dir() {
            return this.rtl ? 'rtl' : null
        },
        classes() {
            return {
                'mc-field-select': true,
                'mc-field-select--error': this.errorText,
                'mc-field-select--disabled': this.disabled,
                [`mc-field-select--bg-${this.backgroundColor}`]: this.backgroundColor,
                'mc-field-select--is-empty-options-list': this.isEmptyOptions,
                'mc-field-select--with-preview': this.optionWithPreview,
                'mc-field-select--max-height': this.maxHeight,
                'mc-field-select--rtl': this.rtl,
            }
        },
        isEmptyOptions() {
            return this.isEmptyOptionsList || this.loading || this.computedOptions?.length === this._value?.length
        },
        computedTitle() {
            return `${this.title}${this.required ? ' *' : ''}`
        },
        styles() {
            const darkColors = ['gray', 'dark-gray', 'black']
            const lightColors = ['white']
            let placeHolderColor
            let borderColor = this.backgroundColor
            let backgroundColor = this.backgroundColor
            let labelColor
            if (!this.backgroundColor || lightColors.includes(this.backgroundColor)) {
                borderColor = 'purple'
            }
            if (darkColors.includes(this.backgroundColor)) {
                labelColor = 'white'
                placeHolderColor = 'white'
                borderColor = 'black'
            }
            if (this.disabled && !this.backgroundColor) {
                backgroundColor = 'hover-gray'
            }
            return {
                '--mc-field-select-max-height': this.maxHeight,
                '--mc-field-select-color': backgroundColor && `var(--color-${backgroundColor})`,
                '--mc-field-select-border-color': borderColor && `var(--color-${borderColor})`,
                '--mc-field-select-label-color': labelColor && `var(--color-${labelColor})`,
                '--mc-field-select-placeholder-color': placeHolderColor && `var(--color-${placeHolderColor})`,
            }
        },
        _value() {
            if (this.multiple) {
                if (this.value === null) return []
                let result = []
                for (let value of this.value) {
                    const options = [
                        ...(this.groupKeys
                            ? this.options.map(o => o[this.groupKeys.values]).flat()
                            : this.computedOptions),
                    ]
                    let option = options.find(o => {
                        if (o.value?.hasOwnProperty('id') && o.value.id == value.id) {
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
            return this.computedOptions.find(o => o.value == this.value)
        },

        isEmptyOptionsList() {
            if ((this.hideSelected && !this.searchValue) || !this.options.length) {
                if (this.multiple) {
                    if (this.groupKeys) return false
                    return this.options.length === this._value.length
                } else {
                    return this._value && this.computedOptions.length === 1 && !this.searchValue
                }
            } else if (this.options.length === 0) return !this.options.length
            return false
        },
        hasPrepend() {
            return this.avatar || this.icon
        },
    },
    watch: {
        options: {
            immediate: true,
            handler(val) {
                //Пушим все входящие опции в локальные опции
                this.local_options.push(...val)
                this.actualizeSavedOptions()
                this.calcLimit()
            },
        },
        value: {
            deep: true,
            immediate: true,
            handler() {
                this.actualizeSavedOptions()
                this.calcLimit()
            },
        },
    },
    methods: {
        actualizeSavedOptions() {
            //Фильтруем локальные опции и оставляем только те, значения которых выбраны в селекте
            this.local_options = this.local_options.filter(lo =>
                this.value?.constructor === Array
                    ? this.value.map(v => String(v)).includes(String(lo.value))
                    : String(lo.value) === String(this.value),
            )

            //Делаем Юник, что бы опции не повторялись
            this.local_options = this.local_options.filter(
                (v, i, a) => a.findIndex(afi => String(afi.value) === String(v.value)) === i,
            )
        },
        handleOpen() {
            if (!this.renderAbsoluteList) return
            this.initScroll()
        },
        handleClose() {
            this.closest_scroll_element?.removeEventListener('scroll', this.repositionDropDown)
            this.scroll_resize_observer?.disconnect()
            this.scroll_resize_observer = null
        },
        findClosestScrollElement(element) {
            if (!element) return document.documentElement
            const { overflow, overflowY } = getComputedStyle(element)
            const scrollableVariants = ['auto', 'scroll']
            return scrollableVariants.some(v => [overflow, overflowY].includes(v))
                ? element
                : this.findClosestScrollElement(element.parentNode)
        },
        initScroll() {
            // looking for closest scroll elemen to track select list position dynamically
            this.closest_scroll_element = this.findClosestScrollElement(this.$refs[this.field_key])
            this.closest_scroll_element.addEventListener('scroll', this.repositionDropDown)
            this.scroll_resize_observer = new ResizeObserver(this.repositionDropDown)
            this.scroll_resize_observer.observe(this.closest_scroll_element)
        },
        repositionDropDown() {
            const { top, bottom, height, width, left } = this.$el.getBoundingClientRect()
            const ref = this.$refs[this.key]
            if (!ref) return
            const ios_devices = ['iPhone', 'iPad']
            // Добавляем к позиции отступ visualViewport?.offsetTop, который добавляет iOs при открытии вирутальной клавиатуры
            const iosViewportIndent = ios_devices?.some(device => navigator?.platform?.includes(device))
                ? window.visualViewport?.offsetTop || 0
                : 0
            // if field hides under scrolled element borders -> blur select to prevent overlap
            if (top >= -height && bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
                ref.$refs.list.style.width = `${width}px`
                ref.$refs.list.style.position = 'fixed'
                ref.$refs.list.style.left = `${left}px`
                const title_height = document.querySelector('.mc-field-select__header').offsetHeight
                const title_margin = 8
                let openDirection = this.openDirection
                if (openDirection === 'auto') openDirection = ref?.isAbove ? 'top' : 'bottom'
                switch (openDirection) {
                    case 'top':
                        ref.$refs.list.style.top = `${top +
                            (this.hasTitle ? title_height + title_margin : 0) +
                            iosViewportIndent -
                            ref.$refs.list.getBoundingClientRect().height -
                            8}px`
                        ref.$refs.list.style.bottom = 'auto'
                        break
                    case 'bottom':
                        ref.$refs.list.style.bottom = 'auto'
                        ref.$refs.list.style.top = `${top + iosViewportIndent + height}px`
                        break
                }
                // Задержка для предотвращения закрытия выпадающего списка на android
                const is_android = /Android/i.test(navigator.userAgent)
                is_android && setTimeout(() => ref.activate(), 100) // переактивировать, если выпадающий список должен быть открыт
            } else {
                // прячем селект, если его не видно юзеру
                return ref.deactivate()
            }
        },
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
            this.renderAbsoluteList && this.$nextTick(() => this.repositionDropDown())
        },

        emitInput(value) {
            this.toggleErrorVisible()
            /**
             * Событие инпута (выбранное значение)
             * @property {array, number}
             */
            this.$emit('input', value)
        },
        /**
         * Вычисляем custom_limit, которое ограничивает кол-во дочерних элементов внутри родительского, чтобы они не превышали его ширину
         * */
        calcLimit() {
            if (!this.collapsed) return
            this.$nextTick(() => {
                this.custom_limit = Infinity
                let child_width = 0
                const parent = this.$refs[this.key]?.$refs?.tags?.firstChild
                if (!this.value?.length) return
                const limit_text_width = this.getLimitTextWidth() // Получаем ширину текста лимита
                const total_width = +parent?.clientWidth - +limit_text_width
                for (let i = 0; i < this.value?.length; i++) {
                    const children = parent?.children?.[i]
                    const elem_style = window.getComputedStyle(children)
                    child_width += children?.clientWidth + (parseInt(elem_style?.marginRight) || 0)
                    // считаем занимаемую дочерними элементами ширину, если превышает родительскую, то выходим из цикла и ставим лимит
                    if (+child_width > +total_width) {
                        this.custom_limit = i
                        break
                    }
                }
            })
        },
        getLimitTextWidth() {
            const temp_limit_element = document.createElement('div')
            temp_limit_element.style.visibility = 'hidden'
            temp_limit_element.style.position = 'absolute'
            temp_limit_element.innerText = `+${this.value?.length}` // Устанавливаем текст лимита
            document.body.appendChild(temp_limit_element)
            const limit_text_width = temp_limit_element.clientWidth
            document.body.removeChild(temp_limit_element)
            return limit_text_width
        },
        toggleOptions() {
            this.is_show_all_options = !this.is_show_all_options
        },
    },
}
</script>

<style lang="scss">
@import 'vue-multiselect/dist/vue-multiselect.min.css';
@import '../../../styles/mixins';
@import '../../../tokens/durations';
@import '../../../tokens/font-families';
@import '../../../tokens/box-shadows';
.mc-field-select {
    $block-name: &;
    --mc-field-select-color: initial;
    --mc-field-select-label-color: #{$color-black};
    --mc-field-select-border-color: initial;
    --mc-field-select-max-height: initial;
    --mc-field-select-placeholder-color: #{$color-gray};
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
        padding-inline-start: $space-50;
        color: var(--mc-field-select-label-color);
        &--indent-left {
            margin-inline-start: $space-300;
        }
    }

    .multiselect {
        &__placeholder {
            @include ellipsis();
            color: var(--mc-field-select-placeholder-color);
            font-size: $font-size-200;
            line-height: $line-height-200;
            margin-bottom: $space-150 - 1px;
            padding-top: $space-150 - 1px;
            padding-inline-start: $space-50;
            width: 100%;
        }

        &__single {
            padding-inline-start: 0;
            margin-bottom: $space-150 - 1px;
            margin-top: $space-150 - 1px;
            background-color: transparent;
            min-height: auto;

            @include input-placeholder() {
                color: $color-gray;
            }
        }

        &__input {
            padding-inline-start: $space-50;
            margin-bottom: $space-150 - 2px;
            padding-top: $space-150 - 1px;
            font-size: $font-size-200;
            line-height: $line-height-200;
            min-height: auto;
            background-color: $color-transparent;
            @include input-placeholder() {
                color: $color-gray;
            }
        }

        &__select {
            overflow: hidden;
            height: $space-350;
            width: $space-300;
            inset-inline-end: $space-100;
            top: 6px;
            padding: 0;
            z-index: 1;
            &::before {
                direction: ltr;
                width: 0;
                height: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-bottom: 5px solid transparent;
                border-top: 5px solid var(--mc-field-select-label-color);
            }
        }

        &__tags {
            @include reset-text-indents();
            position: relative;
            border: 1px solid $color-outline-gray;
            border-radius: $radius-100 !important;
            padding: 0;
            padding-inline: $space-100 $space-500;
            overflow: hidden;
            text-align: start;
            &:hover {
                border-color: $color-purple;
            }
            &:before {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                @include size(100%);
                background-color: var(--mc-field-select-color);
                opacity: 0.6;
            }
        }

        &__tags-wrap {
            width: 100%;
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
            margin-right: unset;
            background-color: $color-lighter-purple;
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
            background-color: $color-purple;
            border-radius: $radius-circle;
            flex: 0 0 auto;
            margin-inline-start: $space-100;

            &:hover {
                background-color: $color-red;
            }

            &::after {
                @include align(true, true, absolute);
                top: 45%;
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
            transition: opacity $duration-s ease;
            overflow-y: auto;
            overflow-x: hidden;
            max-height: 300px;
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
                background-color: $color-lighter-purple !important;
                color: $color-black !important;
                font-weight: $font-weight-medium;
            }

            &--group.multiselect__option--disabled {
                background-color: $color-white !important;
            }
        }

        &--active {
            .multiselect {
                &__tags {
                    &:before {
                        background-color: $color-transparent;
                    }
                    border-color: var(--mc-field-select-border-color);
                }
                &__select {
                    &::before {
                        border-color: $color-purple $color-transparent $color-transparent;
                    }
                }
            }
        }
        &__spinner {
            &:after,
            &:before {
                border-top-color: $color-purple;
                @include size($space-300);
                top: calc(50% - 5px);
                left: calc(50% - 2px);
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

    &--with-preview {
        .mc-preview {
            align-items: center;
        }
        .multiselect {
            &__content {
                padding: 0;
            }
            &__select {
                display: none;
            }
            &__single {
                margin: 0;
            }
            &__tags {
                padding: $space-200 0;
                padding-inline: $space-150;
                cursor: pointer;
                border-color: $color-outline-light;
            }
            &__option,
            &__content-wrapper,
            &__tags {
                border-radius: $radius-200 !important;
            }
        }
    }

    &--max-height {
        .multiselect {
            &__tags {
                max-height: var(--mc-field-select-max-height);
                overflow-y: auto;
                position: initial;
            }
            &__spinner {
                background: transparent;
                right: calc(#{$space-50} / 2);
                top: calc(#{$space-50} / 2);
            }
        }
    }

    &__options-tooltip-target {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &--rtl {
        direction: rtl;
    }

    &__limit {
        &-text {
            position: relative;
            z-index: 1;
            width: auto;
        }
        &-toggle {
            pointer-events: auto;
            &:before {
                border-color: black transparent transparent !important;
            }
            &--close {
                transform: rotate(180deg);
            }
        }
        .multiselect__tags {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
}
</style>
