<template>
    <div :style="wrapperStyles" class="mc-table-wrapper">
        <!-- Отображение скелетной загрузки -->
        <section v-if="skeletonLoad" class="skeleton-load-wrapper">
            <div v-for="(col, i) in columnsForFirstLoad" :key="`skeleton-col__${i}`">
                <div v-for="(cell, cellI) in col" :key="`skeleton-cell-${cellI}`" class="skeleton-load__cell">
                    <div v-if="!cellI" class="loader loader--more-height">
                        <div class="line"></div>
                    </div>
                    <div v-if="!i" class="loader" :style="{ minWidth: `${firstColsWidth}px` }">
                        <div class="avatar"></div>
                        <div class="preview-content">
                            <div class="line"></div>
                            <div class="line"></div>
                        </div>
                    </div>
                    <div v-else class="loader">
                        <div class="line"></div>
                    </div>
                </div>
            </div>
        </section>
        <component
            :is="tag"
            v-bind="attrs"
            :empty-render="{ name: 'noData' }"
            v-on="{ ...$listeners, 'sort-change': handleSort }"
            @context-menu-click="contextMenuClickEvent"
            @scroll="handleScroll"
        >
            <!-- @slot Слот дочерних mc-table-col -->
            <slot />
            <slot slot="empty" name="empty">
                <template v-if="!$attrs.loading">
                    <div class="no_data_icon-wrapper">
                        <img :src="noDataIconSrc" alt="no table data icon" />
                    </div>
                    <mc-title text-align="center">
                        {{ placeholders.no_data }}
                    </mc-title>
                </template>
                <span v-else></span>
            </slot>
        </component>
        <div v-if="sortLoading || $attrs.loading" :class="footerClasses" class="mc-table-wrapper__footer">
            <div v-if="footerInfo !== 'total'" class="mc-table-wrapper__tint"></div>
            <div
                v-if="($attrs.loading && scrollIsBottom) || sortLoading"
                :style="loadingWrapperStyle"
                class="mc-table-wrapper__loading"
            >
                <mc-svg-icon class="mc-table-wrapper__load-icon" name="loader" />
                <mc-title color="gray">{{ placeholders.loading }}</mc-title>
            </div>
        </div>
        <mc-overlay v-if="overlayLoading" />
    </div>
</template>

<script>
import noTableDataIcon from '../../../assets/img/no_table_data.png'
import _throttle from 'lodash/throttle'
import _isEmpty from 'lodash/isEmpty'

import McTitle from '../../../elements/McTitle/McTitle'
import McSvgIcon from '../../../elements/McSvgIcon/McSvgIcon'
import McTableCol from '../McTableCol/McTableCol'
import McOverlay from '../../McOverlay/McOverlay.vue'

/**
 *  More info: https://xuliangzhan.com/vxe-table, https://xuliangzhan.github.io/vxe-table
 */
