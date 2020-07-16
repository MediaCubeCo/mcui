<template>
  <div class="mc-field-text" :class="classes">
    <label :for="name" class="mc-field-text__header">
      <!-- @slot Слот заголовка -->
      <slot name="header">
        <mc-title :ellipsis="false" v-if="title">{{ title }}</mc-title>
      </slot>
    </label>
    <div class="mc-field-text__inner">
      <div class="mc-field-text__main">
        <div class="mc-field-text__prepend" v-if="$slots.prepend">
          <!-- @slot Слот в начале инпута -->
          <slot name="prepend" />
        </div>
        <label class="mc-field-text__input-wrapper">
          <textarea
            v-if="isTextarea"
            v-bind="inputAttrs"
            v-on="listeners"
            :maxlength="maxLength"
            @input="$event => handleInput($event.target.value)"
          />
          <textarea-autosize
            v-else-if="isTextareaAutosize"
            v-bind="inputAttrs"
            v-on="listeners"
            rows="1"
            :min-height="minHeight"
            :max-height="maxHeight"
            @input="handleInput"
          />

          <input
            v-else
            v-bind="inputAttrs"
            :type="prettyType"
            ref="input"
            v-on="listeners"
            @input="$event => handleInput($event.target.value)"
            :readonly="readOnly"
            :maxlength="maxLength"
          />
        </label>
        <div class="mc-field-text__append" v-if="$slots.append || copy || isPassword">
          <!-- @slot Слот в конце инпута -->
          <slot name="append" />
          <mc-button
            v-if="copy"
            variation="blue-link"
            size="m-compact"
            @click.prevent="handlerCopy(value)"
          >
            <mc-svg-icon slot="icon-append" name="file_copy" />
          </mc-button>
          <mc-button
            v-if="isPassword"
            variation="blue-link"
            size="m-compact"
            @click.prevent="togglePasswordVisibility"
          >
            <mc-svg-icon slot="icon-append" :name="passwordIcon" />
          </mc-button>
        </div>
        <mc-title
          v-if="maxLength && (isTextarea || isTextareaAutosize)"
          class="mc-field-text__char-counter"
          variation="overline"
          text-align="right"
          :color="charCounterColor"
        >
          {{ charCounterTitle }}
        </mc-title>
      </div>
      <div class="mc-field-text__right" v-if="$slots.right">
        <!-- @slot Слот справа инпута -->
        <slot name="right" />
      </div>
    </div>
    <div class="mc-field-text__footer" v-if="errorText || helpText || $slots.footer">
      <mc-title v-if="errorText" tag-name="div" color="red" variation="overline" max-width="100%" :ellipsis="false">
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
import _omit from "lodash/omit"
import { getTokenValue } from "../../../utils/getTokens"

import TextareaAutosize from "vue-textarea-autosize/src/components/TextareaAutosize"
import McTitle from "../../McTitle/McTitle"
import McButton from "../../McButton/McButton"
import McSvgIcon from "../../McSvgIcon/McSvgIcon"


export default {
  name: "McFieldText",
  components: {
    McButton,
    McTitle,
    McSvgIcon,
    TextareaAutosize,
  },
  props: {
    /**
     *  Тип:
     * `textarea, textarea-autosize и
     * нативные как text, password, email и т.д.`
     */
    type: {
      type: String,
      default: "text",
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
      default: "on",
    },

    /**
     *  только чтение текста
     *
     */
    readOnly: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      prependWidth: 0,
      appendWidth: 0,
      prettyType:  this.type,
    }
  },

  mounted() {
    this.calculatePadding()
  },

  computed: {
    classes() {
      return {
        "mc-field-text--error": this.errorText,
        "mc-field-text--textarea": this.isTextarea,
        "mc-field-text--textarea-autosize": this.isTextareaAutosize,
        "mc-field-text--disabled": this.disabled,
        "mc-field-text--copy": this.copy,
      }
    },

    isTextarea() {
      return this.type === "textarea"
    },

    isTextareaAutosize() {
      return this.type === "textarea-autosize"
    },

    isPassword() {
      return this.type === "password"
    },

    inputAttrs() {
      return {
        class: "mc-field-text__input",
        style: this.inputStyles,
        placeholder: this.placeholder,
        value: this.value,
        disabled: this.disabled,
        name: this.name,
        id: this.name,
        autocomplete: this.autocomplete,
      }
    },

    passwordIcon() {
      return this.prettyType === 'password' ? 'visibility' : 'visibility_off'
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
      return this.errors.join(", ")
    },

    inputStyles() {
      const space = parseInt(getTokenValue('$space-150'))
      let bottomStyle = {}
      if (this.isTextarea || this.isTextareaAutosize) {
        const spaceBottom = parseInt(getTokenValue('$space-400'))
        bottomStyle = { paddingBottom: `${spaceBottom}px` }
      }
      return {
        paddingLeft: this.prependWidth && `${this.prependWidth + space}px`,
        paddingRight: this.appendWidth && `${this.appendWidth + space}px`,
        ...bottomStyle,
      }
    },

    listeners() {
      return _omit(this.$listeners, "input")
    },
  },

  methods: {
    handleInput(value) {
      /**
       * Событие инпута
       * @property {string}
       */
      this.$emit("input", value)
    },

    calculatePadding() {
      this.prependWidth = this.calculateSlotPadding("prepend")
      this.appendWidth = this.calculateSlotPadding("append")
    },

    calculateSlotPadding(name) {
      const tokenSpace = parseInt(getTokenValue('$space-50'))
      return (
        this.$slots[name] &&
        this.$slots[name].reduce((acc, cur, index) => {
          const $el = cur.elm || cur
          const space = index && tokenSpace
          return acc + $el.getBoundingClientRect().width + space
        }, 0)
      )
    },
    handlerCopy(value) {
      /**
       * Событие по кнопке копирования
       * @property {string}
       */
      this.$emit("copy", value)
    },
    togglePasswordVisibility() {
      this.prettyType = this.prettyType === "password" ? "text" : "password"
    }
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
    @include custom-scroll();
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
  }

  &__char-counter {
    width: auto;
    position: absolute;
    right: $space-150;
    bottom: $space-150;
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
    border-radius: $radius-50;
    padding: $space-150;
    line-height: $line-height-200;
    font-size: $font-size-200;
    background-color: $color-white;
    -moz-appearance: textfield;
    // appearance: textfield;
    transition: background-color $duration-s ease, border-color $duration-s ease;
    color: $color-black;

    &:focus {
      outline: 0;
      border-color: $color-blue;
    }

    &::-webkit-search-cancel-button,
    &::-webkit-search-decoration,
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }

    @include input-placeholder() {
      color: $color-dark-gray;
    }
  }

  &__footer {
    margin-top: $space-50;

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
        padding-right: $space-700;
      }
    }
  }
}
</style>
