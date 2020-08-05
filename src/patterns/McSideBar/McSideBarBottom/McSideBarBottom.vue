<template>
<div class="mc-side-bar-bottom" :class="classes">
<!--  :icon="compact ? 'arrow_forward' : 'arrow_backward'"-->
  <mc-side-bar-button
    class="mc-side-bar-bottom__hide-button"
    icon="arrow_backward"
    :title="hideText"
    :compact="compact"
    @click="handleClick"
  />
</div>
</template>

<script>
import McSideBarButton from "../McSideBarButton/McSideBarButton"
export default {
  name: "McSideBarBottom",
  components: {
    McSideBarButton,
  },
  props: {
    /**
     *  Текст кнопки
     *  сворачивания меню
     */
    hideText: {
      type: String,
      default: "",
    },
    /**
     *  Компактный вид
     */
    compact: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      hasCompactClass: this.compact
    }
  },
  watch: {
    compact(newValue) {
      this.hasCompactClass = newValue
    }
  },
  computed: {
    classes() {
      return {
        "mc-side-bar-bottom--compact": this.hasCompactClass,
      }
    },
  },
  methods: {
    handleClick() {
      this.$emit('toggle-size', !this.compact)
      this.hasCompactClass = !this.hasCompactClass
    }
  },
}
</script>

<style lang="scss">
.mc-side-bar-bottom {
  $block-name: &;

  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  justify-content: flex-end;

  &__hide-button {
    .mc-side-bar-button__icon {
      transition: transform $duration-s;
    }
  }

  &--compact {
    #{$block-name}__hide-button {
      .mc-side-bar-button__icon {
        transform: rotate(180deg);
      }
    }
  }
}
</style>