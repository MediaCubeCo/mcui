<template>
  <div :style="wrapperStyles">
    <component
      class="mc-table"
      ref="xTable"
      :is="tag"
      v-bind="$attrs"
      v-on="$listeners"
      row-id="id"
      highlight-hover-row
      highlight-current-row
      show-header-overflow="tooltip"
      show-overflow="tooltip"
      show-footer-overflow="tooltip"
      auto-resize
      :context-menu="tableMenu"
      :class="classes"
      :sync-resize="cardIsOpen"
      :scroll-y="scrollY"
      :show-footer="canShowFooter"
      :footer-method="footerMethod"
      :sort-config="{ remote: !nativeSort, showIcon: false, trigger: 'cell', orders: sortOrders }"
      @scroll="handleScroll"
      @context-menu-click="contextMenuClickEvent"
    >
      <!-- @slot Слот очерних mc-table-col -->
      <slot />
      <template v-slot:empty>
        <mc-title text-align="center">
          {{ placeholders.no_data }}
        </mc-title>
      </template>
    </component>
  </div>
</template>

<script>
import _debounce from "lodash/debounce"
import _XEClipboard from "xe-clipboard"
import McTitle from "../../../elements/McTitle/McTitle"

/**
 *  More info: https://xuliangzhan.com/vxe-table, https://xuliangzhan.github.io/vxe-table
 */
export default {
  name: "McTable",
  components: {
    McTitle,
  },
  provide() {
    const provideData = {}
    const properties = [
      "canShowLoader",
      "cardIsOpen",
      "placeholders",
      "nativeSort",
      "sortedBy",
      "sortedDescending",
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
      default: "table",
    },
    /**
     *  Переводы локализаций
     */
    placeholders: {
      type: Object,
      default() {
        return {
          no_data: "No data",
          all_loaded: "All loaded",
          menu: {
            copy: "Copy cell value",
            open_in_new_tab: "Open in new tab",
            open_in_new_window: "Open in new window",
          },
        }
      },
    },
    sortedBy: {
      type: String,
      required: false,
    },
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
        return ["asc", "desc", null]
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
  },
  data() {
    return {
      observer: null,
      cardIsOpen: false,
      firstColsWidth: 253,
    }
  },
  async mounted() {
    await this.loadData()
    !this.scrollable && this.createObserver()
    await this.setFirstColsWidth()
  },
  beforeDestroy() {
    this.observer && this.observer.disconnect()
  },
  watch: {
    canShowFooter(newValue) {
      newValue && this.updateData()
    },
    items: {
      handler: async function(newVal) {
        newVal && (await this.loadData())
      },
      deep: true,
    },
    cardIsOpen(newVal) {
      this.toggleColumns(newVal)
    },
  },
  computed: {
    api() {
      return this.$refs.xTable
    },
    canShowLoader() {
      return !this.scrollable && this.hasMore
    },
    canShowFooter() {
      if (this.scrollable) {
        return !this.hasMore && !this.$attrs.loading && !!this.items.length
      }
      return !!this.items.length
    },
    tag() {
      return `vxe-${this.componentTag}`
    },
    classes() {
      return {
        "mc-table--open-card": this.cardIsOpen,
        "mc-table--clickable": this.$listeners["cell-click"],
      }
    },
    wrapperStyles() {
      return {
        width: this.cardIsOpen ? `${this.firstColsWidth}px` : "auto",
        height: this.$attrs.height ? this.getFixedHeight(this.$attrs.height) : "auto",
        "max-height": this.$attrs["max-height"]
          ? this.getFixedHeight(this.$attrs["max-height"])
          : "none",
      }
    },
    tableMenu() {
      const menu = {
        className: "mc-table__context-menu",
        body: {
          options: [
            [{ code: "copy", name: this.placeholders.menu.copy }],
            [{ code: "openInNewTab", name: this.placeholders.menu.open_in_new_tab }],
            [{ code: "openInNewWindow", name: this.placeholders.menu.open_in_new_window }],
          ],
        },
      }
      return this.$listeners["cell-click"] ? menu : false
    },
  },
  methods: {
    async loadData() {
      await this.$refs.xTable.loadData(this.items)
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
          if (column.type === "seq") return data.length
          if (column.type === "checkbox") return " "
          return null
        }),
      ]
    },
    handleScroll: _debounce(function({ scrollTop, $event, type, isY }) {
      const bottomPos = Math.ceil($event.target.scrollHeight - $event.target.clientHeight)
      const isLoadArea = scrollTop / bottomPos > 0.95
      if (isLoadArea && !this.$attrs.loading && this.hasMore && type === "body" && isY) {
        this.load()
      }
    }, 200),
    load() {
      /**
       * Событие по подгрузке данных
       * (infinity-loading)
       */
      this.$emit("load")
    },
    createObserver() {
      this.observer = new IntersectionObserver(
        entries => {
          const entry = entries[0]
          if (entry.isIntersecting) {
            this.load()
          }
        },
        { threshold: 0.1 }
      )
      this.setObserveElement()
    },
    setObserveElement() {
      const loader = this.$refs.xTable.$el.getElementsByClassName("mc-table-col__loader")
      this.observer && loader.length && this.observer.observe(loader[0])
    },
    async setFirstColsWidth() {
      const columns = await this.$refs.xTable.getColumns()
      const leftFixedColumnsWidth = columns.reduce((sum, curr) => {
        if (curr.fixed === "left") {
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
        const hideColumns = columns.filter(col => col.fixed !== "left")
        hideColumns.forEach(col => (col.visible = false))
        await this.$refs.xTable.refreshColumn()
      } else {
        await this.$refs.xTable.resetColumn()
      }
      await this.$refs.xTable.recalculate()
      await this.$refs.xTable.syncData()
    },
    getFixedHeight(val) {
      return !this.hasMore ? `calc(${val} - 1px)` : val
    },
    contextMenuClickEvent({ menu, row, column }) {
      switch (menu.code) {
        case "copy":
          if (row && column) {
            if (_XEClipboard.copy(row[column.property].trim())) {
              /**
               * Событие по копированию ячейки
               * из контекстного меню
               */
              this.$emit("context-menu", "copied")
            }
          }
          break
        case "openInNewTab":
          if (row && column) {
            window.open(this.getUrl(row))
          }
          break
        case "openInNewWindow":
          if (row && column) {
            const features = "toolbar=0,location=0,scrollbars=1,statusbar=1,menubar=0,resizable=1"
            window.open(this.getUrl(row), "_blank", features)
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
  },
}
</script>

<style lang="scss">
@import "~vxe-table/styles/variable.scss"; //??

//override variables:
@import "../../../styles/table.scss";

@import "~vxe-table/styles/modules.scss"; //??

.vxe-table--tooltip-wrapper {
  .vxe-table--tooltip-content {
    white-space: normal;
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
  &__context-menu {
    width: 250px;
    .vxe-context-menu--link {
      width: 100%;
    }
  }
  .vxe-header--row {
    min-height: $size-600 + 1;
  }
  .vxe-header--column {
    min-height: $size-600 + 1;
    .vxe-cell {
      min-height: $size-600 + 1;
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
</style>