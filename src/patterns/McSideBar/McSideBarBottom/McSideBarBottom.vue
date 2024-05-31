<template>
    <div class="mc-side-bar-bottom" :class="classes">
        <div
            v-if="!compact && $slots['bottom-message']"
            class="mc-side-bar-bottom__slot-message"
            :style="messageStyles"
        >
            <slot name="bottom-message" />
        </div>
        <mc-side-bar-button
            v-if="!hiddenMode"
            class="mc-side-bar-bottom__hide-button"
            icon="arrow_backward"
            :title="hideText"
            :compact="compact"
            :variation="closeButtonProps.variable"
            :secondary-color="closeButtonProps.secondaryColor"
            @click="handleClick"
        />
    </div>
</template>

<script>
import McSideBarButton from '../McSideBarButton/McSideBarButton'
export default {
    name: 'McSideBarBottom',
    components: {
        McSideBarButton,
    },
    inject: ['provideData'],
    props: {
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
        hiddenMode: {
            type: Boolean,
            default: false,
        },
        sidebarWidth: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            hasCompactClass: this.compact,
        }
    },
    computed: {
        closeButtonProps() {
            return this.provideData?.currentThemeConfig?.closeButton || {}
        },
        classes() {
            return {
                'mc-side-bar-bottom--compact': this.hasCompactClass,
            }
        },
        messageStyles() {
            return {
                minWidth: this.sidebarWidth,
            }
        },
    },
    watch: {
        compact(newValue) {
            this.hasCompactClass = newValue
        },
    },
    methods: {
        handleClick() {
            if (this.hasCompactClass !== this.compact) return
            this.$emit('toggle-size', !this.compact)
            this.hasCompactClass = !this.hasCompactClass
        },
    },
}
</script>

<style lang="scss">
@import '../../../tokens/durations';
.mc-side-bar-bottom {
    $block-name: &;

    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    justify-content: flex-end;
    min-height: max-content;

    &__hide-button {
        .mc-side-bar-button__icon {
            transition: transform $duration-s;
        }
    }

    &--compact {
        #{$block-name}__hide-button {
            .mc-side-bar-button__icon {
                transform: rotate(180deg);
            }
        }
    }
    &__slot-message {
        margin-inline-start: -$space-100;
        margin-inline-end: -$space-100;
        padding-inline-start: $space-100;
        padding-inline-end: $space-100;
        & + * {
            margin-top: $space-500;
        }
    }
}
</style>
