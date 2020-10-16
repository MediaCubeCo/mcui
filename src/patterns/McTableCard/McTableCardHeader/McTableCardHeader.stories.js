import { text, boolean } from '@storybook/addon-knobs'

import McTableCardHeader from './McTableCardHeader'
import McButton from "../../../elements/McButton/McButton"
import McSvgIcon from "../../../elements/McSvgIcon/McSvgIcon"

export default {
  title: 'Patterns/McTableCard/McTableCardHeader',
  component: McTableCardHeader,
  parameters: {
    componentSubtitle: 'Status: Ready',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/3gG13Y8ShNTZBxA0GBU40U/Dashboard-Panel?node-id=268%3A66',
    },
  },
};

const getUniqueProps = key => {
  return {
    buttonBackText: {
      default: text('buttonBackText', 'Previously', key),
    },
    backTo: {
      default: text('backTo', '#', key),
    },
  }
}

const getCommonTags = ctx => {
  return {
    buttonBackText: ctx.buttonBackText,
    backTo: ctx.backTo,
  }
}

export const Default = () => ({
  components: { McTableCardHeader, McButton, McSvgIcon },
  computed: {
    tagBind() {
      return getCommonTags(this)
    },
  },
  props: {
    ...getUniqueProps('default'),
    hasSlotLeft: {
      default: boolean('slot left', false, 'default'),
    },
    hasSlotRight: {
      default: boolean('slot right', true, 'default'),
    },
  },
  template: `<mc-table-card-header v-bind="tagBind">
    <mc-button v-if="hasSlotLeft" uppercase variation="blue-link">Back to list</mc-button>
    <template v-if="hasSlotRight" slot="right">
      <mc-button variation="blue-link" size="xs">
        Add channel
        <mc-svg-icon slot="icon-append" name="add" />
      </mc-button>
      <mc-button variation="blue-link" size="xs">
        Amount
        <mc-svg-icon slot="icon-append" name="edit_solid" />
      </mc-button>
      <mc-button variation="blue-link" size="xs">
        Chat
        <mc-svg-icon slot="icon-append" name="chat" />
      </mc-button>
    </template>
  </mc-table-card-header>`,
})

