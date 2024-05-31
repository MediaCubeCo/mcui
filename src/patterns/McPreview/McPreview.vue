<template>
    <section :class="classes">
        <div v-if="$slots.left" class="mc-preview__left">
            <!-- @slot Слот слева -->
            <slot name="left" />
        </div>
        <div class="mc-preview__center">
            <div class="mc-preview__top">
                <!-- @slot Слот сверху -->
                <slot name="top" />
            </div>
            <div class="mc-preview__bottom">
                <!-- @slot Слот внизу -->
                <slot name="bottom" />
            </div>
        </div>
        <div v-if="$slots.right" class="mc-preview__right">
            <!-- @slot Слот справа -->
            <slot name="right" />
        </div>
    </section>
</template>

<script>
export default {
    name: 'McPreview',
    props: {
        /**
         *  Размеры:
         *  `s, m, l`
         */
        size: {
            type: String,
            default: 'm',
        },
    },
    computed: {
        classes() {
            return {
                'mc-preview': true,
                [`mc-preview--size-${this.size}`]: this.size,
            }
        },
    },
}
</script>

<style lang="scss">
@import '../../styles/mixins';
.mc-preview {
    $block-name: &;

    @include reset-text-indents();
    display: flex;
    flex-wrap: nowrap;
    max-width: 100%;

    &__left {
        flex: 0 0 auto;
        &:empty {
            display: none;
        }
    }

    &__center {
        @include layout-flex-fix();
        flex: 1 1 auto;
        align-self: center;
    }

    &__top {
        &:empty {
            display: none;
        }
    }

    &__bottom {
        &:empty {
            display: none;
        }
    }

    &__right {
        flex: 0 0 auto;
        &:empty {
            display: none;
        }
    }
    @mixin previewIndents($indent, $bottom: '') {
        #{$block-name}__left {
            margin-inline-end: $indent;
        }
        #{$block-name}__right {
            margin-inline-start: $indent;
        }
        @if $bottom {
            #{$block-name}__bottom {
                margin-top: $bottom;
            }
        }
    }

    &--size {
        &-s {
            @include previewIndents($space-50);
        }
        &-m {
            @include previewIndents($space-100);
        }
        &-l {
            @include previewIndents($space-150, $space-50);
        }
        &-xl {
            @include previewIndents($space-200, $space-50);
        }
    }
}
</style>
