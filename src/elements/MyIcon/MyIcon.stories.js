import svgIcons from '../../utils/load-icons'
import { text, select } from '@storybook/addon-knobs'

import MyIcon from './MyIcon'
import getTokenGroup from "../../utils/getTokenGroup"

export default {
  title: 'MyIcon',
  component: MyIcon,
};
const names = svgIcons.map(icon => icon.name.slice(2, -4))
const sizes = {
  s: 's',
  m: 'm',
  l: 'l',
}

const tokenColors = getTokenGroup('color')
const colors = {}
tokenColors.forEach(t => {
  const key = t.name.replace('$color-', '')
  colors[key] = key
})

export const Icon = () => ({
  components: { MyIcon },
  props: {
    name: {
      default: select('name', names, 'add')
    },
    color: {
      default: select('color', colors, 'red'),
    },
    fill: {
      default: text('fill', 'currentColor'),
    },
    size: {
      default: select('size', sizes, 'm')
    },
  },
  template: '<my-icon :name="name" :size="size" :fill="fill" :color="color" />',
});

