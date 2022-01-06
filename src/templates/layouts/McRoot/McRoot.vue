<template>
    <div class="mc-root">
        <slot />
        <client-only v-if="ssr && includePanel">
            <slideout-panel :class="panelClass"></slideout-panel>
        </client-only>
        <slideout-panel v-else-if="includePanel" :class="panelClass"></slideout-panel>
    </div>
</template>

<script>
import 'normalize.css/normalize.css'
/**
 * Это обязательный компонент, с него начинается любой layout,
 * т.к. здесь находятся глобальные стили.
 */
export default {
    name: 'McRoot',
    props: {
        panelClass: {
            type: String,
            default: '',
        },
        ssr: {
            type: Boolean,
            default: false,
        },
        includePanel: {
            type: Boolean,
            default: true,
        },
    },
}
</script>

<style lang="scss">
.mc-root {
    $block-name: &;
    @import '../../../styles/global';
    .slideout {
        box-shadow: $shadow-s;
    }
}
</style>
