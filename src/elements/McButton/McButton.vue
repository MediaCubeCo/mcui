<template>
  <component v-bind="tagBind" v-on="$listeners" class="mc-button" :is="tag" :class="classes" :exact="exact">
    <span class="mc-button__prepend" v-if="$slots['icon-prepend']">
      <!-- @slot Слот для вставки в начало -->
      <slot class="mc-button__prepend" name="icon-prepend" />
    </span>
    <btn-loader v-if="loading" name="ball-clip-rotate-multiple" class="mc-button__loader" color="inherit" />
    <span class="mc-button__text" v-if="$slots.default">
      <!-- @slot Слот по умолчанию -->
      <slot />
    </span>
    <span class="mc-button__append" v-if="$slots['icon-append']">
      <!-- @slot Слот для вставки в конец -->
      <slot name="icon-append" />
    </span>
  </component>
</template>

<script>
import "vue-loaders/dist/vue-loaders.css"
import VueLoaders from "vue-loaders"
export default {
  name: "McButton",
  components: {
    "btn-loader": VueLoaders.component,
  },
  props: {
    /**
     *  Если нужна ссылка внутри приложения:
     * `{name: 'test', params: { id: test.id }}`
     */
    to: {
      default: null,
    },
    /**
     *  Если нужна обычная ссылка:
     * `https://mediacube.agency/`
     */
    href: {
      default: null,
    },
    /**
     *  По умолчанию ожидается использование в `nuxt.js`
     *
     */
    nuxt: {
      type: Boolean,
      default: true,
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
     *  Индикация загрузки
     *
     */
    loading: {
      type: Boolean,
      default: false,
    },
    /**
     *  Типы:
     *  `button, submit, reset`
     */
    type: {
      type: String,
      default: null,
    },
    /**
     *  Дизайн:
     *  `blue, red, blue-outline, blue-invert, blue-flat и т.д.`
     */
    variation: {
      type: String,
      default: "blue",
    },
    /**
     *  Размеры:
     *  `xs, xs-compact, s, s-compact, m, m-compact, l, l-compact`
     */
    size: {
      type: String,
      default: "m",
    },
    /**
     *  Тень
     *
     */
    shadow: {
      type: Boolean,
      default: false,
    },
    /**
     *  Круглая
     *
     */
    rounded: {
      type: Boolean,
      default: false,
    },
    /**
     *  Позиция текста внутри кнопки:
     *  `left, center, right`
     */
    textAlign: {
      type: String,
      default: "center",
    },
    /**
     *  На всю ширину
     *
     */
    fullWidth: {
      type: Boolean,
      default: false,
    },
    /**
     *  Если нужно активное состояние
     *
     */
    isActive: {
      type: Boolean,
      default: false,
    },
    /**
     *  exact
     *
     */
    exact: {
      type: Boolean,
      default: false,
    },
    /**
     * Заглавные буквы
     */
    uppercase: {
      type: Boolean,
      default: false,
    },
    /**
     * Тег по умолчанию
     */
    defaultTag: {
      type: String,
      default: "button",
    },
    /**
     * Если нужен другой цвет при взаимодействии
     */
    secondaryColor: {
      type: String,
      default: "",
    },
    /**
     * Если нужна подчёркнутая ссылка
     */
    underlineLink: {
      type: Boolean,
      default: false,
    },
    /**
     * Если нужен постоянный
     * фон у типа 'flat'
     */
    bgFlat: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    classes() {
      return {
        [`mc-button--variation-${this.variation}`]: this.variation,
        [`mc-button--size-${this.size}`]: this.size,
        [`mc-button--text-align-${this.textAlign}`]: this.textAlign,
        "mc-button--loading": this.loading,
        "mc-button--is-active": this.isActive,
        "mc-button--disabled": this.disabled,
        "mc-button--rounded": this.rounded && /-compact$/.test(this.size),
        "mc-button--full-width": this.fullWidth,
        "mc-button--uppercase": this.uppercase,
        "mc-button--shadow": this.shadow,
        [`mc-button--secondary-color-${this.secondaryColor}`]: this.secondaryColor,
        "mc-button--underline-link": this.underlineLink,
        "mc-button--bg-flat": this.bgFlat,
      }
    },
    tag() {
      if (this.to && this.$router) {
        return this.nuxt ? "nuxt-link" : "router-link"
      } else if (this.href) {
        return "a"
      }
      return this.defaultTag
    },
    tagBind() {
      const result = {}
      if (this.to) {
        result.to = this.to
      } else if (this.href) {
        result.href = this.href
      } else if (this.disabled || this.loading) {
        result.disabled = true
      }
      result.type = this.type

      return result
    },
  },
}
</script>

<style lang="scss">
$colors: $token-colors;

.mc-button {
  $block-name: &;

  @include reset();
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  max-width: 100%;
  font-family: $font-family-main;
  font-weight: $font-weight-semi-bold;
  border-radius: $radius-100;
  white-space: nowrap;
  user-select: none;
  text-decoration: none;
  text-transform: none;
  background-color: transparent;
  background-image: none;
  cursor: pointer;
  outline: 0;
  border: 1px solid transparent;
  transition: all $duration-s;

  color: $color-black;
  -webkit-appearance: none;
  -webkit-text-fill-color: currentColor;

  &__loader {
    display: none !important;
    position: absolute !important;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0) scale(0.6);
  }

  &__prepend,
  &__append {
    display: inline-flex;
    align-items: center;
  }

  &__text {
    @include ellipsis($display: inline-block);
    @include layout-flex-fix();

    &:empty {
      display: none;
    }
  }

  &--size {
    &-xs {
      height: $size-400;
      padding: $space-100 $space-150;
      letter-spacing: normal;
      font-size: $font-size-200;
      line-height: $line-height-200;

      &-compact {
        @include size($size-400);
        padding: $space-100;
        .mc-svg-icon {
          @include size($size-200);
        }
      }
      .mc-svg-icon {
        @include size($size-200);
      }

      #{$block-name} {
        &__prepend {
          margin-right: $space-50;
        }
        &__append {
          margin-left: $space-50;
        }
      }
    }
    &-s {
      height: $size-500;
      padding: $space-150 $space-200;
      letter-spacing: normal;
      font-size: $font-size-200;
      line-height: $line-height-200;

      &-compact {
        @include size($size-500);
        padding: $space-150;
        .mc-svg-icon {
          @include size($size-200);
        }
      }
      .mc-svg-icon {
        @include size($size-200);
      }

      #{$block-name} {
        &__prepend {
          margin-right: $space-50;
        }
        &__append {
          margin-left: $space-50;
        }
      }
    }
    &-m {
      height: $size-500;
      padding: $space-100 $space-200;
      font-size: $font-size-200;
      line-height: $line-height-200;

      &-compact {
        @include size($size-500);
        padding: $space-100;
        .mc-svg-icon {
          @include size($size-300);
        }
      }
      .mc-svg-icon {
        @include size($size-300);
      }

      #{$block-name} {
        &__prepend {
          margin-right: $space-50;
        }
        &__append {
          margin-left: $space-50;
        }
      }
    }
    &-l {
      height: $size-600;
      padding: $space-150 $space-300;
      font-size: $font-size-300;
      line-height: $line-height-300;

      &-compact {
        @include size($size-600);
        padding: $space-150;
        .mc-svg-icon {
          @include size($size-300);
        }
      }
      .mc-svg-icon {
        @include size($size-300);
      }

      #{$block-name} {
        &__prepend {
          margin-right: $space-100;
        }
        &__append {
          margin-left: $space-100;
        }
      }
    }

    &-s,
    &-m,
    &-l {
      &-compact {
        #{$block-name} {
          &__prepend,
          &__append {
            margin: 0 !important;
          }
        }
      }
    }
  }

  @each $color, $value in $colors {
    &--variation-#{$color} {
      @if $color == "white" {
        background-color: $value;

        &:hover,
        &:focus {
          background-color: fade-out($value, 1 - $opacity-hover);
        }

        &:active {
          background-color: fade-out($value, 1 - $opacity-active);
        }

        &-flat {
          color: $value;

          &:hover,
          &:focus {
            opacity: $opacity-hover;
          }

          &:active {
            opacity: $opacity-active;
          }
        }

        &-link {
          color: $value;
          padding: 0;
          @include size(auto);
          border: none;
          user-select: text;

          &:hover,
          &:focus {
            color: darken($value, 12%);
          }

          &:active {
            color: darken($value, 16%);
          }

          &#{$block-name} {
            &--disabled {
              opacity: $opacity-disabled;
              background-color: transparent !important;
              color: $value !important;
              border-color: transparent !important;
            }
          }
        }

      } @else {
        background-color: $value;

        @if $color == "toxic" {
          color: $color-black;
        } @else {
          color: $color-white;
        }

        &:hover,
        &:focus {
          background-color: darken($value, 10%);
        }

        &:active {
          background-color: darken($value, 15%);
        }

        &#{$block-name} {
          &--shadow {
            box-shadow: 0 3px 10px fade-out($value, 0.8);
          }
        }

        &-invert {
          background-color: fade-out($value, 0.9);
          color: $value;

          &:hover,
          &:focus {
            background-color: fade-out($value, 0.8);
          }

          &:active {
            background-color: fade-out($value, 0.75);
          }

          &#{$block-name} {
            &--shadow {
              box-shadow: 0 3px 10px fade-out($value, 0.8);
            }
          }
        }

        &-outline {
          border-color: $value;
          color: $value;

          &:hover,
          &:focus {
            background-color: $value;
            color: $color-white;
          }

          &:active {
            border-color: darken($value, 15%);
            background-color: darken($value, 15%);
          }

          &#{$block-name} {
            &--shadow {
              box-shadow: 0 3px 10px fade-out($value, 0.8);
            }
          }
        }

        &-flat {
          color: $value;

          &:hover,
          &:focus {
            background-color: fade-out($value, 0.9);
          }

          &:active {
            background-color: fade-out($value, 0.85);
          }

          &#{$block-name} {
            &--shadow {
              box-shadow: 0 3px 10px fade-out($value, 0.8);
            }
          }
        }

        &-link {
          color: $value;
          padding: 0;
          @include size(auto);
          border: none;
          user-select: text;

          &:hover,
          &:focus {
            color: darken($value, 12%);
          }

          &:active {
            color: darken($value, 16%);
          }

          &#{$block-name} {
            &--disabled {
              opacity: $opacity-disabled;
              background-color: transparent !important;
              color: $value !important;
              border-color: transparent !important;
            }
          }
        }
      }
    }

    &--secondary-color-#{$color} {
      &:hover,
      &:focus {
        color: $value;
      }

      &:active {
        color: $value;
      }
    }

    &--underline-link {
      &#{$block-name}--variation-#{$color} {
        &-link {
          #{$block-name}__text {
            text-decoration: underline;
          }
        }
      }
    }

    &--bg-flat {
      &#{$block-name}--variation-#{$color} {
        &-flat {
          background-color: fade-out($value, 0.9);
        }
      }
    }

  }

  &--uppercase {
    text-transform: uppercase;
    letter-spacing: $letter-spacing-m;
  }

  &--is-active,
  &.nuxt-link-active {
    color: $color-blue;
    background-color: transparent;
    border-color: transparent;
    pointer-events: none;
  }

  &--rounded {
    border-radius: $radius-circle;
  }

  &--full-width {
    width: 100%;
  }

  &--text-align {
    &-left {
      #{$block-name} {
        &__text {
          margin-right: auto;
        }
      }
    }
    &-center {
      #{$block-name} {
        &__text {
          margin-left: auto;
          margin-right: auto;
        }
      }
    }
    &-right {
      #{$block-name} {
        &__text {
          margin-left: auto;
        }
      }
    }
  }

  &--loading,
  &--disabled {
    pointer-events: none;
  }

  &--loading {
    #{$block-name} {
      &__loader {
        display: inline-block !important;
      }
    }

    > *:not(#{$block-name}__loader) {
      opacity: 0;
    }
  }

  &--disabled {
    background-color: $color-hover-gray !important;
    color: $color-outline-gray !important;
    border-color: $color-hover-gray !important;
  }
}
</style>