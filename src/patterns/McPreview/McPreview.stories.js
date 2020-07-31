import { text, select, boolean, number } from '@storybook/addon-knobs'

import McPreview from './McPreview'
import McAvatar from '../../elements/McAvatar/McAvatar'
import McTitle from '../../elements/McTitle/McTitle'


export default {
  title: 'Patterns/McPreview',
  component: McPreview,
  parameters: {
    componentSubtitle: 'Status: In Progress',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=424%3A1',
    },
  },
}

// const getUniqueProps = key => {
//   return {
//     closable: {
//       default: boolean('closable', true, key),
//     },
//   }
// }

// const getCommonTags = ctx => {
//   return {
//     title: ctx.title,
//     closable: ctx.closable,
//     variation: ctx.variation,
//     counter: ctx.counter,
//   }
// }

// const actionsData = {
//   handleClick: action('clicked'),
// }

const sizes = {
  s: "s",
  m: "m",
  l: "l",
}

// mc-preview default
export const Default = () => ({
  components: { McPreview, McAvatar, McTitle },
  // computed: {
  //   tagBind() {
  //     return getCommonTags(this)
  //   }
  // },
  props: {
    // ...getUniqueProps('default'),
    // title: {
    //   default: text('title', 'Default', 'default'),
    // },
    size: {
      default: select('size', sizes, 'm', 'default'),
    },
    slotTop: {
      default: text('slot top', 'Lorem ipsum', 'default'),
    },
    slotBottom: {
      default: text('slot bottom', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias autem culpa dignissimos et id minima quae qui sapiente ullam velit?', 'default'),
    },
  },
  // methods: actionsData,
  template: `<mc-preview :size="size">
    <mc-avatar src="https://avatars3.githubusercontent.com/u/43079603?s=460&v=4" slot="left" lazy size="400" rounded />
    <mc-title slot="top">{{slotTop}}</mc-title>
    <mc-title slot="bottom" variation="caption" color="gray">{{slotBottom}}</mc-title>
    <mc-avatar slot="right" lazy size="300" />
  </mc-preview>`,
})

