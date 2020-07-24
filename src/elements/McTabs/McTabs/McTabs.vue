<template>
  <tabs
    class="mc-tabs"
    :class="classes"
    :cache-lifetime="cacheLifetime"
    :options="{ useUrlFragment, defaultTabHash }"
    @changed="e => changedHandler(e)"
    ref="tabs"
  >
    <!-- @slot для табов -->
    <slot />
  </tabs>
</template>

<script>
import Tabs from "vue-tabs-component/src/components/Tabs"
import McTab from "../McTab/McTab"

export default {
  name: "McTabs",
  components: {
    McTab,
    Tabs,
  },
  props: {
    /**
     *  Оличество закешированных
     *  переходов по табам
     */
    cacheLifetime: {
      default: 5,
    },
    useUrlFragment: {
      default: false,
    },
    defaultTabHash: {
      default: null,
    },
    /**
     *  Размеры табов:
     *  `body, caption, overline`
     */
    tabVariation: {
      type: String,
      default: "caption",
    },
    /**
     *  Цвет текста табов
     */
    color: {
      type: String,
      default: "black",
    },
    /**
     *  Цвет линии активного таба
     */
    accentColor: {
      type: String,
      default: "blue",
    },
    /**
     *  Заглавные буквы
     *  табов
     */
    uppercase: {
      type: Boolean,
      default: false,
    },
    /**
     *  Массив номеров табов (с конца)
     *  для добавления ссылочной иконки
     */
    lastTabLink: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    classes() {
      const result = {
        [`mc-tabs--color-${this.color}`]: this.color,
        [`mc-tabs--accent-color-${this.accentColor}`]: this.accentColor,
        [`mc-tabs--tab-variation-${this.tabVariation}`]: this.tabVariation,
        [`mc-tabs--uppercase`]: this.uppercase,
      }
      this.lastTabLink.forEach(num => {
        result[`mc-tabs--last-tab-link-${num}`] = num
      })
      return result
    },
  },
  methods: {
    changedHandler(e) {
      /**
       * Событие при смене таба
       * @property {Object}
       */
      this.$emit("changed", e)
    },
    getActiveTab() {
      return this.$refs.tabs.getActiveTab()
    },
  },
}
</script>

<style lang="scss">
$last-childs: (
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
);

.mc-tabs {
  $block-name: &;

  @mixin border() {
    &::before {
      @include pseudo();
      @include position(absolute, auto 0 0 0);
      height: 1px;
      background-color: $color-outline-gray;
    }
  }

    &--tab-variation {
      &-body {
        .tabs-component-tab-a {
          font-size: $font-size-300;
          line-height: $line-height-250;
        }
      }
      &-caption {
        .tabs-component-tab-a {
          font-size: $font-size-200;
          line-height: $line-height-200;
        }
      }
      &-overline {
        .tabs-component-tab-a {
          font-size: $font-size-100;
          line-height: $line-height-150;
        }
      }
    }

  &--color {
    @each $color, $value in $token-colors {
      &-#{$color} {
        .tabs-component-tab-a {
          color: $value;
        }
      }
    }
  }

  &--accent-color {
    @each $color, $value in $token-colors {
      &-#{$color} {
        .tabs-component-tab-a {
          &::after {
            background-color: $value;
          }
        }
      }
    }
  }

  &--uppercase {
    .tabs-component-tabs {
      text-transform: uppercase;
    }
  }

  .tabs-component-tabs {
    @include reset-text-indents();
    position: relative;
    padding-left: 0;
    margin-top: 0;
    list-style-type: none;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;

    @include border();
  }

  .tabs-component-tab {
    position: relative;
    flex: 0 0 auto;

    &.is-active {
      .tabs-component-tab-a {
        &::after {
          left: 0;
          right: 0;
          opacity: 1;
        }
      }
    }
      &.is-disabled {
          .tabs-component-tab-a {
              cursor: auto;
          }
      }
  }

  .tabs-component-tab-a {
    display: inline-flex;
    font-family: $font-family-main;
    //line-height: $line-height-200;
    //font-size: $font-size-200;
    font-weight: $font-weight-medium;
    text-decoration: none;
    padding: 0 $space-100 $space-150;

    @include border();

    &::after {
      @include pseudo();
      @include position(null, null 50% 0 50%);
      opacity: 0;
      height: 2px;
      z-index: 1;
      transition: left 0.2s ease, right 0.2s ease, opacity 0.2s ease, color 0.2s ease;
    }
  }

  @each $title, $value in $last-childs {
    &--last-tab-link-#{$title} {
      & .tabs-component-tab {
        position: relative;
        &:nth-last-child(#{$value}) {
          &:after {
            content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z'/%3E%3C/svg%3E");
            display: block;
            @include position(absolute, 0 1px null null);
            //transform: translateY(-50%);
            @include size($size-150);
            z-index: 2;
          }

          & .tabs-component-tab-a {
            padding-right: $space-250;
            z-index: 3;
            position: relative;
          }
        }
      }
    }
  }
}
</style>
