<template>
    <div ref="stack" class="mc-stack">
        <div v-show="loaded" ref="mc-stack-body" class="mc-stack__body">
            <slot />
        </div>
        <div v-if="more" ref="counter" class="mc-stack__counter">
            {{ counterText }}
        </div>
    </div>
</template>

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
        children: null,
        more: 0,
        loaded: false,
        custom_limit: 0,
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
    },
    mounted() {
        this.init()
    },
    beforeDestroy() {
        if (this.isAutoLimit) window.removeEventListener('resize', this.calcLimit)
    },
    methods: {
        init() {
            if (this.isAutoLimit) {
                window.addEventListener('resize', this.calcLimit)
                // setTimeout из-за случаев, когда элемент рендерится с 0 шириной, а потом она устанавливается динамически
                setTimeout(() => this.calcLimit(), 1)
            } else {
                this.toggleChilds(true, this.limit)
            }
        },
        calcLimit(showAll, limit) {
            if (showAll) this.toggleChilds()
            this.custom_limit = Infinity
            let childWidth = 0
            // ширина родителя без учета счетчика
            const parentWidth = +this.$refs.stack?.clientWidth - (+this.$refs.counter?.clientWidth || 0)
            for (let i = 0; i < this.children?.length; i++) {
                const elemStyle = window.getComputedStyle(this.children[i])
                childWidth += +this.children[i]?.clientWidth + +parseInt(elemStyle.marginRight)
                // считаем занимаемую дочерними элементами ширину, если превышает родительскую, то выходим из цикла и ставим лимит
                if (childWidth > parentWidth) {
                    this.custom_limit = i
                    break
                }
            }
            // Сравниваем переданный лимит с заново выставленным, если они не равны, то ререндерим потомков
            if (this.custom_limit !== limit) this.toggleChilds(true, this.custom_limit)
        },
        setStyles(elem, opacity = 1, visibility = 'visible', position = 'relative') {
            elem.style.opacity = opacity
            elem.style.visibility = visibility
            elem.style.position = position
        },
        toggleChilds(hide, limit = 0) {
            this.loaded = true
            this.more = 0
            this.children = this.$refs?.['mc-stack-body']?.children
            let elementsLimit = hide ? limit - 1 : this.children.length
            for (let i = 0; i < this.children?.length; i++) {
                this.setStyles(this.children[i])
                if (i > elementsLimit) {
                    this.setStyles(this.children[i], 0, 'hidden', 'absolute')
                    this.more++
                }
            }
            // Передаем в $nextTick лимит для пересчета, т.к. рендерится counter, который занимает доп место и обрезает элементы
            if (hide && this.isAutoLimit) this.$nextTick(() => this.calcLimit(false, limit))
        },
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
