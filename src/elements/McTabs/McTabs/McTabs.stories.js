import { text, boolean, array, select, number } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import McTabs from './McTabs'
import McTab from '../McTab/McTab'
import { getTokensByType } from '../../../utils/getTokens'

export default {
    title: 'Elements/McTabs/McTabs',
    component: McTabs,
    subcomponents: { McTab },
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=127%3A1199',
        },
    },
}

const tabVariations = {
    body: 'body',
    caption: 'caption',
    overline: 'overline',
}
const colors = getTokensByType('color')

const getUniqueProps = key => {
    return {
        cacheLifetime: {
            default: number('cacheLifetime', 5, {}, key),
        },
        useUrlFragment: {
            default: boolean('useUrlFragment', false, key),
        },
        defaultTabHash: {
            default: number('defaultTabHash', 0, {}, key),
        },
        uppercase: {
            default: boolean('uppercase', false, key),
        },
    }
}

const getCommonTags = ctx => {
    return {
        'cache-lifetime': ctx.cacheLifetime,
        'use-url-fragment': ctx.useUrlFragment,
        'default-tab-hash': ctx.defaultTabHash,
        'tab-variation': ctx.tabVariation,
        color: ctx.color,
        'accent-color': ctx.accentColor,
        uppercase: ctx.uppercase,
    }
}

const actionsData = {
    handleChange: action('changed'),
}

// mc-tabs default
export const Default = () => ({
    components: { McTabs, McTab },
    computed: {
        tagBind() {
            return {
                ...getCommonTags(this),
            }
        },
    },
    props: {
        ...getUniqueProps('default'),
        tabVariation: {
            default: select('tabVariation', tabVariations, 'caption', 'default'),
        },
        color: {
            default: select('color', colors, 'black', 'default'),
        },
        accentColor: {
            default: select('accentColor', colors, 'purple', 'default'),
        },
    },
    methods: actionsData,
    template: `<mc-tabs v-bind="tagBind" @changed="handleChange">
      <mc-tab id="custom" name="Custom fragment">Custom fragment content</mc-tab>
      <mc-tab 
          name="With icon"
          icon-prepend-classes="las la-check-circle"
          icon-prepend-color="red"
      >
          Lorem ipsum dolor sit amet.
      </mc-tab>
      <mc-tab
          name="Href link"
          icon-append-classes="las la-external-link-alt"
          href="https://ya.ru"
      >
        Этот контент мы не увидим
      </mc-tab>
      <mc-tab
          name="Router link"
          icon-append-classes="las la-external-link-alt"
          :to="{name: 'test', params: { id: 123 }}"
      >
        Сработает только при наличии this.$router (в проекте nuxt)
      </mc-tab>
      <mc-tab prefix="<<< " suffix=" >>>" name="With prefix and suffix">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe, voluptatibus.
      </mc-tab>
      <mc-tab name="Disabled" :is-disabled="true">Disabled content</mc-tab>
  </mc-tabs>`,
})
