<template>
    <div class="mc-side-bar-center">
        <mc-title v-if="title" class="mc-side-bar-center__title" :color="compact ? 'transparent' : 'dark-gray'">
            {{ title }}
        </mc-title>
        <div v-if="preparedMainMenu && preparedMainMenu.length" class="mc-side-bar-center__content">
            <div
                v-for="menuMainItem in preparedMainMenu"
                :key="menuMainItem.id"
                :class="{ 'item-active': menuMainItem.active() }"
                class="mc-side-bar-center__content-item item"
            >
                <div class="item__head" :class="getMenuItemHeadClasses(menuMainItem)" @click="handlerSidebarItemClick">
                    <mc-side-bar-button
                        :info="!(menuMainItem.menu && !!menuMainItem.menu.length) ? menuMainItem.info : null"
                        :href="menuMainItem.href"
                        :to="menuMainItem.to"
                        :icon="menuMainItem.icon"
                        :icon-color="menuMainItem.iconColor"
                        :title="menuMainItem.name"
                        :compact="compact"
                        :is-active="menuMainItem.active()"
                        :with-submenu="menuMainItem.menu && !!menuMainItem.menu.length"
                        :with-indicator="menuMainItem.indicator() && !menuMainItem.open"
                        with-tooltip
                        class="item__head-button--no-hover"
                    />
                    <mc-button
                        v-if="menuMainItem.menu && menuMainItem.menu.length && !compact"
                        :variation="menuMainItem.active() ? 'white-link' : 'gray-link'"
                        size="m-compact"
                        class="item__head-arrow"
                        :class="{
                            rotate: menuMainItem.active()
                                ? menuMainItem.active() && menuMainItem.open
                                : menuMainItem.open,
                        }"
                        @click="menuMainItem.open = !menuMainItem.open"
                    >
                        <mc-svg-icon slot="icon-prepend" name="arrow_forward" />
                    </mc-button>
                </div>
                <div
                    v-if="menuMainItem.menu && menuMainItem.menu.length"
                    class="item__submenu"
                    :class="{
                        open: menuMainItem.active() ? menuMainItem.active() && menuMainItem.open : menuMainItem.open,
                    }"
                >
                    <mc-side-bar-button
                        v-for="(menuItem, i) in menuMainItem.menu"
                        :key="i"
                        :info="menuItem.info"
                        :href="menuItem.href"
                        :to="menuItem.to"
                        :icon="menuItem.icon"
                        :icon-color="menuItem.iconColor"
                        :title="menuItem.name"
                        :compact="compact"
                        with-tooltip
                    />
                </div>
            </div>
        </div>
        <mc-separator
            v-if="chatraConfig"
            color="dark-gray"
            indent-top="150"
            indent-bottom="150"
            :indent-left="compact ? '0' : '100'"
            :indent-right="compact ? '0' : '100'"
        />
        <mc-side-bar-button
            v-if="chatraConfig"
            icon="chat_messages"
            :title="chatraConfig.title"
            :compact="compact"
            with-tooltip
            @click="$emit('handlerChatraClick')"
        />
    </div>
</template>

