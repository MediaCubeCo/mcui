import { boolean, text } from '@storybook/addon-knobs'
import { action } from "@storybook/addon-actions"

import McChat from './McChat'
import McChatForm from "./McChatForm/McChatForm"
import McDrawer from "../McDrawer/McDrawer"
import McRoot from "../../templates/layouts/McRoot/McRoot"
import McButton from "../../elements/McButton/McButton"
import McTitle from "../../elements/McTitle/McTitle"
import McFieldText from "../../elements/McField/McFieldText/McFieldText"

import chatComments from "../../mocks/chatComments"

export default {
  title: 'Patterns/McChat',
  component: McChat,
  subcomponents: { McDrawer, McChatForm },
  parameters: {
    componentSubtitle: 'Status: In progress',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=346%3A2152',
    },
  },
}

const getCommonTags = ctx => {
  return {}
}

const actionsData = {
  // onChatSubmit: action('onSubmit'),
}

export const Default = () => ({
  components: { McChat, McRoot, McButton, McTitle, McFieldText },
  data() {
    return {
      value: '',
      comments: chatComments,
      name: 'Kirill Sushko',
    }
  },
  props: {
    title: {
      default: text('title', 'Chat', 'default'),
    },
    emptyMessage: {
      default: text('emptyMessage', 'No messages', 'default'),
    },
    width: {
      default: text('width', '320px', 'default'),
    },
    hideBg: {
      default: boolean('hideBg', false, 'default'),
    },
    removeBg: {
      default: boolean('removeBg', false, 'default'),
    },
    showInput: {
      default: boolean('showInput', true, 'default'),
    },
    loading: {
      default: boolean('loading', false, 'default'),
    },
    avatar: {
      default: text('avatar', 'https://avatars3.githubusercontent.com/u/43079603?s=460&v=4', 'default'),
    },
    placeholder: {
      default: text('placeholder', 'Message...', 'default'),
    },
  },
  watch: {
    // panelResult(newValue) {
    //   newValue.promise.then(res => {
    //     this.userAge = res.userAge
    //   })
    // }
  },
  created() {
    this.$bus.on('chat-input', this.updateChatInput)
    this.$bus.on('chat-submit', this.onChatSubmit)
  },

  beforeDestroy() {
    this.$bus.off('chat-input', this.updateChatInput)
    this.$bus.off('chat-submit', this.onChatSubmit)
  },
  computed: {
    tagBind() {
      return getCommonTags(this)
    },
  },
  methods: {
    ...actionsData,
    showChat() {
      // для вызова чата в проекте предпочтительно
      // использование миксина с коллбэком
      this.panelResult = this.$showPanel({
        component: "McChat",
        width: this.width,
        openOn: 'right',
        hideBg: true,
        removeBg: this.removeBg,
        disableBgClick: false,
        keepAlive: true,
        props: {
          title: this.title,
          emptyMessage: this.emptyMessage,
          showInput: this.showInput,
          value: this.value,
          loading: this.loading,
          avatar: this.avatar,
          placeholder: this.placeholder,
          comments: this.comments,
        }
      })
    },
    updateChatInput(value) {
      this.value = value
    },
    onChatSubmit() {
      const comment = {
        content: this.value,
        date: new Date().toString(),
        user: {
          name: this.name,
          avatar: this.avatar,
        },
      }
      this.comments.push(comment)
      this.value = ''
    },
  },
  template: `<mc-root>
    <mc-button @click.prevent="showChat">Show Chat</mc-button>
  </mc-root>`,
})