export default {
    name: 'McTable',
    components: {
        McTitle,
        McSvgIcon,
        McTableCol,
        McOverlay,
    },
    provide() {
        const provideData = {}
        const properties = ['canShowLoader', 'cardIsOpen', 'placeholders', 'sortedBy', 'sortedDescending', 'footerInfo']
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
        fixedFirstColumn: {
            type: Boolean,
            default: false,
        },
        fixedLastColumn: {
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
         * Оверлей со спиннером
         */
        overlayLoading: {
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
            default: 4,
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
        /**
         * Моноширинный шрифт для строк
         */
        monoFont: {
            type: Boolean,
            default: false,
        },
        /**
         * Конфиг ячеек, которые нужно мержить
         * нужно явно передавать индикатор ячейки
         * row - строка на которой находится ячейка
         * col - колонка на которой находится ячейка
         * colspan - сколько колонок должна занимать ячейка
         * rowspan - сколько строк должна занимать ячейк
         * Например при динамической подгрузке данных в таблицу нужно постоянно обновлять св-во,
         * если нужно добавлять новые ячейки (пример использования в stories.js файле фильтра)
         * { row: 1, col: 1, colspan: 1, rowspan: 1 }
         * docs - https://vxetable.cn/v2/#/table/advanced/mergeCell
         * */
        mergeCells: {
            type: Array,
            default: () => [],
        },
        isRtl: {
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
            tableBodyScrollLeft: false,
            tableBodyScrollRight: true,
        }
    },
    computed: {
        api() {
            return this.$refs.xTable
        },
        attrs() {
            const attrs = {
                ref: 'xTable',
                data: this.items,
                'merge-cells': this.mergeCells,
                'context-menu': this.tableMenu,
                class: this.classes,
                'sync-resize': this.cardIsOpen,
                'scroll-y': { ...this.scrollY, offset: 30, mode: 'slide' },
                'show-footer': this.canShowFooter,
                'footer-method': this.footerMethod,
                'sort-config': {
                    remote: true,
                    showIcon: false,
                    trigger: 'cell',
                    orders: this.sortOrders,
                },
                'tooltip-config': {
                    theme: 'mcui-black',
                },
                'row-id': 'id',
                'key-field': 'id',
                'highlight-hover-row': !this.skeletonLoad,
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
        loadingWrapperStyle() {
            return {
                width: this.cardIsOpen ? `${this.firstColsWidth}px` : '100%',
            }
        },
        canShowLoader() {
            return !this.scrollable && this.hasMore
        },
        canShowFooter() {
            switch (this.footerInfo) {
                case 'total':
                    return true
                case 'loaded':
                    return !this.hasMore && !this.$attrs.loading && !!this.items.length
                default:
                    return false
            }
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
                'mc-table--mono-font': this.monoFont,
                'mc-table--fixed-first-col': this.fixedFirstColumn,
                'mc-table--fixed-last-col': this.fixedLastColumn,
                'mc-table--scrolled-left-x-axis': !!this.tableBodyScrollLeft,
                'mc-table--scrolled-right-x-axis': !!this.tableBodyScrollRight,
            }
        },
        wrapperStyles() {
            return {
                width: 'auto',
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
            return new Array(20).fill('').map(() => new Array(20).fill(''))
        },
    },
    watch: {
        cardIsOpen(newVal) {
            this.toggleColumns(newVal)
        },
        '$attrs.loading'() {
            this.checkHorizontalScroll()
        },
        totalFooter() {
            if (this.footerInfo === 'total') {
                this.$nextTick(() => {
                    this.api.updateFooter()
                })
            }
        },
        items: {
            handler(value) {
                if (value && value.length) this.checkOccupancy()
            },
            immediate: true,
        },
    },
    mounted() {
        this.setFirstColsWidth()
        window.addEventListener('resize', this.checkHorizontalScroll)
    },
    beforeDestroy() {
        this.observer && this.observer.disconnect()
        window.removeEventListener('resize', this.checkHorizontalScroll)
    },
    methods: {
        formattedNumber(value, decimals = 2, is_rtl = false) {
            if (value == null) return null

            const sign = Math.sign(value) || 1
            const multiplier = decimals < 1 ? 1 : 10 ** decimals
            const roundedNumber = (Math.floor(Math.round(Math.abs(value) * multiplier)) / multiplier) * sign
            if (is_rtl) return roundedNumber.toFixed(decimals)
            return String(roundedNumber.toFixed(decimals)).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
        },
        footerMethod({ columns, data }) {
            return [
                columns.map(column => {
                    if (column.type === 'seq') return data.length
                    if (column.type === 'checkbox') return ' '
                    if (this.footerInfo === 'total' && !_isEmpty(this.totalFooter)) {
                        const info = Object.entries(this.totalFooter).find(([key]) => key === column.property)
                        if (!info) return null
                        if (!column?.params?.modifyTotal) return info[1]
                        let parsedVal = parseFloat(info[1])
                        if (!parsedVal && parsedVal !== 0) return '—'
                        return this.formattedNumber(parsedVal, !info[0].match('count') ? 2 : 0, this.isRtl)
                    }
                    return null
                }),
            ]
        },
        checkOccupancy() {
            if (!this.$refs.xTable) return
            const tableHeight = this.$refs.xTable.$el.getBoundingClientRect().height
            const tableDataHeight = this.$refs.xTable.rowHeight * this.items.length
            if (tableHeight >= tableDataHeight && this.hasMore) {
                this.load()
            }
        },
        load() {
            /**
             * Событие по подгрузке данных
             * (infinity-loading)
             */
            this.$emit('load')
        },
        handleScroll({ $event, type, isY, isX }) {
            if (type === 'body' && isX) {
                this.tableBodyScrollLeft = !!$event.target.scrollLeft
                this.tableBodyScrollRight =
                    $event.target.scrollLeft + $event.target.clientWidth < $event.target.scrollWidth
            }
            if (type === 'body' && isY) {
                this.checkVerticalScroll(...arguments)
            }
        },
        checkVerticalScroll: _throttle(function({ scrollTop, $event, type, isY, isX, $table }) {
            const bottomPos = Math.ceil($event.target.scrollHeight - $event.target.clientHeight)
            const isLoadArea = bottomPos - scrollTop <= $table._data.rowHeight * this.rowsToStartLoad
            this.scrollIsBottom = scrollTop / bottomPos > 0.95
            if (isLoadArea && !this.$attrs.loading && this.hasMore) {
                this.load()
            }
        }, 200),
        setFirstColsWidth() {
            const columns = this.$refs.xTable.getColumns()
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
        handleSort({ property, ...other } = {}) {
            this.$emit('sort-change', {
                field: property,
                ...other,
            })
        },
        toggleColumns(val) {
            if (val) {
                const columns = this.$refs.xTable.getColumns()
                const hideColumns = this.fixedFirstColumn
                    ? columns.filter((c, i) => !!i)
                    : columns.filter(col => col.fixed !== 'left')
                hideColumns.forEach(col => (col.visible = false))
                this.tableBodyScrollLeft = false
                this.$refs.xTable.refreshColumn()
            } else {
                this.$refs.xTable.resetColumn()
            }
            // this.$refs.xTable.recalculate()
            // this.$refs.xTable.syncData() // Синхронит данные таблиц (фикс колонка === отдельная таблица)
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
@import '../../../styles/mixins';
@import '../../../tokens/font-families';
@import '../../../tokens/animations';
@import '../../../tokens/z-indexes';

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
            font-family: $font-family-main;
            font-weight: $font-weight-normal;
            line-height: $line-height-250;
            font-size: $font-size-200;
            box-shadow: 0 $space-50 $space-150 rgba($color-black, 0.16);
            padding: $space-100 $space-150;
        }
    }

    .vxe-body--row.row--cheched {
        background-color: var(--color-main-alpha-10);
    }

    .fixed-left--wrapper {
        scrollbar-width: none;
    }

    &--empty-block {
        display: block !important;
        height: 1px;
        min-height: 1px !important;
    }
}

.mc-table-wrapper {
    position: relative;

    &__footer {
        @include position(absolute, null 0 0 0);
        z-index: 3;

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
        height: $size-500;
        background-color: $color-white;
        color: $color-gray;
        @include child-indent-right($space-100);

        .mc-title {
            width: auto;
        }
    }

    &__load-icon {
        animation: $animation-spinner;
    }

    .skeleton-load {
        &-wrapper {
            display: flex;
            overflow: hidden;
            max-width: 100%;
            position: absolute;
            height: 100%;
            z-index: $z-index-modal;
            background-color: $color-white;
            user-select: none;
        }
    }
}

.mc-table {
    &--mono-font {
        .vxe-table--body {
            .vxe-body--column {
                &.col--checkbox {
                    padding: $space-50 0;
                }
            }

            .vxe-body--row {
                font-feature-settings: 'tnum';
                font-variant-numeric: tabular-nums;
            }
        }

        .vxe-table--footer {
            .vxe-footer--row {
                font-feature-settings: 'tnum';
                font-variant-numeric: tabular-nums;
            }
        }
    }

    &--fixed-first-col {
        .vxe-header--row,
        .vxe-body--row,
        .vxe-footer--row {
            td:first-child,
            th:first-child {
                position: sticky;
                left: 0;
                background-color: white;
                z-index: 3;
            }
        }

        .vxe-footer--row {
            td {
                border-block-start: 1px solid $color-hover-gray;
            }
        }
    }

    &--fixed-last-col {
        .vxe-header--row,
        .vxe-body--row,
        .vxe-footer--row {
            td:last-child,
            th:last-child {
                position: sticky;
                right: 0;
                background-color: white;
                z-index: 3;

                &:empty {
                    display: none;
                }
            }
        }

        .vxe-footer--row {
            td {
                border-block-start: 1px solid $color-hover-gray;
            }
        }
    }

    &--scrolled-left-x-axis {
        &.mc-table--fixed-first-col {
            .vxe-header--row,
            .vxe-body--row,
            .vxe-footer--row {
                td:first-child,
                th:first-child {
                    &::after {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 100%;
                        width: 12px;
                        height: 100%;
                        background: linear-gradient(to left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.12) 100%);
                    }
                }
            }
        }
    }

    &--scrolled-right-x-axis {
        &.mc-table--fixed-last-col {
            .vxe-header--row,
            .vxe-body--row,
            .vxe-footer--row {
                td:last-child,
                th:last-child {
                    &::after {
                        content: '';
                        position: absolute;
                        top: 0;
                        right: 100%;
                        width: 12px;
                        height: 100%;
                        background: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.12) 100%);
                    }
                }
            }
        }
    }

    .vxe-body--row {
        &.row {
            &--current {
                td,
                th {
                    background-color: color-mix(in srgb, var(--color-main) 10%, #fff 90%) !important;
                }
            }
            &--hover {
                td:last-child,
                td:first-child {
                    background-color: $color-hover-gray;
                }
            }
        }
    }
    .vxe-table--body-wrapper {
        > table {
            position: relative;
            &:after {
                content: '';
                @include position(absolute, null 0 -1px 0);
                @include size(100%, 1px);
                background: $color-hover-gray;
            }
        }
    }

    &--open-card {
        .vxe-table--body-wrapper,
        .vxe-table--footer-wrapper {
            overflow-x: hidden;
            width: fit-content;
        }

        .vxe-table--footer {
            display: none;
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
                .mc-title__text {
                    white-space: pre-line;
                    word-break: break-word;
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

    .vxe-header--row {
        .col--checkbox {
            .vxe-cell {
                &--title {
                    overflow: unset;
                }
            }
        }
    }

    .vxe-cell--checkbox {
        z-index: 1;

        &:hover {
            .vxe-checkbox--icon::before {
                border-color: var(--color-main) !important;
            }
        }

        &.is--checked,
        &.is--indeterminate {
            .vxe-checkbox--icon::before {
                border-color: var(--color-main);
                background-color: var(--color-main);
            }
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

    .vxe-table--footer {
        border-bottom: 1px solid $color-hover-gray;

        &-wrapper {
            border: none;
        }
    }

    .vxe-cell {
        padding-inline-start: $space-200;
        padding-inline-end: $space-200;
        word-break: break-word;

        &--checkbox {
            display: flex;
            align-items: center;
            max-width: 100%;
            padding-inline-start: 1.8em;

            .vxe-checkbox--icon {
                margin-inline-end: $space-50;
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
    height: $space-500;
    padding: $space-100 $space-200;

    .avatar {
        display: block;
        float: left;
        position: relative;
        height: 24px;
        width: 24px;
        min-width: 24px;
        margin-inline-end: $space-50;
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
            min-width: 150px;
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
