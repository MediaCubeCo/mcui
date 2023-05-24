<template>
    <div class="mc-date-picker" :class="classes" ref="field">
        <label :for="name" class="mc-date-picker__header">
            <!-- @slot Слот для заголовка над инпутом -->
            <slot name="title">
                <mc-title v-if="title" :ellipsis="false" weight="medium">{{ title }}</mc-title>
            </slot>
        </label>
        <div class="mc-date-picker__inner">
            <div class="mc-date-picker__input-wrapper" :style="{ minWidth }">
                <date-picker
                    ref="input"
                    :type="type"
                    :value="prettyValue"
                    v-bind="{ ...$attrs, range, ...valueType, ...hoursOptions, ...minutesOptions, ...secondsOptions }"
                    class="mc-date-picker__date-picker"
                    range-separator=" — "
                    :confirm="$attrs.range"
                    :input-attr="{ name, id: `${name}-id` }"
                    :lang="lang"
                    :format="format"
                    :editable="editable"
                    :popup-class="popupClass"
                    :inline="inline"
                    :disabled-date="disabledDate"
                    :disabled-time="disabledTime"
                    :append-to-body="appendToBody"
                    :clearable="clearable"
                    v-on="listeners"
                    @input="val => handleEmitDate(val)"
                    @pick="handlePickDate"
                    @clear="() => handleEmitDate(range ? [' ', ' '] : ' ')"
                >
                    <div v-if="$slots.header" slot="header">
                        <!-- @slot Слот для вставки в хедер попапа календаря -->
                        <slot name="header" />
                    </div>
                    <div v-if="$slots.sidebar" slot="sidebar">
                        <!-- @slot Слот для вставки в сайдбар попапа календаря  -->
                        <slot name="sidebar" />
                    </div>
                    <template v-if="isFooterVisible" v-slot:footer="{ emit }">
                        <!-- @slot Слот для вставки в футер попапа календаря -->
                        <slot name="footer">
                            <div class="mc-datepicker__footer-popup">
                                <div class="mc-datepicker__footer-popup-periods">
                                    <template v-if="customPresets && customPresets.length">
                                        <mc-button
                                            v-for="preset in customPresets"
                                            :key="preset.title"
                                            variation="black-link"
                                            secondary-color="purple"
                                            @click="handlerPreselectRange(preset.period)"
                                        >
                                            {{ preset.title }}
                                        </mc-button>
                                    </template>
                                    <template v-else>
                                        <mc-button
                                            v-if="placeholders.week"
                                            variation="black-link"
                                            secondary-color="purple"
                                            @click="selectPeriod('week')"
                                        >
                                            {{ placeholders.week }}
                                        </mc-button>
                                        <mc-button
                                            v-if="placeholders.month"
                                            variation="black-link"
                                            secondary-color="purple"
                                            @click="selectPeriod('month')"
                                        >
                                            {{ placeholders.month }}
                                        </mc-button>
                                        <mc-button
                                            v-if="placeholders.quarter"
                                            variation="black-link"
                                            secondary-color="purple"
                                            @click="selectPeriod('quarter')"
                                        >
                                            {{ placeholders.quarter }}
                                        </mc-button>
                                        <mc-button
                                            v-if="placeholders.year"
                                            variation="black-link"
                                            secondary-color="purple"
                                            @click="selectPeriod('year')"
                                        >
                                            {{ placeholders.year }}
                                        </mc-button>
                                    </template>
                                </div>
                                <mc-button
                                    v-if="placeholders.confirm"
                                    variation="purple-outline"
                                    size="xs"
                                    @click="() => handleSubmit(emit)"
                                >
                                    {{ placeholders.confirm }}
                                </mc-button>
                            </div>
                        </slot>
                    </template>

                    <!-- @slot Слот для вставки пользовательской иконки календаря -->
                    <template slot="icon-calendar">
                        <mc-svg-icon class="mc-date-picker__icon" name="calendar" />
                    </template>
                </date-picker>
            </div>
        </div>
        <div v-if="errorText || helpText || $slots.bottom" class="mc-date-picker__footer">
            <mc-title v-if="errorText" tag-name="div" :ellipsis="false" color="red" variation="overline">
                {{ errorText }}
            </mc-title>
            <br v-if="errorText" />
            <!-- @slot Слот для доп. текста под инпутом -->
            <slot name="bottom">
                <mc-title v-if="helpText" tag-name="div" :ellipsis="false" variation="overline">
                    {{ helpText }}
                </mc-title>
            </slot>
        </div>
    </div>
</template>

