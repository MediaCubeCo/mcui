import {select, boolean, number} from "@storybook/addon-knobs"

import McGridRow from './McGridRow'
import McGridCol from '../McGridCol/McGridCol'

export default {
  title: 'Patterns/McGridRow',
  component: McGridRow,
  subcomponents: { McGridCol },
  parameters: {
    componentSubtitle: 'Status: Ready',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=145%3A0',
    },
  },
}

const align = {
  top: "top",
  middle: "middle",
  bottom: "bottom",
  stretch: "stretch",
}
const justify = {
  left: "left",
  right: "right",
  center: "center",
  around: "around",
  between: "between"
}

const getUniqueProps = key => {
  return {
    gutterX: {
      default: number('gutterX', 30, {}, key)
    },
    gutterY: {
      default: number('gutterY', 10, {}, key)
    },
  }
}

const getCommonTags = ctx => {
  return {
    gutterX: ctx.gutterX,
    gutterY: ctx.gutterY,
    justify: ctx.justify,
    align: ctx.align,
    stretch: ctx.stretch,
    wrap: ctx.wrap,
  }
}

export const Default = () => ({
  components: { McGridRow, McGridCol },
  computed: {
    tagBind() {
      return getCommonTags(this)
    }
  },
  props: {
    ...getUniqueProps('default'),
    justify: {
      default: select('justify', justify, 'center', 'default')
    },
    align: {
      default: select('align', align, 'middle', 'default')
    },
    stretch: {
      default: boolean('stretch', false, 'default'),
    },
    wrap: {
      default: boolean('wrap', true, 'default'),
    },
  },
  template: `<mc-grid-row v-bind="tagBind">
      <mc-grid-col :span="12" :span-m="1"><div style="background: #e74c3c">1</div></mc-grid-col>
      <mc-grid-col :span="12" :span-m="2"><div style="background: #1abc9c">2</div></mc-grid-col>
      <mc-grid-col :span="12" :span-m="3"><div style="background: #9b59b6">3</div></mc-grid-col>
      <mc-grid-col :span="12" :span-m="6"><div style="background: #f1c40f">6</div></mc-grid-col>
  </mc-grid-row>`,
})

export const NestedGrid = () => ({
  components: { McGridRow, McGridCol },
  computed: {
    tagBind() {
      return getCommonTags(this)
    }
  },
  props: {
    ...getUniqueProps('nested'),
    justify: {
      default: select('justify', justify, 'center', 'nested')
    },
    align: {
      default: select('align', align, 'middle', 'nested')
    },
    stretch: {
      default: boolean('stretch', false, 'nested'),
    },
    wrap: {
      default: boolean('wrap', true, 'nested'),
    },
  },
  template: `<mc-grid-row v-bind="tagBind">
      <mc-grid-col :span="12" :span-m="1"><div style="background: #e74c3c">1</div></mc-grid-col>
      <mc-grid-col :span="12" :span-m="2"><div style="background: #1abc9c">2</div></mc-grid-col>
      <mc-grid-col :span="12" :span-m="3"><div style="background: #9b59b6">3</div></mc-grid-col>
      <mc-grid-col :span="12" :span-m="6">
          <div style="background: #f1c40f">
              <mc-grid-row :gutter-x="5">
                  <mc-grid-col :span="3"><div style="background: violet; color: white;">3</div></mc-grid-col>
                  <mc-grid-col :span="3"><div style="background: blue; color: white;">3</div></mc-grid-col>
                  <mc-grid-col :span="6"><div style="background: blueviolet; color: white;">6</div></mc-grid-col>
              </mc-grid-row>
          </div>
      </mc-grid-col>
  </mc-grid-row>`,
})

export const AutoSize = () => ({
  components: { McGridRow, McGridCol },
  computed: {
    tagBind() {
      return getCommonTags(this)
    }
  },
  props: {
    ...getUniqueProps('autoSize'),
    justify: {
      default: select('justify', justify, 'center', 'autoSize')
    },
    align: {
      default: select('align', align, 'middle', 'autoSize')
    },
    stretch: {
      default: boolean('stretch', false, 'autoSize'),
    },
    wrap: {
      default: boolean('wrap', true, 'autoSize'),
    },
  },
  template: `<mc-grid-row v-bind="tagBind">
      <mc-grid-col><div style="background: #e74c3c">Auto Size</div></mc-grid-col>
      <mc-grid-col><div style="background: #f1c40f">Auto Size middle</div></mc-grid-col>
      <mc-grid-col><div style="background: cornflowerblue">Auto Size large content</div></mc-grid-col>
  </mc-grid-row>`,
})

