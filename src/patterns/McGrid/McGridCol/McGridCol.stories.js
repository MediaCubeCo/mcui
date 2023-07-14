import McGridCol from './McGridCol'
import McGridRow from '../McGridRow/McGridRow'
import {text, boolean, number} from "@storybook/addon-knobs"

export default {
  title: 'Patterns/McGrid/McGridCol',
  component: McGridCol,
  parameters: {
    componentSubtitle: 'Status: Ready, Смотреть McGridRow',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=145%3A0',
    },
  },
}

const getUniqueProps = key => {
    return {
        span1: {
            default: number('span1', 4, {}, key)
        },
        span2: {
            default: number('span2', 4, {}, key)
        },
        spanM1: {
            default: number('spanM1', 4, {}, key)
        },
        order1: {
            default: number('order1', 0, {}, key)
        },
        offset1: {
            default: number('offset1', 0, {}, key)
        },
        push1: {
            default: number('push1', 0, {}, key)
        },
        pull1: {
            default: number('pull1', 0, {}, key)
        },
        stretchSelf1: {
            default: boolean('stretchSelf (work without span)', false, key),
        },
        basis1: {
            default: text('basis (work without span)', 'auto', key),
        },
    }
}

const getCommonTags = ctx => {
    return {
        span: ctx.span1,
        spanM: ctx.spanM1,
        order: ctx.order1,
        offset: ctx.offset1,
        push: ctx.push1,
        pull: ctx.pull1,
        basis: ctx.basis1,
        stretchSelf: ctx.stretchSelf1,
    }
}

export const Default = () => ({
    components: { McGridRow, McGridCol },
    computed: {
        tagBind() {
            return getCommonTags(this)
        },
    },
    props: {
        ...getUniqueProps('default'),
    },
    template: `<mc-grid-row>
      <mc-grid-col v-bind="tagBind"><div style="background: #e74c3c">1</div></mc-grid-col>
      <mc-grid-col :span="span2"><div style="background: #1abc9c">2</div></mc-grid-col>
  </mc-grid-row>`,
})

