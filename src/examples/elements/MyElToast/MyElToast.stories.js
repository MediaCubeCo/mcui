import { text, select, boolean, number } from '@storybook/addon-knobs'

import MyElToast from "./MyElToast"
import McRoot from "../../../templates/layouts/McRoot/McRoot"
import McButton from "../../../elements/McButton/McButton"

export default {
  title: 'Examples/MyElToast',
  component: MyElToast,
  parameters: {
    componentSubtitle: 'Status: In progress',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=450%3A2514',
    },
  },
}

const themes = {
  'toasted-primary': 'toasted-primary',
  'outline': 'outline',
  'bubble': 'bubble',
}
const positions = {
  'top-right': 'top-right',
  'top-center': 'top-center',
  'top-left': 'top-left',
  'bottom-right': 'bottom-right',
  'bottom-center': 'bottom-center',
  'bottom-left': 'bottom-left',
}

const getUniqueProps = key => {
  return {
    text: {
      default: text('text', 'Toasted!!', key),
    },
    theme: {
      default: select('theme', themes, 'toasted-primary', key),
    },
    position: {
      default: select('position', positions, 'bottom-center', key),
    },
    duration: {
      default: number('duration', 3000, {}, key),
    },
    fullWidth: {
      default: boolean('fullWidth', false, key),
    },
    className: {
      default: text('className', 'mc-toast--primary', key),
    },
    keepOnHover: {
      default: boolean('keepOnHover', false, key),
    },
  }
}

const getCommonTags = ctx => {
  return {
    // text: ctx.text,
    // theme: ctx.theme,
    // ellipsis: ctx.ellipsis,
    // 'tag-name': ctx.tagName,
    // uppercase: ctx.uppercase,
    // 'text-align': ctx.textAlign,
    // 'line-height': ctx.lineHeight,
    // weight: ctx.weight,
    // 'max-width': ctx.maxWidth,
  }
}

export const Default = () => ({
  components: { McRoot, McButton },
  computed: {
    // tagBind() {
    //   return getCommonTags(this)
    // },
    actions() {
      return [
        {
          text : 'Close',
          onClick : (e, toastObject) => {
            toastObject.goAway(0);
          },
        },
        {
          text : 'Cancel',
          onClick : (e, toastObject) => {
            console.log('cancelled')
            toastObject.goAway(0);
          },
        },
      ]
    },
  },
  props: {
    ...getUniqueProps('default'),
    ellipsis: {
      default: boolean('ellipsis', true, 'default'),
    },
  },
  methods: {
    showChat() {
      let toast = this.$toasted.show(this.text, {
        theme: this.theme,
        position: this.position,
        duration : Infinity,
        fullWidth : this.fullWidth,
        className : this.className,
        keepOnHover : this.keepOnHover,
        action: this.actions,
      })
    },
  },
  template: `<mc-root>
    <mc-button @click.prevent="showChat">Show toast</mc-button>
  </mc-root>`,
})

