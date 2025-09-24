<template>
    <div :id="id" class="mc-spin-number-container">
        <div v-for="(digit, i) in currentTo" :key="`mc-spin-number-${id}-${i}-${end}`" class="mc-spin-number">
            <template v-if="!Number.isFinite(digit)">
                <span :style="nonDigitStyles" class="mc-spin-number__non-digit">
                    {{ currentTo[i] }}
                </span>
            </template>
            <mc-spin-digit
                v-else
                :start="+currentFrom[i]"
                :end="+currentTo[i]"
                :duration="duration"
                :font-size="fontSize"
                :color="color"
                class="mc-spin-number__digit"
                @spin-end="actualizeNumbers"
            />
        </div>
    </div>
</template>

<script>
import McSpinDigit from '../McSpinDigit/McSpinDigit'
export default {
    name: 'McSpinNumber',
    components: {
        McSpinDigit,
    },
    props: {
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
        fontSize: {
            type: String,
            default: '300',
            validator: v => ['100', '200', '300', '400', '500', '600', '700'].includes(v),
        },
        weight: {
            type: String,
            default: '400',
            validator: v => ['400', '500', '600', '700'].includes(v),
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
        nonDigitStyles() {
            return {
                '--mc-spin-number-font-size': `var(--font-size-${this.fontSize}, var(--font-size-300))`,
                '--mc-spin-number-font-color': `var(--color-${this.color}, var(--color-black))`,
                '--mc-spin-number-font-weight': `var(--font-weight-${this.weight}, var(--font-weight-400))`,
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

.mc-spin-number {
    $block-name: &;
    $token-font-weights: (
        '400': $font-weight-normal,
        '500': $font-weight-medium,
        '600': $font-weight-semi-bold,
        '700': $font-weight-bold,
    );
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
    --mc-spin-number-font-weight: var(--font-weight-400);

    display: flex;
    align-items: center;
    justify-content: center;

    &-container {
        display: flex;
    }
    &__non-digit {
        display: inline-flex;
        min-width: 0.32em;
        font-size: var(--mc-spin-number-font-size);
        font-weight: var(--mc-spin-number-font-weight);
        color: var(--mc-spin-number-font-color);
        line-height: 1;
    }
}
</style>
