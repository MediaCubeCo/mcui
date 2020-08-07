<template>
<div class="mc-main">
  <div v-if="$slots['left-bar']" class="mc-main__left">
    <slot name="left-bar"/>
  </div>
  <div v-if="$slots['top-bar']" class="mc-main__right">
    <slot name="top-bar" />
  </div>
</div>
</template>

<script>
/**
 * Используется для вёрстки основных страниц
 * на проектах
 */
export default {
name: "McMain"
}
</script>

<style lang="scss">
.mc-main {
  $block-name: &;

  display: flex;
  min-height: 100%;

  &__right {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
  }
}
</style>