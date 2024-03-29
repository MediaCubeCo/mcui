import { text, select, boolean, array } from '@storybook/addon-knobs'
import categories from '../../../mocks/categories'

import McFieldSelect from './McFieldSelect'
import McSvgIcon from '../../McSvgIcon/McSvgIcon'
import McTitle from '../../McTitle/McTitle'
import McTooltip from '../../McTooltip/McTooltip'
import { action } from '@storybook/addon-actions'
import { SVG_ICONS } from '../../../helpers/storybookVariables'
import { getTokensByType } from '../../../utils/getTokens'
import { LANGS } from '../../../helpers/storybookVariables'

export default {
    title: 'Elements/McField/McFieldSelect',
    component: McFieldSelect,
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=19%3A280',
        },
    },
}

const mappedCategories = categories.map(c => ({ name: c.title, value: c.id, icon: 'bitcoin', text: 'test' }))
const colors = getTokensByType('color')

const directions = {
    above: 'above',
    below: 'below',
    top: 'top',
    bottom: 'bottom',
    auto: 'auto',
}

const getUniqueProps = key => {
    return {
        title: {
            default: text('title', 'Default title', key),
        },
        helpText: {
            default: text('helpText', 'Default help text', key),
        },
        hideSelected: {
            default: boolean('hideSelected', true, key),
        },
        allowEmpty: {
            default: boolean('allowEmpty', true, key),
        },
        required: {
            default: boolean('required', false, key),
        },
        disabled: {
            default: boolean('disabled', false, key),
        },
        placeholder: {
            default: text('placeholder', 'Enter', key),
        },
        openDirection: {
            default: select('openDirection', directions, 'auto', key),
        },
        showLabels: {
            default: boolean('showLabels', false, key),
        },
        internalSearch: {
            default: boolean('internalSearch', true, key),
        },
        name: {
            default: text('name', `select-${key}`, key),
        },
        optionsTooltip: {
            default: boolean('optionsTooltip', false, key),
        },
        locale: {
            default: select('locale', LANGS, 'en', key),
        },
    }
}

const getCommonTags = ctx => {
    return {
        title: ctx.title,
        helpText: ctx.helpText,
        options: ctx.options,
        searchable: ctx.searchable,
        hideSelected: ctx.hideSelected,
        allowEmpty: ctx.allowEmpty,
        disabled: ctx.disabled,
        backgroundColor: ctx.backgroundColor,
        placeholder: ctx.placeholder,
        openDirection: ctx.openDirection,
        showLabels: ctx.showLabels,
        internalSearch: ctx.internalSearch,
        errors: ctx.errors,
        name: ctx.name,
        required: ctx.required,
        maxHeight: ctx.maxHeight,
        optionsTooltip: ctx.optionsTooltip,
        locale: ctx.locale,
    }
}

const actionsData = {
    handleOriginalInput: action('original-input'),
    handleTag: action('tag'),
    handleSearchChange: action('search-change'),
    handleInput: action('input'),
}

export const Multiple = () => ({
    components: {
        McFieldSelect,
        McTooltip,
        McSvgIcon,
        McTitle,
    },
    data() {
        return {
            categoriesModel: [],
            options: mappedCategories,
        }
    },
    computed: {
        tagBind() {
            return {
                ...getCommonTags(this),
                multiple: true,
                taggable: true,
            }
        },
    },
    props: {
        ...getUniqueProps('multiple'),
        searchable: {
            default: boolean('searchable', true, 'multiple'),
        },
        errors: {
            default: array(
                'errors',
                ['Имя пользователя и пароль не совпадают', 'Поле обязательно для заполнения.'],
                ',',
                'multiple',
            ),
        },
        header: {
            default: text('header', 'Multiple with header slot', 'multiple'),
        },
        maxHeight: {
            default: text('maxHeight', `60px`, 'mulitple'),
        },
    },
    methods: actionsData,
    template: `
        <mc-field-select 
            v-bind="tagBind"
            v-model="categoriesModel"
            @input="handleInput" 
            @original-input="handleOriginalInput" 
            @tag="handleTag"
            @search-change="handleSearchChange"
        >
            <mc-title variation="subtitle" slot="header">
                {{header}}
                <mc-tooltip slot="icon-append" content="Lorem ipsum dolor sit amet" placement="top" size="s">
                    <mc-svg-icon name="help" color="dark-gray" />
                </mc-tooltip>
            </mc-title>
        </mc-field-select>
    `,
})

