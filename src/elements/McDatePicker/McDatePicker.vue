<template>
  <div class="mc-date-picker" :class="classes">
    <label :for="name" class="mc-date-picker__header">
      <!-- @slot Слот для заголовка над инпутом -->
      <slot name="title">
        <mc-title v-if="title" :ellipsis="false">{{ title }}</mc-title>
      </slot>
    </label>
    <div class="mc-date-picker__inner">
      <div class="mc-date-picker__input-wrapper">
        <date-picker
          ref="input"
          :value="prettyValue"
          v-bind="{ ...$attrs, range }"
          class="mc-date-picker__date-picker"
          range-separator=" — "
          :confirm="$attrs.range"
          :input-attr="{ name, id: `${name}-id` }"
          :lang="lang"
          :format="format"
          :editable="editable"
          :popup-class="popupClass"
          v-on="listeners"
          @input="val => handleEmitDate(val)"
          @pick="handlePickDate"
          @clear="val => handleEmitDate(null)"
        >
          <div v-if="$slots.header" slot="header">
            <!-- @slot Слот для вставки в хедер попапа календаря -->
            <slot name="header" />
          </div>
          <div v-if="$slots.sidebar" slot="sidebar">
            <!-- @slot Слот для вставки в сайдбар попапа календаря  -->
            <slot name="sidebar" />
          </div>
          <div slot="input">
            <!-- @slot Слот для вставки в инпут попапа календаря -->
            <!-- TODO placeholder-->
            <slot name="input">
              <masked-input
                class="mx-input"
                :value="prettyValueInput"
                :mask="mask"
                :disabled="this.$attrs.disabled"
                :placeholder="this.$attrs.placeholder"
                @input="val => handleInputDate(val)"
              />
            </slot>
          </div>
          <template v-if="$slots.footer || isRange" v-slot:footer="{ emit }">
            <!-- @slot Слот для вставки в футер попапа календаря -->
            <slot name="footer">
              <div class="mc-datepicker__footer-popup">
                <div>
                  <mc-button
                    variation="black-link"
                    secondary-color="blue"
                    @click="selectPeriod('week')"
                  >
                    {{ placeholders.week }}
                  </mc-button>
                  <mc-button
                    variation="black-link"
                    secondary-color="blue"
                    @click="selectPeriod('month')"
                  >
                    {{ placeholders.month }}
                  </mc-button>
                  <mc-button
                    variation="black-link"
                    secondary-color="blue"
                    @click="selectPeriod('quarter')"
                  >
                    {{ placeholders.quarter }}
                  </mc-button>
                  <mc-button
                    variation="black-link"
                    secondary-color="blue"
                    @click="selectPeriod('year')"
                  >
                    {{ placeholders.year }}
                  </mc-button>
                </div>
                <mc-button
                  variation="blue-outline"
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
    <div
      v-if="errorText || helpText || $slots.bottom"
      class="mc-date-picker__footer"
    >
      <mc-title
        v-if="errorText"
        tag-name="div"
        :ellipsis="false"
        color="red"
        variation="overline"
      >
        {{ errorText }}
      </mc-title>
      <br v-if="errorText" />
      <!-- @slot Слот для доп. текста под инпутом -->
      <slot name="bottom">
        <mc-title
          v-if="helpText"
          tag-name="div"
          :ellipsis="false"
          variation="overline"
        >
          {{ helpText }}
        </mc-title>
      </slot>
    </div>
  </div>
</template>

<script>
import _omit from 'lodash/omit'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/locale/ru'
import 'vue2-datepicker/locale/en'
import 'vue2-datepicker/locale/es'
import MaskedInput from 'vue-masked-input'

import McTitle from '../McTitle/McTitle'
import McSvgIcon from '../McSvgIcon/McSvgIcon'
import McButton from '../McButton/McButton'

