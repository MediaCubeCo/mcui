import { text, select, boolean, object } from '@storybook/addon-knobs'

import McButton from './McButton'
import McSvgIcon from '../McSvgIcon/McSvgIcon'
import { getTokensByType, getTokenGroup } from "../../utils/getTokens"

export default {
  title: 'Elements/McButton',
  component: McButton,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=1%3A2',
    },
  },
};

const types = {
  'button': 'button',
  'reset': 'reset',
  'submit': 'submit',
  'default': null,
}
const sizes = {
  's': 's',
  's-compact': 's-compact',
  'm': 'm',
  'm-compact': 'm-compact',
  'l': 'l',
  'l-compact': 'l-compact',
}
const positions = {
  'left': 'left',
  'center': 'center',
  'right': 'right',
}
const getUniqueProps = key => {
  return {
    to: {
      default: object('to', { name: 'test', params: { id: 123 }, }, key),
    },
    href: {
      default: text('href', 'https://mediacube.agency/', key),
    },
    nuxt: {
      default: boolean('nuxt', true, key),
    },
    disabled: {
      default: boolean('disabled', false, key),
    },
    loading: {
      default: boolean('loading', false, key),
    },
    type: {
      default: select('type', types, 'default', key)
    },
    variation: {
      default: text('variation', 'blue', key),
    },
    size: {
      default: select('size', sizes, 'm', key)
    },
    shadow: {
      default: boolean('shadow', false, key),
    },
    rounded: {
      default: boolean('rounded', false, key),
    },
    textAlign: {
      default: select('textAlign', positions, 'center', key),
    },
    fullWidth: {
      default: boolean('fullWidth', false, key),
    },
    isActive: {
      default: boolean('isActive', false, key),
    },
    exact: {
      default: boolean('exact', false, key),
    },
    uppercase: {
      default: boolean('uppercase', false, key),
    },
    defaultTag: {
      default: text('defaultTag', 'button', key),
    },
    value: {
      default: text('slot default', 'Default button', key),
    },
  }
}

export const Default = () => ({
  components: { McButton },
  computed: {
    tagBind() {
      return {
        to: this.to,
        href: this.href,
        nuxt: this.nuxt,
        disabled: this.disabled,
        loading: this.loading,
        type: this.type,
        variation: this.variation,
        size: this.size,
        shadow: this.shadow,
        rounded: this.rounded,
        'text-align': this.textAlign,
        'full-width': this.fullWidth,
        'is-active': this.isActive,
        exact: this.exact,
        uppercase: this.uppercase,
        'default-tag': this.defaultTag,
      }
    }
  },
  props: getUniqueProps('default'),
  template: `<mc-button v-bind="tagBind"> {{ value }} </mc-button>`,
});

// mc-title with icons
// export const WithIcons = () => ({
//   components: { McButton, McSvgIcon },
//   computed: {
//     tagBind() {
//       return {
//         variation: this.variation,
//         color: this.color,
//         ellipsis: this.ellipsis,
//         'tag-name': this.tagName,
//         uppercase: this.uppercase,
//         'text-align': this.textAlign,
//         'line-height': this.lineHeight,
//         weight: this.weight,
//       }
//     }
//   },
//   props: getUniqueProps('WithIcons'),
//   template: `<mc-title v-bind="tagBind">
//       <mc-svg-icon slot="icon-prepend" name="info" color="blue" />
//       {{ value }}
//       <mc-svg-icon slot="icon-append" name="face" color="red" />
//   </mc-title>`,
// });

