<template>
  <section
      v-show="isActive"
      :aria-hidden="!isActive"
      class="tabs-component-panel"
      :id="computedId"
      role="tabpanel"
  >
    <!-- @slot контента -->
    <slot />
  </section>
<!--  <tab class="mc-tab" :id="id" :name="name" :prefix="prefix" :suffix="suffix" :is-disabled="isDisabled">-->
<!--        &lt;!&ndash; @slot контента &ndash;&gt;-->
<!--        <slot />-->
<!--  </tab>-->
</template>

<script>
import Tab from "vue-tabs-component/src/components/Tab"

export default {
  name: "McTab",
  // components: { Tab },
  extends: Tab,
  props: {
    /**
     *  Если нужен иной фрагмент в url после #
     *  (по умолчанию берётся из 'name')
     */
    id: {
      default: null
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
      default: ""
    },
    /**
     *  Вставка в конец имени таба
     *  (не влияет на значение вставленное в url)
     */
    suffix: {
      default: ""
    },
    /**
     *  Отключенное состояние
     */
    isDisabled: {
      default: false
    },
  },
}
</script>

<style lang="scss">
.tabs-component-panel {
  $block-name: &;
}
</style>
