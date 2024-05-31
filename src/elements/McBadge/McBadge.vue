<script>
export default {
    name: 'McBadge',
    functional: true,
    props: {
        /**
         *  Дизайн:
         *  `purple, purple-outline т.д.`
         */
        variation: {
            type: String,
            default: 'transparent',
        },
        /**
         *  Вертикальная черта (в таблице, к примеру)
         */
        verticalLine: {
            type: Boolean,
            default: false,
        },
        modern: {
            type: Boolean,
            default: false,
        },
    },
    render(h, { props, slots, data, listeners }) {
        const variation = `${props.variation}${props.modern ? '-modern' : ''}`
        const classes = {
            'mc-badge': true,
            'mc-badge--vertical-line': props.verticalLine,
            'mc-badge--modern': props.modern,
            ...(data.class || {}),
        }

        if (data.staticClass) {
            const staticClasses = data.staticClass.split(' ')
            staticClasses.forEach(c => c && (classes[c] = true))
        }

        let style = {}
        const texts = variation.split('-')
        const currentStyle = texts[texts.length - 1]
        const color = props.variation ? variation.replace(`-${currentStyle}`, '') : variation
        const setProperty = ({ property = '--mc-badge-color', value, newColor = color } = {}) =>
            (style[property] = value || `var(--color-${newColor})`)
        switch (currentStyle) {
            case 'outline': {
                setProperty()
                setProperty({ property: '--mc-badge-border-color' })
                setProperty({ property: '--mc-badge-background-color', newColor: 'white' })
                setProperty({ property: '--mc-badge-background-opacity', value: '0.4' })
                break
            }
            case 'invert':
            case 'modern': {
                setProperty()
                setProperty({ property: '--mc-badge-background-color' })
                setProperty({ property: '--mc-badge-background-opacity', value: '0.1' })
                break
            }
            default: {
                const lightColors = ['hover-gray', 'white', 'lighter-blue', 'lighter-purple', 'toxic', 'transparent']
                lightColors.includes(variation) && setProperty({ newColor: 'black' })
                setProperty({ property: '--mc-badge-background-color', newColor: variation })
                break
            }
        }
        if (data.staticStyle) {
            style = data.staticStyle
        }

        return h(
            'section',
            {
                class: classes,
                style,
                on: listeners,
            },
            [
                h(
                    'div',
                    {
                        class: 'mc-badge__text',
                    },
                    slots()['default'],
                ),
                h('div', {
                    class: 'mc-badge__background',
                }),
            ],
        )
    },
}
</script>

<style lang="scss">
@import '../../styles/mixins';
@import '../../tokens/font-families';
@import '../../tokens/letter-spacings';
.mc-badge {
    $block-name: &;
    --mc-badge-color: #{$color-white};
    --mc-badge-background-color: inherit;
    --mc-badge-background-opacity: initial;
    --mc-badge-border-color: #{$color-transparent};
    @include ellipsis(100%, inline-flex);
    align-items: center;
    color: var(--mc-badge-color);
    position: relative;
    font-family: $font-family-main;
    font-size: $font-size-100;
    line-height: $line-height-150;
    height: $line-height-200;
    font-weight: $font-weight-medium;
    text-transform: uppercase;
    letter-spacing: $letter-spacing-m;
    vertical-align: middle;
    padding: 2px $space-100;
    border-radius: $radius-50;
    &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        @include size(100%);
        background-color: var(--mc-badge-background-color);
        opacity: var(--mc-badge-background-opacity);
        border: 1px solid var(--mc-badge-border-color);
        border-radius: inherit;
    }
    &__text {
        z-index: 1;
    }
    &--modern {
        border-radius: $radius-50;
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
