<template>
    <div :id="id" :class="containerClasses" :style="containerStyles">
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
import classAndStyleMixin from '../../mixins/classAndStyleMixin'

export default {
    name: 'McSpinDigit',
    mixins: [classAndStyleMixin],
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
        containerClasses() {
            return this.getClassNames('mc-spin-digit-container', this.$props)
        },
        containerStyles() {
            return {
                '--mc-spin-duration': `${this.duration}ms`,
                ...this.getStyles('mc-spin-digit', this.$props),
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
@import '../../styles/mixins';

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

    position: relative;
    height: 1em;
    font-family: $font-family-main;
    font-size: inherit;
    font-weight: var(--mc-spin-digit-weight);
    color: var(--mc-spin-digit-color);
    line-height: 1;
    overflow: hidden;

    &--variation {
        @include variations-title;
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
    @include responsive-variations-title;
}
</style>
