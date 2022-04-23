<script>
import _upperFirst from 'lodash/upperFirst'

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
                innerHTML: data.domProps.innerHTML,
            }
        }
        const responsivePropsClasses = {}
        values.forEach(value => {
            responsivePropsClasses[`mc-title--${value}-${props[value]}`] = props[value]
            sizes.forEach(size => {
                const sizeValue = props[`${value}${_upperFirst(size)}`]
                responsivePropsClasses[`mc-title--${value}-${size}-${sizeValue}`] = sizeValue
            })
        })
        const classes = {
            'mc-title': true,
            [`mc-title--line-height-${props.lineHeight}`]: props.lineHeight,
            ['mc-title--ellipsis']: props.ellipsis,
            [`mc-title--color-${props.color}`]: props.color,
            [`mc-title--text-align-${props.textAlign}`]: props.textAlign,
            [`mc-title--pre-line`]: props.preLine,
            [`mc-title--nowrap`]: props.nowrap,
            'mc-title--uppercase': props.uppercase,
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
        if (data.staticStyle) {
            style = data.staticStyle
        }
        return h(
            'div',
            {
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
.mc-title {
    $block-name: &;
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
        & + *:not(:empty) {
            margin-left: $space-50;
        }
        *:not(:empty) + & {
            margin-left: $space-50;
        }
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
        font-family: $font-family-main;
        &-h1 {
            font-size: $font-size-700;
            line-height: $line-height-600;
            font-weight: $font-weight-semi-bold;
            #{$block-name}__text {
                max-width: 920px;
            }
        }
        &-h2 {
            font-size: $font-size-600;
            line-height: $line-height-500;
            font-weight: $font-weight-semi-bold;
            #{$block-name}__text {
                max-width: 820px;
            }
        }
        &-h3 {
            font-size: $font-size-500;
            line-height: $line-height-400;
            font-weight: $font-weight-semi-bold;
            #{$block-name}__text {
                max-width: 720px;
            }
        }
        &-h4 {
            font-size: $font-size-400;
            line-height: $line-height-300;
            font-weight: $font-weight-bold;
            #{$block-name}__text {
                max-width: 700px;
            }
        }

        &-subtitle {
            font-size: $font-size-300;
            line-height: $line-height-250;
            #{$block-name}__text {
                max-width: 640px;
            }
        }
        &-article {
            font-size: $font-size-200;
            line-height: $line-height-250;
            #{$block-name}__text {
                max-width: 536px;
            }
        }
        &-info {
            font-size: $font-size-300;
            line-height: $line-height-300;
        }
        &-body {
            font-size: $font-size-200;
            line-height: $line-height-200;
            #{$block-name}__text {
                max-width: 330px;
            }
        }
        &-overline {
            font-size: $font-size-100;
            line-height: $line-height-150;
            font-weight: $font-weight-medium;
            #{$block-name}__text {
                max-width: 330px;
            }
        }
    }

    @each $media, $value in $token-media-queries {
        @media #{$value} {
            &--variation-#{$media} {
                font-family: $font-family-main;
                &-h1 {
                    font-size: $font-size-700;
                    line-height: $line-height-600;
                    font-weight: $font-weight-semi-bold;
                    #{$block-name}__text {
                        max-width: 920px;
                    }
                }
                &-h2 {
                    font-size: $font-size-600;
                    line-height: $line-height-500;
                    font-weight: $font-weight-semi-bold;
                    #{$block-name}__text {
                        max-width: 820px;
                    }
                }
                &-h3 {
                    font-size: $font-size-500;
                    line-height: $line-height-400;
                    font-weight: $font-weight-semi-bold;
                    #{$block-name}__text {
                        max-width: 720px;
                    }
                }
                &-h4 {
                    font-size: $font-size-400;
                    line-height: $line-height-300;
                    font-weight: $font-weight-bold;
                    #{$block-name}__text {
                        max-width: 700px;
                    }
                }

                &-subtitle {
                    font-size: $font-size-300;
                    line-height: $line-height-250;
                    #{$block-name}__text {
                        max-width: 640px;
                    }
                }
                &-article {
                    font-size: $font-size-200;
                    line-height: $line-height-250;
                    #{$block-name}__text {
                        max-width: 536px;
                    }
                }
                &-info {
                    font-size: $font-size-300;
                    line-height: $line-height-300;
                }
                &-body {
                    font-size: $font-size-200;
                    line-height: $line-height-200;
                    #{$block-name}__text {
                        max-width: 330px;
                    }
                }
                &-overline {
                    font-size: $font-size-100;
                    line-height: $line-height-150;
                    font-weight: $font-weight-medium;
                    #{$block-name}__text {
                        max-width: 330px;
                    }
                }
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
        letter-spacing: $letter-spacing-m;
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
            text-align: left;
        }
        &-center {
            justify-content: center;
            text-align: center;
        }
        &-right {
            justify-content: flex-end;
            text-align: right;
        }
    }
    &--weight {
        &-normal {
            font-weight: $font-weight-normal;
        }
        &-medium {
            font-weight: $font-weight-medium;
        }
        &-semi-bold {
            font-weight: $font-weight-semi-bold;
        }
        &-bold {
            font-weight: $font-weight-bold;
        }
    }
    @each $media, $value in $token-media-queries {
        @media #{$value} {
            &--weight-#{$media} {
                &-normal {
                    font-weight: $font-weight-normal;
                }
                &-medium {
                    font-weight: $font-weight-medium;
                }
                &-semi-bold {
                    font-weight: $font-weight-semi-bold;
                }
                &-bold {
                    font-weight: $font-weight-bold;
                }
            }
        }
    }
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
