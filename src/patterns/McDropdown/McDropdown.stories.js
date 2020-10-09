import { select, boolean } from '@storybook/addon-knobs'

import McDropdown from './McDropdown'
import McDropdownPanel from "./McDropdownPanel/McDropdownPanel"
import McSvgIcon from "../../elements/McSvgIcon/McSvgIcon"
import McButton from "../../elements/McButton/McButton"

const wrapper = () => {
  return {
    template: `<div style="display: flex; align-items: center; justify-content: center; height: 400px;">
        <story />
    </div>`,
  }
}

export default {
  title: 'Patterns/McDropdown',
  component: McDropdown,
  subcomponents: { McDropdownPanel },
  parameters: {
    componentSubtitle: 'Status: Ready',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=19%3A280',
    },
  },
  decorators: [wrapper],
}

const positions = {
  left: 'left',
  right: 'right',
}
const listPositions = {
  top: 'top',
  bottom: 'bottom',
}

const getUniqueProps = key => {
  return {
    position: {
      default: select('position', positions, 'left', key)
    },
    listPosition: {
      default: select('listPosition', listPositions, 'bottom', key),
    },
    rotateIcon: {
      default: boolean('rotateIcon', true, key),
    },
  }
}

const getCommonTags = ctx => {
  return {
    position: ctx.position,
    listPosition: ctx.listPosition,
    rotateIcon: ctx.rotateIcon,
  }
}

export const Default = () => ({
  components: { McDropdown, McDropdownPanel, McButton, McSvgIcon },
  data() {
    return {
      dropIsOpen: false,
      buttons: [
        {icon: 'mc_id', name: 'Identity'},
        {icon: 'mc_assist', name: 'Assist'},
        {icon: 'mc_studio', name: 'Studio'},
        {icon: 'exit_to_app', name: 'Выйти'},
      ]
    }
  },
  computed: {
    tagBind() {
      return getCommonTags(this)
    }
  },
  props: {
    ...getUniqueProps('default'),
  },
  template: `<mc-dropdown v-bind="tagBind" v-model="dropIsOpen">
    <mc-button slot="activator">
      Dropdown
      <mc-svg-icon slot="icon-append" name="arrow_drop_down" class="rotate"/>
    </mc-button>
    <mc-dropdown-panel>
      <mc-button
        v-for="(btn, i) in buttons"
        :key="i"
        href="#"
        full-width
        text-align="left"
        :variation="btn.icon === 'exit_to_app' ? 'red-flat' : 'black-flat'"
        @click.prevent
      >
        <mc-svg-icon slot="icon-prepend" :name="btn.icon" />
        {{ btn.name }}
      </mc-button>
    </mc-dropdown-panel>
  </mc-dropdown>`,
})
