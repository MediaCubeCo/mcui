<template>
    <vxe-table-column v-bind="attrs" class="mc-table-col" v-on="$listeners">
        <template v-slot="{ row, rowIndex }">
            <!-- @slot Слот для mc-table-col -->
            <slot :row="row">
                <mc-title
                    :text-align="textAlign"
                    :ellipsis="ellipsis"
                    weight="normal"
                    class="mc-table-col__title"
                    v-html="$attrs.type === 'seq' ? rowIndex + 1 : row[defaultTitle]"
                />
            </slot>
            <div v-if="$scopedSlots.right" class="mc-table-col__right">
                <!-- @slot Слот справа в ячейке (абсолютно спозиционированный, с бэкграундом) -->
                <slot :row="row" name="right" />
            </div>
        </template>
        <template v-slot:header="{ column }">
            <!-- @slot Слот заголовка столбца -->
            <slot :column="column" name="header">
                <mc-title :text-align="textAlign" class="mc-table-col__title" weight="semi-bold">
                    <mc-svg-icon
                        v-if="isSortable"
                        slot="icon-prepend"
                        :name="getSortIcon(column)"
                        :color="getSortColor(column)"
                        size="200"
                    />{{
                        $attrs.type === 'seq' ? '#' : column.title
                    }}<div slot="icon-append" class="mc-table-col__header-append">
                        <!-- @slot Слот для вставки в конец после заголовка столбца -->
                        <slot name="header-append" />
                    </div>
                </mc-title>
                <div v-if="$scopedSlots['header-right'] || headerRight" class="mc-table-col__header-right">
                    <!-- @slot Слот справа в ячейке хедера (абсолютно спозиционированный, с бэкграундом) -->
                    <slot :column="column" name="header-right">
                        <mc-chip
                            v-if="headerRight"
                            class="mc-table-col__total"
                            variation="gray-invert"
                            size="s-compact"
                        >
                            {{ headerRight }}
                        </mc-chip>
                    </slot>
                </div>
            </slot>
        </template>
        <template v-slot:footer="{ columnIndex, items }">
            <mc-title
                v-if="items[columnIndex]"
                :text-align="textAlign"
                weight="semi-bold"
                v-html="`${items[columnIndex]} ${totalAppend}`"
            />
            <template v-else-if="getVisibilityCommonInfo(columnIndex, items)">
                <mc-title v-if="!provideData.canShowLoader" class="mc-table-col__title" weight="semi-bold">
                    {{ firstColFooter }}
                </mc-title>
                <span v-if="provideData.canShowLoader" ref="loader" class="mc-table-col__loader"></span>
            </template>
        </template>
    </vxe-table-column>
</template>

<script>
import McTitle from '../../../elements/McTitle/McTitle'
import McSvgIcon from '../../../elements/McSvgIcon/McSvgIcon'
import McChip from '../../../elements/McChip/McChip'

/**
 * Смотреть mc-table
 */
