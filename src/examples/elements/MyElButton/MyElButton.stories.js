import { action } from '@storybook/addon-actions'
import { text, boolean } from '@storybook/addon-knobs'

import MyElButton from './MyElButton'

export default {
  title: 'Examples/MyElButton',
  component: MyElButton,
};

export const Text = () => ({
  components: { MyElButton },
  props: {
    isDisabled: {
      default: boolean('Disabled', false)
    },
    text: {
      default: text('Text', 'Hello Storybook')
    }
  },
  template: '<my-el-button :isDisabled="isDisabled" @click="action">{{ text }}</my-el-button>',
  methods: { action: action('clicked') },
});

export const RenderFunction = () => ({
  components: { MyElButton },
  render(h) {
    return h('my-el-button',
      {
        on: {
          click: this.action,
        }
      },
      'With render-function',
      )
  },
  methods: { action: action('clicked') },
});

// export const Jsx = () => ({
//   components: { MyElButton },
//   render(h) {
//     return <my-el-button onClick={this.action}>With JSX</my-el-button>;
//   },
//   methods: { action: action('clicked') },
// });

export const Emoji = () => ({
  components: { MyElButton },
  template: '<my-el-button @click="action">😀 😎 👍 💯</my-el-button>',
  methods: { action: action('clicked') },
});
