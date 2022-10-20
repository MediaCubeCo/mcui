<template>
    <section class="mc-table-card-header">
        <div class="mc-table-card-header__left">
            <!-- @slot Слот контента -->
            <slot>
                <mc-button :to="backTo" exact variation="purple-link" size="xs">
                    <mc-svg-icon slot="icon-prepend" name="keyboard_arrow_left" />
                    {{ buttonBackText }}
                </mc-button>
            </slot>
        </div>
        <div class="mc-table-card-header__right">
            <!-- @slot right -->
            <slot name="right" />
        </div>
    </section>
</template>

<script>
import McButton from '../../../elements/McButton/McButton'
import McSvgIcon from '../../../elements/McSvgIcon/McSvgIcon'
export default {
    name: 'McTableCardHeader',
    components: {
        McButton,
        McSvgIcon,
    },
    props: {
        buttonBackText: {
            type: String,
            default: 'Back',
        },
        backTo: {
            type: String,
            default: '#',
        },
    },
}
</script>

<style lang="scss">
.mc-table-card-header {
    $block-name: &;

    display: flex;
    flex-wrap: nowrap;
    background-color: $color-white;
    padding: 0 $space-200 0 $space-150;
    align-items: center;
    height: 100%;

    &__left,
    &__right {
        @include layout-flex-fix();
        display: flex;
        flex-wrap: nowrap;
        @include child-indent-right($space-200);

        &:empty {
            display: none;
        }
    }

    &__left {
        margin-right: auto;
    }

    &__right {
        margin-left: auto;
    }
}
</style>
