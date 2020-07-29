<template>
  <div class="mc-grid-col" :class="classes" :style="styles">
    <!-- @slot Слот контента -->
    <slot />
  </div>
</template>

<script>
import _upperFirst from "lodash/upperFirst"
const values = ["span", "order", "offset", "push", "pull"]
const sizes = ["s", "m", "l", "xl", "xxl"]
const props = {}

values.forEach(value => {
  sizes.forEach(size => {
    props[`${value}-${size}`] = { type: Number }
  })
})

// const getClasses = (props, data) => {
//   let classes = {
//     'mc-grid-col': true,
//     ...(data.class || {}),
//   }
//   values.forEach(value => {
//     classes[`mc-grid-col--${value}-${props[value]}`] = props[value]
//     sizes.forEach(size => {
//       const sizeValue = props[`${value}${_upperFirst(size)}`]
//       classes[`mc-grid-col--${value}-${size}-${sizeValue}`] = sizeValue
//     })
//   })
//
//   if (data.staticClass) {
//     const staticClasses = data.staticClass.split(" ")
//     staticClasses.forEach(c => c && (classes[c] = true))
//   }
//   return classes
// }
//
// const getStyles = (props, data) => {
//   let colStyle = {}
//   if (data.staticStyle) {
//     colStyle = data.staticStyle
//   }
//
//   if (gutterX !== 0) {
//     colStyle["padding-left"] = `${gutterX / 2}px`
//     colStyle["padding-right"] = `${gutterX / 2}px`
//   }
//
//   if (gutterY !== 0) {
//     colStyle["padding-top"] = `${gutterY / 2}px`
//     colStyle["padding-bottom"] = `${gutterY / 2}px`
//   }
//
//   if (props.stretchSelf) {
//     colStyle["flex"] = `1 0 ${props.basis}`
//   } else if (props.basis !== "auto") {
//     colStyle["flex"] = `0 0 ${props.basis}`
//   }
//   return props.order ? { ...colStyle, order: props.order } : colStyle
// }

export default {
  name: "McGridCol",
  // inject: { provideData: {
  //     default: () => ({
  //       gutterX: 0,
  //       gutterY: 0,
  //     })
  //   }},
  inject: ["provideData"],
  props: {
    /**
     *  Кол-во колонок (всего 12)
     */
    span: { type: Number },

    /**
     *  Очерёдность
     */
    order: { type: Number },

    /**
     *  Отступ (margin-left)
     */
    offset: { type: Number },

    /**
     *  Отступ (left)
     */
    push: { type: Number },

    /**
     *  Отступ (right)
     */
    pull: { type: Number },

    ...props,

    /**
     *  Автоматически тянущаяся колонка
     *  на всё свободное пространство
     */
    stretchSelf: {
      type: Boolean,
      default: false,
    },

    /**
     *  Основа флекса, которая является начальным размером элемента
     *  (указывать с единицами измерения: px, %...)
     */
    basis: {
      type: String,
      default: "auto",
    },
  },


  // render(h, { props, slots, data, injections }) {
  //   console.log(injections)
  //   gutterX = injections.provideData.gutterX
  //   gutterY = injections.provideData.gutterY
  //
  //   let classes = getClasses(props, data)
  //   let styles = getStyles(props, data)
  //
  //   return h(
  //     'div',
  //     {
  //       class: classes,
  //       style: styles,
  //     },
  //     [
  //       slots()["default"]
  //     ]
  //   )
  // },

  // data() {
  //   return {
  //     gutterX: 0,
  //     gutterY: 0,
  //   }
  // },

  computed: {
    classes() {
      const list = {}
      values.forEach(value => {
        list[`mc-grid-col--${value}-${this[value]}`] = this[value]
        sizes.forEach(size => {
          const sizeValue = this[`${value}${_upperFirst(size)}`]
          list[`mc-grid-col--${value}-${size}-${sizeValue}`] = sizeValue
        })
      })
      return list
    },

    styles() {
      let colStyle = {}

      if (this.provideData.gutterX !== 0) {
        colStyle["padding-left"] = `${this.provideData.gutterX / 2}px`
        colStyle["padding-right"] = `${this.provideData.gutterX / 2}px`
      }

      if (this.provideData.gutterY !== 0) {
        colStyle["padding-top"] = `${this.provideData.gutterY / 2}px`
        colStyle["padding-bottom"] = `${this.provideData.gutterY / 2}px`
      }

      if (this.stretchSelf) {
        colStyle["flex"] = `1 0 ${this.basis}`
      } else if (this.basis !== "auto") {
        colStyle["flex"] = `0 0 ${this.basis}`
      }

      return this.order ? { ...colStyle, order: this.order } : colStyle
    },
  },

  // mounted() {
  //   this.$parent.updateGutter()
  // },
}
</script>

<style lang="scss">
.mc-grid-col {
  $block-name: &;

  $cols: 12;

  display: block;
  position: relative;
  max-width: 100%;

  @mixin generate-col($viewport: "") {
    @for $i from 1 through $cols {
      &--span#{$viewport}-#{$i} {
        flex: 0 0 percentage($i / $cols);
        max-width: percentage($i / $cols);
      }

      &--push#{$viewport}-#{$i} {
        left: percentage($i / $cols);
      }

      &--pull#{$viewport}-#{$i} {
        right: percentage($i / $cols);
      }

      &--offset#{$viewport}-#{$i} {
        margin-left: percentage($i / $cols);
      }

      &--order#{$viewport}-#{$i} {
        order: #{$i};
      }
    }
  }

  @include generate-col("");

  @media #{$media-query-s} {
    @include generate-col("-s");
  }

  @media #{$media-query-m} {
    @include generate-col("-m");
  }

  @media #{$media-query-l} {
    @include generate-col("-l");
  }

  @media #{$media-query-xl} {
    @include generate-col("-xl");
  }
}
</style>
