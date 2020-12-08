<template>
    <div class="mc-main">
        <div v-if="$slots['left-bar']" class="mc-main__left">
            <!-- @slot Слот сайдбара -->
            <slot name="left-bar" />
        </div>
        <div class="mc-main__right">
            <!-- @slot Слот хедера -->
            <slot name="top-bar" />
            <div v-if="!fakeScroll" class="mc-main__content-wrapper">
                <div class="mc-main__content">
                    <!-- @slot Слот контента -->
                    <slot />
                </div>
            </div>
            <mc-fake-scroll v-else ref="fake-scroll" visible="l-down">
                <div class="mc-main__content">
                    <!-- @slot Слот контента -->
                    <slot />
                </div>
            </mc-fake-scroll>
        </div>
        <slot name="includes" />
    </div>
</template>

<script>
import McFakeScroll from '../../../patterns/McFakeScroll/McFakeScroll'
/**
 * Используется для вёрстки основных страниц
 * на проектах
 */
export default {
    name: 'McMain',
    components: { McFakeScroll },
    props: {
        fakeScroll: {
            type: Boolean,
            default: false,
        },
        routeKey: {
            type: [Number, String],
            default: '',
        },
    },

    watch: {
        routeKey() {
            if (this.$refs['fake-scroll']) {
                this.$refs['fake-scroll'].updateData()
            }
        },
    },

    mounted() {
        this.vhFix()
        window.addEventListener('resize', this.vhFix)
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.vhFix)
    },
    methods: {
        vhFix() {
            const vh = window.innerHeight * 0.01
            document.documentElement.style.setProperty('--vh', `${vh}px`)
        },
    },
}
</script>

<style lang="scss">
@import '../../../styles/toast';
@import '../../../styles/global';
.mc-main {
    $block-name: &;

    display: flex;
    height: calc(var(--vh, 1vh) * 100);
    @include custom-scroll();

    &__left {
        display: flex;
    }

    &__right {
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;
    }
    &__content {
        @include position(absolute, 0);
        overflow-y: auto;
        &-wrapper {
            flex: 1 1 auto;
            position: relative;
        }
    }

    .mc-fake-scroll {
        display: flex;
        flex: 1 1 auto;
        .mc-fake-scroll__main {
            display: flex;
            flex: 1 1 auto;
        }
    }
}
</style>
