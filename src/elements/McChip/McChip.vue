<template>
  <section class="mc-chip" tabindex="0" :class="classes">
    <div v-if="$slots.icon" class="mc-chip__icon">
      <!-- @slot Слот для иконки -->
      <slot name="icon" />
    </div>
    <div v-if="title || $slots.default" class="mc-chip__title">
      <!-- @slot контента -->
      <slot>
        {{ title }}
      </slot>
    </div>
    <div v-if="counter || counter === 0" class="mc-chip__counter">
      {{ counter }}
    </div>
    <button v-if="closable" class="mc-chip__button" type="button" v-on="$listeners">
      <!-- @slot Слот для пользовательской кнопки -->
      <slot name="button">
        <mc-svg-icon size="200" name="cancel" />
      </slot>
    </button>
  </section>
</template>

<script>
import McSvgIcon from "../McSvgIcon/McSvgIcon"
export default {
  name: "McChip",
  components: { McSvgIcon },
  props: {
    /**
     *  Text content
     *
     */
    title: {
      type: String,
      default: "",
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
     *  Кнопка закрытия
     *
     */
    closable: {
      type: Boolean,
      default: false,
    },
    /**
     *  Дизайн:
     *  `blue, blue-invert т.д.`
     */
    variation: {
      type: String,
      default: "transparent",
    },
    /**
     *  Счетчик
     *
     */
    counter: {
      type: [Number, String],
      default: null,
    },
    /**
     *  Размер: m, s
     *
     */
    size: {
      type: String,
      default: "m",
    },
  },

  computed: {
    classes() {
      return {
        [`mc-chip--variation-${this.variation}`]: this.variation,
        [`mc-chip--size-${this.size}`]: this.size,
      }
    },
  },
}
</script>

<style lang="scss">
.mc-chip {
  $block-name: &;

  display: inline-flex;
  align-items: center;
  color: $color-black;
  font-family: $font-family-main;
  font-size: $font-size-200;
  line-height: $line-height-200;
  max-width: 100%;


  border-radius: 100px;
  vertical-align: middle;
  outline: none;
  > * {
    margin-right: $space-50;
  }
  > *:first-child {
    margin-left: $space-50;
  }

  &--size {
    &-m {
      height: $size-400;
      padding-left: $space-100;
      padding-right: $space-100;
    }
    &-s {
      height: $size-300;
      padding-left: $space-50;
      padding-right: $space-50;
    }
  }

  &__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 0;
  }

  &__title {
    @include ellipsis();
    @include layout-flex-fix();

    &:empty {
      display: none;
    }
  }

  &__counter {
    flex: 0 0 auto;
    font-family: $font-family-main;
    font-size: $font-size-200;
    line-height: $line-height-200;
    color: $color-dark-gray;

    &:empty {
      display: none;
    }
  }

  &__button {
    @include size($size-200);
    position: relative;
    display: flex;
    flex: 0 0 auto;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin-right: 0;
    border-radius: 0;
    user-select: none;
    text-decoration: none;
    text-transform: none;
    background-color: transparent;
    background-image: none;
    cursor: pointer;
    outline: 0;
    border: none;
    transition: all $duration-s;
    flex-wrap: nowrap;
    -webkit-appearance: none;
    -webkit-text-fill-color: currentColor;
    color: $color-blue;

    &:hover,
    &:focus {
      color: darken($color-red, 10%);
    }

    &:active {
      color: darken($color-red, 15%);
    }
  }

  @each $color, $value in $token-colors {
    &--variation-#{$color} {
      background-color: $value;
      color: $color-white;

      #{$block-name} {
        &__button {
          color: $color-white;

          &:hover,
          &:focus {
            color: fade-out($color-white, 1 - $opacity-hover);
          }

          &:active {
            color: fade-out($color-white, 1 - $opacity-active);
          }
        }

        &__counter {
          color: fade-out($color-white, 0.5);
        }
      }

      &-invert {
        background-color: fade-out($value, 0.85);
      }
    }
  }
}
</style>
