<script>
import _upperFirst from 'lodash/upperFirst'
import DOMPurify from 'isomorphic-dompurify'

const values = ['variation', 'weight']
const sizes = ['xs', 's', 'm', 'l', 'xl', 'xxl']
const variationProps = {}

values.forEach(value => {
    sizes.forEach(size => {
        variationProps[`${value}-${size}`] = { type: String }
    })
})
export default {
    name: 'McTitle',
    functional: true,
    props: {
        ...variationProps,
        /**
         * Уровень: `h1`, `h2`, `h3`, `h4`, `subtitle`, `body`, `overline`, `article`, 'info'.
         */
        variation: {
            type: String,
            default: 'body',
        },
        /**
         * В одну строку с точками в конце, если не вмещается
         */
        ellipsis: {
            type: Boolean,
            default: true,
        },
        /**
         * Если нужен другой тэг
         */
        tagName: {
            type: String,
            default: 'div',
        },
        /**
         * Заглавные буквы
         */
        uppercase: {
            type: Boolean,
            default: false,
        },
        /**
         * Цвет
         */
        color: {
            type: String,
            default: 'black',
        },
        /**
         *  Позиция текста:
         *  `left, center, right`
         */
        textAlign: {
            type: String,
            default: 'left',
        },
        /**
         * Если нужна иная высота строки: `100`, `200`, `300` и т.д.
         */
        lineHeight: {
            type: String,
            default: '',
        },
        /**
         * Толщина текста:
         * normal, medium, semi-bold
         */
        weight: {
            type: String,
            default: '',
        },
        /**
         * Если нужно указать свою
         * максимальную ширину
         */
        maxWidth: {
            type: String,
            default: '',
        },
        preLine: {
            type: Boolean,
            default: false,
        },
        nowrap: {
            type: Boolean,
            default: false,
        },
        plainText: {
            type: Boolean,
            default: false,
        },
    },
    render(h, { props, slots, data, listeners }) {
        let contentStyle = {}
        if (props.maxWidth) {
            contentStyle = { 'max-width': props.maxWidth }
        }
        const contentOptions = {
            class: 'mc-title__text',
            style: contentStyle,
            is: props.tagName,
        }
        if (data.domProps && data.domProps.innerHTML) {
            contentOptions.domProps = {
                innerHTML: DOMPurify.sanitize(data.domProps.innerHTML),
            }
        }
        const responsivePropsClasses = {}
        responsivePropsClasses[`mc-title--variation-${props.variation}`] = props.variation
        values.forEach(value => {
            sizes.forEach(size => {
                const sizeValue = props[`${value}${_upperFirst(size)}`]
                responsivePropsClasses[`mc-title--${value}-${size}-${sizeValue}`] = sizeValue
            })
        })
        const classes = {
            'mc-title': true,
            ['mc-title--ellipsis']: props.ellipsis,
            [`mc-title--text-align-${props.textAlign}`]: props.textAlign,
            [`mc-title--pre-line`]: props.preLine,
            [`mc-title--nowrap`]: props.nowrap,
            'mc-title--uppercase': props.uppercase,
            'mc-title--line-height': props.lineHeight,
            'mc-title--weight': props.weight,
            'mc-title--plain-text': props.plainText,
            ...(data.class || {}),
            ...responsivePropsClasses,
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
        if (props.color) style['--mc-title-color'] = `var(--color-${props.color})`
        if (props.weight) style['--mc-title-weight'] = `var(--font-weight-${props.weight})`
        if (props.lineHeight) style['--mc-title-line-height'] = `var(--line-height-${props.lineHeight})`
        if (data.staticStyle) {
            style = {
                ...data.staticStyle,
            }
        }
        return h(
            'div',
            {
                attrs: {
                    id: data.attrs?.id,
                },
                class: classes,
                style,
                on: listeners,
            },
            [slots()['icon-prepend'], h('component', contentOptions, slots()['default']), slots()['icon-append']],
        )
    },
}
</script>

<style lang="scss">
@import '../../styles/mixins';
@import '../../tokens/font-families';
@import '../../tokens/letter-spacings';
.mc-title {
    $block-name: &;
    --mc-title-color: initial;
    --mc-title-weight: initial;
    --mc-title-line-height: initial;
    color: var(--mc-title-color);

    margin-top: 0;
    margin-bottom: 0;
    display: inline-flex;
    max-width: 100%;
    width: 100%;
    text-decoration: none;
    //@include child-indent-right($space-50);

    &__text {
        padding-bottom: 1px; // fix overflow
        margin-bottom: -1px; // fix overflow
    }

    > *:not(:empty):not(:last-child) {
        margin-inline-end: $space-50;
    }

    .mc-svg-icon,
    .mc-button {
        @include reset-text-indents();
    }

    &--pre-line {
        #{$block-name}__text {
            white-space: pre-line !important;
            word-break: normal;
        }
    }

    &--nowrap {
        #{$block-name}__text {
            white-space: nowrap;
        }
    }

    &--variation {
        @include variations-title;
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
        letter-spacing: $letter-spacing-m;
    }
    &--plain-text {
        #{$block-name} {
            &__text {
                unicode-bidi: plaintext;
            }
        }
    }

    &--text-align {
        &-left {
            justify-content: flex-start;
            text-align: start;
        }
        &-center {
            justify-content: center;
            text-align: center;
        }
        &-right {
            justify-content: flex-end;
            text-align: end;
        }
    }
    &--line-height {
        line-height: var(--mc-title-line-height);
    }
    &--weight {
        font-weight: var(--mc-title-weight);
    }
    @include responsive-variations-title;
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-weight: inherit;
        font-style: inherit;
        font-size: inherit;
        line-height: inherit;
        margin-block-start: 0;
        margin-block-end: 0;
    }
}
</style>
