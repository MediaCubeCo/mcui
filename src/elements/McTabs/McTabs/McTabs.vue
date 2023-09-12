<template>
    <div class="mc-tabs" :class="classes">
        <div class="tabs-component">
            <mc-wrap-scroll tag-name="ul" role="tablist" scrollable class="tabs-component-tabs">
                <li
                    v-for="(tab, i) in tabs"
                    v-show="tab.isVisible"
                    :key="i"
                    :class="{ 'is-active': tab.isActive, 'is-disabled': tab.isDisabled }"
                    class="tabs-component-tab"
                    role="presentation"
                >
                    <a
                        :aria-controls="tab.hash"
                        :aria-selected="tab.isActive"
                        :href="tab.to || tab.href || tab.hash"
                        class="tabs-component-tab-a"
                        role="tab"
                        @click="selectTab(tab.hash, $event)"
                        v-html="tab.header"
                    ></a>
                </li>
            </mc-wrap-scroll>
            <div class="tabs-component-panels">
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
import McWrapScroll from '../../../patterns/McWrapScroll/McWrapScroll'
class ExpiringStorage {
    get(key) {
        const cached = JSON.parse(localStorage.getItem(key))

        if (!cached) return null

        const expires = new Date(cached.expires)

        if (expires < new Date()) {
            localStorage.removeItem(key)
            return null
        }

        return cached.value
    }

    set(key, value, lifeTimeInMinutes) {
        const currentTime = new Date().getTime()
        const expires = new Date(currentTime + lifeTimeInMinutes * 60000)
        localStorage.setItem(key, JSON.stringify({ value, expires }))
    }
}

const expiringStorage = new ExpiringStorage()

