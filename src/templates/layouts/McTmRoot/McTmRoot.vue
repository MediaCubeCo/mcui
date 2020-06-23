<template>
    <div class="mc-tm-root">
        <slot />
    </div>
</template>

<script>
  /**
   * Это обязательный компонент (это не точно), с него начинается любой layout,
   * т.к. здесь находятся глобальные стили.
   */
  export default {
    name: "McTmRoot",
  }
</script>

<style lang="scss">
.mc-tm-root {
    $block-name: &;
}
</style>