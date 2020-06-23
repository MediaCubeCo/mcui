<template>
  <component :is="type" class="my-el-icon" :class="classes" v-html="svg" />
</template>

<script>
  import svgIcons from '../../utils/load-icons'

  export default {
    name: 'MyElIcon',
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
        default: "m",
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
          [`my-el-icon--size-${this.size}`]: !!this.size,
          [`my-el-icon--color-${this.color}`]: !!this.color,
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
  .my-el-icon {
    @include reset();
    @include reset-text-indents();

    svg {
      @include size(inherit);
    }

    &--size-s {
      @include size($tappable-element-xxs);
    }
    &--size-m {
      @include size($tappable-element-xs);
    }
    &--size-l {
      @include size($tappable-element-s);
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