import { boolean, number } from '@storybook/addon-knobs'

import McModal from './McModal'
import McButton from '../../elements/McButton/McButton'

const getCommonTags = ctx => {
  return {
    maxWidth: ctx.maxWidth,
    clickToClose: ctx.clickToClose,
    arrowVisible: ctx.arrowVisible,
  }
}

export default {
  title: 'Patterns/McModal',
  component: McModal,
  parameters: {
    componentSubtitle: 'Status: In Progress',
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=2368%3A45351',
    },
  },
}

// mc-modal default
export const Default = () => ({
  components: { McModal, McButton },
  computed: {
    tagBind() {
      return getCommonTags(this)
    },
  },
  props: {
    maxWidth: {
      default: number('maxWidth', 510, {}, 'default'),
    },
    clickToClose: {
      default: boolean('clickToClose', true, 'default'),
    },
    arrowVisible: {
      default: boolean('arrowVisible', false, 'default'),
    },
  },
  template: `<div>
      <mc-button @click.prevent="$modal.show('testModal')">Open</mc-button>
      <mc-modal name="testModal" v-bind="tagBind" @back="$modal.hide('testModal')">
          <template slot="title">Заголовок</template>
          Контент
      </mc-modal>
  </div>`,
})
