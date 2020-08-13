import { boolean, text } from '@storybook/addon-knobs'

import McChatForm from "./McChatForm"
import McRoot from "../../../templates/layouts/McRoot/McRoot"

export default {
  title: 'Patterns/McChatForm',
  component: McChatForm,
  parameters: {
    componentSubtitle: 'Status: In progress',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=346%3A2152',
    },
  },
}


const getCommonTags = ctx => {
  return {
    value: ctx.value,
    loading: ctx.loading,
    avatar: ctx.avatar,
    placeholder: ctx.placeholder,
  }
}

const actionsData = {}

export const Default = () => ({
  components: { McChatForm, McRoot },
  data() {
    return {
      value: '',
    }
  },
  props: {
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
  computed: {
    tagBind() {
      return getCommonTags(this)
    },
  },
  methods: {
    ...actionsData,
    handleInput(value) {
      console.log('onInput', value)
      this.value = value
    },
    handleSubmit() {
      console.log('onSubmit')
      this.value = ''
    },
  },
  template: `<mc-chat-form v-bind="tagBind" @input="handleInput" @submit="handleSubmit" />`,
})

