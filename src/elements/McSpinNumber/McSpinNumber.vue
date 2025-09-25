<template>
    <div :id="id" class="mc-spin-number-container">
        <div
            v-for="(digit, i) in currentTo"
            :key="`mc-spin-number-${id}-${i}`"
            :class="responsivePropsClasses"
            :style="containerStyles"
        >
            <template v-if="!Number.isFinite(digit)">
                <span class="mc-spin-number__non-digit">
                    {{ currentTo[i] }}
                </span>
            </template>
            <mc-spin-digit
                v-else
                v-bind="$props"
                :start="+currentFrom[i]"
                :end="+currentTo[i]"
                class="mc-spin-number__digit"
                @spin-end="actualizeNumbers"
            />
        </div>
    </div>
</template>

<script>
import McSpinDigit from '../McSpinDigit/McSpinDigit'
import _upperFirst from 'lodash/upperFirst'
const values = ['variation', 'weight']
const validators = {
    variation: v => ['h1', 'h2', 'h3', 'h4', 'subtitle', 'body', 'overline', 'article', 'info'].includes(v),
    weight: v => ['normal', 'medium', 'semi-bold', 'bold'].includes(v),
}

const sizes = ['xs', 's', 'm', 'l', 'xl', 'xxl']
const variationProps = {}

values.forEach(value => {
    const validator = validators[value]
    sizes.forEach(size => {
        variationProps[`${value}-${size}`] = { type: String, validator }
    })
})
export default {
    name: 'McSpinNumber',
    components: {
        McSpinDigit,
    },
    props: {
        ...variationProps,
        start: {
            type: [Number, String],
            required: true,
        },
        end: {
            type: [Number, String],
            required: true,
        },
        duration: {
            type: Number,
            default: 500,
        },
        variation: {
            type: String,
            default: 'body',
            validator: validators.variation,
        },
        weight: {
            type: String,
            validator: validators.weight,
        },
        color: {
            type: String,
        },
    },
    data() {
        return {
            id: String(Date.now()),
            current_from: null,
        }
    },
    computed: {
        currentTo() {
            return this.formatNumber(this.end)
        },
        currentFrom() {
            const from = `000000000${String((this.current_from ?? this.start) || 0)}`.slice(-this.currentTo.length)
            return this.formatNumber(from)
        },
        responsivePropsClasses() {
            const responsiveClasses = {}
            responsiveClasses[`mc-spin-number--variation-${this.variation}`] = this.variation
            responsiveClasses[`mc-spin-number--weight`] = !!true.weight
            values.forEach(value => {
                sizes.forEach(size => {
                    const sizeValue = this[`${value}${_upperFirst(size)}`]
                    responsiveClasses[`mc-spin-number--${value}-${size}-${sizeValue}`] = sizeValue
                })
            })
            const currentClasses = Object.entries(responsiveClasses)
                .filter(([, value]) => value)
                .map(([key]) => key)
            return ['mc-spin-number', ...currentClasses]
        },
        containerStyles() {
            return {
                '--mc-spin-number-color': `var(--color-${this.color}, var(--color-black))`,
                '--mc-spin-number-weight': `var(--font-weight-${this.weight}, var(--font-weight-normal))`,
            }
        },
    },
    methods: {
        actualizeNumbers() {
            this.current_from = this.end
        },
        formatNumber(num) {
            return String(num)
                .split('')
                .map(n => (/\d/.test(n) ? +n : n))
        },
    },
}
</script>

<style lang="scss">
@import '../../tokens/font-sizes';
@import '../../tokens/line-heights';
@import '../../tokens/colors';
@import '../../tokens/font-families';
@import '../../tokens/font-weights';
@import '../../tokens/media-queries';

.mc-spin-number {
    $block-name: &;

    @each $key, $value in $token-colors {
        --color-#{$key}: #{$value};
    }
    @each $key, $value in $token-font-weights {
        --font-weight-#{$key}: #{$value};
    }
    --mc-spin-number-color: var(--color-black);
    --mc-spin-number-weight: var(--font-weight-normal);

    @mixin variations() {
        font-family: $font-family-main;
        &-h1 {
            font-size: $font-size-700;
            line-height: $line-height-600;
            font-weight: $font-weight-semi-bold;
        }
        &-h2 {
            font-size: $font-size-600;
            line-height: $line-height-500;
            font-weight: $font-weight-semi-bold;
        }
        &-h3 {
            font-size: $font-size-500;
            line-height: $line-height-400;
            font-weight: $font-weight-semi-bold;
        }
        &-h4 {
            font-size: $font-size-400;
            line-height: $line-height-300;
            font-weight: $font-weight-bold;
        }

        &-subtitle {
            font-size: $font-size-300;
            line-height: $line-height-250;
        }
        &-article {
            font-size: $font-size-200;
            line-height: $line-height-250;
        }
        &-info {
            font-size: $font-size-300;
            line-height: $line-height-300;
        }
        &-body {
            font-size: $font-size-200;
            line-height: $line-height-200;
        }
        &-overline {
            font-size: $font-size-100;
            line-height: $line-height-150;
            font-weight: $font-weight-medium;
        }
    }

    display: flex;
    align-items: center;
    justify-content: center;
    font-family: $font-family-main;
    line-height: 1;
    color: var(--mc-spin-number-color);

    &--variation {
        @include variations;
    }
    &--weight {
        font-weight: var(--mc-spin-number-weight);
    }

    &__non-digit {
        display: inline-flex;
        min-width: 0.1em;
        font: inherit;
        color: inherit;
    }

    &-container {
        display: flex;
    }

    @each $media, $value in $token-media-queries {
        @media #{$value} {
            &--variation-#{$media} {
                @include variations;
            }
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
}
</style>