export default {
  name: 'McDatePicker',
  components: {
    McSvgIcon,
    McTitle,
    DatePicker,
    McButton,
    MaskedInput,
  },
  props: {
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
    range: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      prettyValue: null,
      pickDate: null,
      phone: null,
    }
  },
  computed: {
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

    errorText() {
      if (!this.errors || !this.errors.length) return ''
      return this.errors.join(', ')
    },

    listeners() {
      return _omit(this.$listeners, 'input')
    },
    isRange() {
      // return this.$attrs.range;
      // return "range" in this.$attrs;
      return this.range
    },
    prettyValueInput() {
      if (!Array.isArray(this.prettyValue)) {
        return this.$moment(this.prettyValue).format(this.format)
      }
      if (Array.isArray(this.prettyValue)) {
        return this.prettyValue
          .map(v => this.$moment(v).format(this.format))
          .join('—')
      }
      return null
    },
    /**
     * Формирование маски для ввода даты на основе передаваемого формата
     * @property Void
     * return {String}
     */
    mask() {
      const mask = this.format.replace(/\w/gm, '1')
      return this.isRange ? `${mask}—${mask}` : mask
    },
    /**
     * Формирование регулярки для проверки даты на основе маски
     * @property Void
     * return {RegExp}
     */
    dateRegExp() {
      return new RegExp(`^${this.mask.replace(/1/gm, '\\d')}$`)
    },
  },
  watch: {
    value(newVal) {
      if (this.isRange && newVal) {
        this.prettyValue = newVal.map(item => new Date(item))
      } else {
        this.prettyValue = new Date(newVal)
      }
    },
  },
  mounted() {
    if (this.isRange) {
      this.prettyValue = this.value
        ? this.value.map(item => new Date(item))
        : null
    } else {
      this.prettyValue = this.value ? new Date(this.value) : new Date()
    }
  },

  methods: {
    /**
     * Обработка события инпута при вводе даты вручную
     * @property {[String, Array]}
     * return Void
     */
    handleInputDate(value) {
      const isValidInput = this.dateRegExp.test(value)
      if (!isValidInput) return
      let date
      if (!this.isRange) {
        date = this.inputDateToFormat(value)
      }
      if (this.isRange) {
        date = value.split('—').map(d => this.inputDateToFormat(d))
      }
      if (!this.isValidInputDate(date) || this.isDisabledDate(date)) return
      this.handleEmitDate(date)
    },
    /**
     * Приведение введенной даты к нужному формату
     * @property {String}
     * return {String}
     */
    inputDateToFormat(date) {
      return new Date(this.$moment(date, this.format).format(this.toFormat))
    },
    /**
     * Проверка на валидную дату
     * @property {String}
     * return {Boolean}
     */
    isValidInputDate(date) {
      if (!this.isRange) return this.isValidDate(date)
      else return date.every(d => this.isValidDate(d))
    },
    /**
     * Проверка на заблокированные от выбора даты
     * @property {String}
     * return {Boolean}
     */
    isDisabledDate(date) {
      // eslint-disable-next-line no-unsafe-negation
      if (!this.$attrs.disabledDate) return false
      if (!this.isRange) return this.$attrs.disabledDate(date)
      else return date.some(d => this.$attrs.disabledDate(d))
    },
    handleEmitDate(value) {
      const date = this.getFormattedDate(value)
      /**
       * Событие инпута
       * @property {string}
       */
      this.$emit('input', date)
    },
    getFormattedDate(value) {
      if (!value) return null
      let newValue = value
      if (!Array.isArray(newValue)) {
        newValue = this.$moment(value).format(this.toFormat)
      }
      if (Array.isArray(newValue)) {
        newValue = newValue.map(v => this.$moment(v).format(this.toFormat))
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
          start.setFullYear(
            end.getFullYear() - 1,
            end.getMonth(),
            end.getDate(),
          )
          break
      }
      this.$refs.input.currentValue = [this.$moment ? start._d : start, end]
    },
    handlePickDate(date) {
      this.pickDate = date
    },
    handleSubmit(emit) {
      const isValid = this.$refs.input.currentValue.every(val =>
        this.isValidDate(val),
      )
      isValid && emit(this.$refs.input.currentValue)
    },
    isValidDate(d) {
      return d instanceof Date && !isNaN(d)
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
    padding: $space-100 $space-100 $space-100 36px;
    border-color: $color-outline-gray;
    border-radius: $radius-100;
    cursor: pointer;
    color: $color-black;
    &:hover,
    &:focus {
      border-color: $color-blue;
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
          color: $color-blue;
        }
      }
      .mx-icon {
        &-left:before,
        &-right:before {
          @include size($size-150);
          border-width: 3px 0 0 3px;
        }
        &-double-right,
        &-double-left {
          display: none;
        }
      }
    }
    &-content {
      height: auto;
      th {
        font-size: $font-size-200;
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
      color: $color-blue;
      background-color: fade-out($color-blue, 0.9);
      border-radius: $radius-100;
    }
    &.today {
      color: $color-blue;
    }
    &.active {
      color: $color-white;
      background-color: $color-white;

      div {
        background-color: $color-blue;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: $shadow-s;
      }
    }
    &.in-range {
      background-color: rgba(37, 120, 244, 0.1);
      color: $color-black;
      border-radius: 0;

      &:hover {
        div {
          color: $color-blue;
          background-color: fade-out($color-blue, 0.9);
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
    }
    &.disabled {
      color: $color-outline-gray;
      border-radius: 0;
      background-color: $color-hover-gray;
      &.today {
        color: $color-blue;
      }
    }
  }

  .mx-calendar-decade-separator:after {
    content: '-';
  }
}
</style>
