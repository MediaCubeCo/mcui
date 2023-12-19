<template>
    <component :is="tagName" :class="wrapperClasses" class="mc-wrap-scroll__wrapper">
        <div ref="scrollContainer" :class="containerClasses" :style="containerStyles" @mousedown="onMouseDown">
            <mc-grid-row
                v-bind="containerProps"
                :style="{ 'pointer-events': drag_options.is_drag ? 'none' : 'auto' }"
                class="mc-wrap-scroll__row"
            >
                <slot />
            </mc-grid-row>
        </div>
    </component>
</template>

<script>
import McGridRow from '../McGrid/McGridRow/McGridRow'
export default {
    name: 'McWrapScroll',
    components: {
        McGridRow,
    },
    props: {
        wrap: {
            type: Boolean,
            default: false,
        },
        gutterY: {
            type: Number,
            default: 0,
        },
        gutterX: {
            type: Number,
            default: 0,
        },
        justify: {
            type: String,
        },
        scrollable: {
            type: Boolean,
            default: false,
        },
        gutterBottom: {
            type: [Number, String],
            default: null,
        },
        hasScroll: {
            type: Boolean,
            default: false,
        },
        withBlur: {
            type: Boolean,
            default: false,
        },
        moreSpace: {
            type: Boolean,
            default: false,
        },
        rtl: {
            type: Boolean,
            default: false,
        },
        scrollSpeed: {
            type: Number,
            default: 1,
        },
        tagName: {
            type: String,
            default: 'div',
        },
    },
    data: () => ({
        drag_options: {
            scroll_pos: 0,
            start_client_pos: 0,
            distance: 0,
            is_drag: false,
            mouse_is_down: false,
        },
        show_left_blur: false,
        show_right_blur: false,
        observer: null,
    }),
    computed: {
        containerProps() {
            return {
                wrap: this.wrap,
                align: 'stretch',
                gutterY: this.gutterY,
                gutterX: this.gutterX,
                justify: this.justify,
            }
        },
        containerClasses() {
            return {
                'mc-wrap-scroll': true,
                'mc-wrap-scroll--scrollable': this.scrollable,
                'mc-wrap-scroll--no-scroll': !this.hasScroll,
                'mc-wrap-scroll--more-space': this.moreSpace,
            }
        },
        containerStyles() {
            return {
                ['--mc-wrap-scroll-bottom']: `var(--space-${this.gutterBottom})`,
            }
        },
        wrapperClasses() {
            return {
                [`mc-wrap-scroll__wrapper--left-blur`]: this.withBlur && this.show_left_blur,
                [`mc-wrap-scroll__wrapper--right-blur`]: this.withBlur && this.show_right_blur,
                [`mc-wrap-scroll__wrapper--more-space`]: this.moreSpace,
            }
        },
    },
    mounted() {
        window.addEventListener('mousemove', this.onMouseMove)
        window.addEventListener('mouseup', this.onMouseUp)
        this.init()
        this.$nextTick(() => this.handlerScroll())
    },
    beforeDestroy() {
        window.removeEventListener('mousemove', this.onMouseMove)
        window.removeEventListener('mouseup', this.onMouseUp)
        this.bodyEl && this.bodyEl.removeEventListener('scroll', this.handlerScroll)
        this.observer && this.observer.disconnect()
    },
    methods: {
        init() {
            this.bodyEl = this.$refs.scrollContainer
            if (this.bodyEl) {
                this.bodyEl.addEventListener('scroll', this.handlerScroll)
                if (this.withBlur) this.createMutationObserver()
            }
        },
        handlerScroll() {
            this.$emit('content-scrolled')
            if (!this.withBlur) return
            try {
                const container_width = Math.ceil(this.bodyEl.getBoundingClientRect()?.width)
                const scroll_width = Math.ceil(this.bodyEl.scrollWidth)
                const scroll_left = Math.ceil(this.bodyEl.scrollLeft)
                // Левый блюр
                this.show_left_blur = this.rtl
                    ? scroll_width > container_width && scroll_width - 10 > Math.abs(scroll_left) + container_width
                    : scroll_left
                // Правый блюр
                this.show_right_blur = this.rtl
                    ? Math.abs(scroll_left) > 1
                    : scroll_width > container_width && scroll_width > Math.abs(scroll_left) + container_width
            } catch (e) {
                this.$errorHandler({ e })
                this.show_left_blur = false
                this.show_right_blur = false
            }
        },
        createMutationObserver() {
            try {
                this.observer = new MutationObserver(this.handlerScroll)

                const config = {
                    attributes: true,
                    childList: true,
                    subtree: true,
                }
                this.observer.observe(this.bodyEl, config)
            } catch (e) {
                this.$errorHandler(
                    {
                        e,
                    },
                    () => {
                        console.error('Error when try to create observer in McWrapScroll')
                    },
                )
            }
        },
        onMouseDown(e) {
            const dragOptions = this.drag_options
            dragOptions.start_client_pos = e.clientX
            dragOptions.mouse_is_down = true
            dragOptions.scroll_pos = this.$refs.scrollContainer.scrollLeft
            // Удалить все выделения на странице, иначе скролл "лагает" если где то на странице есть выделение
            if (window.getSelection) {
                let sel = window.getSelection()
                sel.removeAllRanges()
            }
        },
        onMouseMove(e) {
            const dragOptions = this.drag_options
            if (!dragOptions.mouse_is_down) return
            dragOptions.distance = e.clientX - dragOptions.start_client_pos
            if (Math.abs(dragOptions.distance) > 2 && !dragOptions.is_drag) {
                dragOptions.is_drag = true
            }
            if (dragOptions.is_drag) {
                this.$refs.scrollContainer.scrollTo({
                    left: dragOptions.scroll_pos - dragOptions.distance * this.scrollSpeed,
                })
            }
            Math.abs(this.scroll_pos) && (dragOptions.scroll_pos = 0)
        },
        onMouseUp() {
            this.drag_options.is_drag && (this.drag_options.is_drag = false)
            this.drag_options.mouse_is_down = false
        },
    },
}
</script>

