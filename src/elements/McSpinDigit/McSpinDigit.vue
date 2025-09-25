<template>
    <div :id="id" :class="containerStyles.classes" :style="containerStyles.variables">
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
        containerStyles() {
            const classes = {
                'mc-spin-digit-container': true,
            }
            const variables = {
                '--mc-spin-digit-font-size': `var(--font-size-${this.size}, var(--font-size-300))`,
                '--mc-spin-digit-font-color': `var(--color-${this.color}, var(--color-black))`,
                '--mc-spin-digit-font-weight': `var(--font-weight-${this.weight}, var(--font-weight-normal))`,
                '--mc-spin-duration': `${this.duration}ms`,
            }
            Object.entries(this.$props).forEach(([key, value]) => {
                if (key.startsWith('size') && key !== 'size' && value) {
                    const suffix = key.replace('size', '').toLowerCase()
                    value && (variables[`--mc-spin-digit-font-size-${suffix}`] = `var(--font-size-${value})`)
                    classes[`mc-spin-digit-container--size-${suffix}`] = true
                }
            })
            return {
                classes,
                variables,
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
@import '../../tokens/colors';
@import '../../tokens/font-families';
@import '../../tokens/font-weights';
@import '../../tokens/media-queries';

.mc-spin-digit-container {
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

    --mc-spin-digit-font-size: var(--font-size-300);
    --mc-spin-digit-font-color: var(--color-black);
    --mc-spin-digit-font-weight: var(--font-weight-normal);

    font-family: $font-family-main;
    font-size: var(--mc-spin-digit-font-size);
    font-weight: var(--mc-spin-digit-font-weight);
    color: var(--mc-spin-digit-font-color);
    overflow: hidden;
    height: 1em;
    position: relative;
    line-height: 1;

    &__target {
        font-size: inherit;
        font-weight: inherit;
        color: inherit;
        visibility: hidden;
    }

    .mc-spin-digit {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        height: 100%;
        color: inherit;
        will-change: transform;
        transition: transform var(--mc-spin-duration) cubic-bezier(0.4, 0, 0.2, 1);

        &__digit {
            height: 1em;
            line-height: 1em;
            font-size: inherit;
            font-weight: inherit;
            color: inherit;
            text-align: center;
            flex-shrink: 0;
        }
    }

    @each $key, $value in $token-media-queries {
        @media #{$value} {
            &--size-#{$key} {
                font-size: var(--mc-spin-digit-font-size-#{$key}, var(--mc-spin-digit-font-size));
            }
        }
    }
}
</style>
