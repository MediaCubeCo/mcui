<template>
    <modal
        :class="classes"
        :name="name"
        :max-width="maxWidth"
        :click-to-close="clickToClose"
        class="mc-modal"
        adaptive
        scrollable
        height="auto"
        width="100%"
        @before-open="handleBeforeOpen"
        @before-close="handleBeforeClose"
        @closed="handleClosed"
        @opened="handleOpened"
    >
        <div ref="modalInner" class="mc-modal__inner">
            <div v-if="$slots.title" class="mc-modal__header">
                <div class="mc-modal__title">
                    <!-- @slot Слот заголовка -->
                    <slot name="title" />
                </div>
            </div>
            <div ref="mcModalBody" class="mc-modal__body">
                <!-- @slot Слот контента -->
                <slot />
            </div>
            <!-- @slot Слот футера -->
            <div class="mc-modal__control"><slot name="footer" /><portal-target name="mcModalFooter" slim /></div>
        </div>
        <button v-if="arrowVisible" type="button" class="mc-modal__btn-back" @click.prevent="handleBack">
            <mc-svg-icon name="arrow_leftward" class="mc-modal__icon-back" />
        </button>
        <button v-if="closeVisible" type="button" class="mc-modal__btn-close" @click.prevent="close">
            <mc-svg-icon class="mc-modal__icon-close" width="24" height="24" name="close" />
        </button>
    </modal>
</template>

<script>
import McSvgIcon from '../../elements/McSvgIcon/McSvgIcon'

export default {
    name: 'McModal',
    components: {
        McSvgIcon,
    },
    props: {
        name: {
            type: String,
        },
        maxWidth: {
            type: Number,
            default: 510,
        },
        closeVisible: {
            type: Boolean,
            default: true,
        },
        /**
         *  Нужно ли закрывать попап
         *  кликом вне окна
         */
        clickToClose: {
            type: Boolean,
            default: true,
        },
        /**
         *  Стрелка в хедере
         */
        arrowVisible: {
            type: Boolean,
            default: false,
        },
        /**
         *  Кастомное модальное окно
         */
        secondaryModal: {
            type: Boolean,
            default: false,
        },
        /**
         * Должен ли контент внутри модалки скроллится с фиксированной шапкой и футером
         * Отключать, когда внутри есть селекты
         * */
        scrollableContent: {
            type: Boolean,
            default: true,
        },
        /**
         * Выравнивание заголовка в шапке,
         * если centered добавляются отступы слева и справа, чтобы текст не наезжал на кнопки
         * centered || left || right
         * */
        headerAlign: {
            type: String,
            default: 'center',
        },
        /**
         * Отступ от верхнего края модального окна до контента.
         * Для "красивой" обрезки картинки при скролле в ситуациях, когда нет хедера
         */
        topPadding: {
            type: Boolean,
            default: false,
        },
    },
    status: 'ready',
    release: '1.0.0',
    data: () => ({
        scrolled_top: false,
        scrolled_bottom: false,
        resize_observer: null,
    }),
    computed: {
        classes() {
            return {
                'mc-modal--arrow-visible': this.arrowVisible,
                'mc-modal--secondary': this.secondaryModal,
                'mc-modal--scrolled-top': this.scrolled_top,
                'mc-modal--scrolled-bottom': this.scrolled_bottom,
                'mc-modal--scrollable': this.scrollableContent,
                'mc-modal--top-padding': this.topPadding,
                [`mc-modal--header-align-${this.headerAlign}`]:
                    (this.closeVisible || this.arrowVisible) && !!this.headerAlign,
            }
        },
    },
    methods: {
        handleBeforeOpen(event) {
            /**
             * Событие перед открытием
             * @property {Object}
             */
            this.$emit('beforeOpen', event)
        },
        handleBeforeClose(event) {
            /**
             * Событие перед закрытием
             * @property {Object}
             */
            this.$emit('beforeClose', event)

            this.resize_observer?.unobserve(this.$refs.mcModalBody)
            this.$refs.mcModalBody.removeEventListener('scroll', this.calculateSeparators)
        },
        handleOpened(event) {
            this.$refs.mcModalBody.addEventListener('scroll', this.calculateSeparators, {
                passive: true,
            })
            this.resize_observer = new ResizeObserver(() => this.calculateSeparators(true))
            this.resize_observer?.observe(this.$refs.mcModalBody)
            this.calculateSeparators()

            /**
             * Событие после открытия
             * @property {Object}
             */
            this.$emit('opened', event)
        },
        handleClosed(event) {
            /**
             * Событие после закрытия
             * @property {Object}
             */
            this.$emit('closed', event)
        },
        close() {
            this.$modal.hide(this.name)
        },
        handleBack(event) {
            this.$emit('back', event)
        },
        /**
         * Устанавливаем сепараторы, если есть скролл
         * @param {Boolean} resized - если метод вызван в ResizeObserver -- отложенный пересчет
         */
        calculateSeparators(resized = false) {
            setTimeout(
                () => {
                    const { scrollTop, scrollHeight, clientHeight } = this.$refs.mcModalBody || {}
                    // Сепаратор появится если высота скролла будет > 2px
                    const offset = 2
                    this.scrolled_top = scrollTop > offset
                    this.scrolled_bottom = scrollTop + clientHeight < scrollHeight - offset
                },
                resized ? 300 : 0,
            )
        },
    },
}
</script>

