<template>
  <div class="mc-accordion">
    <!-- @slot Слот для дочерних mc-collapse -->
    <slot />
  </div>
</template>

<script>
import { findChildrenComponents } from "../../utils/treeSearch"

/**
 * Работает с дочерними mc-collapse
 */
export default {
  name: "McAccordion",
  created() {
    this.$on("toggle", value => this.handleToggle(value))
  },
  mounted() {
    const $collapse = findChildrenComponents(this, "McCollapse")
    $collapse.forEach($child => {
      $child.parentIsAccordion = true
    })
  },
  beforeDestroy() {
    this.$off("toggle")
  },
  data() {
    return {
      isClosed: true,
    }
  },

  methods: {
    handleToggle({ value, component }) {
      const $collapse = findChildrenComponents(this, "McCollapse")
      this.isClosed = $collapse.every($child => !$child.isCollapsed)

      if (!value) return

      $collapse.forEach($child => {
        if (component !== $child) $child.close()
      })
    },
  },
}
</script>

<style lang="scss">
.mc-accordion {
  $block-name: &;
}
</style>
