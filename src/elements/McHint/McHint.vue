<template>
    <div :class="[`mc-hint--variation-${variation}`]" class="mc-hint">
        <div class="mc-hint__inner">
            <div class="mc-hint__text">
                <mc-svg-icon v-bind="iconProps" />
                <div v-if="$slots.header || title" class="mc-hint__header">
                    <!-- @slot Слот заголовка -->
                    <slot name="header">
                        <mc-title v-if="title" :ellipsis="false" weight="semi-bold" class="mc-hint__title">
                            {{ title }}
                        </mc-title>
                    </slot>
                </div>
                <!-- @slot Слот для контента -->
                <slot>
                    <mc-title v-bind="textProps">
                        {{ content }}
                    </mc-title>
                </slot>
            </div>
            <mc-button v-if="isButtonVisible" v-bind="buttonProps" @click="handleClick">{{ buttonText }}</mc-button>
        </div>
    </div>
</template>

<script>
import McTitle from '../McTitle/McTitle.vue'
import McSvgIcon from '../McSvgIcon/McSvgIcon.vue'
import McButton from '../McButton/McButton.vue'

const setting = {
    info: {
        name: 'info',
        color: 'blue',
    },
    'info-green': {
        name: 'info',
        color: 'green',
    },
    success: {
        name: 'check_circle',
        color: 'green',
    },
    warning: {
        name: 'alert',
        color: 'orange',
    },
    error: {
        name: 'warning',
        color: 'red',
    },
}

export default {
    name: 'McHint',
    components: { McTitle, McSvgIcon, McButton },
    props: {
        /**
         * Дизайн:
         * info, info-green, success, warning, error
         */
        variation: {
            type: String,
            default: 'info',
        },
        /**
         * Заголовок блока
         */
        title: {
            type: String,
        },
        /**
         * Текст
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
    },
    computed: {
        iconProps() {
            return {
                ...(setting[this.variation] ?? setting['info']),
                size: '300',
                class: 'mc-hint__icon',
            }
        },
        textProps() {
            return {
                color: setting[this.variation]?.color ?? 'blue',
                maxWidth: '100%',
                ellipsis: false,
            }
        },
        buttonProps() {
            return {
                class: 'mc-hint__button',
                variation: setting[this.variation]?.color ?? 'info',
            }
        },
    },
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
.mc-hint {
    $block-name: &;

    position: relative;
    background-color: $color-white;
    border-radius: $radius-150;
    overflow: hidden;

    &:before {
        content: '';
        display: block;
        @include position(absolute, 0 null null 0);
        height: 100%;
        width: 4px;
        background-color: $color-orange;
    }

    &__inner {
        padding: $space-100;
        background-color: rgba($color-orange, 0.1);
        color: $color-orange;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-height: $size-700;

        @media #{$media-query-s-down} {
            flex-direction: column;
            align-items: flex-start;

            #{$block-name}__button {
                margin-right: auto;
                margin-left: $space-400 + 4;
                margin-top: $space-100;
            }
        }
    }

    &__header {
        margin-bottom: $space-50;
    }

    &__text {
        position: relative;
        padding-left: $space-500;
    }

    &__icon {
        content: '';
        display: block;
        @include position(absolute, 50% null null $space-50);
        transform: translateY(-50%);
    }

    &__button {
        margin-left: $space-200;
    }

    $token-variations: (
        'info': $color-blue,
        'info-green': $color-green,
        'success': $color-green,
        'warning': $color-yellow,
        'error': $color-red,
    );

    @each $variation, $value in $token-variations {
        &--variation-#{$variation} {
            &:before {
                background-color: $value;
            }
            #{$block-name}__inner {
                background-color: rgba($value, 0.1);
                color: $value;
            }
            #{$block-name}__title {
                color: $value;
            }
            #{$block-name}__text {
                filter: contrast(59%);
            }
        }
    }
}
</style>
