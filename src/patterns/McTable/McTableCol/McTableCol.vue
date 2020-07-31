<template>
  <vxe-table-column v-bind="attrs" v-on="$listeners" class="mc-table-col" >
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
        <mc-title class="mc-table-col__title" :text-align="textAlign">
          <mc-svg-icon v-if="isSortable" slot="icon-prepend" :name="getSortIcon(column)" />
          {{ $attrs.type === "seq" ? "#" : column.title }}
          <div slot="icon-append">
            <!-- @slot Слот для вставки в начало перед заголовком столбца -->
            <slot name="header-append" />
          </div>
        </mc-title>
      </slot>
    </template>
    <template v-slot:footer="{ columnIndex, items }">
      <mc-title v-if="items[columnIndex]" :text-align="textAlign">
        {{ items[columnIndex] }}
      </mc-title>
      <template v-else-if="getVisibilityCommonInfo(columnIndex, items)">
        <mc-title v-if="!provideData.canShowLoader" class="mc-table-col__title">
          {{ provideData.placeholders.all_loaded }}
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

/**
 * Смотреть mc-table
 */
export default {
  name: "McTableCol",
  components: {
    McTitle,
    McSvgIcon,
  },
  inject: ["provideData"],
  props: {
    hasBorder: {
      type: Boolean,
      default: false,
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
        return "unfold_more"
      }
      if (!column.order) return "unfold_more"
      return column.order === "desc" ? "arrow_downward" : "arrow_upward"
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
@import "~vxe-table/styles/variable.scss"; //??
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
  &--border-right {
    border-right: 1px solid $color-outline-gray;
  }
  &--border-top {
    border-top: 1px solid $color-outline-gray;
  }
  &--border-bottom {
    border-bottom: 1px solid $color-outline-gray;
  }
  &--overflow-visible {
    .vxe-cell {
      overflow: visible !important;
    }
  }

  &__title {
    width: auto;
    max-width: 101%;
  }
  &__right {
    display: flex;
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
}

.vxe-cell {
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