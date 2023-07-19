import { text, select, boolean, array, number, radios, object } from '@storybook/addon-knobs'

import McFieldText from './McFieldText'
import McSvgIcon from '../../McSvgIcon/McSvgIcon'
import McButton from '../../McButton/McButton'
import McTitle from '../../McTitle/McTitle'
import McTooltip from '../../McTooltip/McTooltip'
import { action } from '@storybook/addon-actions'
import { LANGS } from '../../../helpers/storybookVariables'

export default {
    title: 'Elements/McField/McFieldText',
    component: McFieldText,
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=19%3A280',
        },
    },
}

const types = {
    text: 'text',
    textarea: 'textarea',
    textareaAutosize: 'textarea-autosize',
    password: 'password',
    email: 'email',
    num: 'num',
    amount_format: 'amount_format',
    int: 'int',
    tel: 'tel',
    url: 'url',
    uppercase: 'uppercase',
    lowercase: 'lowercase',
}

const getUniqueProps = key => {
    return {
        title: {
            default: text('title', 'Default title', key),
        },
        helpText: {
            default: text('helpText', 'Default help text', key),
        },
        mask: {
            default: text('mask', null, key),
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
        maxHeight: {
            default: number('maxHeight', 0, {}, key),
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
        tabindex: {
            default: number('tabindex', null, {}, key),
        },
        passwordTooltip: {
            default: text('passwordTooltip', null, key),
        },
        passwordHideTooltip: {
            default: text('passwordHideTooltip', null, key),
        },
        clearOutput: {
            default: boolean('clearOutput', false, key),
        },
        maxDecimals: {
            default: number('maxDecimals', null, {}, key),
        },
        required: {
            default: boolean('required', false, key),
        },
        locale: {
            default: select('locale', LANGS, 'en', key)
        },
    }
}

const getCommonTags = ctx => {
    return {
        type: ctx.type,
        title: ctx.title,
        helpText: ctx.helpText,
        mask: ctx.mask,
        disabled: ctx.disabled,
        value: ctx.value,
        errors: ctx.errors,
        placeholder: ctx.placeholder,
        name: ctx.name,
        minHeight: ctx.minHeight,
        maxHeight: ctx.maxHeight,
        maxLength: ctx.maxLength,
        copy: ctx.copy,
        autocomplete: ctx.autocomplete,
        readOnly: ctx.readOnly,
        tabindex: ctx.tabindex,
        passwordTooltip: ctx.passwordTooltip,
        clearOutput: ctx.clearOutput,
        required: ctx.required,
        isMobile: ctx.isMobile,
        locale: ctx.locale,
        maxDecimals: ctx.maxDecimals,
        maskOptions: ctx.maskOptions,
        passwordHideTooltip: ctx.passwordHideTooltip,
    }
}

const actionsData = {
    handleClick: action('clicked'),
    handleCopy: action('copied'),
    handleInput: action('onInput'),
}

export const Default = () => ({
    components: {
        McFieldText,
        McButton,
        McSvgIcon,
        McTitle,
        McTooltip,
    },
    computed: {
        tagBind() {
            return getCommonTags(this)
        },
    },
    props: {
        ...getUniqueProps('default'),
        type: {
            default: select('type', types, 'text', 'default'),
        },
        errors: {
            default: array(
                'errors',
                ['Имя пользователя и пароль не совпадают', 'Поле обязательно для заполнения.'],
                ',',
                'default',
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
        header: {
            default: text('header', 'With header slot', 'default'),
        },
    },
    methods: actionsData,
    template: `
        <mc-field-text v-bind="tagBind" @input="handleInput">
            <mc-title variation="subtitle" slot="header">
                {{header}}
                <mc-tooltip slot="icon-append" content="Lorem ipsum dolor sit amet" placement="top" size="s">
                    <mc-svg-icon name="help" color="dark-gray" />
                </mc-tooltip>
            </mc-title>
            <mc-svg-icon v-if="isPrepend" slot="prepend" name="access_time" />
            <mc-svg-icon v-if="isPrepend" slot="prepend" name="face_alt" />
            <mc-button v-if="isAppend" slot="append" uppercase variation="dark-gray-link" size="xs-compact" @click="handleClick">
                <mc-svg-icon v-if="isAppend" slot="icon-prepend" name="cancel" size="400" />
            </mc-button>
            <mc-svg-icon v-if="isAppend" slot="append" name="dollar" />
        </mc-field-text>
    `,
})

// type textarea
export const Textarea = () => ({
    components: {
        McFieldText,
        McButton,
        McSvgIcon,
    },
    computed: {
        tagBind() {
            return getCommonTags(this)
        },
    },
    props: {
        ...getUniqueProps('textarea'),
        type: {
            default: select('type', types, 'textarea', 'textarea'),
        },
        errors: {
            default: array('errors', [], ',', 'textarea'),
        },
        copy: {
            default: boolean('copy', false, 'textarea'),
        },
        isAppend: {
            default: boolean('slot append', true, 'textarea'),
        },
    },
    methods: actionsData,
    template: `
        <mc-field-text v-bind="tagBind" @input="handleInput">
            <mc-button v-if="isAppend" slot="append" variation="purple-link" size="m-compact" @click="handleClick">
                <mc-svg-icon slot="icon-append" name="send" />
            </mc-button>
        </mc-field-text>
    `,
})

// type copy
export const Copy = () => ({
    components: {
        McFieldText,
        McButton,
        McSvgIcon,
    },
    computed: {
        tagBind() {
            return getCommonTags(this)
        },
    },
    props: {
        ...getUniqueProps('copy'),
        type: {
            default: select('type', types, 'text', 'copy'),
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

// type date
export const Date = () => ({
    components: {
        McFieldText,
        McButton,
        McSvgIcon,
    },
    computed: {
        tagBind() {
            return getCommonTags(this)
        },
    },
    props: {
        ...getUniqueProps('date'),
        type: {
            default: select('type', types, 'date', 'date'),
        },
    },
    methods: actionsData,
    template: `<mc-field-text v-bind="tagBind" @input="handleInput" />`,
})

// type date
export const withMask = () => ({
    components: {
        McFieldText,
        McButton,
        McSvgIcon,
    },
    computed: {
        tagBind() {
            return getCommonTags(this)
        },
    },
    props: {
        ...getUniqueProps('with-mask'),
        maskOptions: {
            default: object('maskOptions', { mask: '+{32}(000)000-000' }, 'with-mask'),
        },
    },
    methods: actionsData,
    template: `<mc-field-text v-bind="tagBind" @input="handleInput" />`,
})

// type password
export const Password = () => ({
    components: {
        McFieldText,
        McButton,
        McSvgIcon,
    },
    computed: {
        tagBind() {
            return getCommonTags(this)
        },
    },
    props: {
        ...getUniqueProps('password'),
        type: {
            default: select('type', types, 'password', 'password'),
        },
        errors: {
            default: array('errors', null, ',', 'password'),
        },
        isMobile: {
            default: boolean('isMobile', false, 'password')
        },
    },
    methods: actionsData,
    template: `<mc-field-text v-bind="tagBind" @input="handleInput" />`,
})
