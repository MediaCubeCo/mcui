<template>
<div class="mc-drawer">
  <div class="mc-drawer__header" v-if="$slots.title || title">
    <!-- @slot Слот заголовка -->
    <slot name="title">
      <mc-title variation="subtitle" :ellipsis="false" weight="semi-bold">{{ title }}</mc-title>
    </slot>
  </div>
  <mc-separator v-if="$slots.title || title" color="hover-gray" />
  <div class="mc-drawer__body">
    <div class="mc-drawer__tint"></div>
    <div class="mc-drawer__body-inner">
      <!-- @slot Слот контента -->
      <slot />
    </div>
  </div>
  <mc-separator v-if="$slots.footer" color="hover-gray" />
  <div class="mc-drawer__footer" v-if="$slots.footer">
    <!-- @slot Слот футера -->
    <slot name="footer" />
  </div>

  <button v-if="closeVisible" type="button" class="mc-drawer__btn-close" @click.prevent="handleClose">
    <mc-svg-icon class="mc-drawer__icon-close" :name="iconClose" />
    <mc-svg-icon class="mc-drawer__icon-close--small" :name="iconClose" size="200" />
  </button>
</div>
</template>

<script>
import McButton from "../../elements/McButton/McButton"
import McSvgIcon from "../../elements/McSvgIcon/McSvgIcon"
import McSeparator from "../../elements/McSeparator/McSeparator"
import McTitle from "../../elements/McTitle/McTitle"
/**
 * More info: https://officert.github.io/vue-slideout-panel
 */
export default {
  name: "McDrawer",
  components: {
    McButton,
    McSvgIcon,
    McSeparator,
    McTitle,
  },
  props: {
    /**
     * Заголовок
     */
    title: {
      type: String,
      default: "",
    },
    /**
     * Нужна ли кнопка
     * закрытия в шапке
     */
    closeVisible: {
      type: Boolean,
      default: true,
    },
    /**
     * Тип иконки
     * закрытия в шапке
     */
    iconClose: {
      type: String,
      default: 'close',
    },
  },

  methods: {
    handleClose() {
      /**
       * Событие закрытия панели
       * @property {Object}
       */
      this.$emit("close-panel", {});
    }
  },
}
</script>

<style lang="scss">
.mc-drawer {
  $block-name: &;

  display: flex;
  flex-direction: column;
  height: 100%;
  @include custom-scroll();

  &__header {
    padding: $space-200 $space-600 $space-200 $space-200;
  }

  &__body {
    position: relative;
    flex: 1 1 auto;
    min-height: 0;
    &-inner {
      max-height: 100%;
      height: 100%;
      overflow-y: auto;
      padding: $space-400 $space-200;
    }
  }
  &__footer {
    padding: $space-200 $space-200;
  }

  &__tint {
    @include position(absolute, 0 5px null 0);
    height: $size-400;
    background: linear-gradient(180deg, $color-white 0%, rgba(255, 255, 255, 0) 100%);
  }

  &__btn-close {
    @include reset-btn();
    @include position(absolute, $space-100 $space-100 null null);
    @include close-link();
    z-index: 1;
    padding: $space-100;
  }
  &__icon-close {
    @include size($size-300);
    &--small {
      display: none;
    }
  }
  @media #{$media-query-m-down} {
    #{$block-name}__icon-close {
      display: none;
      &--small {
        display: block;
      }
    }
  }
}
</style>