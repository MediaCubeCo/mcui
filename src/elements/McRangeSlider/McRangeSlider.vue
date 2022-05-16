<template>
    <vue-slider
        :class="classes"
        :value="newValue"
        :dot-size="20"
        :interval="step"
        :min="min"
        :max="max"
        :disabled="disabled"
        :lazy="lazy"
        :tooltip="tooltip"
        :tooltip-placement="tooltipPlacement"
        :tooltip-formatter="tooltipFormatter"
        @change="handleInput"
        @dragging="handleDrag"
    />
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default {
    name: 'McRangeSlider',
    components: {
        VueSlider,
    },
    props: {
        /**
         *  Значение
         */
        value: {
            type: [Number, Array],
            required: true,
        },
        /**
         *  Мин. значение
         */
        min: {
            type: Number,
            required: true,
        },
        /**
         *  Макс. значение
         */
        max: {
            type: Number,
            required: true,
        },
        /**
         *  The interval between two values.
         */
        step: {
            type: Number,
            default: 1,
        },
        /**
         *  Цвет слайдера
         */
        color: {
            type: String,
            default: 'purple',
        },
        /**
         *  Is it lazy to update the value.
         *  Useful whenever you need to consume a high-loss operation
         */
        lazy: {
            type: Boolean,
            default: true,
        },
        /**
         *  Whether to disable the component.
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         *  Control Tooltip display.
         *  'none' | 'always' | 'hover' | 'focus' | 'active'
         */
        tooltip: {
            type: String,
            default: 'hover',
        },
        /**
         *  The placement of the Tooltip.
         *  'top' | 'right' | 'bottom' | 'left'
         */
        tooltipPlacement: {
            type: [String, Array],
            default: 'top',
        },
        /**
         *  The placement of the Tooltip.
         *  'top' | 'right' | 'bottom' | 'left'
         */
        coloredTooltip: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            newValue: this.value,
        }
    },
    computed: {
        classes() {
            return {
                'mc-range-slider': true,
                [`mc-range-slider--color-${this.color}`]: this.color,
                'mc-range-slider--colored-tooltip': this.coloredTooltip,
            }
        },
    },
    methods: {
        handleInput(value) {
            /**
             * Событие по изменению значения
             * @property {Number}
             */
            this.$emit('input', value)
        },
        handleDrag(value) {
            /**
             * Событие по изменению значения
             * (если нужно отслеживать value в ленивом режиме)
             * @property {Number}
             */
            this.$emit('dragging', value)
        },
        tooltipFormatter(value) {
            if (Number(value) !== value) return value
            return ('' + value).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
        },
    },
}
</script>

<style lang="scss">
.mc-range-slider {
    $block-name: &;

    .vue-slider-dot-tooltip-inner {
        line-height: $line-height-200;
        font-size: $font-size-200;
    }

    @each $color, $value in $token-colors {
        &--color-#{$color} {
            .vue-slider-process {
                background-color: $value;
            }

            .vue-slider-dot-tooltip-inner {
                padding: $space-100 $space-150;
                background-color: $color-black;
                border-color: $color-black;
            }

            .vue-slider-dot-handle-focus {
                box-shadow: $shadow-s;
            }
            .vue-slider-dot-handle {
                box-shadow: $shadow-s;
                &:hover {
                    border: 2px solid fade_out($value, 0.5);
                }
                &:active {
                    border: 2px solid $value;
                }
            }

            &#{$block-name}--colored-tooltip {
                .vue-slider-dot-tooltip-inner {
                    background-color: $value;
                    border-color: $value;
                    padding: $space-100 $space-150;
                }
            }
        }
    }
    &.vue-slider {
        .vue-slider-rail {
            cursor: pointer;
        }
        &-disabled {
            .vue-slider-rail {
                cursor: auto;
            }
        }
    }
}
</style>
