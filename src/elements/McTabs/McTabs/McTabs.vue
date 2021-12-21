<template>
    <tabs
        ref="tabs"
        class="mc-tabs"
        :class="classes"
        :cache-lifetime="cacheLifetime"
        :options="{ useUrlFragment, defaultTabHash }"
        @changed="e => changedHandler(e)"
    >
        <!-- @slot для табов -->
        <slot />
    </tabs>
</template>

<script>
import Tabs from 'vue-tabs-component/src/components/Tabs.vue'
import McTab from '../McTab/McTab'

export default {
    name: 'McTabs',
    components: {
        McTab,
        Tabs,
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
            default: 'blue',
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
    },
    computed: {
        classes() {
            return {
                [`mc-tabs--color-${this.color}`]: this.color,
                [`mc-tabs--accent-color-${this.accentColor}`]: this.accentColor,
                [`mc-tabs--tab-variation-${this.tabVariation}`]: this.tabVariation,
                [`mc-tabs--uppercase`]: this.uppercase,
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
    },
    mounted() {
        this.checkInitTab()
    },
    updated() {
        this.switchingDisableTab()
    },
    methods: {
        checkInitTab() {
            if (this.activeTab) {
                const tab = this.$refs.tabs.$children.find(t => t.id === this.activeTab)
                tab?.hash && this.setActiveTab(tab.hash)
            }
        },
        setActiveTab(tabHash) {
            this.$refs.tabs.selectTab(tabHash)
        },
        changedHandler(e) {
            this.activeTab = e?.tab?.id || e?.tab?.hash?.replace('#', '')
            const lastActiveTab = this.$refs.tabs.getActiveTab()
            if (!lastActiveTab) return
            if (e.tab.href) {
                this.setLastActiveTab(lastActiveTab.hash)
                window.open(e.tab.href, '_blank')
            }
            if (e.tab.to && this.$router) {
                this.setLastActiveTab(lastActiveTab.hash)
                this.$router.push(e.tab.to)
            }

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
        getActiveTab() {
            return this.$refs.tabs.getActiveTab()
        },
        switchingDisableTab() {
            /**
             * Переключает активный и в то
             * же время задизейбленный таб
             * на первый доступный
             */
            if (this.loading) return
            const activeTab = this.$refs.tabs?.tabs?.find(tab => tab.isActive)
            if (!activeTab?.isDisabled) return
            const firstAvailableTab = this.$refs.tabs.tabs.find(tab => !tab?.isDisabled && !tab?.href && !tab?.to)
            firstAvailableTab && this.setActiveTab(firstAvailableTab.hash)
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

    .tabs-component-tabs {
        @include reset-text-indents();
        position: relative;
        padding-left: 0;
        margin-top: 0;
        list-style-type: none;
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
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
        font-weight: $font-weight-medium;
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
