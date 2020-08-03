<template>
  <section class="mc-cell" :class="classes">
    <div class="mc-cell__title">
      <!-- @slot Слот заголовка -->
      <slot name="title">
        <mc-title variation="overline" uppercase>{{ title }}</mc-title>
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
    title: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "m",
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
  }

  &__title {
    //margin-bottom: $space-50;
  }

  &__content {
    display: inline-flex;
    flex-direction: column;
    width: 100%;

    > * {
      //margin-top: $space-50;
    }
  }
}
</style>
