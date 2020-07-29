import {text, boolean, number} from "@storybook/addon-knobs"
import { action } from "@storybook/addon-actions"

import McSlideUpDown from './McSlideUpDown'
import McButton from '../McButton/McButton'

export default {
  title: 'Elements/McSlideUpDown',
  component: McSlideUpDown,
  parameters: {
    componentSubtitle: 'Status: Ready',
  },
}

const getUniqueProps = key => {
  return {
    duration: {
      default: number('duration', 500, {}, key)
    },
    tag: {
      default: text('tag', 'div', key)
    },
    useHidden: {
      default: boolean('useHidden', true, key),
    },

  }
}

const getCommonTags = ctx => {
  return {
    duration: ctx.duration,
    tag: ctx.tag,
    'use-hidden': ctx.useHidden,
  }
}

const actionsData = {
  handleOpenStart: action("onOpenStart"),
  handleCloseStart: action("onCloseStart"),
  handleOpenEnd: action("onOpenEnd"),
  handleCloseEnd: action("onCloseEnd"),
}

export const Default = () => ({
  components: { McSlideUpDown, McButton },
  data() {
    return {
      isActive: false,
      content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
       Autem doloribus est illo laborum libero nostrum suscipit tempora voluptates! Assumenda, provident! Odmen petuh!`,
    }
  },
  computed: {
    tagBind() {
      return getCommonTags(this)
    }
  },
  props: {
    ...getUniqueProps('default'),
  },
  methods: actionsData,
  template: `<div>
      <mc-button @click="isActive = !isActive">Toggle</mc-button>
      <mc-slide-up-down 
        v-bind="tagBind" 
        :active="isActive" 
        @slide-open-start="handleOpenStart"
        @slide-close-start="handleCloseStart"
        @slide-open-end="handleOpenEnd"
        @slide-close-end="handleCloseEnd"
      >
          {{content}}
      </mc-slide-up-down>
  </div>`,
})

