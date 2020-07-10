<script>
export default {
    name: 'McBadge',
    functional: true,
    props: {
        color: {
            type: String,
            default: 'white',
        },
        background: {
            type: String,
            default: 'red',
        },
        translucent: {
            type: Boolean,
            default: false,
        },
    },
    render(h, { props, slots, data }) {
        const classes = {
            'mc-badge': true,
            [`mc-badge--color-${props.color}`]: props.color,
            [`mc-badge--bg-${props.background}`]: props.background,
            [`mc-badge--translucent-${props.background}`]: props.translucent,
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
            slots()['default'],
        )
    },
}
</script>

<style lang="scss">
.mc-badge {
    $block-name: &;
    display: inline-flex;
    align-items: center;
    border-radius: $radius-50;
    padding: sum($space-100, 2px) $space-100;
    @each $color, $value in $token-colors {
        &--color-#{$color} {
            color: $value;
            * {
                color: $value;
            }
        }
        &--bg-#{$color} {
            background-color: $value;
        }
        &--translucent-#{$color} {
            background-color: #{$value}70;
        }
    }
}
</style>
