import {text, boolean} from "@storybook/addon-knobs"

import McTab from './McTab'

export default {
  title: 'Elements/McTab',
  component: McTab,
  // subcomponents: { McTabs },
  parameters: {
    componentSubtitle: 'In progress, Смотреть McTabs',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=127%3A1199',
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
    id: ctx.id,
    name: ctx.name,
    prefix: ctx.prefix,
    suffix: ctx.suffix,
    disabled: ctx.disabled,
  }
}

// mc-field-radio-button default
export const Default = () => ({
  // components: { McTab },
  // computed: {
  //   tagBind() {
  //     return {
  //       ...getCommonTags(this),
  //     }
  //   }
  // },
  // props: {
  //   ...getUniqueProps('default'),
  //   id: {
  //     default: text('id', '', 'default'),
  //   },
  //   prefix: {
  //     default: text('prefix', '', 'default'),
  //   },
  //   suffix: {
  //     default: text('suffix', '', 'default'),
  //   },
  //   slotContent: {
  //     default: text('slotContent', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, soluta?', 'default'),
  //   },
  // },
  // methods: actionsData,
  template: `<div> Смотреть McTabs </div>`,
})

// export const Default = () => ({
//   components: { McTab },
//   computed: {
//     tagBind() {
//       return {
//         ...getCommonTags(this),
//       }
//     }
//   },
//   props: {
//     ...getUniqueProps('default'),
//     id: {
//       default: text('id', '', 'default'),
//     },
//     prefix: {
//       default: text('prefix', '', 'default'),
//     },
//     suffix: {
//       default: text('suffix', '', 'default'),
//     },
//     slotContent: {
//       default: text('slotContent', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, soluta?', 'default'),
//     },
//   },
//   methods: actionsData,
//   template: `<mc-tab v-bind="tagBind"> {{ slotContent }} </mc-tab>`,
// })

