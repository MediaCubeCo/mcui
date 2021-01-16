<template>
    <div class="mc-top-bar">
        <div class="mc-top-bar__inner">
            <div v-if="$slots.left" class="mc-top-bar__left">
                <slot name="left" />
            </div>
            <div class="mc-top-bar__right">
                <slot name="right" />
                <mc-dropdown
                    v-if="menuLangs && menuLangs.length"
                    ref="menuLangs"
                    v-model="localesDropdownOpen"
                    list-min-width="auto"
                    class="mc-top-bar__menu-langs"
                >
                    <mc-button slot="activator" variation="black-flat" uppercase>
                        {{ currentLang || defaultLang }}
                        <mc-svg-icon slot="icon-append" class="rotate" name="arrow_drop_down" />
                    </mc-button>
                    <mc-dropdown-panel>
                        <mc-button
                            v-for="locale in menuLangs"
                            :key="locale.name"
                            :to="locale.to || locale.href"
                            :exact="locale.exact"
                            variation="black-flat"
                            text-align="left"
                            full-width
                        >
                            <mc-svg-icon slot="icon-prepend" :name="`flag_${locale.name.toLowerCase()}`" />
                            {{ locale.name }}
                        </mc-button>
                    </mc-dropdown-panel>
                </mc-dropdown>
                <slot name="user">
                    <mc-dropdown v-if="user" v-model="userDropdownOpen" position="right">
                        <mc-button slot="activator" variation="white-flat" size="m-compact">
                            <mc-avatar slot="icon-prepend" :src="user.avatar" rounded size="400" />
                        </mc-button>
                        <slot name="user-dropdown-panel" />
                    </mc-dropdown>
                </slot>
            </div>
        </div>
        <mc-separator color="hover-gray" indent-top="100" />
        <slot name="bottom" />
    </div>
</template>

<script>
import McAvatar from '../../elements/McAvatar/McAvatar'
import McButton from '../../elements/McButton/McButton'
import McSvgIcon from '../../elements/McSvgIcon/McSvgIcon'
import McSeparator from '../../elements/McSeparator/McSeparator'
import McDropdown from '../McDropdown/McDropdown'
import McDropdownPanel from '../McDropdown/McDropdownPanel/McDropdownPanel'
export default {
    name: 'McTopBar',
    components: {
        McAvatar,
        McButton,
        McSvgIcon,
        McSeparator,
        McDropdown,
        McDropdownPanel,
    },
    props: {
        /**
         *  Данные пользователя
         *
         */
        user: {
            type: Object,
            default: null,
        },
        /**
         *  Меню языков
         *
         */
        menuLangs: {
            type: Array,
            default: () => [],
        },
        /**
         *  Локализация или текст по умолчанию
         *
         */
        defaultLang: {
            type: String,
            default: 'Выберите язык',
        },
        /**
         *  Текущая локализация
         *
         */
        currentLang: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            localesDropdownOpen: false,
            userDropdownOpen: false,
        }
    },
    watch: {
        currentLang() {
            this.localesDropdownOpen && this.$refs['menuLangs'] && this.$refs['menuLangs'].closeDropdown()
        },
    },
}
</script>

<style lang="scss">
.mc-top-bar {
    $block-name: &;

    width: 100%;

    &__inner {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: $space-100 $space-150 0 $space-150;
        @include child-indent-right($space-100);
    }

    &__left,
    &__right {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        @include child-indent-right($space-100);
    }

    &__right {
        min-width: 0;
        flex: 1 1 auto;
        justify-content: flex-end;
    }
    &__menu-langs {
        .mc-svg-icon {
            svg {
                rect {
                    stroke: $color-hover-gray;
                }
            }
        }
    }
}
</style>
