<template>
    <div :style="wrapperStyles" class="mc-table-wrapper">
        <component
            :is="tag"
            v-bind="attrs"
            v-on="$listeners"
            @scroll="handleScroll"
            @context-menu-click="contextMenuClickEvent"
        >
            <!-- Отображение скелетной загрузки -->
            <template v-if="skeletonLoad">
                <mc-table-col
                    v-for="(item, i) in columnsForFirstLoad"
                    :key="`first-load-col__${i}`"
                    :width="firstColsWidth"
                >
                    <div slot="header" class="loader loader--more-height">
                        <div class="line"></div>
                    </div>
                    <div v-if="!i" class="loader">
                        <div class="avatar"></div>
                        <div class="preview-content">
                            <div class="line"></div>
                            <div class="line"></div>
                        </div>
                    </div>
                    <div v-else class="loader">
                        <div class="line"></div>
                    </div>
                </mc-table-col>
            </template>
            <!-- @slot Слот дочерних mc-table-col -->
            <slot v-else />
            <template v-slot:empty>
                <template v-if="!$attrs.loading">
                    <div class="no_data_icon-wrapper">
                        <img :src="noDataIconSrc" alt="no table data icon" />
                    </div>
                    <mc-title text-align="center">
                        {{ placeholders.no_data }}
                    </mc-title>
                </template>
            </template>
        </component>
        <div v-if="sortLoading || $attrs.loading" :class="footerClasses" class="mc-table-wrapper__footer">
            <div v-if="footerInfo !== 'total'" class="mc-table-wrapper__tint"></div>
            <div v-if="($attrs.loading && scrollIsBottom) || sortLoading" class="mc-table-wrapper__loading">
                <mc-svg-icon class="mc-table-wrapper__load-icon" name="loader" />
                <mc-title color="outline-gray">{{ placeholders.loading }}</mc-title>
            </div>
        </div>
    </div>
</template>

<script>
import noTableDataIcon from '../../../assets/img/no_table_data.png'
import _throttle from 'lodash/throttle'
import _isEmpty from 'lodash/isEmpty'
import numeral from 'numeral'

import McTitle from '../../../elements/McTitle/McTitle'
import McSvgIcon from '../../../elements/McSvgIcon/McSvgIcon'
import McTableCol from '../McTableCol/McTableCol'

/**
 *  More info: https://xuliangzhan.com/vxe-table, https://xuliangzhan.github.io/vxe-table
 */
