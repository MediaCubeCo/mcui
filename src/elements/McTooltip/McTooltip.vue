<template>
    <div ref="tooltipTarget" v-tooltip="tooltipProps" class="mc-tooltip-target" @mouseenter.stop="handleHide">
        <!-- @slot Слот для элемента, у которого будет всплывать тултип -->
        <slot />
    </div>
</template>

<script>
import { VTooltip } from 'v-tooltip'

VTooltip.options.defaultBoundariesElement = 'window'

export default {
    name: 'McTooltip',
    directives: {
        tooltip: VTooltip,
    },
    props: {
        /**
         *  Текст подсказки:
         */
        content: {
            type: String,
            required: true,
        },
        /**
         *  Расположение:
         */
        placement: {
            type: String,
            default: 'top',
        },
        /**
         *  Цвет:
         */
        color: {
            type: String,
            default: '',
        },
        /**
         *  Максимальная ширина
         */
        maxWidth: {
            type: String,
            default: 's',
        },
        /**
         *  Отключить стрелку
         */
        arrowDisabled: {
            type: Boolean,
            default: false,
        },
        /**
         *  Размеры:
         *  `s, m`
         */
        size: {
            type: String,
            default: 's',
        },
        /**
         *  Событие по отображению:
         *  'hover', 'click', 'focus' or 'manual'
         *  (можно комбинировать)
         */
        trigger: {
            type: String,
            default: 'hover focus',
        },
        /**
         *  Ручное отображение
         */
        show: {
            type: Boolean,
            default: false,
        },
        /**
         *  В каком контенере отображать
         */
        container: {
            default: 'body', //Boolean, String, HTMLElement,
        },
        maxLines: {
            type: Number,
            default: null,
        },
    },
    computed: {
        tooltipProps() {
            return {
                content: this.content,
                placement: this.placement,
                classes: this.tooltipClasses,
                trigger: this.trigger,
                show: this.show,
                container: this.container,
                template: `<div class="tooltip" style="${this.tooltipVariables}" role="tooltip"> <div class="tooltip-arrow"></div> <div class="tooltip-inner"><div class="tooltip-inner__content"></div></div> </div>`,
                innerSelector: '.tooltip-inner__content',
            }
        },
        tooltipClasses() {
            return [
                'mc-tooltip',
                `mc-tooltip--width-${this.maxWidth}`,
                `mc-tooltip--size-${this.size}`,
                this.maxLines ? 'mc-tooltip--lines-limit' : '',
                this.arrowDisabled ? 'mc-tooltip--arrow-disabled' : '',
            ]
        },
        tooltipVariables() {
            let textColor
            if (this.color === 'white') textColor = 'black'

            const variables = [
                this.maxLines && `--mc-tooltip-content-max-lines: ${this.maxLines}`,
                this.color && `--mc-tooltip-arrow-color: var(--color-${this.color})`,
                textColor && `--mc-tooltip-color: var(--color-${textColor})`,
                this.color && `--mc-tooltip-background-color: var(--color-${this.color})`,
            ].filter(i => i)

            return variables.join('; ')
        },
    },
    methods: {
        handleHide() {
            setTimeout(() => {
                const tooltipID =this.$refs.tooltipTarget?.getAttribute('aria-describedby')
                const tooltips = document.documentElement.querySelectorAll('.tooltip.mc-tooltip')
                tooltips.forEach(tooltip => {
                    tooltip.style.visibility = tooltip.id === tooltipID ? 'visible' : 'hidden'
                })
            }, 1)
        },
    }
}
</script>

<style lang="scss">
.mc-tooltip-target {
    display: inline-flex;
}

