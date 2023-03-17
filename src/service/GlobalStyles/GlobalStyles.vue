<template>
    <div class="global-styles">
        <slot />
    </div>
</template>

<script>
/**
 * Это служебный компонент, для отображения
 * документации по глобальным стилям
 */
export default {
    name: 'GlobalStyles',
}
</script>

<style lang="scss">
.global-styles {
    $block-name: &;
}
</style>
