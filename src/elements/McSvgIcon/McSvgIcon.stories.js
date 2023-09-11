import { text, select, number } from '@storybook/addon-knobs'

import McSvgIcon from './McSvgIcon'
import McSeparator from '../McSeparator/McSeparator.vue'
import McFieldText from '../McField/McFieldText/McFieldText.vue'
import McTitle from '../McTitle/McTitle.vue'
import { getTokensByType, getTokenGroup } from '../../utils/getTokens'
import { SVG_ICONS } from '../../helpers/storybookVariables'

export default {
    title: 'Elements/McSvgIcon',
    component: McSvgIcon,
    parameters: {
        componentSubtitle: 'Status: Ready',
    },
}

const iconSizes = getTokenGroup('icon-sizes')
const colors = getTokensByType('color')

export const Icon = () => ({
    components: {
        McSvgIcon,
    },
    props: {
        name: {
            default: select('name', SVG_ICONS, 'add'),
        },
        defaultName: {
            default: select('defaultName', SVG_ICONS, 'add'),
        },
        color: {
            default: select('color', colors, 'red'),
        },
        fill: {
            default: text('fill', 'currentColor'),
        },
        size: {
            default: select('size', iconSizes, '300'),
        },
        weight: {
            default: number('weight', 0, {}),
        },
        type: {
            default: text('type', 'span'),
        },
    },
    template: '<mc-svg-icon :name="name" :size="size" :fill="fill" :color="color" :weight="weight" />',
})

export const IconsList = () => ({
    components: {
        McSvgIcon,
        McTitle,
        McSeparator,
        McFieldText,
    },
    data: () => ({
        search: null,
    }),
    computed: {
        iconsSections() {
            const iconsObject = {
                colored: [],
                blue: [],
                arrows: [],
                flags: [],
                checks: [],
                mediacube: [],
                other: [],
            }
            SVG_ICONS.forEach(icon => {
                switch (true) {
                    case icon.includes('_colored'):
                        return iconsObject.colored.push(icon)
                    case icon.includes('_blue'):
                        return iconsObject.blue.push(icon)
                    case icon.includes('arrow'):
                        return iconsObject.arrows.push(icon)
                    case icon.includes('flag'):
                        return iconsObject.flags.push(icon)
                    case icon.includes('check'):
                        return iconsObject.checks.push(icon)
                    case icon.includes('mc'):
                    case icon.includes('mediacube'):
                        return iconsObject.mediacube.push(icon)
                    default:
                        return iconsObject.other.push(icon)
                }
            })
            const defaultSections = Object.keys(iconsObject).map(key => ({
                title: key.replace(/^./, key[0].toUpperCase()),
                icons: iconsObject[key],
                id: key,
            }))
            return this.search
                ? [
                      {
                          title: 'Search results',
                          icons: SVG_ICONS.filter(icon => icon.includes(this.search)),
                      },
                  ]
                : defaultSections
        },
    },
    template: `
        <section>
            <mc-field-text v-model="search" name="search" title="Search" placeholder="add" class="mb-400" />
            <div v-for="section in iconsSections" :key="section.id" :id="section.id">
                <mc-title variation="h3">
                    {{ section.title }}
                </mc-title>
                <template v-if="section.icons.length">
                    <mc-separator indent-bottom="400" indent-top="400" />
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, 160px); gap: 16px">
                        <div
                            v-for="icon in section.icons"
                            :key="icon"
                            style="display: flex; flex-direction: column; align-items: center; justify-content: center"
                        >
                            <mc-svg-icon :name="icon" size="400" />
                            <mc-title :ellipsis="false" text-align="center" class="mt-150">{{ icon }}</mc-title>
                        </div>
                    </div>
                    <mc-separator indent-bottom="400" indent-top="400" />
                </template>
                <div v-else style="width: 100%; height: 300px; display: flex; align-items: center; justify-content: center; flex-direction: column">
                    <mc-svg-icon name="info" color="gray" size="800" />
                    <mc-title text-align="center" color="gray" variation="h3">No results</mc-title>
                </div>
            </div>
        </section>
    `,
})
