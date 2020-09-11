<template>
  <section
      v-show="isActive"
      :aria-hidden="!isActive"
      class="tabs-component-panel"
      :id="computedId"
      role="tabpanel"
      :href="href"
      :to="to"
  >
    <!-- @slot контента -->
    <slot />
  </section>
</template>

<script>
import Tab from "vue-tabs-component/src/components/Tab"
import McSvgIcon from "../../McSvgIcon/McSvgIcon"
/**
 * Смотреть McTabs
 */
export default {
  name: "McTab",
  extends: Tab,
  components: {
    McSvgIcon,
  },
  props: {
    /**
     *  Если нужен иной фрагмент в url после #
     *  (по умолчанию берётся из 'name')
     */
    id: {
      type: String,
      default: '',
    },
    /**
     *  Имя таба
     */
    name: {
      required: true
    },
    /**
     *  Вставка в начало имени таба
     *  (не влияет на значение вставленное в url)
     */
    prefix: {
      type: String,
      default: ""
    },
    /**
     *  Вставка в конец имени таба
     *  (не влияет на значение вставленное в url)
     */
    suffix: {
      type: String,
      default: ""
    },
    /**
     *  Отключенное состояние
     */
    isDisabled: {
      type: Boolean,
      default: false
    },
    /**
     *  Классы иконки в начале
     */
    iconPrependClasses: {
      type: String,
      default: "",
    },
    /**
     *  Классы иконки в конце
     */
    iconAppendClasses: {
      type: String,
      default: "",
    },
    /**
     *  Цвет иконки в начале
     */
    iconPrependColor: {
      type: String,
      default: "",
    },
    /**
     *  Цвет иконки в конце
     */
    iconAppendColor: {
      type: String,
      default: "",
    },
    /**
     *  Если нужна ссылка внутри приложения:
     * `{name: 'test', params: { id: test.id }}`
     */
    to: {
      default: null,
    },
    /**
     *  Если нужна обычная ссылка:
     * `https://mediacube.agency/`
     */
    href: {
      type: String,
      default: "",
    },
  },
  computed: {
    computedPrefix() {
      const colorClass = this.iconPrependColor ? ` tabs-component-tab__icon-prepend--color-${this.iconPrependColor}` : ''
      const classes = `${this.iconPrependClasses}${colorClass}`
      return this.iconPrependClasses ? `<span class="${classes}"></span>` : this.prefix
    },
    computedSuffix() {
      const colorClass = this.iconAppendColor ? ` tabs-component-tab__icon-append--color-${this.iconAppendColor}` : ''
      const classes = `${this.iconAppendClasses}${colorClass}`
      return this.iconAppendClasses ? `<span class="${classes}"></span>` : this.suffix
    },
    header() {
      return `${this.computedPrefix}` +
              `<span class="tabs-component-tab__tab-name" data-name="${this.name}">${this.name}</span>` +
              `${this.computedSuffix}`
    },
  },
}
</script>

<style lang="scss">
.tabs-component-panel {
  $block-name: &;
}
</style>
