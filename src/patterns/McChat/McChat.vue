<template>
    <div class="mc-chat">
        <mc-drawer icon-close="arrow_forward" @close-panel="handleClose">
            <mc-title slot="title" :ellipsis="false" weight="semi-bold">{{ title }}</mc-title>
            <div v-if="comments.length" class="mc-chat__comments">
                <mc-chat-comment
                    v-for="comment in sortedComments"
                    :key="comment.id"
                    :comment="comment"
                    :default-user-name="defaultUserName"
                    :editable="editable && comment.editable"
                    :date-format="dateFormat"
                    @delete="handleDelete"
                />
            </div>
            <div v-else class="mc-chat__empty-notice">
                <mc-svg-icon name="chat_forum" color="outline-gray" size="1000" :weight="1" />
                <mc-title v-if="emptyMessage" color="outline-gray" text-align="center">{{ emptyMessage }}</mc-title>
            </div>
            <mc-chat-form
                v-if="showInput"
                ref="form"
                slot="footer"
                :value="value"
                :loading="loading"
                :avatar="avatar"
                :placeholder="placeholder"
                @input="handleInput"
                @submit="handleSubmit"
            />
        </mc-drawer>
    </div>
</template>

<script>
import McDrawer from '../McDrawer/McDrawer'
import McChatForm from './McChatForm/McChatForm'
import McChatComment from './McChatComment/McChatComment'
import McSvgIcon from '../../elements/McSvgIcon/McSvgIcon'
import McTitle from '../../elements/McTitle/McTitle'
/**
 * More info: https://officert.github.io/vue-slideout-panel
 */
export default {
    name: 'McChat',
    components: {
        McDrawer,
        McChatForm,
        McChatComment,
        McSvgIcon,
        McTitle,
    },
    props: {
        /**
         * Заголовок
         */
        title: {
            type: String,
            default: '',
        },
        /**
         * Массив комментариев
         */
        comments: {
            type: Array,
            default: () => [],
        },
        /**
         * Значение инпута
         */
        value: {
            type: String,
        },
        /**
         * Можно ли производить
         * действия с комментариями
         */
        editable: {
            type: Boolean,
            default: false,
        },
        /**
         * Аватар пользователя
         */
        avatar: {
            type: String,
            default: null,
        },
        /**
         * Плейсхолдер инпута
         */
        placeholder: {
            type: String,
            default: '',
        },
        /**
         * Текст при отсутствии
         * сообщений в чате
         */
        emptyMessage: {
            type: String,
            default: '',
        },
        /**
         * Отображение инпута
         * для отправки сообщения
         */
        showInput: {
            type: Boolean,
            default: true,
        },
        /**
         * Отступ сверху
         */
        indentTop: {
            type: Number,
            default: 0,
        },
        /**
         * Значение по умолчанию
         * системного комментария
         */
        defaultUserName: {
            type: String,
            default: 'System comment',
        },
        /**
         * Формат даты (moment.js)
         */
        dateFormat: {
            type: String,
            default: 'YYYY-MM-DD HH:mm',
        },
    },
    data() {
        return {
            prettyValue: '',
            loading: false,
            scrollElement: null,
            formElement: null,
            formElementOldHeight: null,
        }
    },
    computed: {
        sortedComments() {
            const comments = [...this.comments]
            return comments.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
        },
    },
    watch: {
        comments: {
            handler(newVal) {
                newVal.length && this.scrollContentToBottom()
                this.loading = false
            },
            deep: true,
        },
    },
    mounted() {
        this.setPosition('slideout', { height: 'auto', top: this.indentTop })
        if (this.showInput) {
            this.formElement = this.$refs.form.$el
            this.formElementOldHeight = this.$refs.form.$el.offsetHeight
        }
        this.setScrollElement()
        this.scrollContentToBottom()
    },
    beforeDestroy() {
        this.setPosition('slideout')
    },
    methods: {
        setPosition(className, { height = '100%', top = 0 } = {}) {
            const els = document.getElementsByClassName(className)
            if (els.length) {
                els[0].style.top = `${top}px`
                els[0].style.height = height
            }
        },
        setScrollElement() {
            const collection = document.getElementsByClassName('mc-drawer__body-inner')
            if (collection.length) {
                this.scrollElement = collection[0]
            }
        },
        scrollContentToBottom() {
            this.$nextTick(() => {
                this.scrollElement && this.scrollElement.scrollTo(0, this.scrollElement.scrollHeight)
            })
        },
        handleClose() {
            /**
             * Событие закрытия панели
             * @property {Object}
             */
            this.$emit('closePanel', {})
        },
        handleInput(value) {
            this.prettyValue = value
            /**
             * Событие ввода
             * @property {string}
             */
            this.$emit('input', value)
            this.$bus && this.$bus.emit('chat-input', value)

            if (this.formElement.offsetHeight !== this.formElementOldHeight) {
                this.formElementOldHeight = this.formElement.offsetHeight
                this.scrollContentToBottom()
            }
        },
        handleSubmit() {
            this.loading = true
            /**
             * Событие по отправке
             */
            if (this.prettyValue) {
                this.$emit('submit', this.prettyValue)
                this.$bus && this.$bus.emit('chat-submit', this.prettyValue)
            }
        },
        handleDelete(id) {
            /**
             * Событие по удалению
             */
            this.$emit('delete', id)
            this.$bus && this.$bus.emit('chat-delete', id)
        },
    },
}
</script>

<style lang="scss">
.slideout-panel .slideout-wrapper .slideout {
    height: auto;
}
.mc-chat {
    $block-name: &;
    height: 100%;

    .mc-drawer__header {
        padding-top: $space-150 - 1px;
        padding-bottom: $space-150;
    }

    .mc-drawer__btn-close {
        @include position(absolute, 0 0 null null);
    }

    .mc-drawer__body-inner {
        display: flex;
        flex-direction: column-reverse;
        padding-left: $space-150;
        padding-right: $space-150;
    }

    &__comments {
        > *:first-child {
            margin-top: $space-400;
        }
        @include child-indent-bottom($space-100);
    }

    &__empty-notice {
        @include align(true, true, absolute);
        @include child-indent-bottom($space-150);
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
</style>
