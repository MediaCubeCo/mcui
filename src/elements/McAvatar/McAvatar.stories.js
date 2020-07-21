import { text, select, boolean } from '@storybook/addon-knobs'
import { withDesign } from 'storybook-addon-designs'

import McAvatar from './McAvatar'
import {getTokenGroup, getTokensByType} from "../../utils/getTokens"

export default {
  title: 'Elements/McAvatar',
  component: McAvatar,
  decorators: [withDesign],
  parameters: {
    componentSubtitle: 'В работе',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=127%3A1390',
    },
  },
};

const avatarSizes = getTokenGroup('avatar-sizes')
const colors = getTokensByType('color')

const getUniqueProps = key => {
  return {
    src: {
      default: text('src', 'https://avatars3.githubusercontent.com/u/43079603?s=460&v=4', key),
    },
    alt: {
      default: text('alt', 'alt text', key),
    },
    size: {
      default: select('size', avatarSizes, '600', key)
    },
  }
}

const getCommonTags = ctx => {
  return {
    src: ctx.src,
    alt: ctx.alt,
    size: ctx.size,
    rounded: ctx.rounded,
    lazy: ctx.lazy,
  }
}


export const Default = () => ({
  components: { McAvatar },
  computed: {
    tagBind() {
      return getCommonTags(this)
    }
  },
  props: {
    ...getUniqueProps('default'),
    rounded: {
      default: boolean('rounded', false, 'default')
    },
    lazy: {
      default: boolean('lazy', false, 'default')
    },
  },
  template: '<mc-avatar :src="src" :alt="alt" :size="size" :rounded="rounded" :lazy="lazy" />',
})

export const Lazy = () => ({
  components: { McAvatar },
  computed: {
    tagBind() {
      return getCommonTags(this)
    }
  },
  props: {
    ...getUniqueProps('lazy'),
    rounded: {
      default: boolean('rounded', true, 'lazy')
    },
    lazy: {
      default: boolean('lazy', true, 'lazy')
    },
  },
  template: `<div>
      <div style="height: 2000px">&#11015; &#11015; &#11015; Scroll to bottom &#11015; &#11015; &#11015;</div>
      <mc-avatar :src="src" :alt="alt" :size="size" :rounded="rounded" :lazy="lazy" /> 
  </div>`,
})

export const Status = () => ({
  components: { McAvatar },
  computed: {
    tagBind() {
      return {
        ...getCommonTags(this),
        'border-color': this.borderColor,
        'dot-color': this.dotColor,
        rounded: true,
      }
    }
  },
  props: {
    ...getUniqueProps('status'),
    lazy: {
      default: boolean('lazy', true, 'status'),
    },
    borderColor: {
      default: select('borderColor', colors, 'blue', 'status')
    },
    dotColor: {
      default: select('dotColor', colors, 'orange', 'status')
    },
  },
  template: `<mc-avatar v-bind="tagBind" />`,
})
