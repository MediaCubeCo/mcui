<template>
  <div class="mc-side-bar">
    <mc-side-bar-top :logo-title="logoTitle" :logo-src="logoSrc" />
    <mc-side-bar-center :title="menuMainTitle" :menu-main="menuMain" :menu-additional="menuAdditional" />
  </div>
</template>

<script>
import McSideBarTop from "../McSideBarTop/McSideBarTop"
import McSideBarCenter from "../McSideBarCenter/McSideBarCenter"
export default {
  name: "McSideBar",
  components: {
    McSideBarTop,
    McSideBarCenter,
  },
  props: {
    /**
     *  Название сервиса
     *
     */
    logoTitle: {
      type: String,
      default: "Dashboard",
    },
    /**
     *  Путь до изображения
     *
     */
    logoSrc: {
      type: String,
      default: "",
    },
    /**
     *  Заголовок
     *  центрального блока
     */
    menuMainTitle: {
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
}
</script>

<style lang="scss">
.mc-side-bar {
  $block-name: &;

  height: 100%;
  width: 216px;
  background-color: $color-black;
  padding: $space-150 $space-100 $space-400;
  @include child-indent-bottom($space-400);
}
</style>