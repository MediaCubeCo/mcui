<template>
<div class="mc-chat">
  <mc-drawer icon-close="arrow_forward" @close-panel="handleClose">
    <mc-title slot="title" :ellipsis="false" weight="semi-bold">{{ title }}</mc-title>
    <div v-if="comments.length" class="mc-chat__comments">
      <mc-chat-comment v-for="comment in computedComments" :key="comment.id" :comment="comment" />
    </div>
    <div v-else class="mc-chat__empty-notice">
      <mc-svg-icon name="chat_forum" color="outline-gray" size="1000" :weight="1" />
      <mc-title v-if="emptyMessage" color="outline-gray" text-align="center">{{ emptyMessage }}</mc-title>
    </div>
    <mc-chat-form
      v-if="showInput"
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
import _XEUtils from 'xe-utils'
import McDrawer from "../McDrawer/McDrawer"
import McChatForm from "./McChatForm/McChatForm"
import McChatComment from "./McChatComment/McChatComment"
import McButton from "../../elements/McButton/McButton"
import McSvgIcon from "../../elements/McSvgIcon/McSvgIcon"
import McSeparator from "../../elements/McSeparator/McSeparator"
import McTitle from "../../elements/McTitle/McTitle"
/**
 * More info: https://officert.github.io/vue-slideout-panel
 */
export default {
  name: "McChat",
  components: {
    McDrawer,
    McChatForm,
    McChatComment,
    McButton,
    McSvgIcon,
    McSeparator,
    McTitle,
  },
  props: {
    /**
     * Заголовок
     */
    title: {
      type: String,
      default: "",
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
     * Состояние загрузки/отправки
     * данных
     */
    loading: {
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
      default: "",
    },
    /**
     * Текст при отсутствии
     * сообщений в чате
     */
    emptyMessage: {
      type: String,
      default: "",
    },
    /**
     * Отображение инпута
     * для отправки сообщения
     */
    showInput: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    computedComments() {
      return this.comments.map(comment => {
        return {
          id: _XEUtils.uniqueId(),
          ...comment,
        }
      })
    }
  },
  methods: {
    handleClose() {
      /**
       * Событие закрытия панели
       * @property {Object}
       */
      this.$emit("closePanel", { userAge: this.prettyUserAge })
    },
    handleInput(value) {
      /**
       * Событие ввода
       * @property {string}
       */
      this.$emit("input", value)
      this.$bus.emit('chat-input', value)
    },
    handleSubmit() {
      /**
       * Событие по отправке
       */
      this.$emit("submit")
      this.$bus.emit('chat-submit')
    },
  },
}
</script>

<style lang="scss">
.mc-chat {
  $block-name: &;
  height: 100%;

  &__comments {
    @include child-indent-bottom($space-200);
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