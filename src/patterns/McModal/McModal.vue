<template>
  <modal
      class="mc-modal"
      :name="name"
      scrollable
      adaptive
      height="auto"
      width="100%"
      :maxWidth="maxWidth"
      :click-to-close="clickToClose"
      @before-open="handleBeforeOpen"
      @before-close="handleBeforeClose"
      @closed="handleClosed"
      @opened="handleOpened"
  >
    <slot />
  </modal>
</template>

<script>
export default {
  name: "McModal",
  props: {
    name: {
      type: String,
      required: true,
    },
    /**
     *  Макс ширина
     */
    maxWidth: {
      type: Number,
      default: 510,
    },
    /**
     *  Показывать ли
     *  крестик закрытия
     */
    closeVisible: {
      type: Boolean,
      default: true,
    },
    /**
     *  Нужно ли закрывать попап
     *  кликом вне окна
     */
    clickToClose: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    handleBeforeOpen(event) {
      /**
       * Событие перед открытием
       * @property {Object}
       */
      this.$emit("beforeOpen", event)
    },
    handleBeforeClose(event) {
      /**
       * Событие перед закрытием
       * @property {Object}
       */
      this.$emit("beforeClose", event)
    },
    handleOpened(event) {
      /**
       * Событие после открытия
       * @property {Object}
       */
      this.$emit("opened", event)
    },
    handleClosed(event) {
      /**
       * Событие после закрытия
       * @property {Object}
       */
      this.$emit("closed", event)
    },
    close() {
      this.$modal.hide(this.name)
    },
  },
}
</script>

<style lang="scss">

</style>