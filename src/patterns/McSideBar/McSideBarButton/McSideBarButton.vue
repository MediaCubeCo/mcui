<template>
  <mc-button
    v-on="$listeners"
    class="mc-side-bar-button"
    text-align="left"
    variation="white-flat"
    full-width
    :size="compact ? 's-compact' : 's'"
    :href="href"
    :to="to"
    :exact="exact"
    :disabled="disabled"
  >
    <mc-svg-icon v-if="icon" slot="icon-prepend" class="mc-side-bar-button__icon" :name="icon" />
    <template v-if="!compact">
      {{ title }}
      <mc-chip v-if="info" slot="icon-append" variation="blue">{{info}}</mc-chip>
    </template>
  </mc-button>
</template>

<script>
import McButton from "../../../elements/McButton/McButton"
import McSvgIcon from "../../../elements/McSvgIcon/McSvgIcon"
import McChip from "../../../elements/McChip/McChip"
export default {
  name: "McSideBarButton",
  components: {
    McButton,
    McSvgIcon,
    McChip,
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
     *  Если нужна иконка
     */
    icon: {
      type: String,
      default: "",
    },
    /**
     *  Тайтл кнопки
     */
    title: {
      type: String,
      default: "",
    },
    /**
     *  Compact size
     */
    compact: {
      type: Boolean,
      default: false,
    },
    /**
     *  Additional info
     */
    info: {
      type: String,
      default: "",
    },
    /**
     *  Exact
     *
     */
    exact: {
      type: Boolean,
      default: false,
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
}
</script>

<style lang="scss">
.mc-side-bar-button {
  $block-name: &;
  &.mc-button {
    color: $color-gray;
    padding: $space-100;
    opacity: 1;
    height: auto;
    border-radius: $space-50;
    justify-content: flex-start;
    .mc-svg-icon {
      @include size($size-300);
    }
    &:hover {
      color: $color-white;
    }

    .mc-button__prepend {
      margin-right: $space-100;
    }
    .mc-button__append {
      margin-left: $space-100;
    }
    .mc-chip {
      height: auto;
      padding: $space-50 $space-100;
    }

    &.mc-button--is-active,
    &.mc-button.nuxt-link-active {
      color: $color-white;
      background-color: rgba(92, 102, 112, 0.4);
      pointer-events: auto;
    }
  }

}
</style>