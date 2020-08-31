import {select, number, text, array, boolean} from "@storybook/addon-knobs"

import McRangeSlider from './McRangeSlider'
import { getTokensByType } from "../../utils/getTokens"
import {action} from "@storybook/addon-actions"

export default {
  title: 'Elements/McRangeSlider',
  component: McRangeSlider,
  parameters: {
    componentSubtitle: 'Status: Ready',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=88%3A0',
    },
  },
}

const tokenColors = getTokensByType('color')
const placements = {
  top: 'top',
  right: 'right',
  bottom: 'bottom',
  left: 'left',
}
const tooltipDisplay = {
  none: 'none',
  always: 'always',
  hover: 'hover',
  focus: 'focus',
  active: 'active',
}

const getUniqueProps = key => {
  return {
    step: {
      default: number('step', 1, {}, key)
    },
    color: {
      default: select('color', tokenColors, 'orange', key)
    },
    lazy: {
      default: boolean('lazy', true, key)
    },
    disabled: {
      default: boolean('disabled', false, key),
    },
    tooltip: {
      default: select('tooltip', tooltipDisplay, 'hover', key),
    },
    tooltipPlacement: {
      default: select('tooltipPlacement', placements, 'top', key),
    },
    coloredTooltip: {
      default: boolean('coloredTooltip', false, key),
    },
  }
}

const getCommonTags = ctx => {
  return {
    value: ctx.value,
    min: ctx.min,
    max: ctx.max,
    step: ctx.step,
    color: ctx.color,
    lazy: ctx.lazy,
    disabled: ctx.disabled,
    tooltip: ctx.tooltip,
    'tooltip-placement': ctx.tooltipPlacement,
    'colored-tooltip': ctx.coloredTooltip,
  }
}

const actionsData = {
  handleChange: action('changed'),
  handleDrag: action('dragging'),
}

export const Default = () => ({
  components: { McRangeSlider },
  data() {
    return {
      value: 10,
    }
  },
  computed: {
    tagBind() {
      return getCommonTags(this)
    }
  },
  props: {
    ...getUniqueProps('default'),
    min: {
      default: number('min', 0, {}, 'default')
    },
    max: {
      default: number('max', 100, {}, 'default')
    },
  },
  methods: actionsData,
  template: '<mc-range-slider v-bind="tagBind" v-model="value" @input="handleChange" @dragging="handleDrag" />',
})

export const MultiValue = () => ({
  components: { McRangeSlider },
  data() {
    return {
      value: [20, 80],
    }
  },
  computed: {
    tagBind() {
      return getCommonTags(this)
    }
  },
  props: {
    ...getUniqueProps('multiValue'),
    min: {
      default: number('min', 0, {}, 'multiValue')
    },
    max: {
      default: number('max', 100, {}, 'multiValue')
    },
  },
  methods: actionsData,
  template: '<mc-range-slider v-bind="tagBind" v-model="value" @input="handleChange" @dragging="handleDrag" />',
})