export default {
    name: 'McTabs',
    components: {
        McWrapScroll,
    },
    props: {
        value: {
            type: String,
        },
        /**
         *  Количество минут, когда
         *  будет храниться в памяти
         *  последний посещённый таб
         */
        cacheLifetime: {
            type: Number,
            default: 0,
        },
        useUrlFragment: {
            default: false,
        },
        defaultTabHash: {
            default: null,
        },
        /**
         *  Размеры табов:
         *  `body, caption, overline`
         */
        tabVariation: {
            type: String,
            default: 'caption',
        },
        /**
         *  Цвет текста табов
         */
        color: {
            type: String,
            default: 'black',
        },
        /**
         *  Цвет линии активного таба
         */
        accentColor: {
            type: String,
            default: 'purple',
        },
        /**
         *  Заглавные буквы
         *  табов
         */
        uppercase: {
            type: Boolean,
            default: false,
        },
        /**
         * Передаваемое состояние загрузки
         *
         * Нужно для метода switchingDisableTab
         * в случае, если состояние табов (active/disable)
         * задается динамически
         */
        loading: {
            type: Boolean,
            default: false,
        },
        /**
         * Закрепленные табы
         *
         * Добавляет верхнее расстояние
         * для табов для правильного отображения
         */
        sticky: {
            type: Boolean,
            default: false,
        },
    },
    data: () => ({
        children: [],
        activeTabHash: '',
        activeTabIndex: 0,
        lastActiveTabHash: '',
    }),
    computed: {
        classes() {
            return {
                [`mc-tabs--color-${this.color}`]: this.color,
                [`mc-tabs--accent-color-${this.accentColor}`]: this.accentColor,
                [`mc-tabs--tab-variation-${this.tabVariation}`]: this.tabVariation,
                [`mc-tabs--uppercase`]: this.uppercase,
                [`mc-tabs--sticky`]: this.sticky,
            }
        },
        activeTab: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value)
            },
        },
        storageKey() {
            return `vue-tabs-component.cache.${window.location.host}${window.location.pathname}`
        },
        tabs() {
            return this.children.filter(tab => tab.$options.name === 'McTab')
        },
        visibleTabs() {
            return this.tabs.filter(tab => tab.visible)
        },
    },
    watch: {
        loading(val, oldVal) {
            if (!val && oldVal)
                this.$nextTick(() => {
                    this.checkInitTab()
                })
        },
    },
    created() {
        this.children = this.$children
    },
    mounted() {
        this.options = {
            useUrlFragment: this.useUrlFragment,
            defaultTabHash: this.defaultTabHash,
        }
        this.checkInitTab()

        window.addEventListener('hashchange', () => this.selectTab(window.location.hash))

        if (this.findTab(window.location.hash)) {
            this.selectTab(window.location.hash)
            return
        }

        const previousSelectedTabHash = expiringStorage.get(this.storageKey)

        if (this.findTab(previousSelectedTabHash)) {
            this.selectTab(previousSelectedTabHash)
            return
        }

        if (this.options.defaultTabHash !== null && this.findTab('#' + this.options.defaultTabHash)) {
            this.selectTab('#' + this.options.defaultTabHash)
            return
        }

        if (this.tabs.length) {
            this.selectTab(this.tabs[0].hash)
        }
    },
    updated() {
        this.switchingDisableTab()
    },
    methods: {
        checkInitTab() {
            if (this.activeTab) {
                const tab_component = this.visibleTabs.find(t => t.id === this.activeTab)
                const tab = tab_component || this.visibleTabs?.[0]
                tab?.hash && tab?.hash?.replace('#', '') && this.setActiveTab(tab.hash)
            }
        },
        setActiveTab(tabHash) {
            this.selectTab(tabHash)
        },
        changedHandler(e) {
            const lastActiveTab = this.getActiveTab()
            if (!lastActiveTab) return
            if (e.tab.href) {
                window.open(e.tab.href, '_blank')
                return
            }
            if (e.tab.to && this.$router) {
                this.$router.push(e.tab.to)
                return
            }
            if (!e.tab.href && !e.tab.to) this.activeTab = e?.tab?.id || e?.tab?.hash?.replace('#', '')

            /**
             * Событие при смене таба
             * @property {Object}
             */
            this.$emit('tab-changed', e)
        },
        setLastActiveTab(hash) {
            this.$nextTick(() => {
                this.setActiveTab(hash)
            })
        },
        switchingDisableTab() {
            /**
             * Переключает активный и в то
             * же время задизейбленный таб
             * на первый доступный
             */
            if (this.loading) return
            const activeTab = this.tabs?.find(tab => tab.isActive)
            if (!activeTab?.isDisabled) return
            const firstAvailableTab = this.tabs.find(tab => !tab?.isDisabled && !tab?.href && !tab?.to)
            firstAvailableTab && this.setActiveTab(firstAvailableTab.hash)
        },
        findTab(hash) {
            return this.tabs.find(tab => tab.hash === hash)
        },

        selectTab(selectedTabHash, event) {
            // See if we should store the hash in the url fragment.
            if (event && !this.options.useUrlFragment) {
                event.preventDefault()
            }

            const selectedTab = this.findTab(selectedTabHash)

            if (!selectedTab) {
                return
            }

            if (selectedTab.isDisabled) {
                event.preventDefault()
                return
            }

            if (this.lastActiveTabHash === selectedTab.hash) {
                this.$emit('clicked', { tab: selectedTab })
                return
            }

            this.changedHandler({ tab: selectedTab })

            if (!!selectedTab.href || !!selectedTab.to) return

            this.tabs.forEach(tab => {
                tab.isActive = tab.hash === selectedTab.hash
            })

            this.activeTabHash = selectedTab.hash
            this.activeTabIndex = this.getTabIndex(selectedTabHash)

            this.lastActiveTabHash = this.activeTabHash = selectedTab.hash

            expiringStorage.set(this.storageKey, selectedTab.hash, this.cacheLifetime)
        },

        setTabVisible(hash, visible) {
            const tab = this.findTab(hash)

            if (!tab) {
                return
            }

            tab.isVisible = visible

            if (tab.isActive) {
                // If tab is active, set a different one as active.
                tab.isActive = visible

                this.tabs.every(tab => {
                    if (tab.isVisible) {
                        tab.isActive = true

                        return false
                    }

                    return true
                })
            }
        },

        getTabIndex(hash) {
            const tab = this.findTab(hash)

            return this.tabs.indexOf(tab)
        },

        getTabHash(index) {
            const tab = this.tabs.find(tab => this.tabs.indexOf(tab) === index)

            if (!tab) {
                return
            }

            return tab.hash
        },

        getActiveTab() {
            return this.findTab(this.activeTabHash)
        },

        getActiveTabIndex() {
            return this.getTabIndex(this.activeTabHash)
        },
    },
}
</script>