.mc-tooltip {
    $arrow-size: $space-100 - 1;
    --mc-tooltip-arrow-color: #{$color-black};
    --mc-tooltip-color: #{$color-white};
    --mc-tooltip-background-color: #{$color-black};
    --mc-tooltip-content-max-lines: initial;
    &.tooltip {
        display: block !important;
        z-index: 10005 !important;

        .tooltip-inner {
            @include inset-squish-space($space-300);
            background: $color-black;
            border-radius: $radius-100;
            box-shadow: $shadow-s;
            padding: $space-100 $space-150;
            background-color: var(--mc-tooltip-background-color);
            &__content {
                color: var(--mc-tooltip-color);
                font-family: $font-family-main;
                line-height: $line-height-250;
                font-size: $font-size-300;
            }
        }

        .tooltip-arrow {
            @include size(0);
            border-style: solid;
            position: absolute;
            margin: $arrow-size;
            border-color: var(--mc-tooltip-arrow-color);
            z-index: 1;
        }

        &[x-placement^='top'] {
            margin-bottom: $arrow-size;

            .tooltip-arrow {
                border-width: $arrow-size $arrow-size 0 $arrow-size;
                border-left-color: transparent !important;
                border-right-color: transparent !important;
                border-bottom-color: transparent !important;
                bottom: -$arrow-size;
                left: calc(50% - #{$arrow-size});
                margin-top: 0;
                margin-bottom: 0;
            }
        }

        &[x-placement^='bottom'] {
            margin-top: $arrow-size;

            .tooltip-arrow {
                border-width: 0 $arrow-size $arrow-size $arrow-size;
                border-left-color: transparent !important;
                border-right-color: transparent !important;
                border-top-color: transparent !important;
                top: -$arrow-size;
                left: calc(50% - #{$arrow-size});
                margin-top: 0;
                margin-bottom: 0;
            }
        }

        &[x-placement^='right'] {
            margin-left: $arrow-size;

            .tooltip-arrow {
                border-width: $arrow-size $arrow-size $arrow-size 0;
                border-left-color: transparent !important;
                border-top-color: transparent !important;
                border-bottom-color: transparent !important;
                left: -$arrow-size;
                top: calc(50% - #{$arrow-size});
                margin-left: 0;
                margin-right: 0;
            }
        }

        &[x-placement^='left'] {
            margin-right: $arrow-size;

            .tooltip-arrow {
                border-width: $arrow-size 0 $arrow-size $arrow-size;
                border-top-color: transparent !important;
                border-right-color: transparent !important;
                border-bottom-color: transparent !important;
                right: -$arrow-size;
                top: calc(50% - #{$arrow-size});
                margin-left: 0;
                margin-right: 0;
            }
        }

        &[aria-hidden='true'] {
            visibility: hidden !important;
            opacity: 0;
            transition: opacity $duration-s;
        }

        &[aria-hidden='false'] {
            visibility: visible !important;
            opacity: 1;
            transition: opacity $duration-s;
        }
    }

    &--width-xs {
        &.tooltip {
            max-width: 180px;
        }
    }

    &--width-s {
        &.tooltip {
            max-width: 250px;
        }
    }

    &--width-m {
        &.tooltip {
            max-width: 320px;
        }
    }

    &--width-l {
        &.tooltip {
            max-width: 380px;
        }
    }

    &--width-xl {
        &.tooltip {
            max-width: 500px;
        }
    }

    &--size {
        &-s {
            &.tooltip {
                .tooltip-inner {
                    @include inset-squish-space($space-200);

                    &__content {
                        font-size: $font-size-200;
                    }
                }
            }
        }
        &-m {
            &.tooltip {
                .tooltip-inner {
                    @include inset-squish-space($space-300);

                    &__content {
                        font-size: $font-size-300;
                    }
                }
            }
        }
    }

    &--lines-limit {
        &.tooltip {
            .tooltip-inner {
                &__content {
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: var(--mc-tooltip-content-max-lines);
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
    }

    &--arrow-disabled {
        &.tooltip {
            .tooltip-arrow {
                display: none;
            }
        }
    }
}
</style>
