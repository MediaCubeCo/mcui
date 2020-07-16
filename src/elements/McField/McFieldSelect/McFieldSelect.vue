<template>
  <div class="mc-field-select" :class="classes">
    <div :for="name" class="mc-field-select__header">
      <!-- @slot Слот заголовка -->
      <slot name="header">
        <mc-title :ellipsis="false" v-if="title" :level="4">{{ title }}</mc-title>
      </slot>
    </div>
    <div class="mc-field-select__main">
      <multi-select
        :value="_value"
        :options="options"
        label="name"
        track-by="value"
        :searchable="searchable"
        :show-labels="showLabels"
        :multiple="multiple"
        :hide-selected="hideSelected"
        :allow-empty="allowEmpty"
        :open-direction="openDirection"
        :taggable="taggable"
        :tag-placeholder="''"
        :placeholder="placeholder"
        :disabled="disabled"
        :internal-search="internalSearch"
        @input="handleChange"
        @tag="handleTag"
        @search-change="handleSearchChange"
      >
        <template slot="singleLabel" slot-scope="{ option }">
          <div v-if="avatar" class="mc-field-select__avatar-wrap">
            <div class="mc-field-select__avatar">
              <mc-avatar size="xs" :src="avatar" />
            </div>
            <div class="mc-field-select__avatar-text">
              {{ option ? option.name : this.placeholder }}
            </div>
          </div>
          <template v-else>
            <div class="mc-field-select__avatar-wrap">
              <div class="mc-field-select__avatar-text mc-field-select__avatar-text--no-img">
                {{ option ? option.name : this.placeholder }}
              </div>
            </div>
          </template>
        </template>
        <template v-if="optionsTooltip" slot="option" slot-scope="{ option }">
          <mc-tooltip
            max-width="m"
            class="options-tooltip-target"
            color="black"
            placement="top"
            :content="option.name"
          >
            <span>{{ option.name }}</span>
          </mc-tooltip>
        </template>
        <!-- @slot Слот для текста, если ничего не найдено -->
        <slot slot="noResult" name="noResult">
          <span>Ничего не найдено</span>
        </slot>
      </multi-select>
    </div>
    <div class="mc-field-select__footer" v-if="errorText || helpText || $slots.footer">
      <mc-title tag-name="div" :ellipsis="false" color="red" size="s" v-if="errorText">
        {{ errorText }}
      </mc-title>
      <br v-if="errorText" />
      <!-- @slot Слот доп. текста под инпутом -->
      <slot name="footer">
        <mc-title tag-name="div" :ellipsis="false" size="s" v-if="helpText">{{
          helpText
        }}</mc-title>
      </slot>
    </div>
  </div>
</template>

<script>
import MultiSelect from "vue-multiselect"
import "vue-multiselect/dist/vue-multiselect.min.css"
import McTitle from "../../McTitle/McTitle"
import McTooltip from "../McTooltip"
import McAvatar from "../../McAvatar/McAvatar"
export default {
  name: "McFieldSelect",
  components: { McAvatar, McTitle, McTooltip, MultiSelect },
  data() {
    return {
      searchValue: null,
    }
  },
  props: {
    /**
     *  Заголовок поля:
     *
     */
    title: {
      type: String,
      default: null,
    },

    /**
     *  Вспомогательный текст под инпутом:
     *
     */
    helpText: {
      type: String,
      default: null,
    },

    options: {
      type: Array,
      required: true,
    },

    searchable: {
      type: Boolean,
      default: true,
    },

    multiple: {
      type: Boolean,
      default: false,
    },

    hideSelected: {
      type: Boolean,
      default: false,
    },

    allowEmpty: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    avatar: {
      type: String,
      default: null,
    },

    backgroundColor: {
      type: String,
      default: null,
    },

    placeholder: {
      type: String,
      default: "",
    },
    /**
     * Направление открытия списка:
     * `above (top), below (bottom), auto`
     */
    openDirection: {
      type: String,
      default: "bottom",
    },

    taggable: {
      type: Boolean,
      default: false,
    },

    showLabels: {
      type: Boolean,
      default: false,
    },

    internalSearch: {
      type: Boolean,
      default: true,
    },

    value: {
      default: null,
    },

    errors: {
      type: Array,
      default: null,
    },

    name: {
      type: String,
      default: null,
    },

    optionsTooltip: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        "mc-field-select--error": this.errorText,
        "mc-field-select--disabled": this.disabled,
        [`mc-field-select--bg-${this.backgroundColor}`]: this.backgroundColor,
        "mc-field-select--is-empty-options-list": this.isEmptyOptionsList,
      }
    },
    _value() {
      if (this.multiple) {
        if (this.value == null) return []
        let result = []
        for (let value of this.value) {
          let option = this.options.find(o => {
            if (o.value.hasOwnProperty("id") && o.value.id == value.id) {
              return true
            }
            return o.value == value
          })
          if (option !== null) result.push(option)
        }
        return result
      }
      return this.options.find(o => o.value == this.value)
    },

    errorText() {
      if (this.errors === null || !this.errors.length) return null
      return this.errors.join(", ")
    },
    isEmptyOptionsList() {
      if (this.hideSelected && !this.searchValue) {
        if (this.multiple) {
          return this.options.length === this._value.length
        } else {
          return this._value && this.options.length === 1
        }
      }
      return false
    },
  },
  methods: {
    handleChange(value) {
      /**
       * Истинное значение инпута
       */
      this.$emit("original-input", value)
      if (value !== null) {
        if (this.multiple) {
          value = value.map(v => v.value)
        } else {
          value = value.value
        }
      }
      this.emitInput(value)
    },

    handleTag(value) {
      /**
       * Событие по добавлению
       * тега в инпут (по Enter)
       * @property {string}
       */
      this.$emit("tag", value)
    },

    handleSearchChange(value) {
      this.searchValue = value
      /**
       * Событие по вводу данных в инпут
       * @property {string}
       */
      this.$emit("search-change", value)
    },

    emitInput(value) {
      /**
       * Событие инпута (выбранное значение)
       * @property {array, number}
       */
      this.$emit("input", value)
    },
  },
}
</script>