<script>
import momentTz from 'moment-timezone'
import moment from 'moment'
import _isEmpty from 'lodash/isEmpty'
import _omit from 'lodash/omit'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/locale/ru'
import 'vue2-datepicker/locale/en'
import 'vue2-datepicker/locale/es'
import McTitle from '../McTitle/McTitle'
import McSvgIcon from '../McSvgIcon/McSvgIcon'
import McButton from '../McButton/McButton'
import fieldErrors from '../../mixins/fieldErrors'
import equalFieldHeight from '../../mixins/equalFieldHeight'

export default {
    name: 'McDatePicker',
    components: {
        McSvgIcon,
        McTitle,
        DatePicker,
        McButton,
    },
    mixins: [fieldErrors, equalFieldHeight],
    props: {
        /**
         *  Тип датапикера date|datetime|year|month|time|week
         */
        type: {
            type: String,
            default: 'date',
        },
        /**
         *  Заголовок поля:
         */
        title: {
            type: String,
            default: '',
        },

        /**
         *  Вспомогательный текст под инпутом:
         */
        helpText: {
            type: String,
            default: '',
        },

        /**
         *  Редактируемый инпут
         */
        editable: {
            type: Boolean,
            default: false,
        },

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
         *  Локаль
         */
        lang: {
            type: String,
            default: 'en',
        },

        /**
         *  Ошибки
         */
        errors: {
            type: Array,
            default: () => [],
        },

        /**
         *  Формат даты (как в moment.js)
         */
        format: {
            type: String,
            default: 'DD.MM.YYYY',
        },

        /**
         *  Формат отдаваемой даты
         */
        toFormat: {
            type: String,
            default: 'YYYY-MM-DD',
        },
        /**
         *  Формат отдаваемой даты
         */
        placeholders: {
            type: Object,
            default: () => {
                return {
                    week: 'Week',
                    month: 'Month',
                    quarter: 'Quarter',
                    year: 'Year',
                    confirm: 'Confirm',
                }
            },
        },
        /**
         * Пресеты для быстрых периодов
         *
         * [
         *  {
         *      title: String,
         *      period: Array - [start_date, end_date],
         *  },
         *  ...
         * ]
         *
         **/
        customPresets: {
            type: Array,
            default: () => [],
        },
        range: {
            type: Boolean,
            default: false,
        },
        appendToBody: {
            type: Boolean,
            default: true,
        },
        /**
         *  Если значение true, то датапикер отображается в открытом виде
         */
        inline: {
            type: Boolean,
            default: false,
        },
        /**
         * Функция проверяюая и устанавливающая доступна ли дата для выбора
         * Params [String] date - текущая дата
         * return Boolean, где true - дата заблокирована для выбора
         * **/
        disabledDate: {
            type: Function,
            // eslint-disable-next-line no-unused-vars
            default: date => false,
        },
        /**
         * Функция проверяюая и устанавливающая доступно ли время для выбора
         * Params [String] date - текущая дата
         * return Boolean, где true - время заблокировано для выбора
         * **/
        disabledTime: {
            type: Function,
            // eslint-disable-next-line no-unused-vars
            default: date => false,
        },
        minWidth: {
            type: String,
            default: '240px',
        },
        /**
         * Строго использовать переданный формат
         * */
        useFormat: {
            type: Boolean,
            default: false,
        },
        hours: {
            type: Array,
            default: () => [],
        },
        minutes: {
            type: Array,
            default: () => [],
        },
        seconds: {
            type: Array,
            default: () => [],
        },
        timezone: {
            type: String,
            default: momentTz.tz.guess(),
        },
        useTimezone: {
            type: Boolean,
            default: false,
        },
        /**
         * Показывать ли кретик очищения поля
         * */
        clearable: {
            type: Boolean,
            default: false,
        },
        setDefaultToday: {
            type: Boolean,
            default: true,
        },
    },

    data() {
        return {
            pickDate: null,
            phone: null,
        }
    },
    computed: {
        currentTimezone() {
            return this.timezone || 'UTC'
        },
        classes() {
            return {
                'mc-date-picker--error': this.errorText,
                'mc-date-picker--disabled': this.$attrs.disabled,
            }
        },
        popupClass() {
            return {
                'datepicker-popup': true,
                ...(this.$attrs.popupClass || {}),
            }
        },

        listeners() {
            return _omit(this.$listeners, 'input')
        },
        isRange() {
            return this.range
        },
        isTime() {
            return this.type === 'time'
        },
        valueType() {
            return this.useFormat || this.useTimezone ? { 'value-type': 'format' } : {}
        },
        hoursOptions() {
            return this.hours && this.hours.length ? { 'hour-options': this.hours } : {}
        },
        minutesOptions() {
            return this.minutes && this.minutes.length ? { 'minute-options': this.minutes } : {}
        },
        secondsOptions() {
            return this.seconds && this.seconds.length ? { 'second-options': this.seconds } : {}
        },
        isFooterVisible() {
            return this.$slots.footer || (this.isRange && (this.customPresets?.length || !_isEmpty(this.placeholders)))
        },
        prettyValue() {
            if (!this.useTimezone) {
                if (this.isRange && this.value) return this.value.map(item => new Date(item))
                return this.useFormat || (!this.setDefaultToday && !this.value)
                    ? this.value
                    : this.value
                    ? new Date(this.value)
                    : new Date()
            }
            const formattingDate = date =>
                momentTz.tz(moment(date, 'YYYY-MM-DD HH:mm:SS')._i, this.currentTimezone).format(this.format)
            if (this.isRange && this.value) {
                const [start_date, end_date] = this.value
                const prepared_value = [
                    start_date,
                    moment(end_date)
                        .subtract(1, 'days')
                        .format(),
                ]
                return prepared_value.map(item => formattingDate(item))
            }
            return formattingDate(this.value)
        },
    },
    mounted() {
        moment.locale(this.lang !== 'ar' ? this.lang : 'en')
        momentTz.locale(this.lang !== 'ar' ? this.lang : 'en')
    },
    methods: {
        handleEmitDate(value) {
            const date = this.getFormattedDate(value)
            this.toggleErrorVisible()
            /**
             * Событие инпута
             * @property {string}
             */
            this.$emit('input', date)
        },
        getFormattedDate(value) {
            let newValue = value

            if (!this.useTimezone) {
                if (Array.isArray(newValue)) {
                    return newValue.map(v => {
                        return v?.toString?.().trim() ? this.$moment(v).format(this.toFormat) : ' '
                    })
                }
                return value?.toString?.().trim()
                    ? this.isTime
                        ? this.$moment(value)._i
                        : this.$moment(value).format(this.toFormat)
                    : ' '
            }

            const hasDate = date => date && date?.trim()?.length
            const formatingDate = date =>
                momentTz
                    .tz(moment(date, this.format).format('YYYY-MM-DD HH:mm:SS'), this.currentTimezone)
                    .utc()
                    .format()
            if (Array.isArray(newValue)) {
                const [start_date, end_date] = newValue
                if (hasDate(start_date) && hasDate(end_date))
                    newValue = [
                        start_date,
                        moment(end_date, this.format)
                            .add(1, 'days')
                            .format(this.format),
                    ]
                newValue = newValue.every(d => hasDate(d)) ? newValue.map(v => formatingDate(v)) : newValue
            } else {
                newValue = formatingDate(value)
            }
            return newValue
        },
        selectPeriod(key) {
            let start = new Date()
            const end = this.pickDate || new Date()
            switch (key) {
                case 'week':
                    if (this.$moment) {
                        start = this.$moment(end).subtract(7, 'days')
                        break
                    }
                    start.setTime(end.getTime() - 6 * 24 * 3600 * 1000)
                    break
                case 'month':
                    if (this.$moment) {
                        start = this.$moment(end).subtract(1, 'months')
                        break
                    }
                    start.setMonth(end.getMonth() - 1, end.getDate())
                    break
                case 'quarter':
                    if (this.$moment) {
                        start = this.$moment(end).subtract(3, 'months')
                        break
                    }
                    start.setMonth(end.getMonth() - 3, end.getDate())
                    break
                case 'year':
                    if (this.$moment) {
                        start = this.$moment(end).subtract(1, 'years')
                        break
                    }
                    start.setFullYear(end.getFullYear() - 1, end.getMonth(), end.getDate())
                    break
            }
            this.$refs.input.currentValue = [this.$moment ? start._d : start, end]
        },
        handlerPreselectRange(period) {
            const [start, end] = period
            this.$refs.input.currentValue = this.$moment ? [this.$moment(start)._d, this.$moment(end)._d] : period
        },
        handlePickDate(date) {
            this.pickDate = date
        },
        handleSubmit(emit) {
            if (this.$refs.input.currentValue.every(val => this.isValidDate(val))) {
                emit(this.$refs.input.currentValue)
                this.closePopup()
            }
        },
        isValidDate(d) {
            return d instanceof Date && !isNaN(d)
        },
        closePopup() {
            this.$refs.input.closePopup()
        },
    },
}
</script>

