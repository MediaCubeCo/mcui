<template>
    <div :class="[`mc-notification--variation-${variation}`]" class="mc-notification">
        <div class="mc-notification__inner">
            <mc-preview>
                <!-- @slot Слот для иконки -->
                <slot v-if="!hideIcon && ($slots.left || iconName)" slot="left" name="left">
                    <mc-svg-icon :name="iconName" size="300" />
                </slot>

                <!-- @slot Слот заголовка -->
                <slot v-if="$slots.header || title" slot="top" name="header">
                    <mc-title
                        v-if="title"
                        :color="variation"
                        :ellipsis="false"
                        weight="semi-bold"
                        class="mc-notification__text"
                    >
                        {{ title }}
                    </mc-title>
                </slot>

                <div slot="bottom" class="mc-notification__text">
                    <!-- @slot Слот для контента -->
                    <slot>
                        <mc-title :color="variation" :ellipsis="false" max-width="100%">
                            {{ content }}
                        </mc-title>
                    </slot>
                </div>

                <!-- @slot Слот для кнопок -->
                <slot v-if="$slots.right || isButtonVisible" slot="right" name="right">
                    <mc-button
                        v-if="isButtonVisible"
                        slot="right"
                        :variation="variation"
                        class="mc-notification__button"
                        @click="handleClick"
                    >
                        {{ buttonText }}
                    </mc-button>
                </slot>
            </mc-preview>
        </div>
    </div>
</template>

<script>
import McTitle from '../McTitle/McTitle.vue'
import McSvgIcon from '../McSvgIcon/McSvgIcon.vue'
import McButton from '../McButton/McButton.vue'
import McPreview from '../../patterns/McPreview/McPreview'

export default {
    name: 'McNotification',
    components: { McPreview, McTitle, McSvgIcon, McButton },
    props: {
        /**
         * Дизайн:
         * blue, red, orange и т.д.
         */
        variation: {
            type: String,
            default: 'blue',
        },
        /**
         * Заголовок блока
         */
        title: {
            type: String,
        },
        /**
         * Содержимое блока
         */
        content: {
            type: String,
            default: '',
        },
        /**
         * Отобразить кнопку внтури блока
         */
        isButtonVisible: {
            type: Boolean,
            default: false,
        },
        /**
         * Текст кнопки
         */
        buttonText: {
            type: String,
            default: '',
        },
        /**
         * Название иконки
         */
        iconName: {
            type: String,
            default: 'info',
        },
        /**
         * Не отображать иконку
         */
        hideIcon: {
            type: Boolean,
            default: false,
        },
    },
    computed: {},
    methods: {
        handleClick(e) {
            /**
             * Событие клика по кнопке
             */
            this.$emit('click', e)
        },
    },
}
</script>

<style lang="scss">
.mc-notification {
    $block-name: &;

    position: relative;
    background-color: $color-white;
    border-radius: $radius-150;
    overflow: hidden;

    &:before {
        content: '';
        @include position(absolute, 0 null null 0);
        display: block;
        height: 100%;
        width: $size-50;
        background-color: $color-orange;
    }

    &__text {
        font-size: $font-size-200;
        line-height: $line-height-200;
    }

    &__inner {
        padding: $space-100 $space-150 $space-100 $space-200;
        min-height: $size-700;
        display: flex;
        align-items: center;

        .mc-preview {
            width: 100%;
            &__top {
                margin-bottom: $space-50;
            }
            &__left {
                display: flex;
                align-items: center;
                margin-right: $size-150;
            }
            &__right {
                display: flex;
                align-items: center;
                margin-left: auto;
                padding-left: $space-100;
            }
        }

        @media #{$media-query-m-down} {
            .mc-preview {
                flex-wrap: wrap;

                &__center {
                    flex: 1;
                }
                &__right {
                    width: 100%;
                    padding: $space-100 0 0 $size-400 - 2;
                }
            }
        }
    }

    @each $variation, $value in $token-colors {
        &--variation-#{$variation} {
            &:before {
                background-color: $value;
            }
            #{$block-name}__inner {
                background-color: rgba($value, 0.1);
                color: $value;
            }
            #{$block-name}__text {
                filter: contrast(59%);
            }
        }
    }
}
</style>