export default {
    name: 'McTableCol',
    components: {
        McTitle,
        McSvgIcon,
        McChip,
    },
    inject: ['provideData'],
    props: {
        /**
         *  Если нужен бордер
         *  справа от столбца
         */
        hasBorder: {
            type: Boolean,
            default: false,
        },
        /**
         *  Если нужна доп инфа
         *  в ячейке заголовка справа
         */
        headerRight: {
            type: [Number, String],
            default: null,
        },
        /**
         * Нужно ли применять фильтры для тотала колонки
         * */
        modifyTotal: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        attrs() {
            const classes = {
                'class-name': this.handleClassName,
                'header-class-name': this.handleClassName,
                'footer-class-name': this.handleFooterClassName,
            }
            return {
                ...classes,
                ...this.$attrs,
                params: {
                    modifyTotal: this.modifyTotal,
                },
            }
        },
        defaultTitle() {
            return this.$attrs.field
        },
        textAlign() {
            return this.$attrs.align || 'left'
        },
        totalAppend() {
            return this.$attrs['total-append'] || ''
        },
        isSortable() {
            // eslint-disable-next-line no-prototype-builtins
            return this.$attrs.hasOwnProperty('sortable') && this.$attrs.sortable !== false
        },
        ellipsis() {
            // eslint-disable-next-line no-prototype-builtins
            if (!this.$attrs.hasOwnProperty('show-overflow')) return true
            return this.$attrs['show-overflow'] !== false
        },
        firstColFooter() {
            switch (this.provideData.footerInfo) {
                case 'total':
                    return this.provideData.placeholders.total
                case 'loaded':
                    return this.provideData.placeholders.all_loaded
                default:
                    return ''
            }
        },
    },
    methods: {
        getVisibilityCommonInfo(columnIndex, items) {
            const index = items.indexOf(null)
            return columnIndex === index
        },
        getSortIcon(column) {
            if (!this.provideData.nativeSort) {
                if (this.provideData.sortedBy && column.property === this.provideData.sortedBy) {
                    return this.provideData.sortedDescending ? 'arrow_downward' : 'arrow_upward'
                }
                return 'arrow_up_down'
            }
            if (!column.order) return 'arrow_up_down'
            return column.order === 'desc' ? 'arrow_downward' : 'arrow_upward'
        },
        getSortColor(column) {
            if (!this.provideData.nativeSort) {
                if (this.provideData.sortedBy && column.property === this.provideData.sortedBy) {
                    return 'black'
                }
                return 'outline-gray'
            }
            return column.order ? 'black' : 'outline-gray'
        },
        handleClassName() {
            const classes = []
            if (this.hasBorder && !this.provideData.cardIsOpen) {
                classes.push('mc-table-col--border-right')
            }
            if (this.$attrs['show-overflow'] === false) {
                classes.push('mc-table-col--overflow-visible')
            }
            return classes
        },
        handleFooterClassName() {
            if (this.hasBorder && !this.provideData.cardIsOpen) {
                return 'mc-table-col--border-right'
            }
        },
    },
}
</script>

<style lang="scss">
@import '~vxe-table/styles/variable.scss';
//override variables:
@import '../../../styles/table.scss';

@mixin col-right-color($color) {
    .mc-table-col__right {
        background-color: $color;
        &::before {
            background: linear-gradient(90deg, hsla(0, 0%, 100%, 0) 0, $color);
        }
    }
}
.mc-table-col {
    $block-name: &;

    &--border-right {
        border-right: 1px solid $color-hover-gray;
    }
    &--border-top {
        border-top: 1px solid $color-hover-gray;
    }
    &--border-bottom {
        border-bottom: 1px solid $color-hover-gray;
    }
    &--overflow-visible {
        .vxe-cell {
            overflow: visible !important;
        }
    }

    &__total {
        margin-left: auto;
        color: $color-gray;
    }

    &__title {
        width: auto;
        max-width: 101%;
    }
    &__header-append {
        display: flex;
        align-items: center;
    }
    &__right {
        display: flex;
        opacity: 0;
        pointer-events: none;
        align-items: center;
        flex-wrap: nowrap;
        @include position(absolute, 0 $space-200 0 null);
        @include child-indent-right($space-50);
        background-color: $color-white;

        &::before {
            @include pseudo();
            @include position(null, 0 100% 0 null);
            width: $size-300;
            background: linear-gradient(90deg, hsla(0, 0%, 100%, 0) 0, $color-white);
        }
    }
    &__header-right {
        @extend .mc-table-col__right;
        display: flex;
        opacity: 1;
        pointer-events: unset;
    }
}

.vxe-cell {
    &--title {
        font-weight: $font-weight-semi-bold;
    }
    &.c--tooltip,
    &.c--title {
        text-overflow: clip !important;
        white-space: normal !important;
    }
}
.vxe-body--row {
    transition: background-color 0s;
    &.row--stripe {
        @include col-right-color($vxe-table-row-striped-background-color);
    }
    &.row--hover {
        .mc-table-col__right {
            opacity: 1;
            pointer-events: unset;
        }
        @include col-right-color($vxe-table-row-hover-background-color);
        &.row--current {
            @include col-right-color($vxe-table-row-hover-current-background-color);
        }
    }
    &.row--current {
        @include col-right-color($vxe-table-row-current-background-color);
    }
    // описка названия в библиотеке таблицы
    &.row--cheched {
        @include col-right-color($vxe-table-row-cheched-background-color);
        &.row--hover {
            @include col-right-color($vxe-table-row-hover-cheched-background-color);
        }
    }
}
</style>
