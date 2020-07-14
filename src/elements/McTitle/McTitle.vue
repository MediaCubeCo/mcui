<script>
export default {
  functional: true,
  name: "McTitle",
  props: {
    variation: {
      type: String,
      default: "body",
    },
    ellipsis: {
      type: Boolean,
      default: true,
    },
    tagName: {
      type: String,
      default: "div",
    },
    uppercase: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "black",
    },
    textAlign: {
      type: String,
      default: "left",
    },
    lineHeight: {
      type: String,
      default: "",
    },
    weight: {
      type: String,
      default: "medium",
    },
  },
  render(h, { props, slots, data }) {
    const contentOptions = {
      class: "mc-title__text",
    }
    if (data.domProps && data.domProps.innerHTML) {
      contentOptions.domProps = {
        innerHTML: data.domProps.innerHTML,
      }
    }
    const classes = {
      "mc-title": true,
      [`mc-title--variation-${props.variation}`]: props.variation,
      [`mc-title--line-height-${props.lineHeight}`]: props.lineHeight,
      ["mc-title--ellipsis"]: props.ellipsis,
      [`mc-title--color-${props.color}`]: props.color,
      [`mc-title--text-align-${props.textAlign}`]: props.textAlign,
      "mc-title--uppercase": props.uppercase,
      [`mc-title--weight-${props.weight}`]: props.weight,
      ...(data.class || {}),
    }

    if (data.staticClass) {
      const staticClasses = data.staticClass.split(" ")
      staticClasses.forEach(c => {
        if (c) {
          classes[c] = true
        }
      })
    }
    let style = {}
    if (data.staticStyle) {
      style = data.staticStyle
    }
    return h(
      "component",
      {
        class: classes,
        style,
        is: props.tagName,
      },
      [
        slots()["icon-prepend"],
        h("div", contentOptions, slots()["default"]),
        slots()["icon-append"],
      ]
    )
  },
}
</script>

<style lang="scss">
.mc-title {
  $block-name: &;
  margin-top: 0;
  margin-bottom: 0;
  display: inline-flex;
  max-width: 100%;
  width: 100%;
  text-decoration: none;
  @include child-indent-right(0.3em);

  &__text {
    padding-bottom: 1px; // fix overflow
    margin-bottom: -1px; // fix overflow
  }

  .mc-svg-icon {
    font-size: inherit;
    width: 1em;
    height: 1em;
  }

  &--variation {
    font-family: $font-family-main;
    font-weight: $font-weight-medium;
    &-h1 {
      font-size: $font-size-700;
      line-height: $line-height-600;
      #{$block-name}__text {
        max-width: 920px;
      }
    }
    &-h2 {
      font-size: $font-size-600;
      line-height: $line-height-500;
      #{$block-name}__text {
        max-width: 820px;
      }
    }
    &-h3 {
      font-size: $font-size-500;
      line-height: $line-height-400;
      #{$block-name}__text {
        max-width: 720px;
      }
    }
    &-h4 {
      font-size: $font-size-400;
      line-height: $line-height-300;
      #{$block-name}__text {
        max-width: 700px;
      }
    }
    &-body {
      font-size: $font-size-300;
      line-height: $line-height-250;
      #{$block-name}__text {
        max-width: 640px;
      }
    }
    &-caption {
      font-size: $font-size-200;
      line-height: $line-height-200;
      #{$block-name}__text {
        max-width: 330px;
      }
    }
    &-overline {
      font-size: $font-size-100;
      line-height: $line-height-150;
      #{$block-name}__text {
        max-width: 330px;
      }
    }
  }

  @each $line-height, $value in $token-line-heights {
    &--line-height-#{$line-height} {
      line-height: $value;
    }
  }

  &--ellipsis {
    align-items: center;

    #{$block-name} {
      &__text {
        @include ellipsis($display: inline-block);
        @include layout-flex-fix();
      }
    }
  }

  &--uppercase {
    text-transform: uppercase;
  }

  &--color {
    @each $color, $value in $token-colors {
      &-#{$color} {
        color: $value;
      }
    }
  }

  &--text-align {
    &-left {
      justify-content: flex-start;
    }
    &-center {
      justify-content: center;
    }
    &-right {
      justify-content: flex-end;
    }
  }
  &--weight {
    &-medium {
        font-weight: $font-weight-medium;
    }
    &-semi-bold {
        font-weight: $font-weight-semi-bold;
    }
  }
}
</style>