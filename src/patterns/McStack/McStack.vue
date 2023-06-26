<script>
export default {
    name: 'McStack',
    functional: true,
    /**
     *  Количество отрисованных
     *  единиц списка
     */
    props: {
        limit: {
            type: Number,
            default: null,
        },
        collapsed: {
            type: Boolean,
            default: false,
        },
    },
    render(h, { props, slots, data }) {
        let items = slots()['default']
        const renderItems = items ? items.filter(i => i.tag) : []
        items = props.limit === null ? renderItems : renderItems.slice(0, props.limit)
        const more = renderItems.length - items.length

        const classes = {
            'mc-stack': true,
            'mc-stack--collapsed': props.collapsed,
            ...(data.class || {}),
        }

        if (data.staticClass) {
            const staticClasses = data.staticClass.split(' ')
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
            'div',
            {
                ref: data.ref,
                class: classes,
                style,
            },
            [
                h(
                    'div',
                    {
                        ref: 'body',
                        class: 'mc-stack__body',
                    },
                    items,
                ),
                more > 0
                    ? h(
                          'div',
                          {
                              ref: 'counter',
                              class: 'mc-stack__counter',
                          },
                          [`+${more}`],
                      )
                    : null,
            ],
        )
    },
}
</script>

<style lang="scss">
.mc-stack {
    $block-name: &;

    position: relative;
    @include reset-text-indents();
    display: flex;
    align-items: center;
    flex-wrap: nowrap;

    &--collapsed {
        #{$block-name}__body {
            @include child-indent-right(-$space-200);
            > * {
                border: 2px solid $color-white;
            }
        }
    }

    &__body {
        min-width: 0;
        overflow: hidden;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        @include child-indent-right($space-150);
        > * {
            justify-content: center;
        }
    }

    &__counter {
        position: sticky;
        right: 0;
        margin-left: $space-50;
        flex: 0 0 auto;
        color: $color-gray;
        font-family: $font-family-main;
        font-size: $font-size-200;
        line-height: $line-height-200;
    }
}
</style>