<style lang="scss">
.mc-wrap-scroll {
    $block-name: &;
    $more-space-indent: $space-200;
    --mc-wrap-scroll-bottom: #{$space-zero};
    padding-bottom: var(--mc-wrap-scroll-bottom);
    margin-bottom: -(var(--mc-wrap-scroll-bottom));
    &.mc-wrap-scroll--scrollable {
        overflow-x: auto;
        overflow-y: hidden;
    }
    &--more-space {
        padding: $more-space-indent;
        margin: -(#{$more-space-indent});
    }
    &.mc-wrap-scroll--no-scroll {
        @include hide-scrollbar();
    }
    &__wrapper {
        position: relative;
        @mixin blur-common-styles {
            @include pseudo();
            top: 0;
            bottom: 0;
            width: $space-500;
            z-index: 2;
            pointer-events: none;
            user-select: none;
        }
        @mixin right-blur {
            background: linear-gradient(to left, #{$color-bg-gray}, rgba($color-bg-gray, 0));
        }
        @mixin left-blur {
            background: linear-gradient(to right, #{$color-bg-gray}, rgba($color-bg-gray, 0));
        }
        &--more-space {
            padding: $more-space-indent;
            margin: -(#{$more-space-indent});
            &#{$block-name}__wrapper {
                &--left-blur {
                    #{$block-name} {
                        padding-inline-start: 0;
                        margin-inline-start: 0;
                    }
                    &::before {
                        top: $more-space-indent;
                        bottom: $more-space-indent;
                        inset-inline-start: $more-space-indent;
                        @include left-blur;
                    }
                }
                &--right-blur {
                    #{$block-name} {
                        padding-right: 0;
                        margin-right: 0;
                    }
                    &::after {
                        top: $more-space-indent;
                        bottom: $more-space-indent;
                        inset-inline-end: $more-space-indent;
                        @include right-blur;
                    }
                }
            }
        }
        &--left-blur {
            &::before {
                @include blur-common-styles;
                @include left-blur;
                inset-inline-start: 0;
            }
        }
        &--right-blur {
            &::after {
                @include blur-common-styles;
                @include right-blur;
                inset-inline-end: 0;
            }
        }
    }
}
</style>
