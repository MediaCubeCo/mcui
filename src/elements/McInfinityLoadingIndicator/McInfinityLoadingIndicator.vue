<template>
    <section class="el-infinity-loading__wrapper">
        <div id="indicator" :style="styles" class="el-infinity-loading"></div>
    </section>
</template>
<script>
/**
 *  Вставляется под список, в момент когда индикатор попадает в viewport срабатывает $emit
 * **/
export default {
    name: 'ElInfinityLoading',
    props: {
        /**
         * За какое расстояние(px) инициировать $emit
         * **/
        overlap: {
            type: Number,
            default: 100,
        },
        active: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            observer: null,
            el: null,
            visible: false,
            loading: false,
        }
    },
    computed: {
        styles() {
            return {
                transform: `translateY(-${this.overlap}px)`,
            }
        },
    },
    watch: {
        active(value) {
            if (!value) {
                clearInterval(this.interval)
                return this.observer.disconnect()
            }
            this.setObserver()
            this.creteInterval()
        },
    },
    mounted() {
        this.setObserver()
        this.creteInterval()
    },
    beforeDestroy() {
        this.observer.disconnect()
        clearInterval(this.interval)
    },
    methods: {
        creteInterval() {
            this.interval = setInterval(() => this.active && this.visible && this.$emit('loading'), 1000)
        },
        setObserver() {
            this.el = document.querySelector('#indicator')
            // создаем IntersectionObserver - смотрит за тем когда элемент попадает во viewport
            this.observer = new IntersectionObserver(([entry]) => {
                // если попадает во viewport делаем $emit
                if (entry.intersectionRatio !== 0) {
                    this.visible = true
                    return this.$emit('loading')
                } else {
                    this.visible = false
                    return this.$emit('hide')
                }
            })
            // назначаем слушателя на observer
            this.observer.observe(this.el)
        },
    },
}
</script>

<style lang="scss">
.el-infinity-loading {
    $block-name: &;
    position: absolute;
    height: 1px;
    width: 100%;
    z-index: -1;
    user-select: none;
    pointer-events: none;
    background-color: transparent;
    &__wrapper {
        position: relative;
    }
}
</style>
