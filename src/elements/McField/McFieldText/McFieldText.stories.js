import { text, select, boolean, array, number, radios } from '@storybook/addon-knobs'

import McFieldText from './McFieldText'
import McSvgIcon from '../../McSvgIcon/McSvgIcon'
import McButton from '../../McButton/McButton'
import McTitle from '../../McTitle/McTitle'
import McTooltip from '../../McTooltip/McTooltip'
import { action } from "@storybook/addon-actions"

export default {
  title: 'Elements/McFieldText',
  component: McFieldText,
  parameters: {
    componentSubtitle: 'Готов',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=19%3A280',
    },
  },
};

const types = {
  'text': 'text',
  'textarea': 'textarea',
  'textarea-autosize': 'textarea-autosize',
  'password': 'password',
  'email': 'email',
  'number': 'number',
  'tel': 'tel',
  'url': 'url',
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
      default: text('value', 'Введённый текст в инпут', key),
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
    maxLength: {
      default: number('maxLength', 120, {}, key),
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

const actionsData = {
  handleClick: action('clicked'),
  handleCopy: action('copied'),
  handleInput: action('onInput'),
}

export const Default = () => ({
  components: { McFieldText, McButton, McSvgIcon, McTitle, McTooltip },
  computed: {
    tagBind() {
      return getCommonTags(this)
    }
  },
  props: {
    ...getUniqueProps('default'),
    type: {
      default: select('type', types, 'text', 'default')
    },
    errors: {
      default: array(
        'errors',
        ['Имя пользователя и пароль не совпадают', 'Поле обязательно для заполнения.'],
        ',',
        'default'
      ),
    },
    copy: {
      default: boolean('copy', false, 'default'),
    },
    isPrepend: {
      default: boolean('slot prepend', true, 'default'),
    },
    isAppend: {
      default: boolean('slot append', true, 'default'),
    },
  },
  methods: actionsData,
  template: `<mc-field-text v-bind="tagBind" @input="handleInput">
      <mc-title slot="header">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, exercitationem.
          <mc-tooltip slot="icon-append" content="Lorem ipsum dolor sit amet" placement="top" size="s">
              <mc-svg-icon name="help" color="dark-gray" />
          </mc-tooltip>
      </mc-title>
      <mc-svg-icon v-if="isPrepend" slot="prepend" name="access_time" />
      <mc-svg-icon v-if="isPrepend" slot="prepend" name="face_alt" />
      <mc-button v-if="isAppend" slot="append" uppercase variation="dark-gray-link" size="s-compact" @click="handleClick">
          <mc-svg-icon v-if="isAppend" slot="icon-prepend" name="cancel" size="400" />
      </mc-button>
      <mc-svg-icon v-if="isAppend" slot="append" name="dollar" />
  </mc-field-text>`
})

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
    errors: {
      default: array('errors', null, ',', 'textarea'),
    },
    copy: {
      default: boolean('copy', false, 'textarea'),
    },
    isAppend: {
      default: boolean('slot append', true, 'textarea'),
    },
  },
  methods: actionsData,
  template: `<mc-field-text v-bind="tagBind" @input="handleInput">
      <mc-button v-if="isAppend" slot="append" variation="blue-link" size="m-compact" @click="handleClick">
          <mc-svg-icon slot="icon-append" name="send" />
      </mc-button>
  </mc-field-text>`,
})

// type copy
export const Copy = () => ({
  components: { McFieldText, McButton, McSvgIcon },
  computed: {
    tagBind() {
      return getCommonTags(this)
    }
  },
  props: {
    ...getUniqueProps('copy'),
    type: {
      default: select('type', types, 'text', 'copy')
    },
    copy: {
      default: boolean('copy', true, 'copy'),
    },
    errors: {
      default: array('errors', null, ',', 'copy'),
    },
  },
  methods: actionsData,
  template: `<mc-field-text v-bind="tagBind" @copy="handleCopy" @input="handleInput" />`,
})

// type password
export const Password = () => ({
  components: { McFieldText, McButton, McSvgIcon },
  computed: {
    tagBind() {
      return getCommonTags(this)
    }
  },
  props: {
    ...getUniqueProps('password'),
    type: {
      default: select('type', types, 'password', 'password')
    },
    errors: {
      default: array('errors', null, ',', 'password'),
    },
  },
  methods: actionsData,
  template: `<mc-field-text v-bind="tagBind" @input="handleInput" />`,
})

