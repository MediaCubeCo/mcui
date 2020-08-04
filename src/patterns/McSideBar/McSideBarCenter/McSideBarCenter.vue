<template>
  <div class="mc-side-bar-center">
    <mc-title v-if="title" class="mc-side-bar-center__title" color="dark-gray">{{title}}</mc-title>
    <div v-if="computedMenuMain && computedMenuMain.length" class="mc-side-bar-center__content">
      <mc-side-bar-button
          v-for="menuMainItem in computedMenuMain"
          :info="menuMainItem.info"
          :key="`menu-main-${menuMainItem.id}`"
          :href="menuMainItem.href"
          :to="menuMainItem.to"
          :icon="menuMainItem.icon"
          :title="menuMainItem.name"
          :compact="false"
          :exact="isExact"
      />
    </div>
    <mc-separator
        v-if="computedMenuMain && computedMenuMain.length"
        color="dark-gray"
        indent-top="150"
        indent-bottom="150"
        indent-left="100"
        indent-right="100"
    />
  </div>
</template>

<script>
import _XEUtils from 'xe-utils'
import _has from "lodash/has"
import McButton from "../../../elements/McButton/McButton"
import McPreview from "../../McPreview/McPreview"
import McTitle from "../../../elements/McTitle/McTitle"
import McSvgIcon from "../../../elements/McSvgIcon/McSvgIcon"
import McSideBarButton from "../McSideBarButton/McSideBarButton"
import McSeparator from "../../../elements/McSeparator/McSeparator"
export default {
  name: "McSideBarCenter",
  components: {
    McButton,
    McPreview,
    McTitle,
    McSvgIcon,
    McSideBarButton,
    McSeparator,
  },
  props: {
    /**
     *  Заголовок
     */
    title: {
      type: String,
      default: "",
    },
    /**
     *  Центральное меню
     *
     */
    menuMain: {
      type: Array,
      default: () => [],
    },
    /**
     *  Меню при клике на +
     *
     */
    menuAdditional: {
      type: Array,
      default: () => [],
    },

  },
  computed: {
    computedMenuMain() {
      return this.menuMain.map(i => {
        return {
          id: _XEUtils.uniqueId(),
          ...i,
        }
      })
    },
    isExact() {
      if (!_has(this, "$route.name")) return false
      const hasIndex = this.$route.name.includes("index")
      return hasIndex && !this.$route.name.includes("id")
    },
  },
}
</script>

<style lang="scss">
.mc-side-bar-center {
  $block-name: &;

  &__title {
    margin: $space-100;
  }

  &__content {
    @include child-indent-bottom($space-50);
  }
}
</style>