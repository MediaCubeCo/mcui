import { boolean, text } from '@storybook/addon-knobs'

import McChatComment from "./McChatComment"

export default {
  title: 'Patterns/McChatComment',
  component: McChatComment,
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
    comment: ctx.comment,
    editable: ctx.editable,
    defaultUserName: ctx.defaultUserName,
  }
}

const actionsData = {}

export const Default = () => ({
  components: { McChatComment },
  data() {
    return {
      value: '',
    }
  },
  props: {
    editable: {
      default: boolean('editable', false, 'default'),
    },
    name: {
      default: text('name', 'Kirill Sushko', 'default'),
    },
    avatar: {
      default: text('avatar', 'https://avatars3.githubusercontent.com/u/43079603?s=460&v=4', 'default'),
    },
    content: {
      default: text('placeholder', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'default'),
    },
    defaultUserName: {
      default: text('defaultUserName', 'Chubaka', 'default'),
    },
  },
  computed: {
    tagBind() {
      return getCommonTags(this)
    },
    comment() {
      return {
        content: this.content,
        date: new Date().toString(),
        user: {
          name: this.name,
          avatar: this.avatar,
        },
      }
    },
  },
  methods: {
    ...actionsData,
  },
  template: `<mc-chat-comment v-bind="tagBind" />`,
})

