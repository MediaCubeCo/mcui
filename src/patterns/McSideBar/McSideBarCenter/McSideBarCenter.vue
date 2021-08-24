<template>
    <div class="mc-side-bar-center">
        <mc-title v-if="title" class="mc-side-bar-center__title" :color="compact ? 'transparent' : 'dark-gray'">
            {{ title }}
        </mc-title>
        <div v-if="preparedMainMenu && preparedMainMenu.length" class="mc-side-bar-center__content">
            <div
                v-for="(menuMainItem, ii) in preparedMainMenu"
                :key="menuMainItem.id"
                class="mc-side-bar-center__content-item item"
            >
                <div class="item__head">
                    <mc-side-bar-button
                        :info="menuMainItem.info"
                        :href="menuMainItem.href"
                        :to="menuMainItem.to"
                        :icon="menuMainItem.icon"
                        :icon-color="menuMainItem.iconColor"
                        :title="menuMainItem.name"
                        :compact="compact"
                        :is-active="menuMainItem.active()"
                        :with-submenu="menuMainItem.menu && !!menuMainItem.menu.length"
                        with-tooltip
                    />
                    <mc-button
                        v-if="menuMainItem.menu && menuMainItem.menu.length"
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
            v-if="chatraConfig || userbackConfig"
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
        <mc-side-bar-button
            v-if="userbackConfig"
            icon="bug_report"
            :title="userbackConfig.title"
            :compact="compact"
            with-tooltip
            @click="$emit('handlerUserbackClick')"
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
         *  Меню при клике на +
         *
         */
        menuAdditional: {
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
         *  Userback Config
         *
         */
        userbackConfig: {
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
            menuUserbackIsOpen: false,
            preparedMainMenu: [],
        }
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
        },
    },
    created() {
        this.setMainMenu()
    },
    methods: {
        // заранее формируем меню один раз, так как компьютед излишен и во вторых нужна переменная "open" что бы ее тогглить
        setMainMenu() {
            this.preparedMainMenu = this.menuMain.map(i => {
                const active = () => {
                    return i.menu && i.menu.some(r => this.$route.fullPath.match(r.to))
                }
                return {
                    id: _XEUtils.uniqueId(),
                    ...i,
                    active,
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
    //overflow: hidden;

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
            &__head {
                display: flex;
                align-items: center;
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
            }
            &__submenu {
                padding-left: $space-400;
                max-height: 0;
                overflow: hidden;
                transition: all 0.3s ease;
                &.open {
                    max-height: 200px;
                }
            }
        }
    }
}
</style>
