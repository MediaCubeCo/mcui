<template>
    <div :id="id" :class="computedClasses" :style="computedStyles">
        <div v-for="(digit, i) in currentTo" :key="`mc-spin-number-${id}-${i}`" class="mc-spin-number__container">
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
                @spin-end="actualizeNumbers"
            />
        </div>
    </div>
</template>

<script>
import McSpinDigit from '../McSpinDigit/McSpinDigit'
import classAndStyleMixin from '../../mixins/classAndStyleMixin'

export default {
    name: 'McSpinNumber',
    components: {
        McSpinDigit,
    },
    mixins: [classAndStyleMixin],
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
        computedClasses() {
            return this.getClassNames('mc-spin-number', this.$props)
        },
        computedStyles() {
            return this.getStyles('mc-spin-number', this.$props)
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
@import '../../styles/mixins';

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

    display: flex;
    align-items: center;
    font-family: $font-family-main;
    font-weight: inherit;
    line-height: 1;
    color: var(--mc-spin-number-color);

    &--variation {
        @include variations-title;
    }
    &--weight {
        font-weight: var(--mc-spin-number-weight);
    }
    &__container {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    &__non-digit {
        display: inline-flex;
        min-width: 0.1em;
        font: inherit;
        color: inherit;
    }

    @each $media, $value in $token-media-queries {
        @media #{$value} {
            &--variation-#{$media} {
                @include variations-title;
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
