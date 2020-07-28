import {select, number, text, array} from "@storybook/addon-knobs"

import McProgress from './McProgress'
import { getTokensByType } from "../../utils/getTokens"

export default {
  title: 'Elements/McProgress',
  component: McProgress,
  parameters: {
    componentSubtitle: 'Status: Ready',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=88%3A0',
    },
  },
}

const tokenColors = getTokensByType('color')

const getCommonTags = ctx => {
  return {
    percent: ctx.percent,
    color: ctx.color,
    helpText: ctx.helpText,
    errors: ctx.errors,
  }
}

export const Default = () => ({
  components: { McProgress },
  computed: {
    tagBind() {
      return getCommonTags(this)
    }
  },
  props: {
    percent: {
      default: number('percent', 68, {}, 'default')
    },
    color: {
      default: select('color', tokenColors, 'azure', 'default')
    },
    helpText: {
      default: text('helpText', 'maximum 16mb', 'default')
    },
    errors: {
      default: array('errors', [], ',', 'default')
    },
  },
  template: '<mc-progress v-bind="tagBind" />',
})

export const Error = () => ({
  components: { McProgress },
  computed: {
    tagBind() {
      return getCommonTags(this)
    }
  },
  props: {
    percent: {
      default: number('percent', 10, {}, 'error')
    },
    color: {
      default: select('color', tokenColors, 'azure', 'error')
    },
    helpText: {
      default: text('helpText', 'maximum 16mb', 'error')
    },
    errors: {
      default: array('errors', ['Файл просто огромный', 'Нельзя так делать'], ',', 'error')
    },
  },
  template: '<mc-progress v-bind="tagBind" />',
})

