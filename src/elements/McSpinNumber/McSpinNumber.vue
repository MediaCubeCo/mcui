<template>
    <div :id="id" class="mc-spin-number-container">
        <div
            v-for="(digit, i) in currentTo"
            :key="`mc-spin-number-${id}-${i}`"
            :class="containerStyles.classes"
            :style="containerStyles.variables"
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
                :duration="duration"
                :font-size="size"
                :color="color"
                :weight="weight"
                class="mc-spin-number__digit"
                @spin-end="actualizeNumbers"
            />
        </div>
    </div>
</template>

<script>
import McSpinDigit from '../McSpinDigit/McSpinDigit'
const values = ['size', 'weight']
const validators = {
    size: v => ['100', '200', '300', '400', '500', '600', '700'].includes(v),
    weight: v => ['normal', 'medium', 'semi-bold', 'bold'].includes(v),
}

const sizes = ['xs', 's', 'm', 'l', 'xl']
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
        size: {
            type: String,
            default: '300',
            validator: validators.size,
        },
        weight: {
            type: String,
            default: 'normal',
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
        containerStyles() {
            const classes = {
                'mc-spin-number': true,
            }
            const variables = {
                '--mc-spin-number-font-size': `var(--font-size-${this.size}, var(--font-size-300))`,
                '--mc-spin-number-font-color': `var(--color-${this.color}, var(--color-black))`,
                '--mc-spin-number-font-weight': `var(--font-weight-${this.weight}, var(--font-weight-normal))`,
            }
            Object.entries(this.$props).forEach(([key, value]) => {
                if (key.startsWith('size') && key !== 'size' && value) {
                    const suffix = key.replace('size', '').toLowerCase()
                    value && (variables[`--mc-spin-number-font-size-${suffix}`] = `var(--font-size-${value})`)
                    classes[`mc-spin-number--size-${suffix}`] = true
                }
            })
            return {
                classes,
                variables,
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
@import '../../tokens/colors';
@import '../../tokens/font-families';
@import '../../tokens/font-weights';
@import '../../tokens/media-queries';

.mc-spin-number {
    $block-name: &;

    @each $key, $value in $token-font-sizes {
        --font-size-#{$key}: #{$value};
    }
    @each $key, $value in $token-colors {
        --color-#{$key}: #{$value};
    }
    @each $key, $value in $token-font-weights {
        --font-weight-#{$key}: #{$value};
    }
    --mc-spin-number-font-size: var(--font-size-300);
    --mc-spin-number-font-color: var(--color-black);
    --mc-spin-number-font-weight: var(--font-weight-normal);

    display: flex;
    align-items: center;
    justify-content: center;
    font-family: $font-family-main;
    font-size: var(--mc-spin-number-font-size);
    font-weight: var(--mc-spin-number-font-weight);
    line-height: 1;
    color: var(--mc-spin-number-font-color);

    &__non-digit {
        display: inline-flex;
        min-width: 0.1em;
        font-family: inherit;
        font-size: inherit;
        font-weight: inherit;
        color: inherit;
    }

    &-container {
        display: flex;
    }

    @each $key, $value in $token-media-queries {
        @media #{$value} {
            &--size-#{$key} {
                font-size: var(--mc-spin-number-font-size-#{$key}, var(--mc-spin-number-font-size));
            }
        }
    }
}
</style>
