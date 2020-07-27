import {text, boolean} from "@storybook/addon-knobs"

import McTab from './McTab'

export default {
  title: 'Elements/McTab',
  component: McTab,
  // subcomponents: { McTabs },
  parameters: {
    componentSubtitle: 'Готов, Смотреть McTabs',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=127%3A1199',
    },
  },
}

// mc-tab default
export const Default = () => ({
  template: `<div> Смотреть <a href="/?path=/story/elements-mctabs--default">McTabs</a></div>`,
})


