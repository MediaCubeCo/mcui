<template>
    <article ref="sidebar-wrapper" class="mc-side-bar-wrapper" :style="wrapperStyles">
        <section class="mc-side-bar-wrapper__backdrop" :class="backdropClasses" @click.stop.prevent="handleToggleSize">
            <div ref="sidebar" class="mc-side-bar" :class="sideBarClasses" :style="sideBarStyles" @click.stop>
                <mc-side-bar-top
                    :logo-title="logoTitle"
                    :logo-title-variation="logoTitleVariation"
                    :logo-src="logoSrc"
                    :logo-icon="logoIcon"
                    :compact="prettyCompact"
                    :menu-apps="menuApps"
                >
                    <slot slot="title-append" name="title-append" />
                </mc-side-bar-top>
                <section class="mc-side-bar__scrollable-container">
                    <mc-side-bar-center
                        :title="menuMainTitle"
                        :menu-main="menuMain"
                        :menu-additional="menuAdditional"
                        :chatra-config="chatraConfig"
                        :userback-config="userbackConfig"
                        :user="user"
                        :compact="prettyCompact"
                    />
                    <mc-side-bar-bottom
                        :hide-text="hideText"
                        :compact="prettyCompact"
                        :hidden-mode="hiddenMode"
                        :sidebar-width="width"
                        @toggle-size="handleToggleSize"
                    >
                        <slot slot="bottom-message" name="bottom-message" />
                    </mc-side-bar-bottom>
                </section>
            </div>
        </section>
    </article>
</template>

<script>
import McSideBarTop from '../McSideBarTop/McSideBarTop'
import McSideBarCenter from '../McSideBarCenter/McSideBarCenter'
import McSideBarBottom from '../McSideBarBottom/McSideBarBottom'
export default {
    name: 'McSideBar',
    components: {
        McSideBarTop,
        McSideBarCenter,
        McSideBarBottom,
    },
    provide() {
        return {
            currentThemeConfig: this.currentThemeConfig,
        }
    },
    props: {
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
         *
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
        /**
         *  Заголовок
         *  центрального блока
         */
        menuMainTitle: {
            type: String,
            default: '',
        },
        /**
         *  Центральное меню
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
         *  Меню приложений
         *
         */
        menuApps: {
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
         *  Текст кнопки
         *  сворачивания меню
         */
        hideText: {
            type: String,
            default: '',
        },
        /**
         *  Компактный вид
         */
        compact: {
            type: Boolean,
            default: false,
        },
        /**
         * Цветовая схема
         */
        variable: {
            type: String,
            default: 'black',
        },
        /**
         * Ширина сайдбара
         */
        width: {
            type: String,
            default: '216px',
        },
        /**
         * Ширина компактного сайдбара
         */
        compactWidth: {
            type: String,
            default: '58px',
        },
        /**
         * Брейкпоинт после которого
         * сайдбар становится абсолютным и появляется затемненный бэкдроп
         */
        absoluteBreakpoint: {
            type: Number,
            default: null,
        },
        /**
         * Брейкпоинт после которого
         * сайдбар полностью прячется
         */
        hiddenBreakpoint: {
            type: Number,
            default: null,
        },
    },
    data() {
        return {
            isHidden: false,
            prettyCompact: this.compact,
            hasCompactClass: this.compact,
            windowWidth: null,
        }
    },
    computed: {
        sideBarClasses() {
            return {
                'mc-side-bar--compact': this.hasCompactClass,
                [this.currentThemeConfig.className]: true,
            }
        },
        sideBarStyles() {
            return {
                overflow: `${this.isHidden ? 'hidden' : 'visible'}`,
                width: this.hasCompactClass ? this.compactWidth : this.width,
            }
        },
        wrapperStyles() {
            const position =
                this.hiddenMode && this.hasCompactClass
                    ? {
                          position: 'absolute',
                          left: `-${this.compactWidth}`,
                      }
                    : {}

            let width = {
                width: this.hasCompactClass ? this.compactWidth : this.width,
            }
            if (this.absoluteMode) {
                width.width = this.compactWidth
            }
            if (this.hiddenMode) {
                width.width = '0px'
            }
            return {
                ...width,
                ...position,
            }
        },
        backdropClasses() {
            return {
                'mc-side-bar-wrapper__backdrop--full-width':
                    !this.hasCompactClass && this.windowWidth < this.absoluteBreakpoint,
            }
        },
        absoluteMode() {
            return this.absoluteBreakpoint && this.windowWidth < this.absoluteBreakpoint
        },
        hiddenMode() {
            return this.hiddenBreakpoint && this.windowWidth < this.hiddenBreakpoint
        },
        currentThemeConfig() {
            return this.sidebarThemeConfig[this.variable] || this.sidebarThemeConfig['black']
        },
        sidebarThemeConfig() {
            return {
                black: {
                    mode: 'black',
                    className: 'mc-side-bar--color-theme-black',
                    dropdownActivator: 'white',
                    mainMenuLinks: {
                        variable: 'gray-flat',
                        secondaryColor: 'white',
                    },
                },
                white: {
                    mode: 'white',
                    className: 'mc-side-bar--color-theme-white',
                    dropdownActivator: 'black',
                    mainMenuLinks: {
                        variable: 'black-flat',
                        secondaryColor: 'blue',
                    },
                },
            }
        },
    },
    watch: {
        hasCompactClass(newValue) {
            if (newValue) {
                setTimeout(() => {
                    this.prettyCompact = newValue
                }, 280)
            } else {
                this.prettyCompact = newValue
            }
            this.isHidden = true
            setTimeout(() => {
                this.isHidden = false
            }, 280)
        },
        compact(newValue) {
            this.hasCompactClass = newValue
        },
        absoluteMode: {
            immediate: true,
            handler(val) {
                this.$emit('absolute-mode', val)
            },
        },
        hiddenMode: {
            immediate: true,
            handler(val) {
                this.$emit('hidden-mode', val)
            },
        },
    },
    mounted() {
        if (this.absoluteBreakpoint || (this.hiddenBreakpoint && window)) {
            this.resize()
            window.addEventListener('resize', this.resize)
        }
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.resize)
    },
    methods: {
        handleToggleSize() {
            this.hasCompactClass = !this.hasCompactClass
            this.$emit('compact', this.hasCompactClass)
        },
        resize() {
            this.windowWidth = window.innerWidth
        },
    },
}
</script>

<style lang="scss">
.mc-side-bar {
    $block-name: &;

    display: flex;
    flex-direction: column;
    padding: $space-250 $space-100 $space-400;
    transition: width 300ms ease;
    overflow-x: hidden;
    overflow-y: auto;
    @include child-indent-bottom($space-400);
    &--color-theme-black {
        background-color: $color-black;
    }
    &--color-theme-white {
        background-color: $color-white;
        border-right: 1px solid $color-hover-gray;
    }
    &__scrollable-container {
        @include hide-scrollbar;
        overflow-y: auto;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    &-wrapper {
        height: 100%;
        transition: width 300ms ease;
        &__backdrop {
            position: absolute;
            background-color: rgba($color-black, 0.6);
            z-index: 25;
            height: inherit;
            .mc-side-bar {
                height: inherit;
            }
            &--full-width {
                width: 100%;
            }
        }
    }
}
</style>
