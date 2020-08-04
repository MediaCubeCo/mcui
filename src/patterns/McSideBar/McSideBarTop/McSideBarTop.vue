<template>
  <div class="mc-side-bar-top">
    <mc-preview>
      <img v-if="logoSrc" slot="left" class="mc-side-bar-top__img" :src="logoSrc" width="24" height="24" :alt="logoTitle" />
      <mc-title slot="top" variation="subtitle" color="white" weight="semi-bold">{{logoTitle}}</mc-title>
    </mc-preview>
  </div>
</template>

<script>
import McButton from "../../../elements/McButton/McButton"
import McPreview from "../../McPreview/McPreview"
import McTitle from "../../../elements/McTitle/McTitle"
import McAvatar from "../../../elements/McAvatar/McAvatar"
export default {
  name: "McSideBarTop",
  components: {
    McButton,
    McPreview,
    McTitle,
    McAvatar,
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
     */
    logoSrc: {
      type: String,
      default: "",
    },
  },
}
</script>

<style lang="scss">
.mc-side-bar-top {
  $block-name: &;
}
</style>