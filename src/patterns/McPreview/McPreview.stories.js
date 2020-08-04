import { text, select, boolean, number } from '@storybook/addon-knobs'

import McPreview from './McPreview'
import McAvatar from '../../elements/McAvatar/McAvatar'
import McTitle from '../../elements/McTitle/McTitle'
import McSvgIcon from '../../elements/McSvgIcon/McSvgIcon'


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

const sizes = {
  s: "s",
  m: "m",
  l: "l",
}

// mc-preview default
export const Default = () => ({
  components: { McPreview, McAvatar, McTitle, McSvgIcon },
  props: {
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
  template: `<mc-preview :size="size">
    <mc-avatar slot="left" lazy size="400" rounded />
    <mc-title slot="top">{{slotTop}}</mc-title>
    <mc-title slot="bottom" color="gray">
      <mc-svg-icon slot="icon-prepend" name="ready" color="dark-green"/>
      {{slotBottom}}
    </mc-title>
    <mc-avatar src="https://avatars3.githubusercontent.com/u/43079603?s=460&v=4" slot="right" lazy size="300" />
  </mc-preview>`,
})

