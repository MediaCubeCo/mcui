<template>
    <mc-tooltip
        class="mc-side-bar-button__tooltip"
        :content="compact && withTooltip ? title : ''"
        size="s"
        placement="right"
    >
        <mc-button v-bind="btnAttrs" v-on="$listeners">
            <mc-svg-icon
                v-if="icon"
                slot="icon-prepend"
                :fill="iconColor"
                class="mc-side-bar-button__icon"
                :name="icon"
            />
            <span
                v-if="icon && compact && (info || withIndicator)"
                slot="icon-prepend"
                class="mc-side-bar-button__dot"
            />
            <template v-if="!compact">
                {{ title }}
                <mc-chip
                    v-if="info || withIndicator"
                    slot="icon-append"
                    variation="blue"
                    class="mc-side-bar-button__chip"
                    :class="{ indicator: withIndicator }"
                >
                    {{ withIndicator ? '' : info }}
                </mc-chip>
            </template>
        </mc-button>
    </mc-tooltip>
</template>

<script>
import McButton from '../../../elements/McButton/McButton'
import McSvgIcon from '../../../elements/McSvgIcon/McSvgIcon'
import McChip from '../../../elements/McChip/McChip'
import McTooltip from '../../../elements/McTooltip/McTooltip'
export default {
    name: 'McSideBarButton',
    components: {
        McButton,
        McSvgIcon,
        McChip,
        McTooltip,
    },
    inject: ['provideData'],
    props: {
        /**
         *  Если нужна ссылка внутри приложения:
         * `{name: 'test', params: { id: test.id }}`
         */
        to: {
            default: null,
        },
        /**
         *  Если нужна обычная ссылка:
         * `https://mediacube.agency/`
         */
        href: {
            default: null,
        },
        /**
         *  Если нужна иконка
         */
        icon: {
            type: String,
            default: '',
        },
        /**
         *  Если нужен конкретный
         *  цвет иконки
         */
        iconColor: {
            type: String,
            default: 'currentColor',
        },
        /**
         *  Тайтл кнопки
         */
        title: {
            type: String,
            default: '',
        },
        /**
         *  Compact size
         */
        compact: {
            type: Boolean,
            default: false,
        },
        withTooltip: {
            type: Boolean,
            default: false,
        },
        withSubmenu: {
            type: Boolean,
            default: false,
        },
        withIndicator: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: false,
        },
        /**
         *  Additional info
         */
        info: {
            type: [String, Number],
            default: '',
        },
        /**
         *  Exact
         *
         */
        exact: {
            type: Boolean,
            default: false,
        },
        /**
         *  Отключенное состояние
         *
         */
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        themeConfig() {
            return this.provideData
                ? this.provideData.currentThemeConfig
                : {
                      mode: 'black',
                      className: 'mc-side-bar--color-theme-black',
                      dropdownActivator: 'white',
                      mainMenuLinks: {
                          variable: 'gray-flat',
                          secondaryColor: 'white',
                      },
                  }
        },
        classes() {
            return {
                'mc-side-bar-button': true,
                'mc-side-bar-button__with-submenu': this.withSubmenu,
                [`mc-side-bar--${this.themeConfig.mode || 'black'}__button`]: true,
                'blue-hover': this.themeConfig.mainMenuLinks.variable === 'black-flat',
            }
        },
        btnAttrs() {
            return {
                variation: this.themeConfig.mainMenuLinks.variable,
                'secondary-color': this.themeConfig.mainMenuLinks.secondaryColor,
                class: this.classes,
                'text-align': 'left',
                'full-width': true,
                size: this.compact ? 's-compact' : 's',
                href: this.href,
                to: this.to,
                exact: this.exact,
                disabled: this.disabled,
                'is-active': this.isActive,
            }
        },
    },
}
</script>

<style lang="scss">
.mc-side-bar-button {
    $block-name: &;
    &__tooltip {
        width: 100%;
    }
    &__dot {
        @include position(absolute, $space-100 6px null null);
        @include size($size-100);
        background-color: $color-blue;
        border-radius: $radius-circle;
    }
    &__chip {
        &.indicator {
            width: $size-200;
            min-height: $size-200;
        }
    }
    &.mc-button {
        padding: $space-100;
        opacity: 1;
        height: auto;
        border-radius: $space-50;
        justify-content: flex-start;
        .mc-svg-icon {
            @include size($size-300);
        }
        &.blue-hover:hover {
            background-color: $color-lighter-blue;
        }

        .mc-button__prepend {
            margin-right: $space-100;
        }
        .mc-button__append {
            margin-left: $space-100;
        }
        .mc-chip {
            height: auto;
            padding: $space-50 $space-100;
        }
    }
    &__with-submenu {
        background-color: transparent !important;
    }
}
.mc-side-bar {
    &--black__button {
        &.mc-button--is-active,
        &.mc-button.nuxt-link-active {
            color: $color-white;
            background-color: rgba(92, 102, 112, 0.4);
            pointer-events: auto;
        }
    }
    &--white__button {
        &.mc-button--is-active,
        &.mc-button.nuxt-link-active {
            color: $color-blue;
            background-color: $color-lighter-blue;
            pointer-events: auto;
        }
    }
}
</style>
