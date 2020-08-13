import { text, object, boolean } from '@storybook/addon-knobs'
import { action } from "@storybook/addon-actions"
import authUser from '../../../mocks/authUser'
import menuLangs from '../../../mocks/menuLangs'

import McMain from "./McMain"
import McSideBar from "../../../patterns/McSideBar/McSideBar/McSideBar"
import McTopBar from "../../../patterns/McTopBar/McTopBar"
import McTitle from "../../../elements/McTitle/McTitle"
import McButton from "../../../elements/McButton/McButton"
import McSvgIcon from "../../../elements/McSvgIcon/McSvgIcon"
import menuMain from "../../../mocks/menuMain"

const wrapper = () => {
  return {
    template: `<div style="width: 100%; height: calc(100vh - 6rem);">
        <story />
    </div>`,
  }
}


export default {
  title: 'Templates/McMain',
  component: McMain,
  parameters: {
    componentSubtitle: 'Status: In progress',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=350%3A0',
    },
  },
  decorators: [wrapper],
}

const getUniqueProps = key => {
  return {
    logoTitle: {
      default: text('logoTitle', 'Dashboard', key),
    },
    logoSrc: {
      default: text('logoSrc', '/img/mc_dashboard.svg', key),
    },
    menuMainTitle: {
      default: text('menuMainTitle', 'Sections', key),
    },
    chatraConfig: {
      default: object('chatraConfig', {id: 'dzDw7eBbL2ramxx25', title: 'Have questions?'}, key),
    },
    hideText: {
      default: text('hideText', 'Hide', key),
    },
    compact: {
      default: boolean('compact sideBar', false, key),
    },
  }
}

const getCommonTags = ctx => {
  return {
    // user: ctx.user,
    // menuLangs: ctx.menuLangs,
  }
}

const actionsData = {
  handleCompact: action('compact'),
}

export const Default = () => ({
  components: { McMain, McSideBar, McTopBar, McTitle, McButton, McSvgIcon },
  computed: {
    sideBarTagBind() {
      // return getCommonTags(this)
      return {
        logoTitle: this.logoTitle,
        logoSrc: this.logoSrc,
        menuMainTitle: this.menuMainTitle,
        menuMain: this.menuMain,
        chatraConfig: this.chatraConfig,
        userbackConfig: this.userbackConfig,
        user: this.user,
        hideText: this.hideText,
        compact: this.compact,
      }
    },
    userbackConfig() {
      return {
        title: 'Found a mistake?',
        token: '8681|15392|h5ECyqaZJTTOk6kDQJmgij6b7db2iXwCuwM21iQ6HIcautJRR2',
        // more info https://help.userback.io/hc/en-us/articles/115005681028-Javascript-API
        settings: {
          lang: 'en',
          main_button_text: 'submit',
          rating_help_message: 'rate',
        },
        categories: 'Admin',
      }
    },
    menuMain() {
      return menuMain
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
    ...getUniqueProps('default'),
  },
  methods: actionsData,
  template: `<mc-main>
    <mc-top-bar slot="top-bar" :user="user" :menu-langs="menuLangs">
      <mc-title slot="left" variation="subtitle" max-width="auto">Left Section Title</mc-title>
      <mc-button slot="left" size="xs-compact" rounded variation="black-flat">
        <mc-svg-icon slot="icon-prepend" name="add" />
      </mc-button>
      <mc-svg-icon slot="right" name="search" />
    </mc-top-bar>
    <mc-side-bar slot="left-bar" v-bind="sideBarTagBind" @compact="handleCompact" />
  </mc-main>`,
})