<style lang="scss">
@import '~vue2-datepicker/scss/index.scss';
.mc-date-picker {
    $block-name: &;

    display: block;

    &__header {
        @include reset-text-indents();
        display: block;
        margin-bottom: $space-100;

        &:empty {
            display: none;
        }
    }

    &__inner {
        display: flex;
        align-items: center;
    }

    &__input-wrapper {
        width: 100%;
    }

    &__footer {
        margin-top: $space-50;

        &:empty {
            display: none;
        }
    }

    &__icon {
        font-size: inherit;
    }
    .mx-input-wrapper {
        width: 100%;
    }
    .mx-input {
        font-family: $font-family-main;
        font-size: $font-size-200;
        line-height: $line-height-200;
        height: $size-500;
        padding: $space-100 $space-300 $space-100 36px;
        border-color: $color-outline-gray;
        border-radius: $radius-100;
        cursor: pointer;
        color: $color-black;
        &:hover,
        &:focus {
            border-color: $color-purple;
        }
        &::placeholder {
            color: $color-gray;
        }
    }

    &--error {
        .mx-input {
            border-color: $color-red !important;
        }
    }
    &--disabled {
        .mx-input {
            color: $color-outline-gray;
            cursor: not-allowed;
            background-color: $color-hover-gray;
            border-color: $color-outline-gray;
            box-shadow: none;
            &:hover,
            &:focus {
                border-color: $color-outline-gray;
            }
        }
        .mx-icon-calendar {
            color: $color-outline-gray;
        }
    }
}

