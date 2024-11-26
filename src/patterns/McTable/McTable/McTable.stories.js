import { text, number, select, boolean, object } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import McTable from './McTable'
import McTableCol from '../McTableCol/McTableCol'
import McFieldText from '../../../elements/McField/McFieldText/McFieldText'
import McAvatar from '../../../elements/McAvatar/McAvatar'
import McChip from '../../../elements/McChip/McChip'
import McBadge from '../../../elements/McBadge/McBadge'
import McGridRow from '../../../patterns/McGrid/McGridRow/McGridRow'
import McGridCol from '../../../patterns/McGrid/McGridCol/McGridCol'
import McButton from '../../../elements/McButton/McButton'
import McTitle from '../../../elements/McTitle/McTitle'
import McSvgIcon from '../../../elements/McSvgIcon/McSvgIcon'
import McStack from '../../../patterns/McStack/McStack'
import McPreview from '../../McPreview/McPreview'

import _minBy from 'lodash/minBy'
import { number as num } from '../../../utils/filters'

import body from '../../../mocks/tableInfusersBody'
const borders = {
    default: 'default',
    full: 'full',
    outer: 'outer',
    inner: 'inner',
    none: 'none',
}
const tags = {
    grid: 'grid',
    table: 'table',
}
const sizes = {
    default: 'default',
    medium: 'medium',
    small: 'small',
    mini: 'mini',
}

const footerInfo = {
    default: '',
    total: 'total',
    loaded: 'loaded',
}

export default {
    title: 'Patterns/McTable/McTable',
    component: McTable,
    subcomponents: { McTableCol },
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=346%3A1828',
        },
    },
}

const getUniqueProps = key => {
    return {
        height: {
            default: text('height', '650', key),
        },
        scrollable: {
            default: boolean('scrollable', true, key),
        },
        stripe: {
            default: boolean('stripe', false, key),
        },
        border: {
            default: select('border', borders, 'outer', key),
        },
        componentTag: {
            default: select('componentTag', tags, 'grid', key),
        },
        hasMore: {
            default: boolean('hasMore', true, key),
        },
        loading: {
            default: boolean('loading', false, key),
        },
        checkboxConfig: {
            default: object('checkboxConfig', { labelField: 'user', showHeader: false, highlight: true }, key),
        },
        sortLoading: {
            default: boolean('sortLoading', false, key),
        },
        overlayLoading: {
            default: boolean('overlayLoading', false, key),
        },
        size: {
            default: select('size', sizes, 'small', key),
        },
        contextMenu: {
            default: boolean('contextMenu', false, key),
        },
        footerInfo: {
            default: select('footerInfo', footerInfo, 'total', key),
        },
        totalFooter: {
            default: object('totalFooter', { views_count: 12345, roles: 'privet' }, key),
        },
        headerBreakWord: {
            default: boolean('headerBreakWord', false, key),
        },
        monoFont: {
            default: boolean('monoFont', false, key),
        },
        scrollY: {
            default: number('scrollY', 0, {}, key),
        },
        rowsToStartLoad: {
            default: number('rowsToStartLoad', 4, {}, key),
        },
        skeletonLoad: {
            default: boolean('skeletonLoad', false, key),
        },
        noDataIconSrc: {
            default: text('noDataIconSrc', 'https://static.thenounproject.com/png/4143644-200.png', key),
        },
        removeItems: {
            default: boolean('removeItems', false, key),
        },
        isRtl: {
            default: boolean('isRtl', false, key),
        },
    }
}

const getCommonTags = ctx => {
    return {
        height: ctx.height,
        size: ctx.size,
        scrollable: ctx.scrollable,
        stripe: ctx.stripe,
        border: ctx.border,
        sortLoading: ctx.sortLoading,
        overlayLoading: ctx.overlayLoading,
        scrollY: ctx.scrollY,
        noDataIconSrc: ctx.noDataIconSrc,
        rowsToStartLoad: ctx.rowsToStartLoad,
        skeletonLoad: ctx.skeletonLoad,
        isRtl: ctx.isRtl,
        componentTag: ctx.componentTag,
        items: ctx.items,
        hasMore: ctx.hasMore,
        loading: ctx.loading,
        contextMenu: ctx.contextMenu,
        placeholders: ctx.placeholders,
        cellClassName: ctx.handleCellClassName,
        checkboxConfig: ctx.checkboxConfig,
        footerInfo: ctx.footerInfo,
        totalFooter: ctx.totalFooter,
        headerBreakWord: ctx.headerBreakWord,
        monoFont: ctx.monoFont,
        mergeCells: ctx.merge_cells,
    }
}

const actionsData = {
    handleLoad: action('loaded'),
    handleSorted: action('sorted'),
    cellClickEvent: action('onCellClick'),
    handleCheckboxChange: (row, e) => {
        row.$event.stopPropagation()
        action('checkboxChanged')(row, e)
    },
    handleBtnClick: action('buttonClicked'),
}

