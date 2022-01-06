<template>
    <div class="mc-table-card" :style="{ marginLeft: ml }">
        <div v-if="$slots.header" class="mc-table-card__header">
            <!-- @slot Слот заголовка -->
            <slot name="header" />
        </div>
        <div class="mc-table-card__body">
            <!-- @slot Слот контента -->
            <slot />
        </div>
        <div :class="computedFooterClasses">
            <!-- @slot Слот футера -->
            <slot name="footer" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'McTableCard',
    props: {
        ml: {
            type: String,
            default: '251px',
        },
        footerBlur: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            bodyEl: null,
            body_scrolled_to_bottom: true,
        }
    },
    computed: {
        computedFooterClasses() {
            return {
                'mc-table-card__footer': this.$slots.footer,
                'mc-table-card__footer--with-blur': this.footerBlur && !this.body_scrolled_to_bottom,
            }
        },
    },
    watch: {
        footerBlur(val) {
            if (val) {
                this.initBlur()
            } else {
                this.bodyEl && this.bodyEl.removeEventListener('scroll', this.handlerScroll)
            }
        },
    },
    mounted() {
        if (this.footerBlur) {
            this.initBlur()
        }
    },
    beforeDestroy() {
        this.bodyEl && this.bodyEl.removeEventListener('scroll', this.handlerScroll)
    },
    methods: {
        initBlur() {
            try {
                this.body_scrolled_to_bottom = false
                this.bodyEl = document.querySelector('.mc-table-card__body')
                this.bodyEl && this.bodyEl.addEventListener('scroll', this.handlerScroll)
            } catch (e) {
                console.error(e)
            }
        },
        handlerScroll(e) {
            try {
                this.body_scrolled_to_bottom = e.target.offsetHeight + e.target.scrollTop === e.target.scrollHeight
            } catch (e) {
                this.body_scrolled_to_bottom = true
                console.error(e)
            }
        },
    },
}
</script>

<style lang="scss">
.mc-table-card {
    $block-name: &;

    @include position(absolute, 0);
    z-index: 10;
    background-color: $color-white;
    border-left: 1px solid $color-hover-gray;
    display: flex;
    flex-direction: column;
    @include custom-scroll();

    &__header {
        height: $size-500;
        border-bottom: 1px solid $color-hover-gray;
        flex-shrink: 0;
    }

    &__body {
        position: relative;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        min-height: 0;
        overflow-y: auto;
    }

    &__footer {
        border-top: 1px solid $color-hover-gray;
        flex-shrink: 0;
        padding: $space-200;
        @include child-indent-right($space-150);
        &:empty {
            display: none;
        }
        &--with-blur {
            position: relative;
            &::after {
                @include pseudo;
                height: $space-900;
                background: linear-gradient(to top, $color-white, transparent);
                position: absolute;
                width: 100%;
                left: 0;
                bottom: 100%;
            }
        }
    }
}
</style>