export const Single = () => ({
    components: {
        McFieldSelect,
        McTooltip,
        McSvgIcon,
        McTitle,
    },
    data() {
        return {
            categoriesModel: [],
            options: mappedCategories,
        }
    },
    computed: {
        tagBind() {
            return {
                ...getCommonTags(this),
                multiple: false,
                taggable: false,
                title: 'Single',
            }
        },
    },
    props: {
        ...getUniqueProps('single'),
        searchable: {
            default: boolean('searchable', false, 'single'),
        },
    },
    methods: actionsData,
    template: `
        <mc-field-select 
            v-bind="tagBind"
            v-model="categoriesModel"
            @input="handleInput" 
            @original-input="handleOriginalInput" 
        />
    `,
})

export const optionsWithPreview = () => ({
    components: {
        McFieldSelect,
        McTooltip,
        McSvgIcon,
        McTitle,
    },
    data() {
        return {
            categoriesModel: [],
            options: mappedCategories,
        }
    },
    computed: {
        tagBind() {
            return {
                ...getCommonTags(this),
                multiple: false,
                taggable: false,
                title: 'preview',
                optionWithPreview: true,
            }
        },
    },
    props: {
        ...getUniqueProps('preview'),
        searchable: {
            default: boolean('searchable', false, 'preview'),
        },
    },
    methods: actionsData,
    template: `
        <mc-field-select 
            v-bind="tagBind"
            v-model="categoriesModel"
            @input="handleInput" 
            @original-input="handleOriginalInput" 
        />
    `,
})


export const Grouped = () => ({
    components: {
        McFieldSelect,
        McTooltip,
        McSvgIcon,
        McTitle,
    },
    data() {
        return {
            categoriesModel: [],
            options: [
                {
                    name: '3 first',
                    categories: mappedCategories.slice(0, 3),
                },
                {
                    name: 'others',
                    categories: mappedCategories.slice(3),
                },
            ],
        }
    },
    computed: {
        tagBind() {
            return {
                ...getCommonTags(this),
                multiple: false,
                taggable: false,
                title: 'Grouped',
                groupKeys: { label: 'name', values: 'categories' },
            }
        },
    },
    props: {
        ...getUniqueProps('single'),
        searchable: {
            default: boolean('searchable', false, 'single'),
        },
    },
    methods: actionsData,
    template: `
        <mc-field-select 
            v-bind="tagBind"
            v-model="categoriesModel"
            @input="handleInput" 
            @original-input="handleOriginalInput"
        />
    `,
})

export const WithPrepend = () => ({
    components: {
        McFieldSelect,
        McTooltip,
        McSvgIcon,
        McTitle,
    },
    data() {
        return {
            categoriesModel: 3,
            options: mappedCategories,
        }
    },
    computed: {
        tagBind() {
            return {
                ...getCommonTags(this),
                multiple: false,
                taggable: false,
                title: 'WithPrepend',
                avatar: this.avatar,
                icon: this.icon,
            }
        },
    },
    props: {
        ...getUniqueProps('WithPrepend'),
        avatar: {
            default: text('avatar', 'https://avatars3.githubusercontent.com/u/43079603?s=460&v=4', 'WithPrepend'),
        },
        icon: {
            default: select('icon', SVG_ICONS, 'account_circle', 'WithPrepend'),
        },
        backgroundColor: {
            default: select('backgroundColor', colors, 'azure', 'WithPrepend'),
        },
        searchable: {
            default: boolean('searchable', false, 'WithPrepend'),
        },
    },
    methods: actionsData,
    template: `
        <mc-field-select 
            v-bind="tagBind"
            v-model="categoriesModel"
            @input="handleInput" 
            @original-input="handleOriginalInput"
        />
    `,
})
