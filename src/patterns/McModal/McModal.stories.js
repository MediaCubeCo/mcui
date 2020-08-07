import { boolean } from '@storybook/addon-knobs'

import McModal from './McModal'
import McButton from "../../elements/McButton/McButton"


export default {
  title: 'Patterns/McModal',
  component: McModal,
  subcomponents: { McModal },
  parameters: {
    componentSubtitle: 'Status: In progress',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=346%3A2152',
    },
  },
}

const getCommonTags = ctx => {
  return {
    // user: ctx.user,
    // menuLangs: ctx.menuLangs,
  }
}

export const Default = () => ({
  components: { McModal, McButton, },
  computed: {
    tagBind() {
      return getCommonTags(this)
    },
  },
  props: {
    // hasSlotLeft: {
    //   default: boolean('hasSlotLeft', true, 'default'),
    // },
    // hasSlotRight: {
    //   default: boolean('hasSlotRight', true, 'default'),
    // },
  },
  methods: {
    showModal() {
      this.$modal.show('testModal')
    }
  },
  template: `<div>
    <mc-button @click.prevent="showModal">Show Modal</mc-button>
    <mc-modal name="testModal">123</mc-modal>
  </div>`,
})

