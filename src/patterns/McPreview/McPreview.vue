<template>
    <section class="mc-preview" :class="classes">
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
                [`mc-preview--size-${this.size}`]: this.size,
            }
        },
    },
}
</script>

<style lang="scss">
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

    &--size {
        &-s {
            #{$block-name}__left {
                margin-right: $space-50;
            }
            #{$block-name}__right {
                margin-left: $space-50;
            }
        }
        &-m {
            #{$block-name}__left {
                margin-right: $space-100;
            }
            #{$block-name}__right {
                margin-left: $space-100;
            }
        }
        &-l {
            #{$block-name}__left {
                margin-right: $space-150;
            }
            #{$block-name}__right {
                margin-left: $space-150;
            }
            #{$block-name}__bottom {
                margin-top: $space-50;
            }
        }
        &-xl {
            #{$block-name}__left {
                margin-right: $space-200;
            }
            #{$block-name}__right {
                margin-left: $space-200;
            }
            #{$block-name}__bottom {
                margin-top: $space-50;
            }
        }
    }
}
html[dir='rtl'] {
    .mc-preview {
        &--size {
            &-s {
                .mc-preview__left {
                    margin-right: unset;
                    margin-left: $space-50;
                }
                .mc-preview__right {
                    margin-left: unset;
                    margin-right: $space-50;
                }
            }
            &-m {
                .mc-preview__left {
                    margin-right: unset;
                    margin-left: $space-100;
                }
                .mc-preview__right {
                    margin-left: unset;
                    margin-right: $space-100;
                }
            }
            &-l {
                .mc-preview__left {
                    margin-right: unset;
                    margin-left: $space-150;
                }
                .mc-preview__right {
                    margin-left: unset;
                    margin-right: $space-150;
                }
                .mc-preview__bottom {
                    margin-top: $space-50;
                }
            }
            &-xl {
                .mc-preview__left {
                    margin-right: unset;
                    margin-left: $space-200;
                }
                .mc-preview__right {
                    margin-right: $space-200;
                    margin-left: unset;
                }
                .mc-preview__bottom {
                    margin-top: $space-50;
                }
            }
        }
    }
}
</style>
