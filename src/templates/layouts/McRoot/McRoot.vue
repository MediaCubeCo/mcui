<template>
    <div class="mc-root">
      <slot />
      <slideout-panel></slideout-panel>
    </div>
</template>

<script>
  import "normalize.css/normalize.css"
  /**
   * Это обязательный компонент, с него начинается любой layout,
   * т.к. здесь находятся глобальные стили.
   */
  export default {
    name: "McRoot",
  }
</script>

<style lang="scss">
.mc-root {
  $block-name: &;
  @import "../../../styles/global";
  .slideout {
    box-shadow: $shadow-s;
  }
}
</style>