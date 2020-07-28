import {text, boolean, array, select, number} from "@storybook/addon-knobs"
import { action } from "@storybook/addon-actions"

import McFieldRadioGroup from './McFieldRadioGroup'
import McFieldRadioButton from '../McFieldRadioButton/McFieldRadioButton'


export default {
  title: 'Elements/McFieldRadioGroup',
  component: McFieldRadioGroup,
  subcomponents: { McFieldRadioButton },
  parameters: {
    componentSubtitle: 'Status: Ready',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=1%3A2',
    },
  },
}

const directions = {
  'row': 'row',
  'column': 'column',
}

let optionsArr = ['Apples', 'Oranges', 'Watermelon', 'Bananas', 'Lemons']
let optionsArrOfObj = [
  { label: 'Apples', value: 0 },
  { label: 'Oranges', value: 1 },
  { label: 'Watermelon', value: 2 },
  { label: 'Bananas', value: 3 },
  { label: 'Lemons', value: 4 },
]

const getUniqueProps = key => {
  return {
    disabled: {
      default: boolean('disabled', false, key),
    },
  }
}

const getCommonTags = ctx => {
  return {
    name: ctx.name,
    options: ctx.options,
    'default-value': ctx.defaultValue,
    disabled: ctx.disabled,
    'radio-class-name': ctx.radioClassName,
    direction: ctx.direction,
  }
}

const actionsData = {
  onChange: action('changed'),
}

// mc-field-radio-group default
export const Default = () => ({
  components: { McFieldRadioGroup },
  data() {
    return {
      value: 'Apples',
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
    name: {
      default: text('name', 'default_radio', 'default'),
    },
    options: {
      default: array(
        'options',
        optionsArr,
        ',',
        'default'
      ),
    },
    defaultValue: {
      default: text('defaultValue', 'Apples', 'default'),
    },
    radioClassName: {
      default: text('radioClassName', '', 'default'),
    },
    direction: {
      default: select('direction', directions, 'column', 'default'),
    },
  },
  methods: actionsData,
  template: `<mc-field-radio-group v-bind="tagBind" v-model="value" @change="onChange" />`,
})

// mc-field-radio-group with custom class and options array of objects
export const WithCustomClass = () => ({
  components: { McFieldRadioGroup },
  data() {
    return {
      value: 'Bananas',
      options: optionsArrOfObj,
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
    ...getUniqueProps('withCustomClass'),
    name: {
      default: text('name', 'custom_radio', 'withCustomClass'),
    },
    defaultValue: {
      default: number('defaultValue', 2, {}, 'withCustomClass'),
    },
    radioClassName: {
      default: text('radioClassName', 'element--background-yellow', 'withCustomClass'),
    },
    direction: {
      default: select('direction', directions, 'row', 'withCustomClass'),
    },
  },
  methods: actionsData,
  template: `<mc-field-radio-group v-bind="tagBind" v-model="value" @change="onChange" />`,
})

