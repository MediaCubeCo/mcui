<template>
  <div class="mc-grid-row" :class="classes" :style="styles">
    <!-- @slot Слот для дочерних mc-grid-col -->
    <slot />
  </div>
</template>

<script>
import McGridCol from "../McGridCol/McGridCol"

export default {
  name: "McGridRow",
  components: { McGridCol },
  provide() {
    const provideData = {}
    const properties = [
      "gutterX",
      "gutterY",
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
    /**
     *  Расстояние между колонками по горизонтали
     */
    gutterX: {
      type: Number,
      default: 0,
    },

    /**
     *  Расстояние между колонками по вертикали
     */
    gutterY: {
      type: Number,
      default: 0,
    },

    /**
     *  Выравнивание по горизонтали
     */
    justify: {
      type: String,
      default: "left",
      validator: function(value) {
        return ["left", "right", "center", "around", "between"].indexOf(value) !== -1
      },
    },

    /**
     *  Выравнивание по вертикали
     */
    align: {
      type: String,
      default: "top",
      validator: function(value) {
        return ["top", "middle", "bottom", "stretch"].indexOf(value) !== -1
      },
    },

    /**
     *  Автоматически тянущиеся колонки
     */
    stretch: {
      type: Boolean,
      default: false,
    },

    /**
     *  Перенос колонок
     */
    wrap: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    classes() {
      return {
        [`mc-grid-row--justify-${this.justify}`]: this.justify,
        [`mc-grid-row--align-${this.align}`]: this.align,
        ["mc-grid-row--stretch"]: this.stretch,
      }
    },

    styles() {
      let result = {}

      if (this.gutterX !== 0) {
        result["margin-left"] = `${-this.gutterX / 2}px`
        result["margin-right"] = `${-this.gutterX / 2}px`
      }

      if (this.gutterY !== 0) {
        result["margin-top"] = `${-this.gutterY / 2}px`
        result["margin-bottom"] = `${-this.gutterY / 2}px`
      }

      if (this.wrap) {
        result["flex-wrap"] = "wrap"
      }

      return result
    },
  },
}
</script>

<style lang="scss">
$justify: (
    "left": "flex-start",
    "right": "flex-end",
    "center": "center",
    "around": "space-around",
    "between": "space-between"
);
$align: ("top": "flex-start", "middle": "center", "bottom": "flex-end", "stretch": "stretch");
.mc-grid-row {
  $block-name: &;

  display: flex;
  flex-direction: row;

  @each $key, $value in $justify {
    &.mc-grid-row--justify-#{$key} {
      justify-content: #{$value};
    }
  }
  @each $key, $value in $align {
    &.mc-grid-row--align-#{$key} {
      align-items: #{$value};
    }
  }

  &--stretch {
    > .mc-grid-col {
      flex: 1;
    }
  }
}
</style>