<script>
import _XEUtils from 'xe-utils'
import McTitle from '../../../elements/McTitle/McTitle'
import McSideBarButton from '../McSideBarButton/McSideBarButton'
import McSeparator from '../../../elements/McSeparator/McSeparator'
import McButton from '../../../elements/McButton/McButton'
import McSvgIcon from '../../../elements/McSvgIcon/McSvgIcon'
export default {
    name: 'McSideBarCenter',
    components: {
        McTitle,
        McSideBarButton,
        McSeparator,
        McButton,
        McSvgIcon,
    },
    inject: ['provideData'],
    props: {
        /**
         *  Заголовок
         */
        title: {
            type: String,
            default: '',
        },
        /**
     *  Центральное меню
     *
     *  {
                name: [String] - menu item title,
                icon: [String] - icon,
                to: [String] - route path (used like link if this route haven't nested menu if they isn't they work like button who open nested menu),
                info: [String] - info badge text
                menu: [
                    {
                        name: [String] - menu item title,
                        to: [String] - route path,
                        info: [String] - info badge text
                    },
                    ...
                ]
            },
     *
     */
        menuMain: {
            type: Array,
            default: () => [],
        },
        /**
         *  Id чатры
         *
         */
        chatraConfig: {
            type: Object,
            default: null,
        },
        /**
         *  Данные пользователя
         *
         */
        user: {
            type: Object,
            default: null,
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
            preparedMainMenu: [],
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
    },
    watch: {
        menuMain: {
            deep: true,
            handler() {
                this.setMainMenu()
            },
        },
        compact() {
            this.setMainMenu()
        },
        // если переходим на роут с вложенным меню, открываем вложенное меню
        $route(newRoute, oldRoute) {
            if (oldRoute.path !== newRoute.path) {
                const route = this.preparedMainMenu.find(r => r.to === newRoute.path)
                route?.menu && !this.compact && (route.open = true)
            }
            this.$nextTick(() => {
                this.preparedMainMenu.forEach(mi => {
                    const exact_route = mi.to === newRoute.path
                    const route_menu_match_new_route =
                        mi.menu && mi.menu.some(mim => mim.to?.match(newRoute.path) || newRoute.path?.match(mim.to))
                    if (!(exact_route || route_menu_match_new_route)) mi.open = false
                })
            })
        },
    },
    created() {
        this.setMainMenu()
    },
    methods: {
        getMenuItemHeadClasses(menuMainItem) {
            return {
                open: menuMainItem.open,
                active: menuMainItem.active(),
                'with-submenu': menuMainItem.menu && menuMainItem.menu.length,
                [`mc-side-bar--${this.themeConfig.mode || 'black'}__button`]: true,
                'purple-hover': this.themeConfig.mainMenuLinks.variable === 'black-flat',
                [`mc-button--variation-${this.themeConfig.mainMenuLinks.variable}`]: !!this.themeConfig.mainMenuLinks
                    .variable,
                ['mc-side-bar--black__button mc-button nuxt-link-active']:
                    menuMainItem.menu && menuMainItem.menu.length && !menuMainItem.open && menuMainItem.active(),
            }
        },
        handlerSidebarItemClick() {
            this.compact && this.$emit('open-side-bar')
        },
        // заранее формируем меню один раз, так как компьютед излишен и во вторых нужна переменная "open" что бы ее тогглить
        setMainMenu() {
            this.preparedMainMenu = this.menuMain.map(i => {
                const active = () => {
                    return (
                        (i.menu && i.menu.some(r => this.$route?.fullPath?.match(r.to))) ||
                        !!this.$route?.fullPath?.match(i.to)
                    )
                }
                return {
                    id: _XEUtils.uniqueId(),
                    ...i,
                    active,
                    indicator: () => i.menu && i.menu.some(r => !!r.info),
                    open: !this.compact && active(),
                }
            })
        },
    },
}
</script>

<style lang="scss">
.mc-side-bar-center {
    $block-name: &;
    margin-bottom: $space-150;
    &__title {
        margin: $space-100;
    }

    &__content {
        @include child-indent-bottom($space-50);
        .item {
            position: relative;
            display: flex;
            flex-direction: column;
            width: 100%;
            @include child-indent-bottom($space-50);
            &-active {
                .item__head.active:not(.with-submenu),
                .nuxt-link-exact-active {
                    pointer-events: none;
                }
            }
            .with-submenu {
                pointer-events: all !important;
                .item__head {
                    &-button--no-hover {
                        a {
                            background-color: unset;
                        }
                    }
                }
            }
            &__head {
                display: flex;
                align-items: center;
                border-radius: 4px;
                &-arrow {
                    &.rotate {
                        .mc-svg-icon {
                            transform: rotate(90deg);
                        }
                    }
                    .mc-svg-icon {
                        transition: all 0.3s ease;
                    }
                }
                &-button {
                    &--no-hover {
                        .mc-button {
                            &:hover {
                                background-color: unset;
                            }
                        }
                        .mc-side-bar-button__with-submenu {
                            background-color: unset;
                        }
                        &:hover {
                            background-color: unset;
                        }
                    }
                }
                &.active {
                    padding: 0;
                    border-radius: 4px;
                    border: none;
                    &.open {
                        background-color: unset;
                    }
                }
            }
            &__submenu {
                max-height: 0;
                overflow: hidden;
                transition: all 0.3s ease;
                @include child-indent-bottom($space-50);
                .mc-side-bar-button {
                    padding-left: $space-500;
                    height: 42px;
                }
                &.open {
                    max-height: 200px;
                }
            }
        }
    }
}
</style>
