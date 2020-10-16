import { text, object, boolean } from '@storybook/addon-knobs'
import { action } from "@storybook/addon-actions"
import menuMain from '../../../mocks/menuMain'
import authUser from '../../../mocks/authUser'
import menuApps from "../../../mocks/menuApps"

import McSideBar from './McSideBar'
import McSideBarTop from "../McSideBarTop/McSideBarTop"
import McSideBarCenter from "../McSideBarCenter/McSideBarCenter"
import McSideBarBottom from "../McSideBarBottom/McSideBarBottom"
import McSideBarButton from "../McSideBarButton/McSideBarButton"

const wrapper = () => {
  return {
    template: `<div style="display: flex; height: 600px;">
        <story />
    </div>`,
  }
}


export default {
  title: 'Patterns/McSideBar/McSideBar',
  component: McSideBar,
  subcomponents: { McSideBarTop, McSideBarCenter, McSideBarBottom, McSideBarButton, },
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
    logoIcon: {
      default: text('logoIcon', 'mc_dashboard', key),
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
      default: boolean('compact', false, key),
    },
  }
}

const getCommonTags = ctx => {
  return {
    logoTitle: ctx.logoTitle,
    logoSrc: ctx.logoSrc,
    logoIcon: ctx.logoIcon,
    menuMainTitle: ctx.menuMainTitle,
    menuMain: ctx.menuMain,
    menuApps: ctx.menuApps,
    chatraConfig: ctx.chatraConfig,
    userbackConfig: ctx.userbackConfig,
    user: ctx.user,
    hideText: ctx.hideText,
    compact: ctx.compact,
  }
}

const actionsData = {
  handleCompact: action('compact'),
}

export const Default = () => ({
  components: { McSideBar },
  computed: {
    tagBind() {
      return getCommonTags(this)
    },
    menuMain() {
      return menuMain
    },
    menuApps() {
      return menuApps
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
  template: `<mc-side-bar v-bind="tagBind" @compact="handleCompact" />`,
})

