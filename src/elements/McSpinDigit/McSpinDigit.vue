<template>
    <div :id="id" :class="responsivePropsClasses" :style="containerStyles">
        <!-- фэйк цифра, нужно что бы устанавливать нужную ширину контейнера -->
        <span class="mc-spin-digit-container__target">{{ end }}</span>
        <div class="mc-spin-digit" :style="digitStyles">
            <span v-for="n in 10" :key="`${id}-${start}-${end}-${n}`" class="mc-spin-digit__digit">
                {{ (n - 1 + 10) % 10 }}
            </span>
        </div>
    </div>
</template>
<script>
import _upperFirst from 'lodash/upperFirst'

const values = ['variation', 'weight']
const validators = {
    variation: v => ['h1', 'h2', 'h3', 'h4', 'subtitle', 'body', 'overline', 'article', 'info'].includes(v),
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
    name: 'McSpinDigit',
    props: {
        ...variationProps,
        /**
         * min - 0, max - 9
         * */
        start: {
            type: Number,
            required: true,
        },
        /**
         * min - 0, max - 9
         * */
        end: {
            type: Number,
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
            default: 'black',
        },
    },
    data() {
        return {
            id: String(Date.now()),
            offset: this.start,
            spin_active: false,
        }
    },
    computed: {
        digitStyles() {
            return {
                transform: `translateY(-${this.offset * 100}%)`,
            }
        },
        responsivePropsClasses() {
            const responsiveClasses = {}
            responsiveClasses[`mc-spin-digit-container--variation-${this.variation}`] = this.variation
            responsiveClasses[`mc-spin-digit-container--weight`] = !!true.weight
            values.forEach(value => {
                sizes.forEach(size => {
                    const sizeValue = this[`${value}${_upperFirst(size)}`]
                    responsiveClasses[`mc-spin-digit-container--${value}-${size}-${sizeValue}`] = sizeValue
                })
            })
            const currentClasses = Object.entries(responsiveClasses)
                .filter(([, value]) => value)
                .map(([key]) => key)
            return ['mc-spin-digit-container', ...currentClasses]
        },
        containerStyles() {
            return {
                '--mc-spin-digit-color': `var(--color-${this.color}, var(--color-black))`,
                '--mc-spin-digit-weight': `var(--font-weight-${this.weight}, var(--font-weight-normal))`,
                '--mc-spin-duration': `${this.duration}ms`,
            }
        },
    },
    watch: {
        end: {
            handler(newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.triggerSpin()
                }
            },
        },
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            this.spin_active = false
            this.offset = this.start
            this.triggerSpin()
        },
        triggerSpin() {
            this.$emit('spin-start', this.start)
            this.spin_active = true
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    this.offset = this.end
                })
            })
            setTimeout(() => {
                this.spin_active = false
                this.$emit('spin-end', this.end)
            }, this.duration)
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

.mc-spin-digit-container {
    $block-name: &;

    @each $key, $value in $token-colors {
        --color-#{$key}: #{$value};
    }
    @each $key, $value in $token-font-weights {
        --font-weight-#{$key}: #{$value};
    }

    --mc-spin-digit-color: var(--color-black);
    --mc-spin-digit-weight: var(--font-weight-normal);

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

    position: relative;
    height: 1em;
    font-family: $font-family-main;
    font-size: inherit;
    font-weight: var(--mc-spin-digit-weight);
    color: var(--mc-spin-digit-color);
    line-height: 1;
    overflow: hidden;

    &--variation {
        @include variations;
    }
    &--weight {
        font-weight: var(--mc-spin-digit-weight);
    }

    &__target {
        visibility: hidden;
        font: inherit;
        color: inherit;
    }

    .mc-spin-digit {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        height: 100%;
        font: inherit;
        color: inherit;
        will-change: transform;
        transition: transform var(--mc-spin-duration) cubic-bezier(0.4, 0, 0.2, 1);

        &__digit {
            height: 1em;
            font: inherit;
            line-height: 1em;
            color: inherit;
            text-align: center;
            flex-shrink: 0;
        }
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
