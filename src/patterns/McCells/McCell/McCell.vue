<template>
  <section class="mc-cell" :class="classes">
    <div class="mc-cell__title">
      <!-- @slot Слот заголовка -->
      <slot name="title">
        <mc-title variation="overline" :uppercase="uppercase" :ellipsis="ellipsis">{{ title }}</mc-title>
      </slot>
    </div>
    <div class="mc-cell__content">
      <!-- @slot Слот контента -->
      <slot />
    </div>
  </section>
</template>

<script>
import McTitle from "../../../elements/McTitle/McTitle"
export default {
  name: "McCell",
  components: { McTitle },
  props: {
    /**
     * Заголовок
     */
    title: {
      type: String,
      default: "",
    },
    /**
     * Размеры отступов:
     * 's, m, l'
     */
    size: {
      type: String,
      default: "m",
    },
    /**
     * Заглавные буквы
     * заголовка
     */
    uppercase: {
      type: Boolean,
      default: true,
    },
    /**
     * Три точки
     */
    ellipsis: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    classes() {
      return {
        [`mc-cell--size-${this.size}`]: this.size,
      }
    },
  }
}
</script>

<style lang="scss">
.mc-cell {
  $block-name: &;
  @include reset-text-indents();

  &--size {
    &-s {
      #{$block-name}__content {
        > * {
          margin-top: 0;
        }
      }
    }

    &-m {
      #{$block-name}__content {
        > * {
          margin-top: $space-50;
        }
      }
    }

    &-l {
      #{$block-name}__content {
        > * {
          margin-top: $space-100;
        }
      }
    }
  }

  &__content {
    display: inline-flex;
    flex-direction: column;
    width: 100%;
  }
}
</style>
