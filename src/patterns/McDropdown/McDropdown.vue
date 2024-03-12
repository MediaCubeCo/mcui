<template>
    <div v-click-outside="handleClickOutside" class="mc-dropdown" :class="dropdownClasses">
        <div class="mc-dropdown__toggle" :class="toggleClasses" tabindex="0" @keyup.esc="closeDropdown">
            <!-- @slot активатора переключения состояния -->
            <slot name="activator" />
        </div>
        <div ref="dropdown_body" :style="dropdownBodyStyles" class="mc-dropdown__body">
            <!-- @slot контента -->
            <slot />
        </div>
    </div>
</template>

<script>
import VueClickOutside from 'vue-click-outside'
import _throttle from 'lodash/throttle'

export default {
    name: 'McDropdown',
    directives: {
        'click-outside': VueClickOutside,
    },
    props: {
        /**
         * Состояние видимости контента
         */
        value: {
            type: Boolean,
            default: false,
        },
        /**
         * Выравнивание
         * контента: 'left', 'right', 'auto'
         */
        position: {
            type: String,
            default: 'left',
        },
        /**
         * Направление отображения
         * контента: 'top', 'bottom', 'auto'
         */
        listPosition: {
            type: String,
            default: 'bottom',
        },
        /**
         * Минимальная ширина выпадаюзего списка
         */
        listMinWidth: {
            type: String,
            default: 'inherit',
        },
        /**
         * Необходимо ли вращение иконки
         * (элементу для вращения, необходимо добавить класс 'rotate')
         */
        rotateIcon: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            local_list_position: null,
            local_position: null,
        }
    },
    computed: {
        dropdownClasses() {
            return {
                [`mc-dropdown--position-${this.local_position}`]: this.local_position,
                [`mc-dropdown--list-position-${this.local_list_position}`]: this.local_list_position,
                ['mc-dropdown--is-open']: this.value,
            }
        },
        dropdownBodyStyles() {
            return {
                'min-width': this.listMinWidth,
            }
        },
        toggleClasses() {
            return {
                ['mc-dropdown__toggle--rotate-icon']: this.rotateIcon,
            }
        },
        activator() {
            return this.$slots.activator[0].elm
        },
    },

    watch: {
        $route() {
            this.value && this.closeDropdown()
        },
        value() {
            this.$nextTick(() => {
                this.calculateDropdownPosition()
            })
        },
    },

    mounted() {
        this.activator.addEventListener('click', this.toggleDropdown)
        window.addEventListener('resize', this.throttledCalculateDropdownPosition)
        window.addEventListener('transitionrun', this.throttledCalculateDropdownPosition)
    },

    beforeDestroy() {
        this.activator.removeEventListener('click', this.toggleDropdown)
        window.removeEventListener('resize', this.throttledCalculateDropdownPosition)
        window.removeEventListener('transitionrun', this.throttledCalculateDropdownPosition)
    },

    methods: {
        toggleDropdown() {
            /**
             * Событие по тогглу
             * @property {Boolean}
             */
            this.$emit('input', !this.value)
        },
        handleClickOutside(e) {
            if (!this.value || !document.body.contains(e.target)) return
            this.value && this.closeDropdown()
        },
        closeDropdown() {
            this.$emit('input', false)
        },
        calculateDropdownPosition() {
            if (!this.$refs.dropdown_body) return
            const rect = this.activator.getBoundingClientRect()
            const space_below = window.innerHeight - rect.bottom
            const space_left = window.innerWidth - rect.left
            const { offsetHeight: dropdown_height, offsetWidth: dropdown_width } = this.$refs.dropdown_body
            // Определяем направление отображения списка
            const auto_list_position = space_below < dropdown_height ? 'top' : 'bottom'
            const auto_position = space_left > dropdown_width ? 'left' : 'right'
            // Устанавливаем значения в зависимости от position
            this.local_list_position = this.listPosition === 'auto' ? auto_list_position : this.listPosition
            this.local_position = this.position === 'auto' ? auto_position : this.position
        },
        throttledCalculateDropdownPosition: _throttle(function() {
            this.calculateDropdownPosition()
        }, 200),
    },
}
</script>

<style lang="scss">
.mc-dropdown {
    $block-name: &;

    position: relative;
    display: inline-block;

    &__toggle {
        outline: none;
        @include reset-text-indents();
        .mc-svg-icon {
            transition: all $duration-s;
        }
    }

    &__body {
        @include position(absolute, null null null 0);
        z-index: $z-index-dropdown;
        height: 0;
        overflow: hidden;
        margin: 0;
        background-color: transparent;
        opacity: 0;
        visibility: hidden;
        transition: opacity $duration-s, transform $duration-s;

        .mc-button {
            &:not(.nuxt-link-active):not(.mc-button--is-active):not(.mc-button--variation-red-flat) {
                &:hover {
                    .mc-button__background {
                        opacity: 0 !important;
                    }
                    background-color: fade-out($color-purple, 0.9);
                }
            }
        }
    }

    &--list-position-top {
        #{$block-name} {
            &__body {
                bottom: 100%;
                margin-bottom: $space-100;
            }
        }
    }

    &--list-position-bottom {
        #{$block-name} {
            &__body {
                top: 100%;
                margin-top: $space-100;
            }
        }
    }

    &--is-open {
        #{$block-name} {
            &__body {
                height: auto;
                visibility: visible;
                overflow: visible;
                opacity: 1;
            }
        }

        #{$block-name} {
            &__toggle--rotate-icon {
                .rotate {
                    position: relative;
                    transform: rotate(180deg);
                }
            }
        }
    }

    &--position-right {
        #{$block-name} {
            &__body {
                inset-inline-start: auto;
                inset-inline-end: 0;
            }
        }
    }

    &--position-left {
        #{$block-name} {
            &__body {
                inset-inline-start: 0;
                inset-inline-end: auto;
            }
        }
    }
}
</style>
