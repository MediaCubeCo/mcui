import { text, boolean, array, select, number } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import McFieldRadioGroup from './McFieldRadioGroup'
import McFieldRadioButton from '../McFieldRadioButton/McFieldRadioButton'


export default {
    title: 'Elements/McField/McFieldRadioGroup',
    component: McFieldRadioGroup,
    subcomponents: {
        McFieldRadioButton,
    },
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=1%3A2',
        },
    },
}

const directions = {
    row: 'row',
    column: 'column',
}

let optionsArr = ['Apples', 'Oranges', 'Watermelon', 'Bananas', 'Lemons']
let optionsArrOfObj = optionsArr.map((item, index) => ({
    label: item,
    value: index,
}))

const getUniqueProps = key => {
    return {
        disabled: {
            default: boolean('disabled', false, key),
        },
        helpText: {
            default: text('helpText', 'Default help text', key),
        },
    }
}

const getCommonTags = ctx => {
    return {
        title: ctx.title,
        helpText: ctx.helpText,
        name: ctx.name,
        options: ctx.options,
        defaultValue: ctx.defaultValue,
        disabled: ctx.disabled,
        radioClassName: ctx.radioClassName,
        direction: ctx.direction,
        errors: ctx.errors,
    }
}

const actionsData = {
    onChange: action('changed'),
}

// mc-field-radio-group default
export const Default = () => ({
    components: {
        McFieldRadioGroup,
    },
    data() {
        return {
            value: 'Apples',
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
        name: {
            default: text('name', 'default_radio', 'default'),
        },
        options: {
            default: array(
                'options',
                optionsArr,
                ',',
                'default',
            ),
        },
        defaultValue: {
            default: text('defaultValue', 'Apples', 'default'),
        },
        radioClassName: {
            default: text('radioClassName', '', 'default'),
        },
        direction: {
            default: select('direction', directions, 'column', 'default'),
        },
        errors: {
            default: array(
                'errors',
                [],
                ',',
                'default',
            ),
        },
    },
    methods: actionsData,
    template: `<mc-field-radio-group v-bind="tagBind" v-model="value" @change="onChange" />`,
})

// mc-field-radio-group with custom class and options array of objects
export const WithCustomClass = () => ({
    components: {
        McFieldRadioGroup,
    },
    data() {
        return {
            value: 'Bananas',
            options: optionsArrOfObj,
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
        ...getUniqueProps('withCustomClass'),
        title: {
            default: text('title', 'With Custom Class', 'withCustomClass'),
        },
        name: {
            default: text('name', 'custom_radio', 'withCustomClass'),
        },
        defaultValue: {
            default: number('defaultValue', 2, {}, 'withCustomClass'),
        },
        radioClassName: {
            default: text('radioClassName', 'element--background-yellow', 'withCustomClass'),
        },
        direction: {
            default: select('direction', directions, 'row', 'withCustomClass'),
        },
        errors: {
            default: array(
                'errors',
                ['Рандомная ошибка!'],
                ',',
                'withCustomClass',
            ),
        },
    },
    methods: actionsData,
    template: `<mc-field-radio-group v-bind="tagBind" v-model="value" @change="onChange" />`,
})
