<template>
  <component :is="type" class="mc-svg-icon" :class="classes" v-html="svg" />
</template>

<script>
  import svgIcons from '../../utils/load-icons'

  export default {
    name: 'McSvgIcon',
    props: {
      /**
       * Имя иконки
       * из assets
       */
      name: {
        type: String,
        required: true,
      },
      /**
       * Цвет иконки
       * (по токенам)
       */
      color: {
        type: String,
        default: "",
      },
      /**
       * Заливка иконки
       */
      fill: {
        type: String,
        default: "currentColor",
      },
      /**
       * Размер
       */
      size: {
        type: String,
        default: "300",
      },
      /**
       * Тип тега
       */
      type: {
        type: String,
        default: "span",
      },
      /**
       * Толщина линий
       * stroke-width
       */
      weight: {
        type: Number,
        default: 0,
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
        if (this.weight) {
          return this.weight
        }
        switch (parseInt(this.size)) {
          case 200:
          case 250:
            return 1.2
          case 300:
          case 400:
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