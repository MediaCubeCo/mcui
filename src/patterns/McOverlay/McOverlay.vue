<template>
    <section :class="classes" class="mc-overlay">
        <section class="mc-overlay__spinner"></section>
    </section>
</template>

<script>
export default {
    name: 'McOverlay',
    props: {
        size: {
            type: [String, Number],
            default: 500,
        },
        backgroundColor: {
            type: String,
            default: 'white',
        },
    },
    computed: {
        classes() {
            return {
                [`mc-overlay--${this.size}`]: !!this.size,
                [`mc-overlay--${this.backgroundColor}`]: !this.transparent,
            }
        },
    },
}
</script>

<style lang="scss">
.mc-overlay {
    $block-name: &;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: $z-index-overlay-page;
    &__spinner {
        display: block;
        border: 2px solid $color-purple;
        border-left-color: transparent;
        border-radius: 50%;
        animation: rotate 1.5s infinite linear;

        width: var(--spinner-size);
        min-width: var(--spinner-size);
        height: var(--spinner-size);
        min-height: var(--spinner-size);

        @keyframes rotate {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
    }
    @each $color, $value in $token-colors {
        &--#{$color} {
            @if $color != 'transparent' {
                background-color: rgba($value, 0.85);
            } @else {
                background-color: $value;
            }
        }
    }
    @each $size, $value in $token-icon-sizes {
        &--#{$size} {
            --spinner-size: #{$value};
        }
    }
}
</style>
