<template>
    <div :id="id" class="mc-spin-digit-container" :style="containerStyles">
        <!-- фэйк цифра, нужно что бы устанавливать нужную ширину контейнера -->
        <span class="mc-spin-digit-container__target">{{ end }}</span>
        <div class="mc-spin-digit" :style="{ transform: `translateY(${-(offset * 10)}%)` }">
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
        },
        color: {
            type: String,
            default: 'black',
        },
    },
    data() {
        return {
            id: String(Date.now()),
            spin_active: false,
            offset: 0,
        }
    },
    computed: {
        computedColor() {
            return this.color
        },
        containerStyles() {
            return {
                '--mc-spin-digit-font-size': `var(--font-size-${this.fontSize}, var(--font-size-300))`,
                '--mc-spin-digit-font-color': `var(--color-${this.computedColor}, var(--color-black))`,
            }
        },
    },
    watch: {
        start() {
            this.triggerSpin()
        },
        end() {
            this.triggerSpin()
        },
    },
    mounted() {
        this.spinDigit()
    },
    methods: {
        // Анимация барабана
        spinDigit() {
            this.spin_active = true
            this.offset = this.start
            this.$emit('spin-start', this.start)

            const spinConfig = {
                current_frame: 0,
                total_frames: Math.floor((this.duration * 2) / 16),
                indent: this.end - this.start,
            }

            const animate = () => {
                const progress = spinConfig.indent / spinConfig.total_frames

                if (spinConfig.current_frame <= spinConfig.total_frames && this.spin_active) {
                    spinConfig.current_frame++
                    this.offset = this.offset + progress
                    requestAnimationFrame(animate)
                } else {
                    this.offset = this.end
                    this.spin_active = false
                    this.$emit('spin-end', this.end)
                }
            }
            animate()
        },
        triggerSpin() {
            this.spin_active = false
            setTimeout(() => this.spinDigit(), 1)
        },
    },
}
</script>
<style lang="scss">
@import '../../tokens/font-sizes';
@import '../../tokens/colors';
@import '../../tokens/font-families';

.mc-spin-digit-container {
    $block-name: &;
    // генерируем css переменный из токенов
    @each $key, $value in $token-font-sizes {
        --font-size-#{$key}: #{$value};
    }
    @each $key, $value in $token-colors {
        --color-#{$key}: #{$value};
    }
    --mc-spin-digit-font-size: var(--font-size-300);
    --mc-spin-digit-font-color: var(--color-black);
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
        color: var(--mc-spin-digit-font-color);
        &__digit {
            height: var(--mc-spin-digit-font-size);
            line-height: var(--mc-spin-digit-font-size);
            font-size: var(--mc-spin-digit-font-size);
            color: var(--mc-spin-digit-font-color);
            text-align: center;
        }
    }
}
</style>