export const Default = () => ({
    components: {
        McTable,
        McTableCol,
        McFieldText,
        McAvatar,
        McChip,
        McButton,
        McSvgIcon,
        McTitle,
        McBadge,
        McGridCol,
        McGridRow,
        McStack,
        McPreview,
    },
    data() {
        return {
            table_data: body,
            has_more: true,
            total: 424,
            merge_cells: [{ row: 6, col: 4, rowspan: 1, colspan: 5 }],
            placeholders: {
                no_data: 'Данных вообще нет!',
                loading: 'Секундочку...',
                all_loaded: 'Всё уже загружено',
                total: 'Итого',
                menu: {
                    copy: 'Скопировать данные ячейки',
                    open_in_new_tab: 'Открыть в новой вкладке',
                    open_in_new_window: 'Открыть в новом окне',
                },
            },
        }
    },
    computed: {
        tagBind() {
            return {
                ...getCommonTags(this),
                items: this.items,
                hasMore: this.has_more,
            }
        },
        items() {
            return !this.removeItems
                ? this.table_data.map(item => ({
                      ...item,
                      avatar: item.image_small,
                      views_count: num(item.views_count, 0),
                      average_views_per_video: num(item.average_views_per_video, 0),
                      subscribers_count: num(item.subscribers_count, 0),
                      categories: item.categories.map(c => c.title).join(', '),
                      language: item.language.name,
                      country: item.country.name,
                      roles: ['Одмен', 'Петух', 'Лопух'],
                      price: item.agency_channels.filter(item => item.type === 2).length
                          ? num(
                                _minBy(
                                    item.agency_channels.filter(item => item.type === 2),
                                    'total',
                                ).total,
                                0,
                            ) + ' $'
                          : null,
                  }))
                : []
        },
    },
    props: {
        ...getUniqueProps('default'),
    },
    methods: {
        ...actionsData,
        handleCellClassName() {
            return '' //'mc-table-col--border-bottom'
        },
        loadExtra() {
            this.has_more = false
            this.table_data.push(...this.table_data?.map(item => ({ ...item, id: item.id * 50 })))
            this.merge_cells.push({ row: 56, col: 4, rowspan: 1, colspan: 5 })
        },
    },
    template: `
        <mc-table
            ref="table"
            v-bind="tagBind"
            @checkbox-change="handleCheckboxChange"
            @load="loadExtra"
            @sort-change="handleSorted"
            @cell-click="cellClickEvent"
        >
            <mc-table-col type="seq" min-width="60" fixed="left" align="right" has-border />
            <mc-table-col :show-overflow="false" type="checkbox" fixed="left" width="25" />
            <mc-table-col field="title" title="Канал" width="248" fixed="left" has-border :headerRight="total">
                <template v-slot="{ row }">
                    <mc-preview>
                        <mc-avatar slot="left" border-color="purple" dot-color="orange" lazy :src="row.avatar" />
                        <mc-title slot="top"> {{ row.title }} </mc-title>
                        <mc-title slot="bottom" color="gray" variation="overline"> {{ row.youtube_id }} </mc-title>
                    </mc-preview>
                </template>
                <template v-slot:right="{ row }">
                    <mc-button style="margin-right: 4px;" variation="purple-link" size="xs-compact" @click.stop="handleBtnClick">
                        <mc-svg-icon slot="icon-append" name="edit" />
                    </mc-button>
                    <mc-button variation="purple-link" size="xs-compact" @click.stop="handleBtnClick">
                        <mc-svg-icon slot="icon-append" name="delete" />
                    </mc-button>
                </template>
            </mc-table-col>
    
            <mc-table-col field="user" title="Пользователь" min-width="200">
                <template v-slot="{ row }">
                    <mc-title v-if="row.id%2">Почтальон Печкин</mc-title>
                    <mc-title v-else style="width: auto; max-width: 101%;">Клён кудрявый лист резной</mc-title>
                </template>
            </mc-table-col>
    
            <mc-table-col
                field="views_count"
                title="Просмотры"
                min-width="130"
                align="right"
                sortable
            />
    
            <mc-table-col field="roles" title="Роль (здесь уточнение)" width="120">
                <template v-slot="{ row }">
                    <mc-chip variation="gray-invert" size="s" :counter="'+'+(row.roles.length - 1)">
                        {{ row.roles[0] }}
                    </mc-chip>
                </template>
            </mc-table-col>
    
            <mc-table-col field="channels" title="Канал" width="120" sortable>
                <template v-slot="{ row }">
                    <mc-stack :limit="3" collapsed>
                        <mc-avatar rounded lazy size="300" />
                        <mc-avatar rounded lazy size="300" />
                        <mc-avatar rounded lazy size="300" />
                        <mc-avatar v-if="row.id%3" rounded lazy size="300" />
                        <mc-avatar v-if="row.id%2" rounded lazy size="300" />
                    </mc-stack>
                </template>
            </mc-table-col>
    
            <mc-table-col field="status" title="Статус" min-width="150">
                <template v-slot="{ row }">
                    <mc-badge variation="red">Отклонен</mc-badge>
                </template>
            </mc-table-col>
    
            <mc-table-col field="owner" title="Владелец" width="150">
                <template v-slot="{ row }">
                    <div style="display: flex; align-items: center; height: 100%;">
                        <mc-field-text :name="row.id + ''" placeholder="Владелец" />
                    </div>
                </template>
            </mc-table-col>
    
            <mc-table-col field="action" title="Действие" width="143" fixed="right">
                <template v-slot="{ row }">
                    <mc-grid-row justify="right" :wrap="false" align="middle" :gutter-x="5">
                        <mc-grid-col>
                            <mc-button size="xs" @click.stop="handleBtnClick">Да</mc-button>
                        </mc-grid-col>
                        <mc-grid-col>
                            <mc-button variation="red" size="xs" @click.stop="handleBtnClick">Нет</mc-button>
                        </mc-grid-col>
                    </mc-grid-row>
                </template>
            </mc-table-col>
        </mc-table>
    `,
})
