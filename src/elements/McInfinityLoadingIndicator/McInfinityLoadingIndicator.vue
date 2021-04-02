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
            if (!value) return this.observer.disconnect()
            this.setObserver()
        },
    },
    mounted() {
        this.setObserver()
    },
    beforeDestroy() {
        this.observer.disconnect()
    },
    methods: {
        setObserver() {
            this.el = document.querySelector('#indicator')
            // создаем IntersectionObserver - смотрит за тем когда элемент попадает во viewport
            this.observer = new IntersectionObserver(([entry]) => {
                // если попадает во viewport делаем $emit
                if (entry.intersectionRatio !== 0) {
                    return this.$emit('loading')
                } else return this.$emit('hide')
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
