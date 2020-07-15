import { text, select, boolean, object, array, number, radios } from '@storybook/addon-knobs'

import McFieldText from './McFieldText'
import McSvgIcon from '../McSvgIcon/McSvgIcon'
import McButton from '../McButton/McButton'
import { getTokensByType } from "../../utils/getTokens"

export default {
  title: 'Elements/McFieldText',
  component: McFieldText,
  parameters: {
    componentSubtitle: 'Subtitle for this component',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=19%3A280',
    },
  },
};

const types = {
  'textarea': 'textarea',
  'textarea-autosize': 'textarea-autosize',
  'default': null,
}

const getUniqueProps = key => {
  return {
    title: {
      default: text('title', 'Default title', key),
    },
    helpText: {
      default: text('helpText', 'Default help text', key),
    },
    disabled: {
      default: boolean('disabled', false, key),
    },
    value: {
      default: text('value', ' Введённый текст в инпут', key),
    },
    errors: {
      default: array('errors', ['Имя пользователя и пароль не совпадают', 'Поле обязательно для заполнения.'], ',', key),
    },
    placeholder: {
      default: text('placeholder', 'Введите сообщение', key),
    },
    name: {
      default: text('name', 'login', key),
    },
    minHeight: {
      default: number('minHeight', 0, {}, key),
    },
    maxHeight: {
      default: number('maxHeight', 0, {}, key),
    },
    maxLength: {
      default: number('maxHeight', 20, {}, key),
    },
    copy: {
      default: boolean('copy', false, key),
    },
    autocomplete: {
      default: radios('autocomplete', { on: 'on', off: 'off' }, 'on', key),
    },
    readOnly: {
      default: boolean('readOnly', false, key),
    },
  }
}

const getCommonTags = ctx => {
  return {
    type: ctx.type,
    title: ctx.title,
    'help-text': ctx.helpText,
    disabled: ctx.disabled,
    value: ctx.value,
    errors: ctx.errors,
    placeholder: ctx.placeholder,
    name: ctx.name,
    'min-height': ctx.minHeight,
    'max-height': ctx.maxHeight,
    'max-length': ctx.maxLength,
    copy: ctx.copy,
    autocomplete: ctx.autocomplete,
    readOnly: ctx.readOnly,
  }
}

export const Default = () => ({
  components: { McFieldText, McButton, McSvgIcon },
  computed: {
    tagBind() {
      return getCommonTags(this)
    }
  },
  props: {
    ...getUniqueProps('default'),
    type: {
      default: select('type', types, 'default', 'default')
    },
    isPrepend: {
      default: boolean('slot prepend', true, 'default'),
    },
    isAppend: {
      default: boolean('slot append', true, 'default'),
    },
  },
  template: `<mc-field-text v-bind="tagBind">
      <mc-svg-icon v-if="isPrepend" slot="prepend" name="access_time" />
      <mc-svg-icon v-if="isPrepend" slot="prepend" name="face_alt" />
      <mc-svg-icon v-if="isAppend" slot="append" name="dollar" />
      <mc-button v-if="isAppend" slot="append" uppercase variation="dark-gray-invert" size="s">Все</mc-button>
  </mc-field-text>`
});

// type textarea
export const Textarea = () => ({
  components: { McFieldText, McButton, McSvgIcon },
  computed: {
    tagBind() {
      return getCommonTags(this)
    }
  },
  props: {
    ...getUniqueProps('textarea'),
    type: {
      default: select('type', types, 'textarea', 'textarea')
    },
    isAppend: {
      default: boolean('slot append', true, 'textarea'),
    },
  },
  template: `<mc-button v-bind="tagBind">
      <mc-button v-if="isAppend" slot="append" variation="blue-link" size="s-compact">
          <mc-svg-icon slot="icon-append" name="send"/>
      </mc-button>
  </mc-button>`,
});

