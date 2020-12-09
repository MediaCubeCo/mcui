<template>
    <div ref="main" :class="mainClasses">
        <div class="mc-fake-scroll__main">
            <!-- @slot Слот для <strong>одного (!)</strong> элемента со скроллом -->
            <slot />
        </div>
        <div
            ref="track"
            :class="trackClasses"
            @mousedown.stop="onFakeScrollBarTrackMouseDown"
            @click.stop="onFakeScrollBarTrackClick"
        >
            <div
                ref="thumb"
                class="mc-fake-scroll__thumb"
                :style="thumbStyles"
                @mousedown.stop="onFakeScrollBarMouseDown"
            ></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'McFakeScroll',
    props: {
        /**
         * Значение медиа-запроса (из токенов),
         * при котором скроллбар
         * будет виден всегда:
         * `xl`, `xl-down`, `l`, `l-down`, `m`, `m-down` и т.д.
         */
        visible: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            hasScroll: false,
            thumbBox: null,
            trackBox: null,
            thumbHeight: 0,
            scrollRatio: 1,
            trackIsClicked: false,
            dragOptions: {
                startClientPos: 0,
                distance: 0,
                mouseIsDown: false,
            },
        }
    },
    computed: {
        thumbStyles() {
            return {
                height: `${this.thumbHeight}px`,
            }
        },

        scrollEl() {
            return this.$slots.default ? this.$slots.default[0].elm : null
        },
        mainClasses() {
            return {
                'mc-fake-scroll': true,
                [`mc-fake-scroll--visible${this.visible && `-${this.visible}`}`]: true,
            }
        },
        trackClasses() {
            return {
                'mc-fake-scroll__track': true,
                'mc-fake-scroll__track--visible': this.hasScroll,
            }
        },
    },
    mounted() {
        this.scrollEl && this.scrollEl.addEventListener('scroll', this.onFakeScrollBarContentScroll)

        this.updateData()
        window.addEventListener('resize', this.updateData)

        document.documentElement.addEventListener('mousemove', this.onFakeScrollBarMouseMove)
        document.documentElement.addEventListener('mouseup', this.onFakeScrollBarMouseUp)
    },

    beforeDestroy() {
        this.scrollEl && this.scrollEl.removeEventListener('scroll', this.onFakeScrollBarContentScroll)
        document.documentElement.removeEventListener('mousemove', this.onFakeScrollBarMouseMove)
        document.documentElement.removeEventListener('mouseup', this.onFakeScrollBarMouseUp)

        window.removeEventListener('resize', this.updateData)
    },
    methods: {
        updateData() {
            this.checkScroll()
            this.setBoxes()
            this.setThumbHeight()
            this.setScrollRatio()
        },
        checkScroll() {
            this.hasScroll = false
            if (this.scrollEl) {
                this.hasScroll = this.scrollEl.clientHeight < this.scrollEl.scrollHeight
            }
        },
        setThumbHeight() {
            const thumbRatio = Math.min(this.scrollEl.clientHeight / this.scrollEl.scrollHeight, 1.0)
            this.thumbHeight = this.scrollEl.clientHeight * thumbRatio
            if (this.$refs.thumb) {
                this.thumbBox.height = this.$refs.thumb.getBoundingClientRect().height
            }
        },
        setScrollRatio() {
            if (this.thumbBox && this.trackBox) {
                const availableTrackWay = this.trackBox.height - this.thumbHeight
                const availableContentWay = this.scrollEl.scrollHeight - this.scrollEl.clientHeight
                this.scrollRatio = Math.min(availableTrackWay / availableContentWay, 1.0)
            }
        },
        setBoxes() {
            this.thumbBox = this.getBoxPos(this.$refs.thumb)
            this.trackBox = this.getBoxPos(this.$refs.track)
        },
        getBoxPos(el) {
            if (!el) return null
            const box = el.getBoundingClientRect()
            return {
                height: box.height,
                bottom: box.bottom,
                top: box.top + window.pageYOffset,
            }
        },

        onFakeScrollBarTrackMouseDown(e) {
            this.updateData()
            let pos = e.clientY - this.trackBox.top
            if (pos > this.trackBox.height - this.thumbBox.height * 0.5) {
                pos -= this.thumbBox.height
            } else if (pos > this.thumbBox.height * 0.5) {
                pos -= this.thumbBox.height * 0.5
            }

            this.trackIsClicked = true
            this.scrollEl.scrollTo({
                top: pos / this.scrollRatio,
                behavior: 'smooth',
            })
        },
        onFakeScrollBarTrackClick() {
            this.trackIsClicked = false
        },
        onFakeScrollBarMouseDown(e) {
            this.dragOptions.startClientPos = e.clientY
            this.dragOptions.mouseIsDown = true
            this.setBoxes()
            document.body.classList.add('no-user-select')
        },
        onFakeScrollBarMouseMove(e) {
            if (!this.dragOptions.mouseIsDown) return

            this.setThumbHeight()
            this.setScrollRatio()

            this.dragOptions.distance = e.clientY - this.dragOptions.startClientPos

            let calculateTopPos = this.thumbBox.top - this.trackBox.top + this.dragOptions.distance
            this.setThumbPos(calculateTopPos)
            this.scrollEl.scrollTo(0, calculateTopPos / this.scrollRatio)
        },
        setThumbPos(pos) {
            if (pos < 0) {
                this.$refs.thumb.style.top = '0px'
            } else if (pos + this.thumbBox.height > this.trackBox.height) {
                this.$refs.thumb.style.top = `${this.trackBox.height - this.thumbBox.height}px`
            } else {
                this.$refs.thumb.style.top = `${pos}px`
            }
        },
        onFakeScrollBarMouseUp() {
            this.dragOptions.mouseIsDown = false
            document.body.classList.remove('no-user-select')
        },
        onFakeScrollBarContentScroll(e) {
            if (this.dragOptions.mouseIsDown || this.trackIsClicked) return
            this.updateData()
            const topPos = e.target.scrollTop
            this.setThumbPos(topPos * this.scrollRatio)
        },
    },
}
</script>

<style lang="scss">
@mixin track-visibility() {
    right: 0;
    width: 5px;
    opacity: 1;
}
.mc-fake-scroll {
    $block-name: &;
    &__main {
        > * {
            @include hide-scrollbar();
        }
    }
    position: relative;
    &__track {
        @include position(absolute, 0 -5px 0 null);
        width: 0;
        opacity: 0;
        background-color: $color-transparent;
        z-index: 101;
        display: block;
    }
    &__thumb {
        @include position(absolute, 0 1px null 1px);
        background-color: $color-outline-gray;
        height: 100px;
        border-radius: $radius-100;
        &:hover,
        &:active {
            background-color: $color-gray;
        }
    }
    &:hover {
        #{$block-name}__track--visible {
            @include track-visibility();
        }
    }
    &__track--visible:active {
        @include track-visibility();
    }

    &--visible {
        #{$block-name}__track {
            @include track-visibility();
        }
        @each $name, $value in $token-media-queries {
            &-#{$name} {
                @media #{$value} {
                    #{$block-name}__track {
                        @include track-visibility();
                    }
                }
            }
        }
    }
}
.no-user-select {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}
</style>
