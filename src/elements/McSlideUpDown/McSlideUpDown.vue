<script>
/**
 * Используется исключительно для mc-collapse
 */
export default {
    name: 'McSlideUpDown',
    props: {
        /*
         * Состояние
         */
        active: {
            type: Boolean,
            default: false,
        },
        /*
         * Продолжительность тоггла
         */
        duration: {
            type: Number,
            default: 500,
        },
        /*
         * Если нужен другой тег
         */
        tag: {
            type: String,
            default: 'div',
        },
        /*
         * Применять ли атрибут hidden
         * к элементы при закрытии
         */
        useHidden: {
            type: Boolean,
            default: true,
        },
    },

    data: () => ({
        style: {},
        initial: false,
        hidden: false,
    }),

    computed: {
        el() {
            return this.$refs.container
        },

        attrs() {
            const attrs = {
                'aria-hidden': !this.active,
                'aria-expanded': this.active,
            }

            if (this.useHidden) {
                attrs.hidden = this.hidden
            }

            return attrs
        },
    },

    watch: {
        active() {
            this.layout()
        },
    },

    mounted() {
        this.layout()
        this.initial = true
    },

    created() {
        this.hidden = !this.active
    },

    methods: {
        layout() {
            if (this.active) {
                this.hidden = false
                /**
                 * Событие перед началом открытия
                 */
                this.$emit('slide-open-start')
                if (this.initial) {
                    this.setHeight('0px', () => `${this.el.scrollHeight}px`)
                }
            } else {
                /**
                 * Событие перед началом закрытия
                 */
                this.$emit('slide-close-start')
                this.setHeight(`${this.el.scrollHeight}px`, () => '0px')
            }
        },

        asap(callback) {
            if (!this.initial) {
                callback()
            } else {
                this.$nextTick(callback)
            }
        },

        setHeight(temp, afterRelayout) {
            this.style = { height: temp }

            this.asap(() => {
                // force relayout so the animation will run
                this.__ = this.el.scrollHeight

                this.style = {
                    height: afterRelayout(),
                    overflow: 'hidden',
                    'transition-property': 'height',
                    'transition-duration': this.duration + 'ms',
                }
            })
        },

        onTransitionEnd() {
            if (this.active) {
                this.style = {}
                /**
                 * Событие после открытия
                 */
                this.$emit('slide-open-end')
            } else {
                this.style = {
                    height: '0',
                    overflow: 'hidden',
                }
                this.hidden = true
                /**
                 * Событие после закрытия
                 */
                this.$emit('slide-close-end')
            }
        },
    },

    render(h) {
        return h(
            this.tag,
            {
                style: this.style,
                attrs: this.attrs,
                ref: 'container',
                on: { transitionend: this.onTransitionEnd },
            },
            this.$slots.default,
        )
    },
}
</script>
