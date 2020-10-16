import { text, boolean } from '@storybook/addon-knobs'
import { action } from "@storybook/addon-actions"

import McSideBarBottom from "./McSideBarBottom"
import McSideBarButton from "../McSideBarButton/McSideBarButton"

const wrapper = () => {
  return {
    template: `<div 
            style="display: flex; flex-direction: column; height: 600px; background-color: #202427; width: 216px;"
        >
        <story />
    </div>`,
  }
}

export default {
  title: 'Patterns/McSideBar/McSideBarBottom',
  component: McSideBarBottom,
  subcomponents: { McSideBarButton, },
  parameters: {
    componentSubtitle: 'Status: In progress',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=350%3A0',
    },
  },
  decorators: [wrapper],
}

const getUniqueProps = key => {
  return {
    hideText: {
      default: text('hideText', 'Hide', key),
    },
    compact: {
      default: boolean('compact', false, key),
    },
  }
}

const getCommonTags = ctx => {
  return {
    hideText: ctx.hideText,
    compact: ctx.compact,
  }
}

const actionsData = {
  handleToggleSize: action('toggle-size'),
}

export const Default = () => ({
  components: { McSideBarBottom },
  computed: {
    tagBind() {
      return getCommonTags(this)
    },
  },
  props: {
    ...getUniqueProps('default'),
  },
  methods: actionsData,
  template: `<mc-side-bar-bottom v-bind="tagBind" @toggle-size="handleToggleSize" />`,
})

