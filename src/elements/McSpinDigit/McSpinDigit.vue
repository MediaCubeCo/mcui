<template>
    <div :id="id" class="mc-spin-digit-container" :style="containerStyles">
        <!-- фэйк цифра, нужно что бы устанавливать нужную ширину контейнера -->
        <span class="mc-spin-digit-container__target">{{ end }}</span>
        <div :class="computedSpinClasses" :style="digitStyles">
            <span v-for="n in 10" :key="`${id}-${start}-${end}-${n}`" class="mc-spin-digit__digit">
                {{ (n - 1 + 10) % 10 }}
            </span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'McSpinDigit',
    props: {
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
        computedSpinClasses() {
            return {
                'mc-spin-digit': true,
                'mc-spin-digit--off': !this.spin_active,
            }
        },
        digitStyles() {
            return {
                transform: `translateY(-${this.offset * 100}%)`,
            }
        },
        containerStyles() {
            return {
                '--mc-spin-digit-font-size': `var(--font-size-${this.fontSize}, var(--font-size-300))`,
                '--mc-spin-digit-font-color': `var(--color-${this.color}, var(--color-black))`,
                '--mc-spin-digit-font-weight': `var(--font-weight-${this.weight}, var(--font-weight-400))`,
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
        this.$nextTick(() => this.triggerSpin())
    },
    methods: {
        triggerSpin() {
            this.$emit('spin-start', this.start)
            this.spin_active = true
            this.$nextTick(() => {
                this.offset = this.end

                setTimeout(() => {
                    this.spin_active = false
                    this.$emit('spin-end', this.end)
                }, this.duration)
            })
        },
    },
}
</script>
<style lang="scss">
@import '../../tokens/font-sizes';
@import '../../tokens/colors';
@import '../../tokens/font-families';
@import '../../tokens/font-weights';

.mc-spin-digit-container {
    $block-name: &;
    // генерируем css переменный из токенов
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

    --mc-spin-digit-font-size: var(--font-size-300);
    --mc-spin-digit-font-color: var(--color-black);
    --mc-spin-digit-font-weight: var(--font-weight-400);

    font-family: $font-family-main;
    overflow: hidden;
    height: var(--mc-spin-digit-font-size);
    position: relative;

    &__target {
        font-size: var(--mc-spin-digit-font-size);
        visibility: hidden;
    }

    .mc-spin-digit {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        height: 100%;
        color: var(--mc-spin-digit-font-color);
        transition: transform var(--mc-spin-duration) cubic-bezier(0.4, 0, 0.2, 1);
        &--off {
            transition: none;
        }
        &__digit {
            height: var(--mc-spin-digit-font-size);
            line-height: var(--mc-spin-digit-font-size);
            font-size: var(--mc-spin-digit-font-size);
            font-weight: var(--mc-spin-digit-font-weight);
            color: var(--mc-spin-digit-font-color);
            text-align: center;
            flex-shrink: 0;
        }
    }
}
</style>
