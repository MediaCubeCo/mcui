import {text, boolean, array} from "@storybook/addon-knobs"
import { action } from "@storybook/addon-actions"

import McFieldRadioGroup from './McFieldRadioGroup'


export default {
  title: 'Elements/McFieldRadioGroup',
  component: McFieldRadioGroup,
  parameters: {
    componentSubtitle: 'In progress',
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
  }
}

const getCommonTags = ctx => {
  return {
    name: ctx.name,
    options: ctx.options,
    defaultValue: ctx.defaultValue,
    disabled: ctx.disabled,
  }
}

const actionsData = {
  handleInput: action('checked'),
}

// mc-field-radio-button default
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
        ['Apples', 'Oranges'],
        ',',
        'default'
      ),
    },
    defaultValue: {
      default: text('defaultValue', 'Apples', 'default'),
    },
  },
  methods: actionsData,
  template: `<mc-field-radio-group v-bind="tagBind" :value="value" @input="handleInput" />`,
})

// mc-field-checkbox with slot
// export const WithSlot = () => ({
//   components: { McFieldRadioButton },
//   data() {
//     return {
//       value_1: 'with_slot',
//       value_2: 'with_slot2',
//       checked2: false,
//     }
//   },
//   computed: {
//     tagBind() {
//       return {
//         ...getCommonTags(this),
//       }
//     }
//   },
//   props: {
//     ...getUniqueProps('with_slot'),
//     name: {
//       default: text('name', 'radio_with_slot', 'with_slot'),
//     },
//     checkedDefault: {
//       default: boolean('checked default radio 1', true, 'with_slot'),
//     },
//     slotContent1: {
//       default: text('slot default radio 1', 'Radio button 1 with slot content', 'with_slot'),
//     },
//     slotContent2: {
//       default: text('slot default radio 2', 'Radio button 2 with slot content', 'with_slot'),
//     },
//   },
//   methods: actionsData,
//   template: `<div>
//       <mc-field-radio-button v-bind="tagBind" :value="value_1" @input="handleInput">
//       {{ slotContent1 }}
//   </mc-field-radio-button>
//   <mc-field-radio-button :name="name" :value="value_2" :disabled="tagBind.disabled" @input="handleInput">
//       {{ slotContent2 }}
//   </mc-field-radio-button>
//   </div>`,
// })

