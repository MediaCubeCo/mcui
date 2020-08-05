<template>
<div class="mc-main">
  <slot name="left-bar"/>
  <div class="mc-main__right">
    <slot name="top-bar" />
  </div>
</div>
</template>

<script>
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
    flex-direction: column;
  }
}
</style>