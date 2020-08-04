<template>
  <div class="mc-field-checkbox" :class="classes">
    <div v-if="title || $slots.header" class="mc-field-text__header">
      <!-- @slot Слот заголовка -->
      <slot name="header">
        <mc-title :ellipsis="false">{{ title }}</mc-title>
      </slot>
    </div>
    <div class="mc-field-checkbox__input-wrap">
      <label class="mc-field-checkbox__name">
        <mc-svg-icon
          class="mc-field-checkbox__icon"
          :name="isChecked ? 'checkbox--checked' : 'checkbox'"
          :color="isChecked ? 'blue' : 'gray'"
        />
        <input
          :disabled="disabled"
          class="mc-field-checkbox__input"
          type="checkbox"
          :name="name"
          :checked="isChecked"
          @change="handleChange"
        />
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
        <mc-title v-if="errorText" tag-name="div" color="red" variation="overline" max-width="100%" :ellipsis="false">
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
import McTitle from "../../McTitle/McTitle"
import McSvgIcon from "../../McSvgIcon/McSvgIcon"
export default {
  name: "McFieldCheckbox",
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
  },
  computed: {
    classes() {
      return {
        "mc-field-checkbox--error": this.errors,
        "mc-field-checkbox--disabled": this.disabled,
        "mc-field-checkbox--empty": !this.mainText && !this.$slots.default,
      }
    },
    errorText() {
      if (this.errors == null || this.errors.length === 0) return null
      return this.errors.join(", ")
    },
    isChecked() {
      return this.value === this.checkedValue
    }
  },
  methods: {
    handleChange(e) {
      /**
       * Событие инпута
       * @property {boolean}
       */
      this.$emit("input", e.target.checked ? this.checkedValue : this.uncheckedValue)
    },
  },
}
</script>

<style lang="scss">
.mc-field-checkbox {
  $block-name: &;

  display: block;
  min-width: $size-200;
  min-height: $size-200;

  &__header {
    @include reset-text-indents();
    display: block;
    margin-bottom: $space-100;

    &:empty {
      display: none;
    }
  }

  &__name {
    display: inline-block;
    @include reset();
    position: relative;
    padding-left: $space-250;
    line-height: $line-height-200;
    font-size: $font-size-200;
  }

  &__icon {
    @include size($size-200);
    @include position(absolute, 0 null null 0);
    z-index: 1;
    &:hover {
      color: $color-blue;
    }
  }

  &__name-text {
    display: inline-block;

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