.mx-datepicker {
    width: 100%;
    svg {
        @include size($space-300);
    }
    &-inline {
        width: auto;
    }
}
.mx-icon-calendar {
    right: unset;
    left: $space-100;
    color: $color-black;
}
.mx-icon-clear {
    svg {
        width: $space-200;
        height: $space-200;
    }
}

.mx-input-wrapper:hover .mx-icon-clear + .mx-icon-calendar {
    display: block;
}
.datepicker-popup {
    font-family: $font-family-main;
    border-radius: $radius-150;
    box-shadow: $shadow-s;
    z-index: 12222;

    @media #{$media-query-s-down} {
        left: $space-200 !important;
        right: $space-200;
        width: fit-content;
    }

    .mx-calendar + .mx-calendar {
        border-left: none;
    }

    .mx-calendar {
        width: 256px;
        padding: $space-200;
        font-size: $font-size-200;

        &-panel-date {
            .cell {
                @include size($size-400);
            }
            .mx-calendar-header {
                .mx-icon {
                    &-double-right,
                    &-double-left {
                        display: none;
                    }
                }
            }
        }
        &-header {
            line-height: $line-height-300;
            height: auto;
            margin-bottom: $space-200;
            > .mx-btn-text {
                min-width: $size-300;
            }
            &-label {
                font-size: $font-size-200;
                line-height: $line-height-200;
                font-weight: $font-weight-semi-bold;
                color: $color-black;
                .mx-btn-text {
                    font-size: $font-size-200;
                    line-height: $line-height-200;
                    font-weight: $font-weight-semi-bold;
                }
            }
            .mx-btn-text {
                color: $color-black;
                &:hover {
                    color: $color-purple;
                }
            }
            .mx-icon {
                &-left:before,
                &-right:before {
                    @include size($size-150);
                    border-width: 3px 0 0 3px;
                }
            }
        }
        &-content {
            height: auto;
            th {
                font-size: $font-size-200;
                font-weight: $font-weight-normal;
                color: $color-dark-gray;
            }
        }
    }

    .mx-datepicker-footer {
        padding: $space-150 0 $space-200 0;
        margin: 0 $space-200;
        .mc-datepicker__footer-popup {
            display: flex;
            justify-content: space-between;
            align-items: center;
            @include child-indent-right($space-200);
            > * {
                @include child-indent-right($space-300);
            }
        }
        .mx-btn.mx-datepicker-btn-confirm {
            display: none;
        }
    }

    .cell {
        height: $space-500;
        color: $color-black;
        font-size: $font-size-200;
        line-height: $line-height-200;
        div {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: $radius-100;
        }
        &:hover {
            color: $color-purple;
            background-color: fade-out($color-purple, 0.9);
            border-radius: $radius-100;
        }
        &.today {
            color: $color-purple;
        }
        &.active {
            color: $color-white;
            background-color: $color-white;

            div {
                background-color: $color-purple;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: $shadow-s;
            }
        }
        &.hover-in-range {
            background-color: rgba($color-purple, 0.1);
        }
        &.in-range {
            background-color: rgba($color-purple, 0.1);
            color: $color-black;
            border-radius: 0;

            &:hover {
                div {
                    color: $color-purple;
                    background-color: fade-out($color-purple, 0.9);
                    border-radius: $radius-100;
                }
            }

            //+ .cell.active {
            //  background-color: rgba(37, 120, 244, 0.1);
            //  border-radius: 0 $radius-100 $radius-100 0;
            //}
        }
        &.not-current-month {
            user-select: none;
            pointer-events: none;
            color: $color-hover-gray !important;
            &.hover-in-range {
                background-color: unset;
            }
        }
        &.disabled {
            color: $color-outline-gray;
            border-radius: 0;
            background-color: $color-hover-gray;
            &.today {
                color: $color-purple;
            }
        }
    }

    .mx-time-column {
        .mx-time-list::after {
            height: 0;
        }
    }

    .mx-calendar-decade-separator:after {
        content: '-';
    }
}
</style>