export default {
    name: 'McTable',
    components: {
        McTitle,
        McSvgIcon,
        McTableCol,
    },
    provide() {
        const provideData = {}
        const properties = [
            'canShowLoader',
            'cardIsOpen',
            'placeholders',
            'nativeSort',
            'sortedBy',
            'sortedDescending',
            'footerInfo',
        ]
        properties.forEach(property => {
            Object.defineProperty(provideData, property, {
                enumerable: true,
                get: () => this[property],
            })
        })
        return { provideData }
    },
    props: {
        items: {
            type: Array,
            required: true,
        },
        /**
         *  Есть ли ещё данные для подгрузки
         */
        hasMore: {
            type: Boolean,
            default: false,
        },
        /**
         *  Будет ли иметь таблица
         *  собственный скролл
         */
        scrollable: {
            type: Boolean,
            default: false,
        },
        /**
         *  Сортировка таблицей, без api
         */
        nativeSort: {
            type: Boolean,
            default: false,
        },
        /**
         *  Тип таблицы:
         *  `table, grid`
         */
        componentTag: {
            type: String,
            default: 'table',
        },
        /**
         *  Кастомное контекстное
         *  меню
         */
        contextMenu: {
            type: Boolean,
            default: false,
        },
        /**
         *  Переводы локализаций
         */
        placeholders: {
            type: Object,
            default() {
                return {
                    no_data: 'No data',
                    loading: 'Loading...',
                    all_loaded: 'All loaded',
                    total: 'Total',
                    menu: {
                        copy: 'Copy cell value',
                        open_in_new_tab: 'Open in new tab',
                        open_in_new_window: 'Open in new window',
                    },
                }
            },
        },
        sortLoading: {
            type: Boolean,
            default: false,
        },
        /**
         *  По какому столбцу
         *  выполнена сортировка
         */
        sortedBy: {
            type: String,
            required: false,
        },
        /**
         *  По убыванию ли
         *  отсортировано
         */
        sortedDescending: {
            type: Boolean,
            default: false,
        },
        /**
         *  Если нужен иной порядок сортировки
         */
        sortOrders: {
            type: Array,
            default() {
                return ['asc', 'desc', null]
            },
        },
        /**
         *  Параметры виртуального скролла:
         *  `gt: 0 - всегда включён`; `-1 - всегда выключен`;
         *  число (строк), сверх которого включается виртуальный скролл
         */
        scrollY: {
            type: Object,
            default() {
                return {
                    gt: 0,
                }
            },
        },
        /**
         *  Если нужно отразить
         *  информацию в футере:
         *  `total` - инфо под каждой колонкой,
         *  `loaded` - данные загружены,
         *   пустая строка - не отображать данные
         */
        footerInfo: {
            type: String,
            default: '',
        },
        /**
         *  Если нужно отразить
         *  сумму значений в футере
         *  если ключ содержит слово `count` значит формат только по целым числам, остальные будут с дробями
         */
        totalFooter: {
            type: Object,
            default: () => {},
        },
        /**
         *  Если нужно переносить
         *  слова в хедере
         */
        headerBreakWord: {
            type: Boolean,
            default: false,
        },
        /**
         *  Кол-во строк таблицы
         *  за которое начнется подгрузка данных
         */
        rowsToStartLoad: {
            type: Number,
            default: 0,
        },
        /**
         *  Путь до изображения
         *
         */
        noDataIconSrc: {
            type: String,
            default: noTableDataIcon,
        },
        /**
         *  Отрисовка всей таблицы и полоса загрузки в каждой ячейке (скелетная загрузка)
         *
         */
        skeletonLoad: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            observer: null,
            cardIsOpen: false,
            firstColsWidth: 253,
            hasHorizontalScroll: false,
            scrollIsBottom: false,
        }
    },
    computed: {
        api() {
            return this.$refs.xTable
        },
        attrs() {
            const attrs = {
                ref: 'xTable',
                'context-menu': this.tableMenu,
                class: this.classes,
                'sync-resize': this.cardIsOpen,
                'scroll-y': this.scrollY,
                'show-footer': this.canShowFooter,
                'footer-method': this.footerMethod,
                'sort-config': {
                    remote: !this.nativeSort,
                    showIcon: false,
                    trigger: 'cell',
                    orders: this.sortOrders,
                },
                'tooltip-config': {
                    theme: 'mcui-black',
                },
                'row-id': 'id',
                'highlight-hover-row': !this.skeletonLoad,
                'highlight-current-row': true,
                'show-header-overflow': 'tooltip',
                'show-overflow': 'tooltip',
                'show-footer-overflow': 'tooltip',
                'auto-resize': true,
                ...this.$attrs,
            }
            if ('loading' in attrs) {
                delete attrs.loading
            }
            return attrs
        },
        canShowLoader() {
            return !this.scrollable && this.hasMore
        },
        canShowFooter() {
            if (this.scrollable) {
                switch (this.footerInfo) {
                    case 'total':
                        return !this.cardIsOpen
                    case 'loaded':
                        return !this.hasMore && !this.$attrs.loading && !!this.items.length
                    default:
                        return false
                }
            }
            return !!this.items.length
        },
        tag() {
            return `vxe-${this.componentTag}`
        },
        classes() {
            return {
                'mc-table': true,
                'mc-table--open-card': this.cardIsOpen,
                'mc-table--clickable': this.$listeners['cell-click'],
                'mc-table--header-break-word': this.headerBreakWord,
            }
        },
        wrapperStyles() {
            return {
                width: this.cardIsOpen ? `${this.firstColsWidth}px` : 'auto',
                height: this.$attrs.height ? this.getFixedHeight(this.$attrs.height) : 'auto',
                'max-height': this.$attrs['max-height'] ? this.getFixedHeight(this.$attrs['max-height']) : 'none',
            }
        },
        footerClasses() {
            return {
                'mc-table-wrapper__footer--indent-bottom': this.hasHorizontalScroll,
            }
        },
        tableMenu() {
            const menu = {
                className: 'mc-table__context-menu',
                body: {
                    options: [
                        [{ code: 'copy', name: this.placeholders.menu.copy }],
                        [
                            {
                                code: 'openInNewTab',
                                name: this.placeholders.menu.open_in_new_tab,
                            },
                        ],
                        [
                            {
                                code: 'openInNewWindow',
                                name: this.placeholders.menu.open_in_new_window,
                            },
                        ],
                    ],
                },
            }
            return this.$listeners['cell-click'] && this.contextMenu ? menu : false
        },
        columnsForFirstLoad() {
            return new Array(20).fill('MCN')
        },
    },
    watch: {
        canShowFooter(newValue) {
            newValue && this.updateData()
        },
        totalFooter: {
            handler: async function(newVal) {
                newVal && (await this.loadData())
            },
            deep: true,
        },
        items: {
            handler: async function(newVal) {
                newVal && (await this.loadData())
                newVal && (await this.setFirstColsWidth())
            },
            deep: true,
        },
        cardIsOpen(newVal) {
            this.toggleColumns(newVal)
        },
        '$attrs.loading'() {
            this.checkHorizontalScroll()
        },
    },
    async mounted() {
        await this.loadData()
        !this.scrollable && this.createObserver()
        await this.setFirstColsWidth()
        window.addEventListener('resize', this.checkHorizontalScroll)
    },
    beforeDestroy() {
        this.observer && this.observer.disconnect()
        window.removeEventListener('resize', this.checkHorizontalScroll)
    },
    methods: {
        async loadData() {
            if (this.skeletonLoad) {
                await this.$refs.xTable.loadData(this.columnsForFirstLoad.map(i => ({ i })))
            } else {
                await this.$refs.xTable.loadData(this.items)
            }
            !this.scrollable && this.setObserveElement()
        },
        reloadData() {
            this.$refs.xTable.reloadData(this.items)
        },
        updateData() {
            this.$refs.xTable.updateData()
        },
        footerMethod({ columns, data }) {
            return [
                columns.map(column => {
                    if (column.type === 'seq') return data.length
                    if (column.type === 'checkbox') return ' '
                    if (this.footerInfo === 'total' && !_isEmpty(this.totalFooter)) {
                        const info = Object.entries(this.totalFooter).find(([key]) => key === column.property)
                        if (!info) return null
                        let parsedVal = parseFloat(info[1])
                        if (!parsedVal && parsedVal !== 0) return '—'
                        const format = !info[0].match('count') ? '0,0.00' : '0,0'
                        return numeral(parsedVal)
                            .format(format)
                            .replace(/,/g, ' ')
                    }
                    return null
                }),
            ]
        },
        handleScroll: _throttle(function({ scrollTop, $event, type, isY, $table }) {
            const bottomPos = Math.ceil($event.target.scrollHeight - $event.target.clientHeight)
            const isLoadArea = bottomPos - scrollTop <= $table._data.rowHeight * this.rowsToStartLoad
            this.scrollIsBottom = scrollTop / bottomPos > 0.95
            if (isLoadArea && !this.$attrs.loading && this.hasMore && type === 'body' && isY) {
                this.load()
            }
        }, 200),
        load() {
            /**
             * Событие по подгрузке данных
             * (infinity-loading)
             */
            this.$emit('load')
        },
        createObserver() {
            this.observer = new IntersectionObserver(
                entries => {
                    const entry = entries[0]
                    if (entry.isIntersecting) {
                        this.load()
                    }
                },
                { threshold: 0.1 },
            )
            this.setObserveElement()
        },
        setObserveElement() {
            const loader = this.$refs.xTable.$el.getElementsByClassName('mc-table-col__loader')
            this.observer && loader.length && this.observer.observe(loader[0])
        },
        async setFirstColsWidth() {
            const columns = await this.$refs.xTable.getColumns()
            const leftFixedColumnsWidth = columns.reduce((sum, curr) => {
                if (curr.fixed === 'left') {
                    return sum + Number(curr.width || curr.minWidth)
                }
                return sum
            }, 0)
            if (leftFixedColumnsWidth) {
                this.firstColsWidth = leftFixedColumnsWidth + 5 // 5 - ширина скролла
            }
        },
        async toggleColumns(val) {
            if (val) {
                const columns = await this.$refs.xTable.getColumns()
                const hideColumns = columns.filter(col => col.fixed !== 'left')
                hideColumns.forEach(col => (col.visible = false))
                await this.$refs.xTable.refreshColumn()
            } else {
                await this.$refs.xTable.resetColumn()
            }
            await this.$refs.xTable.recalculate()
            await this.$refs.xTable.syncData()
            this.checkHorizontalScroll()
        },
        getFixedHeight(val) {
            return !this.hasMore ? `calc(${val} - 1px)` : val
        },
        contextMenuClickEvent({ menu, row, column }) {
            switch (menu.code) {
                case 'copy': //при необходимости использования _XEClipboard.copy заменить на другой плагин не конфликтующий с ssr
                    if (row && column) {
                        if (_XEClipboard.copy(row[column.property].trim())) {
                            /**
                             * Событие по копированию ячейки
                             * из контекстного меню
                             */
                            this.$emit('context-menu', 'copied')
                        }
                    }
                    break
                case 'openInNewTab':
                    if (row && column) {
                        window.open(this.getUrl(row))
                    }
                    break
                case 'openInNewWindow':
                    if (row && column) {
                        const features = 'toolbar=0,location=0,scrollbars=1,statusbar=1,menubar=0,resizable=1'
                        window.open(this.getUrl(row), '_blank', features)
                    }
                    break
            }
        },
        getUrl(row) {
            const regExp = /.+\/$/i
            let pathName = window.location.pathname
            if (!regExp.test(pathName)) {
                pathName = `${pathName}/`
            }
            return `${window.location.origin}${pathName}${row.id}${window.location.search}`
        },
        checkHorizontalScroll() {
            const wrapper = this.getElement('vxe-table--body-wrapper')
            const body = this.getElement('vxe-table--body')
            if (wrapper && body) {
                this.hasHorizontalScroll = wrapper.clientWidth < body.clientWidth
            }
        },
        getElement(className) {
            const el = this.$refs.xTable.$el
            const collection = el.getElementsByClassName(className)
            return collection && collection.length ? collection[0] : null
        },
    },
}
</script>

