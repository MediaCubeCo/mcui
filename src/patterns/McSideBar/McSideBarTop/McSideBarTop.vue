<template>
    <div class="mc-side-bar-top" :class="`mc-side-bar-top--theme-${themeConfig.dropdownActivator}`">
        <mc-preview v-if="!computedMenuApps" slot="activator">
            <img
                v-if="logoSrc"
                slot="left"
                class="mc-side-bar-top__img"
                :src="logoSrc"
                width="24"
                height="24"
                :alt="logoTitle"
            />
            <mc-title slot="top" weight="semi-bold" :variation="logoTitleVariation">
                <template v-if="!compact">
                    {{ logoTitle }}
                    <slot slot="icon-append" name="title-append" />
                </template>
            </mc-title>
        </mc-preview>
        <mc-dropdown v-else v-model="dropIsOpen" :position="dropdownPosition">
            <mc-preview slot="activator">
                <img
                    v-if="logoSrc"
                    slot="left"
                    class="mc-side-bar-top__img"
                    :src="logoSrc"
                    width="24"
                    height="24"
                    :alt="logoTitle"
                />
                <mc-svg-icon v-else-if="logoIcon" slot="left" class="rotate" :name="logoIcon" />
                <mc-button
                    slot="top"
                    :variation="`${themeConfig.dropdownActivator}-link`"
                    :size="compact ? 'l-compact' : 'l'"
                    class="mc-side-bar-top__activator-btn"
                >
                    <mc-title v-if="!compact" weight="semi-bold" :variation="logoTitleVariation">
                        {{ logoTitle }}
                        <slot slot="icon-append" name="title-append" />
                    </mc-title>
                    <mc-svg-icon slot="icon-append" class="rotate" name="arrow_drop_down" color="gray" />
                </mc-button>
            </mc-preview>
            <mc-dropdown-panel>
                <mc-button
                    v-for="menuAppsItem in computedMenuApps"
                    :key="`menu-apps-item-${menuAppsItem.key}`"
                    full-width
                    text-align="left"
                    variation="black-flat"
                    :href="menuAppsItem.href"
                    :to="menuAppsItem.to"
                    :target="menuAppsItem.target"
                    :is-active="menuAppsItem.isActive"
                    :exact="menuAppsItem.exact"
                >
                    <mc-svg-icon v-if="menuAppsItem.icon" slot="icon-prepend" :name="menuAppsItem.icon" />
                    <img
                        v-else-if="menuAppsItem.image"
                        slot="icon-prepend"
                        :src="menuAppsItem.image"
                        width="24"
                        height="24"
                        alt="service image"
                    />
                    {{ menuAppsItem.name }}
                </mc-button>
            </mc-dropdown-panel>
        </mc-dropdown>
    </div>
</template>

<script>
import _XEUtils from 'xe-utils'
import { isEmpty } from '../../../helpers/functions'
import McDropdown from '../../McDropdown/McDropdown'
import McDropdownPanel from '../../McDropdown/McDropdownPanel/McDropdownPanel'
import McButton from '../../../elements/McButton/McButton'
import McSvgIcon from '../../../elements/McSvgIcon/McSvgIcon'
import McPreview from '../../McPreview/McPreview'
import McTitle from '../../../elements/McTitle/McTitle'

export default {
    name: 'McSideBarTop',
    components: {
        McDropdown,
        McDropdownPanel,
        McButton,
        McPreview,
        McSvgIcon,
        McTitle,
    },
    inject: ['provideData'],
    props: {
        /**
         *  Меню приложений
         *
         */
        menuApps: {
            type: Array,
            default: () => [],
        },
        /**
         *  Название сервиса
         *
         */
        logoTitle: {
            type: String,
            default: 'Dashboard',
        },
        /**
         *  Размер текста названия сервиса
         *
         */
        logoTitleVariation: {
            type: String,
            default: 'subtitle',
        },
        /**
         *  Путь до изображения
         */
        logoSrc: {
            type: String,
            default: '',
        },
        /**
         *  Имя иконки
         *  заголовка
         */
        logoIcon: {
            type: String,
            default: '',
        },
        dropdownPosition: {
            type: String,
            default: 'left',
        },
        /**
         *  Компактный вид
         */
        compact: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            dropIsOpen: false,
        }
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
        computedMenuApps() {
            if (isEmpty(this.menuApps)) return null
            const apps = []
            this.menuApps.forEach(app => {
                if (app.isVisible) {
                    apps.push({
                        key: _XEUtils.uniqueId(),
                        ...app,
                    })
                }
            })
            return apps
        },
    },
}
</script>

<style lang="scss">
.mc-side-bar-top {
    $block-name: &;
    @include reset-text-indents();
    position: sticky;
    top: -($space-250);
    padding: $space-250 $space-100;
    background: $color-white;
    margin: -($space-250) (-($space-100)) $space-150 !important;
    z-index: 2;
    .mc-dropdown__toggle {
        &:hover {
            cursor: pointer;
        }
        .mc-preview__left {
            margin-right: 0;
        }
        .mc-button {
            line-height: $line-height-250;
            &__text {
                margin-left: $space-100;
            }
            &__append {
                margin-left: 0;
            }
            .rotate {
                @include size($size-200);
            }
        }
    }
    &__img {
        margin-left: $space-100;
    }
    &__activator-btn {
        font-size: $font-size-400;
        line-height: $line-height-300;
    }
    &--theme-white {
        background: $color-black;
        .mc-preview__top {
            .mc-title {
                color: $color-white;
            }
        }
    }
    &--theme-black {
        background: $color-white;
        .mc-preview__top {
            .mc-title {
                color: $color-black;
            }
        }
    }
}
</style>
