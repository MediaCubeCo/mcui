<script>
export default {
    name: 'McBadge',
    functional: true,
    props: {
        /**
         *  Дизайн:
         *  `blue, blue-outline т.д.`
        */
        variation: {
            type: String,
            default: "transparent",
        },
        /**
         *  Вертикальная черта (в таблице, к примеру)
        */
        verticalLine: {
            type: Boolean,
            default: false,
        },
    },
    render(h, { props, slots, data }) {
        const classes = {
            'mc-badge': true,
            [`mc-badge--variation-${props.variation}`]: props.variation,
            ['mc-badge--vertical-line']: props.verticalLine,
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
            'section',
            {
                class: classes,
                style,
            },
          [
            h(
              "div",
              {
                class: "mc-badge__text",
              },
              slots()["default"]
            ),
          ]
        )
    },
}
</script>

<style lang="scss">
$light-scale: "hover-gray", "white", "lighter-blue", "toxic", "transparent";
.mc-badge {
    $block-name: &;

    @include ellipsis(100%, inline-flex);
    color: $color-white;
    font-family: $font-family-main;
    font-size: $font-size-100;
    line-height: $line-height-150;
    font-weight: $font-weight-medium;
    text-transform: uppercase;
    letter-spacing: $letter-spacing-m;
    vertical-align: middle;
    max-width: 100%;
    border-radius: $radius-50;
    padding: 1px $space-100 - 1px;
    border: 1px solid transparent;

    @each $color, $value in $token-colors {
        &--variation-#{$color} {
            background-color: $value;

            @each $col-l in $light-scale {
                @if $color == $col-l {
                    color: $color-black;
                }
            }

          &-outline {
            background-color: $color-white;
            color: $value;
            border-color: fade-out($value, 0.6);
          }
        }
    }

    &--vertical-line {
        padding: 0;
        border-radius: 0;
        width: 5px;
        #{$block-name} {
            &__text {
                display: none;
            }
        }
    }
}
</style>
