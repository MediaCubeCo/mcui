<template>
    <div
        v-tooltip="{ content, placement, classes: tooltipClasses, trigger, show, container }"
        class="mc-tooltip-target"
    >
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
            default: 'bottom',
        },
        /**
         *  Цвет:
         */
        color: {
            type: String,
            default: 'default',
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
            default: 'm',
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
            type: [Boolean, String],
            default: 'body',
        },
    },
    computed: {
        tooltipClasses() {
            return [
                'mc-tooltip',
                `mc-tooltip--color-${this.color}`,
                `mc-tooltip--width-${this.maxWidth}`,
                `mc-tooltip--size-${this.size}`,
                this.arrowDisabled ? 'mc-tooltip--arrow-disabled' : '',
            ]
        },
    },
}
</script>

<style lang="scss">
.mc-tooltip-target {
    display: inline-flex;
}

.mc-tooltip {
    $arrow-size: $space-100 - 1;

    &.tooltip {
        display: block !important;
        z-index: 10005 !important;

        .tooltip-inner {
            @include inset-squish-space($space-300);
            background: $color-black;
            color: $color-white;
            border-radius: $radius-100;
            font-family: $font-family-main;
            font-weight: $font-weight-medium;
            line-height: $line-height-250;
            font-size: $font-size-300;
            box-shadow: $shadow-s;
            padding: $space-100 $space-150;
        }

        .tooltip-arrow {
            @include size(0);
            border-style: solid;
            position: absolute;
            margin: $arrow-size;
            border-color: $color-black;
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
            visibility: hidden;
            opacity: 0;
            transition: opacity $duration-s, visibility $duration-s;
        }

        &[aria-hidden='false'] {
            visibility: visible;
            opacity: 1;
            transition: opacity $duration-s;
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
                    font-size: $font-size-200;
                }
            }
        }
        &-m {
            &.tooltip {
                .tooltip-inner {
                    @include inset-squish-space($space-300);
                    font-size: $font-size-300;
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

    @each $color, $value in $token-colors {
        &--color-#{$color} {
            @if $color == 'white' {
                &.tooltip {
                    .tooltip-inner {
                        color: $color-black;
                        background-color: $value;
                    }
                    .tooltip-arrow {
                        border-color: $value;
                    }
                }
            } @else {
                &.tooltip {
                    .tooltip-inner {
                        background-color: $value;
                    }
                    .tooltip-arrow {
                        border-color: $value;
                    }
                }
            }
        }
    }
}
</style>
