import svgIcons from '../../utils/load-icons'
import { text, select } from '@storybook/addon-knobs'

import McSvgIcon from './McSvgIcon'
import { getTokensByType, getTokenGroup } from "../../utils/getTokens"

export default {
  title: 'Elements/McSvgIcon',
  component: McSvgIcon,
  parameters: {
    componentSubtitle: 'Status: Ready',
    // design: {
    //   type: 'figma',
    //   url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=1%3A2',
    // },
  },
};

const names = svgIcons.map(icon => icon.name.slice(2, -4))
const iconSizes = getTokenGroup('icon-sizes')
const colors = getTokensByType('color')

export const Icon = () => ({
  components: { McSvgIcon },
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
      default: select('size', iconSizes, '300'),
    },
  },
  template: '<mc-svg-icon :name="name" :size="size" :fill="fill" :color="color" />',
});

