<template>
  <div class="mc-dropdown" :class="dropdownClasses" v-click-outside="handleClickOutside">
    <div
      class="mc-dropdown__toggle"
      :class="toggleClasses"
      tabindex="0"
      @keyup.esc="closeDropdown"
    >
      <!-- @slot активатора переключения состояния -->
      <slot name="activator" />
    </div>
    <div class="mc-dropdown__body">
      <!-- @slot контента -->
      <slot />
    </div>
  </div>
</template>

<script>
import VueClickOutside from "vue-click-outside"

export default {
  name: "McDropdown",
  directives: {
    "click-outside": VueClickOutside,
  },
  props: {
    /**
     * Состояние видимости контента
     */
    value: {
      type: Boolean,
      default: false,
    },
    /**
     * Выравнивание
     * контента: 'left', 'right'
     */
    position: {
      type: String,
      default: "left",
    },
    /**
     * Направление отображения
     * контента: 'top', 'bottom'
     */
    listPosition: {
      type: String,
      default: "bottom",
    },
    /**
     * Необходимо ли вращение иконки
     */
    rotateIcon: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    dropdownClasses() {
      return {
        [`mc-dropdown--position-${this.position}`]: this.position,
        [`mc-dropdown--list-position-${this.listPosition}`]: this.listPosition,
        ["mc-dropdown--is-open"]: this.value,
      }
    },
    toggleClasses() {
      return {
        ["mc-dropdown__toggle--rotate-icon"]: this.rotateIcon,
      }
    },
    activator() {
      return this.$slots.activator[0].elm
    },
  },

  watch: {
    $route() {
      this.value && this.closeDropdown()
    },
  },

  mounted() {
    this.activator.addEventListener("click", this.toggleDropdown)
  },

  beforeDestroy() {
    this.activator.removeEventListener("click", this.toggleDropdown)
  },

  methods: {
    toggleDropdown() {
      /**
       * Событие по тогглу
       * @property {Boolean}
       */
      this.$emit("input", !this.value)
    },
    handleClickOutside(e) {
      if (!this.value || !document.body.contains(e.target)) return
      this.value && this.closeDropdown()
    },
    closeDropdown() {
      this.$emit("input", false)
    },
  },
}
</script>

<style lang="scss">
.mc-dropdown {
  $block-name: &;

  position: relative;
  display: inline-block;

  &__toggle {
    outline: none;
    @include reset-text-indents();
    .mc-svg-icon {
      transition: all $duration-s;
    }
  }

  &__body {
    @include position(absolute, null null null 0);
    z-index: $z-index-dropdown;
    height: 0;
    overflow: hidden;
    margin: 0;
    min-width: 200px;
    background-color: transparent;
    opacity: 0;
    visibility: hidden;
    transition: opacity $duration-s, transform $duration-s;
  }

  &--list-position-top {
    #{$block-name} {
      &__body {
        bottom: 100%;
        margin-bottom: $space-100;
      }
    }
  }

  &--list-position-bottom {
    #{$block-name} {
      &__body {
        top: 100%;
        margin-top: $space-100;
      }
    }
  }

  &--is-open {
    #{$block-name} {
      &__body {
        height: auto;
        visibility: visible;
        overflow: visible;
        opacity: 1;
      }
    }

    #{$block-name} {
      &__toggle--rotate-icon {
        .rotate {
          position: relative;
          transform: rotate(180deg);
        }
      }
    }
  }

  &--position-right {
    #{$block-name} {
      &__body {
        left: auto;
        right: 0;
      }
    }
  }

  &--position-left {
    #{$block-name} {
      &__body {
        left: 0;
        right: auto;
      }
    }
  }
}
</style>