<style lang="scss">
@import '~vxe-table/styles/variable.scss';

//override variables:
@import '../../../styles/table.scss';

@import '~vxe-table/styles/modules.scss';

.vxe-table {
    font-family: $font-family-main;
    &--tooltip-wrapper {
        .vxe-table--tooltip-content {
            white-space: normal;
        }
        &.theme--mcui-black {
            background: $color-black;
            color: $color-white;
            border-radius: $radius-100;
            font-family: 'Montserrat', sans-serif;
            font-weight: $font-weight-medium;
            line-height: $line-height-250;
            font-size: $font-size-200;
            box-shadow: 0 $space-50 $space-150 rgba($color-black, 0.16);
            padding: $space-100 $space-150;
        }
    }
}
.mc-table-wrapper {
    position: relative;
    &__footer {
        @include position(absolute, null 0 0 0);
        z-index: 2;
        &--indent-bottom {
            bottom: 5px;
        }
    }
    &__tint {
        height: $size-900;
        background: linear-gradient(0deg, $color-white 0%, rgba(255, 255, 255, 0) 100%);
    }
    &__loading {
        display: flex;
        align-items: center;
        justify-content: center;
        height: $size-700;
        background-color: $color-white;
        color: $color-outline-gray;
        @include child-indent-right($space-100);
        .mc-title {
            width: auto;
        }
    }
    &__load-icon {
        animation: $animation-spinner;
    }
}

