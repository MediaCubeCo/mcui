<template>
    <section ref="overlay" class="mc-overlay" :style="styles">
        <div class="mc-overlay__background" />
        <section class="mc-overlay__spinner" />
    </section>
</template>

<script>
export default {
    name: 'McOverlaySecond',
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
        styles() {
            return {
                '--mc-overlay-color': this.backgroundColor && `var(--color-${this.backgroundColor})`,
                '--mc-overlay-spinner-size': this.size && `var(--size-${this.size})`,
            }
        },
    },
}
</script>

<style lang="scss">
@import '../../tokens/z-indexes';
.mc-overlay {
    $block-name: &;
    --mc-overlay-spinner-size: initial;
    --mc-overlay-color: initial;
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: $z-index-overlay-page;
    &__background {
        position: absolute;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background-color: var(--mc-overlay-color);
        opacity: 0.85;
    }
    &__spinner {
        display: block;
        border: 2px solid var(--color-main);
        border-inline-start-color: transparent;
        border-radius: 50%;
        animation: rotate 1.5s infinite linear;

        width: var(--mc-overlay-spinner-size);
        min-width: var(--mc-overlay-spinner-size);
        height: var(--mc-overlay-spinner-size);
        min-height: var(--mc-overlay-spinner-size);

        @keyframes rotate {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
    }
}
</style>
