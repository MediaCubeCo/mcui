<template>
  <div class="mc-main">
    <div v-if="$slots['left-bar']" class="mc-main__left">
      <!-- @slot Слот сайдбара -->
      <slot name="left-bar" />
    </div>
    <div class="mc-main__right">
      <!-- @slot Слот хедера -->
      <slot name="top-bar" />
      <div class="mc-main__content-wrapper">
        <div class="mc-main__content">
          <!-- @slot Слот контента -->
          <slot />
        </div>
      </div>
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
};
</script>

<style lang="scss">
@import "../../../styles/toast";
@import "../../../styles/global";

.mc-main {
  $block-name: &;

  display: flex;
  height: 100vh;
  @include custom-scroll();

  &__left {
    display: flex;
  }

  &__right {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
  }
  &__content {
    @include position(absolute, 0);
    overflow-y: auto;
    &-wrapper {
      flex: 1 1 auto;
      position: relative;
    }
  }
}
</style>