.mc-table {
    &--open-card {
        .vxe-table--body-wrapper,
        .vxe-table--footer-wrapper {
            overflow-x: hidden;
        }
    }
    &--clickable {
        .vxe-table--body {
            .vxe-body--row {
                cursor: pointer;
            }
        }
    }
    &--header-break-word {
        .vxe-header--column {
            .vxe-cell--title {
                width: 100%;
                .mc-title__text {
                    white-space: pre-line;
                    word-break: break-word;
                    &:first-line {
                        line-height: 0;
                    }
                }
            }
        }
    }
    &__context-menu {
        width: 250px;
        .vxe-context-menu--link {
            width: 100%;
        }
    }
    .vxe-header--column {
        .vxe-cell {
            &--title {
                display: flex;
                align-items: center;
            }
        }
        &.is--sortable {
            cursor: pointer;
        }
    }

    .vxe-cell {
        padding-left: $space-200;
        padding-right: $space-200;
        &--checkbox {
            display: flex;
            align-items: center;
            max-width: 100%;
            padding-left: 1.8em;
            .vxe-checkbox--icon {
                margin-right: $space-50;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }
    @include custom-scroll();
}
@mixin gradient() {
    background: $color-hover-gray;
    background-image: -webkit-gradient(
        linear,
        left center,
        right center,
        from($color-hover-gray),
        color-stop(0.2, rgba($color-white, 0.5)),
        color-stop(0.4, $color-hover-gray),
        to($color-hover-gray)
    );
    background-image: -webkit-linear-gradient(
        left,
        $color-hover-gray 0%,
        rgba($color-white, 0.5) 20%,
        $color-hover-gray 40%,
        $color-hover-gray 100%
    );
    background-repeat: no-repeat;
    background-size: 800px 100%;
    animation: placeHolderShimmer 1s linear infinite forwards;
    border-radius: 10px;
    > * {
        background: transparent;
        position: relative;
        margin: 0 auto;
        width: 100%;
        overflow: hidden;
        &:after {
            content: '';
            position: absolute;
            border: 500px solid #fff;
            width: 100%;
        }
    }
}
.loader {
    width: 100%;
    display: flex;
    align-items: center;
    .avatar {
        display: block;
        float: left;
        position: relative;
        height: 24px;
        width: 24px;
        min-width: 24px;
        margin-right: $space-50;
        @include gradient();
    }
    .preview-content {
        display: flex;
        flex-direction: column;
        width: 100%;
        @include child-indent-bottom($space-50);
    }
    .line {
        display: block;
        position: relative;
        height: 8px;
        width: 100%;
        @include gradient();
    }
    &--more-height {
        .line {
            height: 12px;
            width: 75%;
        }
    }

    @-webkit-keyframes placeHolderShimmer {
        0% {
            background-position: -468px 0;
        }
        100% {
            background-position: 468px 0;
        }
    }
}
</style>
