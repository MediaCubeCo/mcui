<!--<template>-->
<!--  <div class="mc-separator" :class="classes">-->
<!--    <div class="mc-separator__wrapper">-->
<!--      &lt;!&ndash; @slot Слот для данных &ndash;&gt;-->
<!--      <slot />-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<script>
export default {
  functional: true,
  name: "McSeparator",
  props: {
    /**
     * Толщина `s, m`
     */
    weight: {
      type: String,
      default: "s",
    },
    /**
     * Цвет (токены)
     */
    color: {
      type: String,
      default: "outline-gray",
    },
    /**
     * Отступ сверху: 50, 200... ...1000
     */
    indentTop: {
      type: String,
      default: "",
    },
    /**
     * Отступ снизу: 50, 200... ...1000
     */
    indentBottom: {
      type: String,
      default: "",
    },
    /**
     * Отступ слева: 50, 200... ...1000
     */
    indentLeft: {
      type: String,
      default: "",
    },
    /**
     * Отступ справа: 50, 200... ...1000
     */
    indentRight: {
      type: String,
      default: "",
    },
  },

  render(h, { props, slots, data }) {
    const classes = {
      'mc-separator': true,
      [`mc-separator--weight-${props.weight}`]: props.weight,
      [`mc-separator--color-${props.color}`]: props.color,
      [`mc-separator--indent-top-${props.indentTop}`]: props.indentTop,
      [`mc-separator--indent-bottom-${props.indentBottom}`]: props.indentBottom,
      [`mc-separator--indent-left-${props.indentLeft}`]: props.indentLeft,
      [`mc-separator--indent-right-${props.indentRight}`]: props.indentRight,
      ...(data.class || {}),
    }

    if (data.staticClass) {
      const staticClasses = data.staticClass.split(" ")
      staticClasses.forEach(c => c && (classes[c] = true))
    }

    let style = {}
    if (data.staticStyle) {
      style = data.staticStyle
    }

    return h(
      'div',
      {
        class: classes,
        style,
      },
      [
        h(
          "div",
          {
            class: "mc-separator__wrapper",
          },
          slots()["default"]
        ),
      ]
    )
  },
}
</script>

<style lang="scss">

$weights: (
  "s": 1px,
  "m": 2px,
);

.mc-separator {
  $block-name: &;

  width: 100%;

  @each $key, $value in $weights {
    &--weight-#{$key} {
      height: #{$value};
    }
  }

  &--color {
    @each $color, $value in $token-colors {
      &-#{$color} {
        #{$block-name}__wrapper {
          @include size(100%);
          background-color: $value;
        }
      }
    }
  }

  @each $key, $value in $token-spaces {
    &--indent-top-#{$key} {
      margin-top: #{$value};
    }

    &--indent-bottom-#{$key} {
      margin-bottom: #{$value};
    }

    &--indent-left-#{$key} {
      padding-left: #{$value};
    }

    &--indent-right-#{$key} {
      padding-right: #{$value};
    }
  }
}
</style>