<style lang="scss">
.v--modal-block-scroll {
    width: 100%;
}

.mc-modal {
    $block-name: &;
    $border-color: #dee1e9;
    $box-shadow-color: #20008c28;

    @media #{$media-query-s} {
        padding: 12px 0;
    }

    .vm--modal {
        border-radius: $radius-200;
    }
    &__btn-close {
        @include reset-btn();
        @include position(absolute, $space-400 $space-200 null null);
        @include close-link();
        z-index: $z-index-sticky;
        @media #{$media-query-s} {
            @include position(absolute, $space-400 $space-600 null null);
        }
    }
    &__btn-back {
        @include reset-btn();
        @include position(absolute, $space-400 null null $space-200);
        @include close-link();
        z-index: $z-index-sticky;
        @media #{$media-query-s} {
            @include position(absolute, $space-400 null null $space-600);
        }
    }

    &__icon-close {
        @include size($size-300);
        transition: color $duration-s;
    }

    &.overlay-fade-enter-active,
    &.overlay-fade-leave-active {
        .mc-modal__inner {
            transition: all $duration-s;
            transform: translate3d(0, 0, 0);
        }
    }

    &.overlay-fade-enter,
    &.overlay-fade-leave-active {
        .mc-modal__inner {
            transform: translate3d(0, -20px, 0);
        }
    }

    &.mc-modal--secondary {
        .mc-modal {
            &__inner {
                border-radius: 32px;
                box-shadow: 0px 15px 30px $box-shadow-color;
                padding: 32px;
            }
            &__btn-close,
            &__btn-back {
                top: 27px;
            }
            &__btn-close {
                right: 32px;
            }
            &__btn-back {
                left: 32px;
            }
            &__header {
                padding-bottom: 9px;
                border-bottom: 2px solid $border-color;
                margin-bottom: 32px;
            }
            &__control {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .mc-button {
                    border-radius: 12px;
                }
            }
        }
    }

    &.v--modal-overlay {
        z-index: $z-index-overlay;
        background-color: fade-out($color-black, 0.5);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100% !important;
        height: 100% !important;
        max-height: -webkit-fill-available !important;
        min-height: 100% !important;

        .v--modal-background-click {
            padding-bottom: 0;
            height: 100%;
            @media #{$media-query-s} {
                height: auto;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }

        .v--modal-box {
            overflow: visible;
            top: auto !important;
            left: auto !important;
        }

        &.scrollable {
            .v--modal-box {
                margin-bottom: 0;
            }
        }
    }

    .v--modal-box {
        min-width: 320px;
        height: 100% !important;
        @media #{$media-query-s-down} {
            width: 100% !important;
        }
    }

    .v--modal,
    .vm--modal {
        background-color: transparent;
        border-radius: 0;
        box-shadow: none;
        padding: 0;
    }

    &__header {
        flex-shrink: 0;
        padding: $space-400 $space-200 $space-250;
        @media #{$media-query-s} {
            padding: $space-350;
        }
    }

    &__title {
        margin-top: 0;
        margin-bottom: 0;
        color: hsl(0, 0%, 13%);
        font-family: $font-family-main;
        @include reset-text-indents();
    }

    &__body {
        padding: $space-50 $space-200;
        flex-grow: 1;
        min-height: 0;
        overflow-x: hidden;
        > *:only-child {
            min-height: 100%;
        }
        @media #{$media-query-s} {
            padding: $space-50 $space-400;
            overflow: visible;
        }
    }
    &__inner {
        box-shadow: 0 6px 12px rgba(110, 110, 110, 0.61);
        background-color: $color-white;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        height: 100% !important;
        > *:first-child {
            padding-top: $space-400;
        }
        > *:last-child {
            padding-bottom: $space-400;
        }
        @media #{$media-query-s} {
            overflow: visible;
            /* прячет рандомный скроллбар при включении модалки */
            -ms-overflow-style: none;
            scrollbar-width: none;
            &::-webkit-scrollbar {
                display: none;
            }
            border-radius: $radius-100;
            margin: 0 $space-150 0 $space-150;
        }
    }
    &--scrollable {
        overflow: hidden !important;
        #{$block-name} {
            &__body {
                overflow-y: auto;
                overflow-x: hidden;
            }
            &__inner {
                overflow-x: hidden;
                @media #{$media-query-s} {
                    max-height: 80vh;
                }
            }
        }
    }
    &--header-align {
        &-center {
            #{$block-name} {
                &__header {
                    padding-left: $space-500;
                    padding-right: $space-500;
                    @media #{$media-query-s} {
                        padding-left: $space-700;
                        padding-right: $space-700;
                    }
                }
            }
        }
        &-left {
            #{$block-name} {
                &__header {
                    padding-bottom: $space-150;
                }
            }
        }
    }

    &--scrolled {
        &-top {
            #{$block-name} {
                &__header {
                    border-bottom: 1px solid $color-outline-gray;
                }
            }
        }
        &-bottom {
            #{$block-name} {
                &__control:not(:empty) {
                    border-top: 1px solid $color-outline-gray;
                }
            }
        }
    }
    &--top-padding {
        #{$block-name}__inner:before {
            content: '';
            height: $space-400;
            min-height: $space-400;
        }
    }
    &__control {
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        padding: $space-250 $space-200 $space-400;
        @media #{$media-query-s} {
            padding: $space-350 $space-300 $space-300;
        }
        .mc-button {
            width: 100%;
        }
        @media #{$media-query-s} {
            .mc-button {
                width: unset;
            }
        }
        &:empty {
            position: relative;
            padding: $space-300 0 0;
        }
    }
}
html[direction='rtl'] {
    .mc-modal {
        $border-color: #dee1e9;
        $box-shadow-color: #20008c28;
        &__btn-close {
            position: absolute;
            right: unset;
            left: $space-200;
            top: $space-400;
            @media #{$media-query-m} {
                left: $space-400;
            }
        }
        &__btn-back {
            position: absolute;
            left: unset;
            right: $space-200;
            top: $space-400;
            transform: rotate(180deg);
            @media #{$media-query-m} {
                right: $space-400;
            }
        }
        &.mc-modal--secondary {
            .mc-modal {
                &__btn-close {
                    right: unset;
                    left: 32px;
                }
                &__btn-back {
                    left: unset;
                    right: 32px;
                }
            }
        }

        &.v--modal-overlay {
            .v--modal-box {
                left: unset !important;
                right: auto !important;
            }
        }
    }
}
</style>
