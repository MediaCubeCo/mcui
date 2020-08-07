import { boolean } from '@storybook/addon-knobs'
import authUser from '../../mocks/authUser'
import menuLangs from '../../mocks/menuLangs'

import McTopBar from './McTopBar'
import McTitle from "../../elements/McTitle/McTitle"
import McButton from "../../elements/McButton/McButton"
import McSvgIcon from "../../elements/McSvgIcon/McSvgIcon"


export default {
  title: 'Patterns/McTopBar',
  component: McTopBar,
  parameters: {
    componentSubtitle: 'Status: In progress',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=350%3A0',
    },
  },
}

const getCommonTags = ctx => {
  return {
    user: ctx.user,
    menuLangs: ctx.menuLangs,
  }
}

export const Default = () => ({
  components: { McTopBar, McTitle, McButton, McSvgIcon },
  computed: {
    tagBind() {
      return getCommonTags(this)
    },
    menuLangs() {
      return menuLangs
    },
    user() {
      return {
        ...authUser,
        name: `${authUser.first_name}${authUser.last_name ? ` ${authUser.last_name}` : ''}`,
      }
    }
  },
  props: {
    hasSlotLeft: {
      default: boolean('hasSlotLeft', true, 'default'),
    },
    hasSlotRight: {
      default: boolean('hasSlotRight', true, 'default'),
    },
  },
  template: `<mc-top-bar v-bind="tagBind">
    <mc-title v-if="hasSlotLeft" slot="left" variation="subtitle" max-width="auto">Left Section Title</mc-title>
    <mc-button v-if="hasSlotLeft" slot="left" size="s-compact" rounded variation="black-flat">
      <mc-svg-icon slot="icon-prepend" name="add" />
    </mc-button>
    <mc-svg-icon v-if="hasSlotRight" slot="right" name="search" />
  </mc-top-bar>`,
})

