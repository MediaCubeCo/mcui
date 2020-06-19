import { action } from '@storybook/addon-actions'
import { text, boolean } from '@storybook/addon-knobs'
import { linkTo } from '@storybook/addon-links'

import MyButton from './MyButton'

export default {
  title: 'Button',
  component: MyButton,
};

export const Text = () => ({
  components: { MyButton },
  props: {
    isDisabled: {
      default: boolean('Disabled', false)
    },
    text: {
      default: text('Text', 'Hello Storybook')
    }
  },
  template: '<my-button :isDisabled="isDisabled" @click="action">{{ text }}</my-button>',
  methods: { action: action('clicked') },
});

export const Emoji = () => ({
  components: { MyButton },
  template: '<my-button @click="action">😀 😎 👍 💯</my-button>',
  methods: { action: action('clicked') },
});