<style lang="scss">
$colors: $token-colors;
$gray-scale: "light-gray", "gray-darkest", "black";
$text-black: scale-color($color-black, $alpha: -10%);
$text-white: scale-color($color-white, $alpha: -10%);

.mc-field-select {
  $block-name: &;

  @include custom-scroll();
  font-family: $font-heading;

  &__header {
    @include reset-text-indents();
    display: block;
    margin-bottom: $space-xs;

    &:empty {
      display: none;
    }
  }

  &__footer {
    margin-top: $space-xxxs;

    &:empty {
      display: none;
    }
  }

  &__avatar-wrap {
    @include reset-text-indents();
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
  }

  &__avatar {
    position: absolute;
    left: -$space-xs;
    top: -$space-xxxs;
  }

  &__avatar-text {
    @include ellipsis();
    font-size: $size-m;
    line-height: $line-height-s;
    padding-left: $space-m;
    color: $color-black;

    &--no-img {
      padding-left: 0;
    }
  }

  .multiselect {
    &__placeholder {
      @include ellipsis();
      color: $color-gray-dark;
      font-size: $size-m;
      line-height: $line-height-s;
      margin-bottom: $space-xs;
      padding-top: $space-xs + 1;
    }

    &__single {
      padding-left: 0;
      margin-bottom: $space-xs;
      padding-top: $space-xs + 1;
      background-color: transparent;

      @include input-placeholder() {
        color: $color-gray-dark;
      }
    }

    &__input {
      padding-left: 0;
      margin-bottom: $space-xs;
      padding-top: $space-xs + 1;

      @include input-placeholder() {
        color: $color-gray-dark;
      }
    }

    &__select {
      height: $tappable-element-m - 2px;
      &::before {
        border-color: $text-black transparent transparent;
      }
    }

    &__tags {
      @include reset-text-indents();
      border: 1px solid $color-outline-gray;
      border-radius: $radius-m !important;
      padding: $space-xxxs - 1 $tappable-element-m 0 $space-s;
    }

    &__tags-wrap {
      padding-bottom: $space-xxxs;
      position: relative;
      top: $space-xxxs - 1;
      display: flex;
      flex-wrap: wrap;
      margin-top: -$space-xxxs + 1;
      min-height: $tappable-element-m - 4px;
      margin-left: -$space-xs;
    }

    &__tag {
      font-family: $font-heading;
      margin-top: $space-xxxs;
      background-color: fade-out($color-blue, 0.9);
      color: $color-black;
      display: inline-flex;
      align-items: center;
      padding: $space-xxxs $space-xs $space-xxxs $space-m / 2;
      border-radius: $radius-xxxxl;
      font-size: $size-m - 1;
      height: $tappable-element-s;
      margin-bottom: $space-xxxs;
      margin-right: $space-xxs - 1;

      span {
        @include ellipsis();
        flex: 1 1 auto;
        overflow: visible;
      }
    }

    &__tag-icon {
      @include size($tappable_element_xxs + 2);
      position: relative;
      background-color: $color-blue;
      border-radius: $radius-circle;
      flex: 0 0 auto;

      &:hover {
        background-color: $color-red;
      }

      &::after {
        @include size($space-xs);
        position: absolute;
        color: #e0eeff;
        left: $space-xxs + 1;
        top: -$space-xxxs;
      }
    }

    &__content {
      padding: $space-xs;
      max-width: 100%;
    }

    &__content-wrapper {
      top: calc(100% + #{$space-xs});
      border: none;
      border-radius: $radius-l;
      box-shadow: $shadow-l;
      overflow-y: auto;
      overflow-x: hidden;
    }

    &--above {
      .multiselect__content-wrapper {
        bottom: calc(100% + #{$space-xs});
        top: auto;
      }
    }

    &__option {
      min-height: $tappable-element-l;
      display: flex;
      align-items: center;
      border-radius: $radius-m;
      padding: $space-xs;

      span {
        @include ellipsis();
      }

      &--highlight {
        background-color: $color-hover-gray;
        color: $color-black;
      }
    }

    &--active {
      .multiselect {
        &__tags {
          border-color: $color-blue;
        }
        &__select {
          &::before {
            border-color: $color-blue transparent transparent;
          }
        }
      }
    }
  }

  @each $color, $value in $token-colors {
    &--bg-#{$color} {
      .multiselect {
        &__tags {
          background-color: fade-out($value, 0.6);
        }

        @if $color != "white" {
          &__tags {
            border-color: transparent;
          }
        }

        &--active {
          .multiselect {
            &__tags {
              background-color: transparent;
              @if $color != "white" {
                border-color: $value;
              }
            }

            &__select {
              &:before {
                border-color: $text-black transparent transparent;
              }
            }
          }
        }
      }

      &#{$block-name}--disabled {
        .multiselect--disabled {
          .multiselect {
            &__tags {
              background-color: fade-out($value, 0.6);
              @if $color != "white" {
                border-color: transparent !important;
              }
            }

            &__select {
              &::before {
                border-color: $color-gray transparent transparent;
              }
            }
          }
        }
        & #{$block-name}__avatar-text {
          color: $color-gray-dark;
        }
      }

      @each $col-g in $gray-scale {
        @if $color == $col-g {
          #{$block-name}__avatar-text {
            color: $text-white;
          }

          .multiselect {
            &__tags {
              background-color: $value;
            }

            &__placeholder {
              color: $text-white;
            }

            &__select {
              &::before {
                border-color: $text-white transparent transparent;
              }
            }

            &--active {
              .multiselect {
                &__tags {
                  border-color: $color-black;
                }
              }
            }
          }

          &#{$block-name}--disabled {
            .multiselect--disabled {
              .multiselect {
                &__tags {
                  background-color: $value;
                }

                &__select {
                  &::before {
                    border-color: fade-out($color-outline-gray, 0.3) transparent transparent;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  &--error {
    .multiselect {
      &__tags {
        border-color: $color-red !important;
      }
    }
  }

  &--is-empty-options-list {
    .multiselect {
      &__content-wrapper {
        display: none !important;
      }
    }
  }

  &--disabled {
    .multiselect--disabled {
      opacity: 1;
      background: transparent;
      .multiselect {
        &__tags {
          border-color: $color-hover-gray;
          background-color: $color-hover-gray;
        }

        &__placeholder {
          color: $color-gray-dark;
        }

        &__single {
          & #{$block-name}__avatar-text {
            color: $color-gray-dark;
          }
        }

        &__select {
          background-color: transparent;

          &::before {
            border-color: $color-outline-gray transparent transparent;
          }
        }
      }
    }
  }

  .options-tooltip-target {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>

<docs>
  ```jsx
  let categories = require('../../mocks/categories').default
  let categoriesModel = []
  let categoriesModel2 = []
  let categoriesModel3 = []
  let categoriesModel4 = 4
  <div style="max-width: 400px">
    <mc-field-select
            title="Multiple"
            allow-empty
            multiple
            taggable
            hide-selected
            searchable
            v-model="categoriesModel"
            :options="categories.map(c => ({ name: c.title, value: c.id }))"
            placeholder="Multiple"
            :errors="['Имя пользователя и пароль не совпадают', 'Поле обязательно для заполнения.']"
            open-direction="auto"
    />

    <br>
    <mc-field-select
            help-text="Используйте электронный адрес, указанный при регистрации аккаунта MediaCube."
            title="Single"
            allow-empty
            :multiple="false"
            v-model="categoriesModel2"
            :options="categories.map(c => ({ name: c.title, value: c.id }))"
            placeholder="One"/>

    <br>
    <mc-field-select
            disabled
            title="Disabled"
            allow-empty
            :multiple="false"
            v-model="categoriesModel3"
            :options="categories.map(c => ({ name: c.title, value: c.id }))"
            placeholder="One"/>
    <br>
    <mc-field-select
            background-color="azure"
            title="Цветной"
            avatar="https://yt3.ggpht.com/a/AGF-l79FVckie4j9WT-4cEW6iu3gPd4GivQf_XNSWg=s800-mo-c-c0xffffffff-rj-k-no"
            v-model="categoriesModel4"
            :options="categories.map(c => ({ name: c.title, value: c.id }))"
            :searchable="false"
    />
  </div>
  ```
</docs>
