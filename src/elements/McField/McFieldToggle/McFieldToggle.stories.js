import {text, boolean, select} from "@storybook/addon-knobs"
import { action } from "@storybook/addon-actions"

import McFieldToggle from './McFieldToggle'

const positions = {
  left: 'left',
  right: 'right',
}

export default {
  title: 'Elements/McFieldToggle',
  component: McFieldToggle,
  parameters: {
    componentSubtitle: 'Status: Ready',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=1%3A2',
    },
  },
}

const getUniqueProps = key => {
  return {
    disabled: {
      default: boolean('disabled', false, key),
    },
    textPosition: {
      default: select('textPosition', positions, 'left', key),
    },
    coloredText: {
      default: boolean('coloredText', false, key),
    },
  }
}

const getCommonTags = ctx => {
  return {
    disabled: ctx.disabled,
    'text-position': ctx.textPosition,
    'colored-text': ctx.coloredText,
  }
}

const actionsData = {
  handleInput: action('toggled'),
}

// mc-field-toggle default
export const Default = () => ({
  components: { McFieldToggle },
  data() {
    return {
      value: null
    }
  },
  computed: {
    tagBind() {
      return {
        ...getCommonTags(this),
      }
    }
  },
  props: {
    ...getUniqueProps('default'),
    textContent: {
      default: text('slot default', 'Default toggle', 'default'),
    },
  },
  methods: actionsData,
  template: `<mc-field-toggle v-bind="tagBind" v-model="value" @input="handleInput">{{ textContent }}</mc-field-toggle>`,
})

