<template>
  <mc-preview class="mc-chat-comment">
    <mc-avatar slot="left" size="400" rounded lazy :src="comment.user ? comment.user.avatar : null"/>
    <mc-title slot="top" variation="overline" color="dark-gray">{{ comment.date }}</mc-title>
    <mc-title slot="top" weight="semi-bold">{{ computedName }}</mc-title>
    <mc-title slot="bottom" v-html="filteredComment" class="mc-chat-comment__content" :ellipsis="false" />
  </mc-preview>
</template>

<script>
import _has from "lodash/has"
import McPreview from "../../McPreview/McPreview"
import McTitle from "../../../elements/McTitle/McTitle"
import McAvatar from "../../../elements/McAvatar/McAvatar"
import McBadge from "../../../elements/McBadge/McBadge"
import McSvgIcon from "../../../elements/McSvgIcon/McSvgIcon"
import McButton from "../../../elements/McButton/McButton"
/**
 * Используется только в McChat
 */
export default {
  name: "McChatComment",
  components: {
    McPreview,
    McTitle,
    McAvatar,
    McBadge,
    McSvgIcon,
    McButton,
  },
  props: {
    /**
     * Объект данных
     * комментария
     */
    comment: {
      type: Object,
      required: true,
    },
    /**
     * Значение по умолчанию
     * системного комментария
     */
    defaultUserName: {
      type: String,
      default: "System comment",
    },
  },
  computed: {
    computedName() {
      return _has(this.comment, ["user", "name"]) ? this.comment.user.name : this.defaultUserName
    },
    filteredComment() {
      let nl2br = this.$options.filters.nl2br
      return nl2br ? nl2br(this.commentWithLinks) : this.commentWithLinks
    },
    commentWithLinks() {
      const regExp = /((http|https):\/\/)?(([0-9a-zA-Zа-яА-Я.-]*)\.([a-zA-Zа-яА-Я]{2,}).*)/gi
      return this.comment.content.replace(regExp, match => {
        const url = /^http/.test(match) ? match : `http://${match}`
        return `<a class="mc-chat-comment__link" href='${url}' target="_blank">${match.trim()}</a>`
      })
    },
  },
}
</script>

<style lang="scss">
.mc-chat-comment {
  $block-name: &;

  &__content {
    margin-top: $space-50;
  }
  &__link {
    color: $color-blue;
    &:hover,
    &:focus {
      color: $color-hover-blue;
    }

    &:active {
      color: $color-hover-blue;
    }
  }
}
</style>