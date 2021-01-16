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
.mc-side-bar-bottom {
    $block-name: &;

    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    justify-content: flex-end;

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
        margin-left: -$space-100;
        margin-right: -$space-100;
        & + * {
            margin-top: $space-500;
        }
    }
}
</style>
