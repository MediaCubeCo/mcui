<template>
  <vxe-table-column v-bind="attrs" v-on="$listeners" class="mc-table-col">
    <template v-slot="{ row, rowIndex }">
      <!-- @slot Слот для mc-table-col -->
      <slot :row="row">
        <mc-title class="mc-table-col__title" :text-align="textAlign" :ellipsis="ellipsis" >
          {{ $attrs.type === "seq" ? rowIndex + 1 : row[defaultTitle] }}
        </mc-title>
      </slot>
      <div v-if="$scopedSlots.right" class="mc-table-col__right">
        <!-- @slot Слот справа в ячейке (абсолютно спозиционированный, с бэкграундом) -->
        <slot name="right" :row="row" />
      </div>
    </template>
    <template v-slot:header="{ column }">
      <!-- @slot Слот заголовка столбца -->
      <slot name="header" :column="column">
        <mc-title class="mc-table-col__title" weight="semi-bold" :text-align="textAlign">
          <mc-svg-icon
              v-if="isSortable"
              slot="icon-prepend"
              size="200"
              :name="getSortIcon(column)"
              :color="getSortColor(column)"
          />
          {{ $attrs.type === "seq" ? "#" : column.title }}
          <div slot="icon-append">
            <!-- @slot Слот для вставки в конец после заголовка столбца -->
            <slot name="header-append" />
          </div>
        </mc-title>
        <div v-if="$scopedSlots['header-right'] || headerRight" class="mc-table-col__header-right">
          <!-- @slot Слот справа в ячейке хедера (абсолютно спозиционированный, с бэкграундом) -->
          <slot name="header-right" :column="column">
            <mc-chip v-if="headerRight" class="mc-table-col__total" variation="gray-invert" size="s">
              {{ headerRight }}
            </mc-chip>
          </slot>
        </div>
      </slot>
    </template>
    <template v-slot:footer="{ columnIndex, items }">
      <mc-title v-if="items[columnIndex]" :text-align="textAlign">
        {{ items[columnIndex] }}
      </mc-title>
      <template v-else-if="getVisibilityCommonInfo(columnIndex, items)">
        <mc-title v-if="!provideData.canShowLoader" class="mc-table-col__title">
          {{ firstColFooter }}
        </mc-title>
        <span
          v-if="provideData.canShowLoader"
          class="mc-table-col__loader"
          ref="loader"
        ></span>
      </template>
    </template>
  </vxe-table-column>
</template>

<script>
import McTitle from "../../../elements/McTitle/McTitle"
import McSvgIcon from "../../../elements/McSvgIcon/McSvgIcon"
import McChip from "../../../elements/McChip/McChip"

/**
 * Смотреть mc-table
 */
export default {
  name: "McTableCol",
  components: {
    McTitle,
    McSvgIcon,
    McChip,
  },
  inject: ["provideData"],
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
      type: Number,
      default: null,
    },
  },
  computed: {
    attrs() {
      const classes = {
        "class-name": this.handleClassName,
        "header-class-name": this.handleClassName,
        "footer-class-name": this.handleFooterClassName,
      }
      return {
        ...classes,
        ...this.$attrs,
      }
    },
    defaultTitle() {
      return this.$attrs.field
    },
    textAlign() {
      return this.$attrs.align || "left"
    },
    isSortable() {
      return this.$attrs.hasOwnProperty("sortable")
    },
    ellipsis() {
      if (!this.$attrs.hasOwnProperty("show-overflow")) return true
      return this.$attrs["show-overflow"] !== false
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
    }
  },
  methods: {
    getVisibilityCommonInfo(columnIndex, items) {
        const index = items.indexOf(null)
        return columnIndex === index
    },
    getSortIcon(column) {
      if (!this.provideData.nativeSort) {
        if (this.provideData.sortedBy && column.property === this.provideData.sortedBy) {
          return this.provideData.sortedDescending ? "arrow_downward" : "arrow_upward"
        }
        return "arrow_up_down"
      }
      if (!column.order) return "arrow_up_down"
      return column.order === "desc" ? "arrow_downward" : "arrow_upward"
    },
    getSortColor(column) {
      if (!this.provideData.nativeSort) {
        if (this.provideData.sortedBy && column.property === this.provideData.sortedBy) {
          return 'black'
        }
        return "outline-gray"
      }
      return column.order ? 'black' : 'outline-gray'
    },
    handleClassName() {
      const classes = []
      if (this.hasBorder && !this.provideData.cardIsOpen) {
        classes.push("mc-table-col--border-right")
      }
      if (this.$attrs["show-overflow"] === false) {
        classes.push("mc-table-col--overflow-visible")
      }
      return classes
    },
    handleFooterClassName() {
      if (this.hasBorder && !this.provideData.cardIsOpen) {
        return "mc-table-col--border-right"
      }
    },
  },
}
</script>

<style lang="scss">
@import "~vxe-table/styles/variable.scss";
//override variables:
@import "../../../styles/table.scss";

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
  &__right {
    display: none;
    align-items: center;
    flex-wrap: nowrap;
    @include position(absolute, 0 $space-100 0 null);
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
      display: flex;
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
