import { text, boolean, array, number } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import McFieldCheckbox from './McFieldCheckbox'

export default {
    title: 'Elements/McField/McFieldCheckbox',
    component: McFieldCheckbox,
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=1%3A2',
        },
    },
}

const getUniqueProps = key => {
    return {
        disabled: {
            default: boolean('disabled', false, key),
        },
        tabindex: {
            default: number('tabindex', null, {}, key),
        },
    }
}

const getCommonTags = ctx => {
    return {
        name: ctx.name,
        errors: ctx.errors,
        helpText: ctx.helpText,
        mainText: ctx.mainText,
        title: ctx.title,
        disabled: ctx.disabled,
        tabindex: ctx.tabindex,
    }
}

const actionsData = {
    handleInput: action('toggle'),
}

// mc-field-checkbox default
export const Default = () => ({
    components: { McFieldCheckbox },
    data() {
        return {
            value: null,
        }
    },
    computed: {
        tagBind() {
            return {
                ...getCommonTags(this),
            }
        },
    },
    props: {
        ...getUniqueProps('default'),
        title: {
            default: text('title', 'Default title', 'default'),
        },
        helpText: {
            default: text('helpText', 'Default help text', 'default'),
        },
        name: {
            default: text('name', 'check', 'default'),
        },
        errors: {
            default: array(
                'errors',
                ['Имя пользователя и пароль не совпадают', 'Поле обязательно для заполнения.'],
                ',',
                'default',
            ),
        },
        mainText: {
            default: text('mainText', 'Default checkbox', 'default'),
        },
    },
    methods: actionsData,
    template: `<mc-field-checkbox v-bind="tagBind" v-model="value" @input="handleInput" />`,
})

// mc-field-checkbox with custom values
export const WithCustomValues = () => ({
    components: { McFieldCheckbox },
    data() {
        return {
            value: 'checked',
        }
    },
    computed: {
        tagBind() {
            return {
                ...getCommonTags(this),
                checkedValue: this.checkedValue,
                uncheckedValue: this.uncheckedValue,
            }
        },
    },
    props: {
        ...getUniqueProps('customVal'),
        title: {
            default: text('title', 'Checkbox title with custom values', 'customVal'),
        },
        helpText: {
            default: text('helpText', '', 'customVal'),
        },
        name: {
            default: text('name', 'custom_val_check', 'customVal'),
        },
        checkedValue: {
            default: text('checkedValue', 'checked', 'customVal'),
        },
        uncheckedValue: {
            default: text('uncheckedValue', 'unchecked', 'customVal'),
        },
        errors: {
            default: array('errors', [], ',', 'customVal'),
        },
        mainText: {
            default: text('mainText', 'With custom values', 'customVal'),
        },
    },
    methods: actionsData,
    template: `<mc-field-checkbox v-bind="tagBind" v-model="value" @input="handleInput" />`,
})
