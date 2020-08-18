<template>
<div class="mc-chat">
  <mc-drawer icon-close="arrow_forward" @close-panel="handleClose">
    <mc-title slot="title" :ellipsis="false" weight="semi-bold">{{ title }}</mc-title>
    <div v-if="comments.length" class="mc-chat__comments">
      <mc-chat-comment
          v-for="comment in comments"
          :key="comment.id"
          :comment="comment"
          :editable="editable"
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
  data() {
    return {
      scrollElement: null,
      formElement: null,
      formElementOldHeight: null,
    }
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
     * Можно липроизводить
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
    indentTop: {
      type: Number,
      default: 0,
    },
  },
  mounted() {
    this.setPosition('slideout')
    this.setPosition('slideout-panel-bg')
    this.formElement = this.$refs.form.$el
    this.formElementOldHeight = this.$refs.form.$el.offsetHeight
    this.setScrollElement()
    this.scrollContentToBottom()
  },
  beforeDestroy() {
    this.setPosition('slideout', true)
    this.setPosition('slideout-panel-bg', true)
  },
  watch: {
    comments: {
      handler(newVal) {
        newVal.length && this.scrollContentToBottom()
      },
      deep: true,
    },
  },
  methods: {
    setPosition(className, reset) {
      const els = document.getElementsByClassName(className)
      if (els.length) {
        els[0].style.top = reset ? 0 : `${this.indentTop}px`
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
        this.scrollElement && this.scrollElement.scrollTo(0, this.scrollElement.offsetHeight)
      })
    },
    handleClose() {
      /**
       * Событие закрытия панели
       * @property {Object}
       */
      this.$emit("closePanel", {})
    },
    handleInput(value) {
      /**
       * Событие ввода
       * @property {string}
       */
      this.$emit("input", value)
      this.$bus.emit('chat-input', value)

      if (this.formElement.offsetHeight !== this.formElementOldHeight) {
        this.formElementOldHeight = this.formElement.offsetHeight
        this.scrollContentToBottom()
      }
    },
    handleSubmit() {
      /**
       * Событие по отправке
       */
      this.$emit("submit")
      this.$bus.emit('chat-submit')
    },
    handleDelete(id) {
      /**
       * Событие по удалению
       */
      this.$emit('delete', id)
      this.$bus.emit('chat-delete', id)
    }
  },
}
</script>

<style lang="scss">
.slideout-panel
.slideout-wrapper
.slideout {
  height: auto;
}
.mc-chat {
  $block-name: &;
  height: 100%;

  .mc-drawer__header {
    border-top: 1px solid $color-hover-gray;
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

  .mc-drawer__footer {
    border-bottom: 1px solid $color-hover-gray;
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