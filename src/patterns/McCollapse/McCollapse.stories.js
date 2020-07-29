import { boolean } from "@storybook/addon-knobs"
import { action } from "@storybook/addon-actions"

import McCollapse from './McCollapse'
import McButton from '../../elements/McButton/McButton'
import McSlideUpDown from "../../elements/McSlideUpDown/McSlideUpDown"

export default {
  title: 'Patterns/McCollapse',
  component: McCollapse,
  subcomponents: { McSlideUpDown },
  parameters: {
    componentSubtitle: 'Status: Ready',
  },
}

const getCommonTags = ctx => {
  return {
    'is-disabled': ctx.isDisabled,
    border: ctx.border,
    icon: ctx.icon,
  }
}

const actionsData = {
  handleOpenStart: action("onOpenStart"),
  handleCloseStart: action("onCloseStart"),
  handleOpenEnd: action("onOpenEnd"),
  handleCloseEnd: action("onCloseEnd"),
}

export const Default = () => ({
  components: { McCollapse, McButton },
  data() {
    return {
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
    isDisabled: {
      default: boolean('isDisabled', false, 'default'),
    },
    border: {
      default: boolean('border', false, 'default'),
    },
    icon: {
      default: boolean('icon', false, 'default'),
    },
  },
  methods: actionsData,
  template: `<mc-collapse 
    v-bind="tagBind"
    @slide-open-start="handleOpenStart"
    @slide-close-start="handleCloseStart"
    @slide-open-end="handleOpenEnd"
    @slide-close-end="handleCloseEnd"
  >
     <mc-button slot="activator">Title</mc-button>
     <template slot="body">{{content}}</template>
  </mc-collapse>`,
})

export const Disabled = () => ({
  components: { McCollapse },
  data() {
    return {
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
    isDisabled: {
      default: boolean('isDisabled', true, 'disabled'),
    },
    border: {
      default: boolean('border', true, 'disabled'),
    },
    icon: {
      default: boolean('icon', true, 'disabled'),
    },
  },
  methods: actionsData,
  template: `<mc-collapse 
    v-bind="tagBind"
    @slide-open-start="handleOpenStart"
    @slide-close-start="handleCloseStart"
    @slide-open-end="handleOpenEnd"
    @slide-close-end="handleCloseEnd"
  >
     <div slot="activator">Title</div>
     <template slot="body">
         <div style="padding: 16px;">{{content}}</div>
     </template>
  </mc-collapse>`,
})

