<template>
  <component :is="type" class="mc-svg-icon" :class="classes" v-html="svg" />
</template>

<script>
  import svgIcons from '../../utils/load-icons'

  export default {
    name: 'McSvgIcon',
    props: {
      name: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        default: "black",
      },
      fill: {
        type: String,
        default: "currentColor",
      },
      size: {
        type: String,
        default: "300",
      },
      type: {
        type: String,
        default: "span",
      },
    },
    data() {
      return {
        svg: null,
      }
    },
    watch: {
      name: {
        handler() {
          this.updateIcon()
        },
        immediate: true,
      },
      fill: {
        handler() {
          this.updateIcon()
        },
        immediate: true,
      },
      color: {
        handler() {
          this.updateIcon()
        },
        immediate: true,
      },
    },
    computed: {
      classes() {
        return {
          [`mc-svg-icon--size-${this.size}`]: !!this.size,
          [`mc-svg-icon--color-${this.color}`]: !!this.color,
        }
      },
      styles() {
        return`fill: ${this.fill}`
      },
    },
    methods: {
      updateIcon() {
        const icon = svgIcons.find(i => i.name.slice(2, -4) === this.name)
        if (icon && icon.content) {
          this.svg = icon.content.replace(/^<svg /, `<svg style="fill: ${this.fill}"`)
        }
      }
    },
  }
</script>

<style lang="scss">
  .mc-svg-icon {
    @include reset();
    @include reset-text-indents();

    svg {
      @include size(inherit);
    }

    &--size {
      @each $size, $value in $token-icon-sizes {
        &-#{$size} {
          @include size($value);
        }
      }
    }

    &--color {
      @each $color, $value in $token-colors {
        &-#{$color} {
          color: $value;
        }
      }
    }
  }
</style>