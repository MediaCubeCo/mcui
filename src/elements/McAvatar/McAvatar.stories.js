import { text, select, boolean } from '@storybook/addon-knobs'
import { withDesign } from 'storybook-addon-designs'

import McAvatar from './McAvatar'
import { getTokenGroup } from "../../utils/getTokens"

export default {
  title: 'Elements/McAvatar',
  component: McAvatar,
  decorators: [withDesign],
  // parameters: {
  //   design: {
  //     type: 'figma',
  //     url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=1%3A2',
  //   },
  // },
};

const avatarSizes = getTokenGroup('avatar-sizes')

export const Default = () => ({
  components: { McAvatar },
  props: {
    src: {
      default: text('src', 'https://avatars3.githubusercontent.com/u/43079603?s=460&v=4'),
    },
    alt: {
      default: text('alt', 'alt text'),
    },
    size: {
      default: select('size', avatarSizes, '300')
    },
    rounded: {
      default: boolean('rounded', true)
    },
  },
  template: '<mc-avatar :src="src" :alt="alt" :size="size" :rounded="rounded" />',
});