<style lang="scss">
.mc-tabs {
    $block-name: &;

    @mixin border() {
        &::before {
            @include pseudo();
            @include position(absolute, auto 0 0 0);
            height: 1px;
            background-color: $color-hover-gray;
        }
    }

    &--tab-variation {
        &-body {
            .tabs-component-tab-a {
                font-size: $font-size-300;
                line-height: $line-height-250;
            }
        }
        &-caption {
            .tabs-component-tab-a {
                font-size: $font-size-200;
                line-height: $line-height-200;
            }
        }
        &-overline {
            .tabs-component-tab-a {
                font-size: $font-size-100;
                line-height: $line-height-150;
                font-weight: $font-weight-medium;
            }
        }
    }

    &--color {
        @each $color, $value in $token-colors {
            &-#{$color} {
                .tabs-component-tab-a {
                    color: $value;
                }
            }
        }
    }

    &--accent-color {
        @each $color, $value in $token-colors {
            &-#{$color} {
                .tabs-component-tab-a {
                    &::after {
                        background-color: $value;
                    }
                    &:hover {
                        color: $value;
                    }
                }
                .tabs-component-tab.is-active {
                    .tabs-component-tab-a {
                        color: $value;
                        font-weight: $font-weight-semi-bold;
                    }
                }
            }
        }
    }

    &--uppercase {
        .tabs-component-tabs {
            text-transform: uppercase;
        }
    }

    &--sticky {
        overflow: scroll;

        .tabs-component-tabs {
            position: sticky !important;
            top: 0;
            z-index: $z-index-sticky-tabs;
            background-color: $color-white;
        }
    }

    .tabs-component-tabs {
        @include reset-text-indents();
        position: relative;
        padding-left: 0;
        margin-top: 0;
        list-style-type: none;
        height: $space-350;
        @include border();
    }

    .tabs-component-tab {
        position: relative;
        flex: 0 0 auto;
        &:first-child {
            .tabs-component-tab-a {
                margin-left: 0;
            }
        }
        &:last-child {
            .tabs-component-tab-a {
                margin-right: 0;
            }
        }

        &.is-active {
            .tabs-component-tab-a {
                &::after {
                    left: 0;
                    right: 0;
                    opacity: 1;
                }
            }
        }
        &.is-disabled {
            .tabs-component-tab-a {
                cursor: not-allowed;
                color: $color-outline-gray;
            }
        }

        &__tab-name {
            &::after {
                display: block;
                content: attr(data-name);
                font-weight: $font-weight-semi-bold;
                height: 0;
                overflow: hidden;
                visibility: hidden;
            }
        }
        &__icon {
            &-prepend,
            &-append {
                @each $color, $value in $token-colors {
                    &--color-#{$color} {
                        color: $value;
                    }
                }
            }
        }
    }

    .tabs-component-tab-a {
        position: relative;
        display: inline-flex;
        font-family: $font-family-main;
        text-decoration: none;
        padding-bottom: $space-150;
        margin: 0 $space-150;

        @include child-indent-right($space-50);
        @include border();
        .las,
        .la {
            display: flex;
            align-items: center;
        }

        &::after {
            @include pseudo();
            @include position(null, null 50% 0 50%);
            opacity: 0;
            height: 2px;
            z-index: 1;
            transition: left 0.2s ease, right 0.2s ease, opacity 0.2s ease, color 0.2s ease;
        }
    }
}
</style>
