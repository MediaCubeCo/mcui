<template>
  <section class="mc-collapse" :class="classes">
    <span class="mc-collapse__header" tabindex="0" @keyup.esc="close">
      <mc-svg-icon
        v-if="icon && !isEmpty"
        class="mc-collapse__icon"
        name="arrow_drop_down"
        :color="isDisabled ? 'outline-gray': 'black'"
      />
      <!-- @slot Слот для элемента по которому будет меняться состояние компонента -->
      <slot name="activator" />
      <a
        v-if="$slots['body']"
        class="mc-collapse__link"
        href="#"
        @click.prevent="toggle"
      />
    </span>
    <mc-slide-up-down
      class="mc-collapse__body"
      :active="isCollapsed"
      :duration="300"
      @slide-open-start="slideOpenStart"
      @slide-open-end="slideOpenEnd"
      @slide-close-start="slideCloseStart"
      @slide-close-end="slideCloseEnd"
    >
      <div class="mc-collapse__body-inner">
        <!-- @slot Слот контента -->
        <slot name="body" />
      </div>
    </mc-slide-up-down>
    <div v-if="$slots['bottom']" class="mc-collapse__bottom">
      <!-- @slot Общий нижний слот -->
      <slot name="bottom" />
    </div>
  </section>
</template>

<script>
import { findParentComponent } from "../../utils/treeSearch"

import McSvgIcon from "../../elements/McSvgIcon/McSvgIcon"
import McSlideUpDown from "../../elements/McSlideUpDown/McSlideUpDown"

export default {
  name: "McCollapse",
  components: { McSvgIcon, McSlideUpDown },
  data() {
    return {
      isCollapsed: false,
      parentIsAccordion: false,
    }
  },

  props: {
    /*
     * Если нужно
     * отключённое состояние
     */
    isDisabled: {
      type: Boolean,
      default: false,
    },
    /*
     * Если нужен бордер
     */
    border: {
      type: Boolean,
      default: false,
    },
    /**
     *  Иконка состояния коллапса
     *
     */
    icon: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    classes() {
      return {
        "mc-collapse--is-open": this.isCollapsed,
        "mc-collapse--is-disabled": this.isDisabled,
        "mc-collapse--is-empty": this.isEmpty,
        "mc-collapse--has-icon": this.icon,
        "mc-collapse--border": this.border,
      }
    },
    activator() {
      return this.$slots.activator ? this.$slots.activator[0].elm : null
    },
    isEmpty() {
      return !this.$slots.body
    },
  },

  watch: {
    isCollapsed(value) {
      /**
       * Событие тоггла
       * @property {Boolean}
       */
      this.$emit("toggle", value)
      value ? this.$emit("open") : this.$emit("close")
      if(this.parentIsAccordion) {
        const $parent = findParentComponent(this, "McAccordion")
        $parent && $parent.$emit("toggle", { value, component: this })
      }
    },
  },

  mounted() {
    if (this.activator) {
      !this.border && this.$slots.body && this.activator.addEventListener("click", this.toggle)
      this.activator.style.transition = "all 0.15s"
    }
  },

  beforeDestroy() {
    this.activator && this.activator.removeEventListener("click", this.toggle)
  },

  methods: {
    open() {
      if (this.isDisabled) return
      this.isCollapsed = true
    },
    close() {
      if (this.isDisabled) return
      this.isCollapsed = false
    },
    toggle() {
      if (this.isDisabled) return
      this.isCollapsed = !this.isCollapsed
    },
    slideOpenStart() {
      /**
       * Событие перед началом открытия
       */
      this.$emit("collapse-open-start")
    },
    slideOpenEnd() {
      /**
       * Событие после открытия
       */
      this.$emit("collapse-open-end")
    },
    slideCloseStart() {
      /**
       * Событие перед началом закрытия
       */
      this.$emit("collapse-close-start")
    },
    slideCloseEnd() {
      /**
       * Событие после закрытия
       */
      this.$emit("collapse-close-end")
    },
  },
}
</script>

<style lang="scss">
.mc-collapse {
  $block-name: &;

  &--border {
    border-radius: $radius-100;
    border: 1px solid $color-outline-gray;

    #{$block-name} {
      &__header {
        display: flex;
        padding: $space-100 $space-200;
      }
    }
  }

  &__link {
    display: block;
    @include position(absolute, 0);
    z-index: 1;
  }

  &__header {
    display: inline-flex;
    align-items: center;
    outline: none;
    cursor: pointer;
    position: relative;
  }

  &__icon {
    transition: all $duration-s;
    margin-right: $space-50;
    margin-left: $space-50;
  }

  &__body {
    #{$block-name} {
      border: none;
      border-radius: 0;
      border-bottom: 1px solid $color-outline-gray;

      &__header {
        padding-left: $space-400;
        padding-right: $space-200;
      }

      &__body {
        #{$block-name} {
          &__header {
            padding-left: $space-800;
          }
        }
      }

      &:first-child {
        border-top: 1px solid $color-outline-gray;
      }

      &:last-child {
        border-bottom: none;
      }
    }
  }

  &__bottom {
    position: relative;
  }

  &--is-open {
    > #{$block-name} {
      &__header {
        #{$block-name} {
          &__icon {
            transform: rotate(180deg);
          }
        }
      }
    }
  }

  &--is-empty {
    #{$block-name} {
      &__header {
        cursor: default;
        &:hover {
          color: inherit;
        }
      }
      &__link {
        cursor: default;
      }
    }
  }

  &--is-disabled {
    #{$block-name} {
      &__header {
        cursor: not-allowed;
        color: $color-outline-gray;
        &:hover {
          color: $color-outline-gray;
        }
      }
      &__link {
        cursor: not-allowed;
      }
    }
  }

  &--has-icon {
    &#{$block-name}--is-empty {
      #{$block-name}__header {
        padding-left: $space-400;
      }
    }
  }

}
</style>
