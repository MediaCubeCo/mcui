<template>
  <div class="mc-table-card" :style="{ marginLeft: ml }">
    <div class="mc-table-card__header">
      <!-- @slot Слот заголовка -->
      <slot name="header" />
    </div>
    <div class="mc-table-card__body">
      <!-- @slot Слот контента -->
      <slot />
    </div>
    <div class="mc-table-card__footer">
      <!-- @slot Слот футера -->
      <slot name="footer" />
    </div>
  </div>
</template>

<script>

export default {
  name: "McTableCard",
  props: {
    ml: {
      type: String,
      default: "251px",
    },
  },
}
</script>

<style lang="scss">
.mc-table-card {
  $block-name: &;

  @include position(absolute, 0);
  z-index: 10;
  background-color: $color-white;
  border: 1px solid $color-hover-gray;
  display: flex;
  flex-direction: column;
  @include custom-scroll();

  &__header {
    height: $size-500;
    border-bottom: 1px solid $color-hover-gray;
    flex-shrink: 0;
  }

  &__body {
    position: relative;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
    overflow-y: auto;
  }

  &__footer {
    border-top: 1px solid $color-hover-gray;
    flex-shrink: 0;
    padding: $space-200;
    @include child-indent-right($space-150);
    &:empty {
      display: none;
    }
  }
}
</style>
