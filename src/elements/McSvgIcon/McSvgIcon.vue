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
        default: "",
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
      size: {
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
      computedWeight() {
        switch (parseInt(this.size)) {
          case 200:
          case 300:
            return 1
          case 400:
          case 500:
          case 600:
            return 1.5
          default:
            return 2
        }
      }
    },
    methods: {
      updateIcon() {
        const icon = svgIcons.find(i => i.name.slice(2, -4) === this.name)
        if (icon && icon.content) {
          if (icon.content.indexOf("stroke") !== -1) {
            let filledSvg = icon.content.replace(/stroke=\S+/g, `fill="none" stroke="${this.fill}" `)
            this.svg = filledSvg.replace(/stroke-width=\S+/g, `stroke-width="${this.computedWeight}" `)
            return
          }
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