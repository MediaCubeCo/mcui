<script>
export default {
    name: 'McProgress',
    functional: true,
    props: {
        /**
         *  Процент
         *
         */
        percent: {
            type: Number,
            default: 0,
        },
        /**
         *  Число для отображения, если не укказано, используется процент
         *
         */
        amount: {
            type: [String, Number, Boolean],
            default: null,
        },
        /**
         *  Цвет
         *
         */
        color: {
            type: String,
            default: 'dark-gray',
        },
        /**
         *  Цвет текста
         *
         */
        helpTextColor: {
            type: String,
            default: 'gray',
        },
        /**
         *  Вспомогательный текст
         */
        helpText: {
            type: String,
            default: '',
        },
        /**
         *  Ошибки
         */
        errors: {
            type: Array,
            default: () => [],
        },
        /**
         *  Поменять местами подписи
         */
        reverseHeaders: {
            type: Boolean,
            default: false,
        },
        /**
         *  Использовать моноширинный шрифт для percent и amount
         */
        monospaceNumbers: {
            type: Boolean,
            default: false,
        },
    },
    render(h, { props, data }) {
        const errorText = props.errors !== null && props.errors.length ? props.errors.join(', ') : ''
        const wrapperClasses = {
            'mc-progress': true,
            [`mc-progress--color-${props.color}`]: props.color,
            'mc-progress--error': errorText,
            ...(data.class || {}),
        }

        if (data.staticClass) {
            const staticClasses = data.staticClass.split(' ')
            staticClasses.forEach(c => c && (wrapperClasses[c] = true))
        }

        let style = {}
        if (data.staticStyle) {
            style = data.staticStyle
        }

        const lineClasses = {
            'mc-progress__line': true,
        }

        return h(
            'div',
            {
                class: wrapperClasses,
                style,
            },
            [
                h(
                    'div',
                    {
                        class: ['mc-progress__top', { 'mc-progress__top--reverse-headers': props.reverseHeaders }],
                    },
                    [
                        h(
                            'div',
                            {
                                class: {
                                    'mc-progress__percent': true,
                                    'mc-progress__percent--monospace': props.monospaceNumbers,
                                },
                            },
                            [errorText ? 0 : props.amount || props.amount === 0 ? props.amount : `${props.percent}%`],
                        ),
                        props.helpText
                            ? h(
                                  'div',
                                  {
                                      class: [
                                          'mc-progress__help-text',
                                          `mc-progress__help-text--color-${props.helpTextColor}`,
                                      ],
                                  },
                                  [props.helpText],
                              )
                            : null,
                    ],
                ),
                h(
                    'div',
                    {
                        class: 'mc-progress__wrapper-line',
                    },
                    [
                        h('div', {
                            class: lineClasses,
                            style: { width: `${errorText ? 2 : Math.sign(props.percent) > 0 ? props.percent : 0}%` },
                        }),
                    ],
                ),
                errorText
                    ? h(
                          'div',
                          {
                              class: 'mc-progress__errors-container',
                          },
                          [errorText],
                      )
                    : null,
            ],
        )
    },
}
</script>

<style lang="scss">
.mc-progress {
    $block-name: &;

    position: relative;
    width: 100%;
    font-family: $font-family-main;
    line-height: $line-height-200;
    font-size: $font-size-200;

    @each $color, $value in $token-colors {
        &--color-#{$color} {
            #{$block-name} {
                &__percent {
                    color: $value;
                }
                &__line {
                    background-color: $value;
                }
            }
        }
    }
    &__percent {
        flex-shrink: 0;
        &--monospace {
            font-feature-settings: 'tnum';
            font-variant-numeric: tabular-nums;
        }
    }
    &--error {
        #{$block-name} {
            &__percent {
                color: $color-red;
            }
            &__line {
                background-color: $color-red;
            }
        }
    }

    &__top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: $space-100;
        &--reverse-headers {
            flex-direction: row-reverse;
        }
    }

    &__help-text {
        @each $color, $value in $token-colors {
            &--color-#{$color} {
                color: $value;
            }
        }
    }

    &__wrapper-line {
        height: $size-100;
        border-radius: $radius-100;
        background-color: $color-hover-gray;
        width: 100%;
    }

    &__line {
        height: 100%;
        border-radius: $radius-100;
        max-width: 100%;
    }

    &__errors-container {
        margin-top: $space-150;
        color: $color-red;
    }
}
</style>
