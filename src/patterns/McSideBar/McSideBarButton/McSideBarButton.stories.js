import { text, select, boolean, object } from '@storybook/addon-knobs'
import { action } from "@storybook/addon-actions"

import McSideBarButton from "./McSideBarButton"

const wrapper = () => {
  return {
    template: `<div style="background-color: #202427; width: 216px;">
        <story />
    </div>`,
  }
}

export default {
  title: 'patterns/McSideBarButton',
  component: McSideBarButton,
  parameters: {
    componentSubtitle: 'Status: In Progress',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=350%3A0',
    },
  },
  decorators: [wrapper],
}

const getUniqueProps = key => {
  return {
    to: {
      default: object('to', { name: 'test', params: { id: 123 }, }, key),
    },
    href: {
      default: text('href', 'https://mediacube.agency/', key),
    },
    icon: {
      default: text('icon', 'group', key),
    },
    title: {
      default: text('title', 'Users', key),
    },
    compact: {
      default: boolean('compact', false, key),
    },
    info: {
      default: text('info', '1234', key),
    },
    exact: {
      default: boolean('exact', false, key),
    },
    disabled: {
      default: boolean('disabled', false, key),
    },
  }
}

const getCommonTags = ctx => {
  return {
    to: ctx.to,
    href: ctx.href,
    icon: ctx.icon,
    title: ctx.title,
    compact: ctx.compact,
    info: ctx.info,
    exact: ctx.exact,
    disabled: ctx.disabled,
  }
}

const actionsData = {
  handleClick: action('clicked'),
}

export const Default = () => ({
  components: { McSideBarButton },
  computed: {
    tagBind() {
      return getCommonTags(this)
    }
  },
  props: {
    ...getUniqueProps('default'),
  },
  methods: actionsData,
  template: `<mc-side-bar-button v-bind="tagBind" @click="handleClick" />`,
})

