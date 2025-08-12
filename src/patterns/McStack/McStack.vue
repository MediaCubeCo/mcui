<script>
export default {
    name: 'McStack',
    /**
     *  Количество отрисованных
     *  единиц списка
     *  или число для макс. лимита
     *  или строка "auto" для расчета по доступной ширине
     */
    props: {
        limit: {
            type: [Number, String],
            default: null,
        },
        collapsed: {
            type: Boolean,
            default: false,
        },
    },
    data: () => ({
        children: [],
        visible_children: [],
        more: 0,
        loaded: false,
        custom_limit: 0,
        containerWidth: 0,
        counterWidth: 0,
        resizeTimeout: null,
    }),
    computed: {
        classes() {
            return {
                'mc-stack': true,
                'mc-stack--collapsed': this.collapsed,
            }
        },
        isAutoLimit() {
            return this.limit === 'auto'
        },
        counterText() {
            return `+${this.more}`
        },
        slotDefaultChildren() {
            return this.$slots.default || []
        },
    },
    mounted() {
        this.init()
    },
    beforeDestroy() {
        if (this.isAutoLimit) window.removeEventListener('resize', () => this.throttle(this.setResizeWidth))
    },
    methods: {
        throttle(method) {
            clearTimeout(this.resizeTimeout)
            this.resizeTimeout = setTimeout(() => {
                method()
                clearTimeout(this.resizeTimeout)
            }, 100) // 100ms пауза между вызовами
        },
        init() {
            this.children = this.slotDefaultChildren
            if (this.isAutoLimit) {
                window.addEventListener('resize', this.setResizeWidth)
                this.$nextTick(this.setWidth)
            } else {
                this.setFixedChildren(this.limit)
            }
            this.loaded = true
        },
        setFixedChildren(limit) {
            this.visible_children = [...this.children].splice(0, limit)
            this.more = Math.max(this.children.length - limit, 0)
        },
        setWidth() {
            this.containerWidth = this.$refs.stack?.clientWidth
            if (this.containerWidth === 0) setTimeout(() => this.calcVisibleChildren(), 1)
            else this.calcVisibleChildren()
        },
        setResizeWidth() {
            if (this.containerWidth === this.$refs.stack?.clientWidth)
                return console.warn('mc-stack container width no changed')
            else this.setWidth()
        },
        async calcVisibleChildren() {
            this.containerWidth = this.$refs.stack?.clientWidth
            if (this.containerWidth === 0) return console.warn('mc-stack container have no width')
            this.visible_children = []
            for (let key = 0; key < this.children.length; key++) {
                this.visible_children.push(this.children[key])

                await this.$nextTick() // ждём DOM

                const total = [...this.$refs['mc-stack-body'].children].reduce((a, c) => (a += c.offsetWidth + 12), 0) // 12 отступ между элементами
                if (total > this.containerWidth) {
                    this.setFixedChildren(key)
                    break
                }
            }
        },
    },
    render(h) {
        return h('div', { ref: 'stack', class: `mc-stack` }, [
            h(
                'div',
                {
                    ref: 'mc-stack-body',
                    class: 'mc-stack__body',
                    directives: [{ name: 'show', value: this.loaded }],
                },
                this.visible_children,
            ),
            this.more ? h('div', { ref: 'counter', class: 'mc-stack__counter' }, [this.counterText]) : null,
        ])
    },
}
</script>

<style lang="scss">
@import '../../styles/mixins';
@import '../../tokens/font-families';

.mc-stack {
    $block-name: &;

    position: relative;
    @include reset-text-indents();
    display: flex;
    align-items: center;
    flex-wrap: nowrap;

    &__hidden {
        opacity: 0;
        visibility: hidden;
        position: absolute;
    }

    &__visible {
        opacity: 1;
        visibility: visible;
        position: relative;
    }

    &--collapsed {
        #{$block-name}__body {
            @include child-indent-right(-$space-200);

            > * {
                border: 2px solid $color-white;
            }
        }
    }

    &__body {
        min-width: 0;
        overflow: hidden;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        @include child-indent-right($space-150);

        > * {
            justify-content: center;
        }
    }

    &__counter {
        width: auto;
        position: sticky;
        right: 0;
        margin-inline-start: $space-50;
        flex: 0 0 auto;
        font-size: $font-size-200;
        line-height: $line-height-200;
        color: $color-gray;
        font-weight: $font-weight-semi-bold;
        font-family: $font-family-main;
    }
}
</style>
