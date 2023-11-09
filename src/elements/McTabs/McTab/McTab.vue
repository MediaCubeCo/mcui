<template>
    <section
        v-show="isActive"
        :id="id"
        :aria-hidden="!isActive"
        class="tabs-component-panel"
        role="tabpanel"
        :href="href"
        :to="to"
    >
        <!-- @slot контента -->
        <slot v-if="visible" />
    </section>
</template>

<script>
/**
 * Смотреть McTabs
 */
export default {
    name: 'McTab',
    props: {
        /**
         *  Если нужен иной фрагмент в url после #
         *  (по умолчанию берётся из 'name')
         */
        id: {
            type: String,
            default: '',
        },
        /**
         *  Имя таба
         */
        name: {
            required: true,
        },
        /**
         *  Вставка в начало имени таба
         *  (не влияет на значение вставленное в url)
         */
        prefix: {
            type: String,
            default: '',
        },
        /**
         *  Вставка в конец имени таба
         *  (не влияет на значение вставленное в url)
         */
        suffix: {
            type: [String, Number],
            default: '',
        },
        appendCount: {
            type: Number,
            default: null,
        },
        appendCountColor: {
            type: String,
            default: 'black',
        },
        /**
         *  Отключенное состояние
         */
        isDisabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Виден ли таб
         */
        visible: {
            type: Boolean,
            default: true,
        },
        /**
         *  Классы иконки в начале
         */
        iconPrependClasses: {
            type: String,
            default: '',
        },
        /**
         *  Классы иконки в конце
         */
        iconAppendClasses: {
            type: String,
            default: '',
        },
        /**
         *  Цвет иконки в начале
         */
        iconPrependColor: {
            type: String,
            default: '',
        },
        /**
         *  Цвет иконки в конце
         */
        iconAppendColor: {
            type: String,
            default: '',
        },
        /**
         *  Если нужна ссылка внутри приложения:
         * `{name: 'test', params: { id: test.id }}`
         */
        to: {
            default: null,
        },
        /**
         *  Если нужна обычная ссылка:
         * `https://mediacube.agency/`
         */
        href: {
            type: String,
            default: '',
        },
    },
    data: () => ({
        isActive: false,
        isVisible: true,
    }),
    computed: {
        computedId() {
            return this.id ? this.id : this.name.toLowerCase().replace(/ /g, '-')
        },

        hash() {
            if (this.isDisabled) {
                return '#'
            }

            return '#' + this.computedId
        },
        computedPrefix() {
            let styles
            if (this.iconPrependClasses) styles = `--mc-tab-icon-prepend-color: var(--color-${this.iconPrependColor})`
            const classes = `${this.iconPrependClasses} tabs-component-tab__icon-prepend`
            return this.iconPrependClasses ? `<span class="${classes}" style="${styles}"></span>` : this.prefix
        },
        computedSuffix() {
            let styles
            if (this.iconAppendColor) styles = `--mc-tab-icon-append-color: var(--color-${this.iconAppendColor})`
            const classes = `${this.iconAppendClasses} tabs-component-tab__icon-append`
            return this.iconAppendClasses ? `<span class="${classes}" style="${styles}"></span>` : this.suffix
        },
        hasAppendCount() {
            return this.appendCount || this.appendCount === 0
        },
        computedTabName() {
            return (
                `${this.computedPrefix}` +
                `<span class="tabs-component-tab__tab-name" data-name="${this.name}">${this.name}</span>` +
                `${this.computedSuffix}` +
                (this.hasAppendCount
                    ? `<span class="tabs-component-tab__tab-name-append-count" style="${this.appendCountStyles}">
                            ${this.appendCount}
                        </span>`
                    : '')
            )
        },
        header() {
            return this.visible ? this.computedTabName : ''
        },
        appendCountStyles() {
            return `--mc-tab-append-count-color: var(--color-${this.appendCountColor})`
        },
    },
}
</script>

<style lang="scss">
.tabs-component-panel {
    $block-name: &;
}
.tabs-component-tab {
    &__tab {
        &-name-append-count {
            color: var(--mc-tab-append-count-color);
        }
    }
    a:empty {
        margin: 0;
        padding: 0;
    }
}
</style>
