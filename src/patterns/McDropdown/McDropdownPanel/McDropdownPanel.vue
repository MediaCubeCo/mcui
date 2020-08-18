<template>
  <section class="mc-dropdown-panel">
    <!-- @slot Слот контента -->
    <slot />
  </section>
</template>

<script>
export default {
  name: "McDropdownPanel",
}
</script>

<style lang="scss">
.mc-dropdown-panel {
  $block-name: &;

  box-shadow: $shadow-s;
  border-radius: $radius-100;
  background-color: $color-white;
  padding: $space-100;
  max-width: 320px;

  &:empty {
    display: none;
  }

  .mc-button {
    &--size-m {
      font-weight: $font-weight-medium;
      padding: $space-100;
      .mc-svg-icon {
        @include size($size-300);
      }
    }
  }
}
</style>
