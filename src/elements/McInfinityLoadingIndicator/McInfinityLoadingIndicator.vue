<template>
    <section class="el-infinity-loading__wrapper">
        <div id="indicator" class="el-infinity-loading"></div>
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
        /**
         * Компонент в котором происходит скролл, указывается для большей точности, по дефолту используется область видимости браузера
         * **/
        root: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            observer: null,
            el: null,
            loading: false,
        }
    },
    watch: {
        active(value) {
            this.clearAllListeners()
            if (value) {
                this.setObserver()
            }
        },
    },
    mounted() {
        this.setObserver()
    },
    beforeDestroy() {
        this.clearAllListeners()
    },
    methods: {
        setObserver() {
            this.el = document.querySelector('#indicator')
            // создаем IntersectionObserver - смотрит за тем когда элемент попадает во viewport
            this.observer = new IntersectionObserver(
                ([entry]) => {
                    // если попадает во viewport делаем $emit
                    if ((entry.intersectionRatio === 1 || entry.isIntersecting) && this.active) {
                        return this.$emit('loading')
                    } else {
                        return this.$emit('hide')
                    }
                },
                {
                    ...(this.root ? { root: document.querySelector(this.root) } : {}),
                    rootMargin: `${this.overlap}px`,
                    threshold: 0.1,
                },
            )
            // назначаем слушателя на observer
            this.observer.observe(this.el)
        },
        clearAllListeners() {
            this.observer && this.observer.disconnect()
            this.observer = null
        },
    },
}
</script>

<style lang="scss">
.el-infinity-loading {
    $block-name: &;
    height: 1px;
    width: 100%;
    z-index: 999999;
    user-select: none;
    pointer-events: none;
    background-color: transparent;
    &__wrapper {
        position: relative;
    }
}
</style>
