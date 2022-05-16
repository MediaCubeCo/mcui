import { text, select, boolean } from '@storybook/addon-knobs'

import McCell from './McCell'
import McTitle from '../../../elements/McTitle/McTitle'
import McSvgIcon from '../../../elements/McSvgIcon/McSvgIcon'

export default {
    title: 'Patterns/McCell',
    component: McCell,
    parameters: {
        componentSubtitle: 'Status: In Progress',
        // design: {
        //   type: 'figma',
        //   url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=424%3A1',
        // },
    },
}

const sizes = {
    s: 's',
    m: 'm',
    l: 'l',
}

// mc-cell default
export const Default = () => ({
    components: { McCell, McTitle },
    props: {
        title: {
            default: text('title', 'Lorem ipsum', 'default'),
        },
        size: {
            default: select('size', sizes, 'm', 'default'),
        },
        slotDefault: {
            default: text('slot default', 'Lorem ipsum dolor sit amet', 'default'),
        },
        uppercase: {
            default: boolean('uppercase', true, 'default'),
        },
        ellipsis: {
            default: boolean('ellipsis', true, 'default'),
        },
    },
    template: `<mc-cell :title="title" :size="size" :uppercase="uppercase" :ellipsis="ellipsis">
    <mc-title>{{slotDefault}}</mc-title>
  </mc-cell>`,
})

// mc-preview with slots
export const WithSlots = () => ({
    components: { McCell, McTitle, McSvgIcon },
    props: {
        title: {
            default: text('title', 'Lorem ipsum', 'withSlots'),
        },
        size: {
            default: select('size', sizes, 'm', 'withSlots'),
        },
        slotDefault: {
            default: text(
                'slot default',
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias autem culpa dignissimos et id minima quae qui sapiente ullam velit?',
                'withSlots',
            ),
        },
    },
    template: `<mc-cell :size="size">
    <mc-title slot="title" color="purple">{{title}}</mc-title>
    <mc-title variation="caption">
      <mc-svg-icon slot="icon-prepend" name="ready" color="dark-green"/>
      {{slotDefault}}
    </mc-title>
    <mc-title variation="overline" color="gray">
      {{slotDefault}}
    </mc-title>
  </mc-cell>`,
})
