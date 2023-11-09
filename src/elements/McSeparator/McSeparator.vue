<script>
export default {
    name: 'McSeparator',
    functional: true,
    props: {
        /**
         * Толщина `s, m`
         */
        weight: {
            type: String,
            default: 's',
        },
        /**
         * Цвет (токены)
         */
        color: {
            type: String,
            default: 'outline-gray',
        },
        /**
         * Отступ слева и справа: 50, 200... ...1000
         */
        indentX: {
            type: String,
            default: '',
        },
        /**
         * Отступ сверху и снизу: 50, 200... ...1000
         */
        indentY: {
            type: String,
            default: '',
        },
        /**
         * Отступ сверху: 50, 200... ...1000
         */
        indentTop: {
            type: String,
            default: '',
        },
        /**
         * Отступ снизу: 50, 200... ...1000
         */
        indentBottom: {
            type: String,
            default: '',
        },
        /**
         * Отступ слева: 50, 200... ...1000
         */
        indentLeft: {
            type: String,
            default: '',
        },
        /**
         * Отступ справа: 50, 200... ...1000
         */
        indentRight: {
            type: String,
            default: '',
        },
    },

    render(h, { props, slots, data }) {
        const indents = {
            top: props.indentTop || props.indentY,
            bottom: props.indentBottom || props.indentY,
            left: props.indentLeft || props.indentX,
            right: props.indentRight || props.indentX,
        }
        const classes = {
            'mc-separator': true,
            ...(data.class || {}),
        }

        if (data.staticClass) {
            const staticClasses = data.staticClass.split(' ')
            staticClasses.forEach(c => c && (classes[c] = true))
        }

        let style = {}
        if (props.color) style['--mc-separator-color'] = `var(--color-${props.color})`
        if (indents.top) style['--mc-separator-indent-top'] = `var(--space-${indents.top})`
        if (indents.bottom) style['--mc-separator-indent-bottom'] = `var(--space-${indents.bottom})`
        if (indents.left) style['--mc-separator-indent-left'] = `var(--space-${indents.left})`
        if (indents.right) style['--mc-separator-indent-right'] = `var(--space-${indents.right})`
        let weight
        switch (props.weight) {
            case 's': {
                weight = '1px'
                break
            }
            case 'm': {
                weight = '2px'
            }
        }
        if (weight) style['--separator-weight'] = weight
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
                    'div',
                    {
                        class: 'mc-separator__wrapper',
                    },
                    slots()['default'],
                ),
            ],
        )
    },
}
</script>

<style lang="scss">
.mc-separator {
    $block-name: &;
    --mc-separator-indent-top: initial;
    --mc-separator-indent-bottom: initial;
    --mc-separator-indent-left: initial;
    --mc-separator-indent-right: initial;
    --mc-separator-weight: initial;
    width: 100%;
    margin-top: var(--mc-separator-indent-top);
    margin-bottom: var(--mc-separator-indent-bottom);
    margin-inline-start: var(--mc-separator-indent-left);
    margin-inline-end: var(--mc-separator-indent-right);
    height: var(--mc-separator-weight);
    &__wrapper {
        @include size(100%);
        background-color: var(--separator-color);
    }
}
</style>
