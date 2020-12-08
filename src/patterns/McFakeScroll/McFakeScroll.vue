<template>
    <div ref="main" class="mc-fake-scroll">
        <div class="mc-fake-scroll__main">
            <slot />
        </div>
        <div v-if="hasScroll" ref="track" class="mc-fake-scroll__track">
            <div
                ref="thumb"
                class="mc-fake-scroll__thumb"
                :style="thumbStyles"
                @mousedown="onFakeScrollBarMouseDown"
            ></div>
        </div>
    </div>
    <!--  <div v-else class="fake-scroll">-->
    <!--    <div class="fake-scroll__main">-->
    <!--      <div ref="content" class="mc-main__content">-->
    <!--        &lt;!&ndash; @slot Слот контента &ndash;&gt;-->
    <!--        <slot />-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    <div v-if="hasScroll" ref="track" class="fake-scroll__track">-->
    <!--      <div-->
    <!--          ref="thumb"-->
    <!--          class="fake-scroll__thumb"-->
    <!--          :style="thumbStyles"-->
    <!--          @mousedown="onFakeScrollBarMouseDown"-->
    <!--      ></div>-->
    <!--    </div>-->
    <!--  </div>-->
</template>

<script>
export default {
    name: 'McFakeScroll',
    data() {
        return {
            content: null,
            hasScroll: false,
            thumbBox: null,
            trackBox: null,
            dragOptions: {
                startClientPos: 0,
                distance: 0,
                mouseIsDown: false,
            },
        }
    },
    computed: {
        thumbStyles() {
            this.content = this.getContentEl()
            return {
                height: `${this.content.clientHeight * this.scrollRatio}px`,
            }
        },
        scrollRatio() {
            this.content = this.getContentEl()
            console.log(this.content.scrollHeight)
            return Math.min(this.content.clientHeight / this.content.scrollHeight, 1.0)
        },
    },
    watch: {
        $route: {
            handler(val, old) {
                // this.checkScroll()
            },
            deep: true,
        },
    },
    mounted() {
        // const content = this.$refs.content
        this.content = this.getContentEl()
        if (this.content) {
            this.content.addEventListener('scroll', this.onFakeScrollBarContentScroll)
        }

        this.resize()
        window.addEventListener('resize', this.resize)

        document.documentElement.addEventListener('mousemove', this.onFakeScrollBarMouseMove)
        document.documentElement.addEventListener('mouseup', this.onFakeScrollBarMouseUp)
    },

    beforeDestroy() {
        this.content && this.content.removeEventListener('scroll', this.onFakeScrollBarContentScroll)
        document.documentElement.removeEventListener('mousemove', this.onFakeScrollBarMouseMove)
        document.documentElement.removeEventListener('mouseup', this.onFakeScrollBarMouseUp)

        window.removeEventListener('resize', this.resize)
    },
    methods: {
        resize() {
            this.checkScroll()
        },

        getContentEl() {
            return this.$refs.main.querySelector('.mc-fake-scroll__main > *')
        },

        checkScroll() {
            this.hasScroll = false
            this.content = this.getContentEl()
            if (this.content) {
                this.hasScroll = this.content.clientHeight < this.content.scrollHeight
            }
        },
        onFakeScrollBarMouseDown(e) {
            this.dragOptions.startClientPos = e.clientY
            this.dragOptions.mouseIsDown = true
            this.setBoxes()
        },
        setBoxes() {
            this.thumbBox = this.$refs.thumb && this.$refs.thumb.getBoundingClientRect()
            this.trackBox = this.$refs.thumb && this.$refs.track.getBoundingClientRect()
        },
        onFakeScrollBarMouseMove(e) {
            if (!this.dragOptions.mouseIsDown) return

            this.dragOptions.distance = e.clientY - this.dragOptions.startClientPos

            let calculateTopPos = this.thumbBox.top + this.dragOptions.distance
            if (calculateTopPos < this.trackBox.top) {
                this.$refs.thumb.style.top = '0px'
            } else if (calculateTopPos + this.thumbBox.height > this.trackBox.bottom) {
                this.$refs.thumb.style.top = `${this.trackBox.bottom - this.thumbBox.height}px`
            } else {
                this.$refs.thumb.style.top = `${calculateTopPos}px`
                this.content.scrollTo(0, calculateTopPos / this.scrollRatio)
            }
        },
        onFakeScrollBarMouseUp() {
            this.dragOptions.mouseIsDown = false
        },
        onFakeScrollBarContentScroll(e) {
            if (this.dragOptions.mouseIsDown) return
            this.setBoxes()
            const topPos = e.target.scrollTop

            if (topPos + this.thumbBox.height > this.trackBox.bottom) {
                this.$refs.thumb.style.top = `${this.trackBox.bottom - this.thumbBox.height}px`
            } else {
                this.$refs.thumb.style.top = `${e.target.scrollTop}px`
            }
        },
    },
}
</script>

<style lang="scss">
.mc-fake-scroll {
    //$block-name: &;
    .mc-fake-scroll__main {
        > * {
            @include hide-scrollbar(); // or for slot default
        }
    }
    position: relative;
    &__track {
        @include position(absolute, 0 -20px 0 null);
        //width: 0;
        width: 20px;
        //opacity: 0;
        opacity: 1;
        right: 0;
        background-color: #0c9a9a;
        z-index: 101;
        display: block;
    }
    &__thumb {
        @include position(absolute, 0 1px null 1px);
        background-color: lightblue;
        height: 200px;
        border-radius: $radius-100;
    }
    &:hover {
        //#{$block-name}__track {
        .mc-fake-scroll__track {
            right: 0;
            width: 20px;
            opacity: 0.8;
        }
    }
}
</style>
