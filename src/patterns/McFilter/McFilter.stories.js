import { text } from '@storybook/addon-knobs'
import authUser from '../../mocks/authUser'
import menuLangs from '../../mocks/menuLangs'
import { value, filters, placeholders } from '../../mocks/filterMocks'
import { handleConfirmAction } from '../../helpers/delayedAction'

import McFilter from './McFilter'
import McTopBar from '../McTopBar/McTopBar'
import McTitle from '../../elements/McTitle/McTitle'
import McButton from '../../elements/McButton/McButton'
import McSvgIcon from '../../elements/McSvgIcon/McSvgIcon'

export default {
  title: 'Patterns/McFilter/McFilter',
  component: McFilter,
  parameters: {
    componentSubtitle: 'Status: In progress',
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=1801%3A5024',
    },
  },
}

const getUniqueProps = key => {
  return {
    name: {
      default: text('name', 'defaultFilterName', key),
    },
  }
}

const getCommonTags = ctx => {
  return {
    filters: ctx.filters,
    placeholders: ctx.placeholders,
    name: ctx.name,
  }
}

export const Default = () => ({
  components: { McFilter, McTopBar, McTitle, McButton, McSvgIcon },
  data() {
    return {
      filterValues: value,
    }
  },
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
        name: `${authUser.first_name}${
          authUser.last_name ? ` ${authUser.last_name}` : ''
        }`,
      }
    },
  },
  props: {
    ...getUniqueProps('default'),
    filters: {
      default: filters,
    },
    placeholders: {
      default: placeholders,
    },
  },
  methods: {
    onErrorFilter(message) {
      this.$toasted.show(message)
    },
    onDeleteFilterPreset(message) {
      const filter = this.$refs.filter
      filter &&
        handleConfirmAction(
          filter.savePresetsToLocalStorage,
          filter.getPresetsFromLocalStorage,
          message,
        )
    },
    onAllTagsClear(message) {
      const filter = this.$refs.filter
      filter &&
        handleConfirmAction(
          filter.clearTemporaryValues,
          filter.revertClearedValues,
          message,
        )
    },
  },
  template: `<mc-top-bar :user="user" :menu-langs="menuLangs">
    <mc-title slot="left" variation="subtitle" max-width="auto">Left Section Title</mc-title>
    <mc-button slot="left" size="xs-compact" rounded variation="black-flat">
      <mc-svg-icon slot="icon-prepend" name="add" />
    </mc-button>
    <mc-filter 
        slot="right" 
        ref="filter"
        v-bind="tagBind" 
        v-model="filterValues" 
        @error="onErrorFilter" 
        @delete-preset="onDeleteFilterPreset" 
        @clear="onAllTagsClear"
    />
    <mc-svg-icon slot="right" name="search" />
    <portal-target slot="bottom" name="filterTarget" />
  </mc-top-bar>`,
})
