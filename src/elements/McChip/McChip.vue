<template>
    <section class="mc-chip" tabindex="0" :class="classes" :style="styles">
        <div v-if="$slots.icon" class="mc-chip__icon">
            <!-- @slot Слот для иконки -->
            <slot name="icon" />
        </div>
        <div v-if="title || $slots.default" class="mc-chip__title">
            <!-- @slot контента -->
            <slot>
                {{ title }}
            </slot>
        </div>
        <div v-if="counter || counter === 0" class="mc-chip__counter">
            {{ counter }}
        </div>
        <button v-if="closable" class="mc-chip__button" type="button" v-on="$listeners">
            <!-- @slot Слот для пользовательской кнопки -->
            <slot name="button">
                <mc-svg-icon size="200" name="cancel" />
            </slot>
        </button>
    </section>
</template>

<script>
import McSvgIcon from '../McSvgIcon/McSvgIcon'
export default {
    name: 'McChip',
    components: { McSvgIcon },
    props: {
        /**
         *  Text content
         *
         */
        title: {
            type: String,
            default: '',
        },
        /**
         *  Кнопка закрытия
         *
         */
        closable: {
            type: Boolean,
            default: false,
        },
        /**
         *  Дизайн:
         *  `purple, purple-invert т.д.`
         */
        variation: {
            type: String,
            default: 'transparent',
        },
        /**
         *  Счетчик
         *
         */
        counter: {
            type: [Number, String],
            default: null,
        },
        /**
         *  Размер
         *  m, m-compact, s, s-compact, xs, xs-compact
         */
        size: {
            type: String,
            default: 'm',
        },
        /**
         *  Если нужен
         *  иной цвет текста
         */
        textColor: {
            type: String,
            default: '',
        },
    },

    computed: {
        classes() {
            return {
                [`mc-chip--variation-${this.chipOptions.variation}`]: this.variation,
                [`mc-chip--size-${this.size}`]: this.size,
            }
        },
        chipOptions() {
            const variationProps = this.variation?.split('-')
            const currentVariation = variationProps[variationProps.length - 1]
            let color
            let variation
            switch (currentVariation) {
                case 'outline':
                case 'invert': {
                    variation = currentVariation
                    color = this.variation.replace(`-${currentVariation}`, '')
                    break
                }
                default: {
                    variation = 'default'
                    color = this.variation
                    break
                }
            }
            return {
                color,
                variation,
            }
        },
        styles() {
            const textColor = this.textColor || 'white'
            return {
                ['--mc-chip-color']: `var(--color-${this.chipOptions.color})`,
                ['--mc-chip-text-color']: `var(--color-${textColor})`,
            }
        },
    },
}
</script>

<style lang="scss">
@import '../../styles/mixins';
@import '../../tokens/durations';
@import '../../tokens/font-families';
.mc-chip {
    $block-name: &;
    --mc-chip-text-color: #{$color-black};
    --mc-chip-color: #{$color-white};
    overflow: hidden;
    display: inline-flex;
    position: relative;
    align-items: center;
    color: var(--mc-chip-color);
    font-family: $font-family-main;
    font-size: $font-size-200;
    line-height: $line-height-200;
    max-width: 100%;
    border-radius: 100px;
    vertical-align: middle;
    outline: none;
    z-index: 0;
    flex-shrink: 0;
    overflow: visible;
    &:before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        z-index: 0;
        @include size(100%);
        border-radius: inherit;
        background-color: var(--mc-chip-color);
    }
    > * {
        margin-right: $space-50;
        z-index: 1;
    }
    > *:first-child {
        margin-left: $space-50;
    }

    &--size {
        @mixin padding-x($space, $space-compact) {
            padding-right: $space;
            padding-left: $space;
            &-compact {
                padding-right: $space-compact;
                padding-left: $space-compact;
            }
        }

        &-m {
            &,
            &-compact {
                height: $size-400;
            }
            @include padding-x($space-100, $space-50);
        }
        &-s {
            &,
            &-compact {
                height: $size-300;
            }
            @include padding-x($space-100, $space-50);
        }
        &-xs {
            &,
            &-compact {
                height: $space-200;
                font-size: $font-size-100;
                line-height: $line-height-150;
            }

            @include padding-x($space-50, 0);
        }
    }

    &__icon {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 0;
    }

    &__title {
        @include ellipsis();
        @include layout-flex-fix();
        color: var(--mc-chip-text-color);
        &:empty {
            display: none;
        }
    }

    &__counter {
        flex: 0 0 auto;
        font-family: $font-family-main;
        font-size: $font-size-200;
        line-height: $line-height-200;
        color: $color-dark-gray;

        &:empty {
            display: none;
        }
    }

    &__button {
        @include size($size-200);
        position: relative;
        display: flex;
        flex: 0 0 auto;
        justify-content: center;
        align-items: center;
        padding: 0;
        margin-right: 0;
        border-radius: 0;
        user-select: none;
        text-decoration: none;
        text-transform: none;
        background-color: transparent;
        background-image: none;
        cursor: pointer;
        outline: 0;
        border: none;
        transition: all $duration-s;
        flex-wrap: nowrap;
        -webkit-appearance: none;
        -webkit-text-fill-color: currentColor;
        color: $color-dark-gray;
        opacity: 0.2;

        &:hover {
            opacity: 1;
            color: $color-red;
        }

        &:active {
            color: darken($color-red, 15%);
        }
    }

    &--variation {
        &-default {
            #{$block-name} {
                &__button {
                    color: var(--mc-chip-color);
                    &:hover {
                        opacity: 1;
                        color: $color-white;
                    }
                    &:active {
                        color: darken($color-white, 15%);
                    }
                }
                &__title {
                    color: var(--mc-chip-text-color);
                }
                &__counter {
                    color: var(--mc-chip-text-color);
                    opacity: 0.5;
                }
            }
        }
        &-outline {
            color: var(--mc-chip-color);
            border: 1px solid var(--mc-chip-color);
            &:before {
                display: none;
            }
        }
        &-invert {
            color: $color-black;
            &:before {
                background-color: var(--mc-chip-color);
                opacity: 0.10;
            }
        }
    }
}
</style>
