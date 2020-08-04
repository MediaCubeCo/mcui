import { text, select, boolean, object } from '@storybook/addon-knobs'
import { action } from "@storybook/addon-actions"
// import { getTokensByType } from "../../utils/getTokens"
import menuMain from '../../../mocks/menuMain'

import McSideBar from './McSideBar'

const wrapper = () => {
  return {
    template: `<div style="display: flex; align-items: center; justify-content: center; height: 900px;">
        <story />
    </div>`,
  }
}


export default {
  title: 'Patterns/McSideBar',
  component: McSideBar,
  parameters: {
    componentSubtitle: 'Status: In progress',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=350%3A0',
    },
  },
  decorators: [wrapper],
}
//
// const types = {
//   'button': 'button',
//   'reset': 'reset',
//   'submit': 'submit',
//   'default': null,
// }
// const sizes = {
//   's': 's',
//   's-compact': 's-compact',
//   'm': 'm',
//   'm-compact': 'm-compact',
//   'l': 'l',
//   'l-compact': 'l-compact',
// }
// const positions = {
//   'left': 'left',
//   'center': 'center',
//   'right': 'right',
// }
// const tokenColors = getTokensByType('color')
// let variations = {}
// Object.keys(tokenColors).forEach(c => {
//   const colorVariations = {
//     [c]: c,
//     [`${c}-flat`]: `${c}-flat`,
//     [`${c}-invert`]: `${c}-invert`,
//     [`${c}-outline`]: `${c}-outline`,
//     [`${c}-link`]: `${c}-link`,
//   }
//   variations = {
//     ...variations,
//     ...colorVariations,
//   }
// })

const getUniqueProps = key => {
  return {
    logoTitle: {
      default: text('logoTitle', 'Dashboard', key),
    },
    logoSrc: {
      default: text('logoSrc', '', key),
    },
    menuMainTitle: {
      default: text('menuMainTitle', 'Sections', key),
    },
    // to: {
    //   default: object('to', { name: 'test', params: { id: 123 }, }, key),
    // },
    // href: {
    //   default: text('href', 'https://mediacube.agency/', key),
    // },
    // nuxt: {
    //   default: boolean('nuxt', true, key),
    // },
    // disabled: {
    //   default: boolean('disabled', false, key),
    // },
    // loading: {
    //   default: boolean('loading', false, key),
    // },
    // type: {
    //   default: select('type', types, 'default', key)
    // },
    // variation: {
    //   default: select('variation', variations, 'blue', key),
    // },
    // size: {
    //   default: select('size', sizes, 'm', key)
    // },
    // shadow: {
    //   default: boolean('shadow', false, key),
    // },
    // rounded: {
    //   default: boolean('rounded', false, key),
    // },
    // textAlign: {
    //   default: select('textAlign', positions, 'center', key),
    // },
    // fullWidth: {
    //   default: boolean('fullWidth', false, key),
    // },
    // isActive: {
    //   default: boolean('isActive', false, key),
    // },
    // exact: {
    //   default: boolean('exact', false, key),
    // },
    // uppercase: {
    //   default: boolean('uppercase', false, key),
    // },
    // defaultTag: {
    //   default: text('defaultTag', 'button', key),
    // },
  }
}

const getCommonTags = ctx => {
  return {
    logoTitle: ctx.logoTitle,
    logoSrc: ctx.logoSrc,
    menuMainTitle: ctx.menuMainTitle,
    menuMain: ctx.menuMain,
    // to: ctx.to,
    // href: ctx.href,
    // nuxt: ctx.nuxt,
    // disabled: ctx.disabled,
    // loading: ctx.loading,
    // type: ctx.type,
    // variation: ctx.variation,
    // size: ctx.size,
    // shadow: ctx.shadow,
    // rounded: ctx.rounded,
    // 'text-align': ctx.textAlign,
    // 'full-width': ctx.fullWidth,
    // 'is-active': ctx.isActive,
    // exact: ctx.exact,
    // uppercase: ctx.uppercase,
    // 'default-tag': ctx.defaultTag,
  }
}

const actionsData = {
  // handleClick: action('clicked'),
}

export const Default = () => ({
  components: { McSideBar },
  computed: {
    tagBind() {
      return getCommonTags(this)
    },
    menuMain() {
      return menuMain
    }
  },
  props: {
    ...getUniqueProps('default'),
    // value: {
    //   default: text('slot default', 'Default button', 'default'),
    // },
  },
  // methods: actionsData,
  template: `<mc-side-bar v-bind="tagBind" />`,
})

