import { boolean, text, select } from '@storybook/addon-knobs'

import McDrawer from './McDrawer'
import McRoot from '../../templates/layouts/McRoot/McRoot'
import McButton from '../../elements/McButton/McButton'
import McTitle from '../../elements/McTitle/McTitle'
import McFieldText from '../../elements/McField/McFieldText/McFieldText'

import TmDrawerWrapper from '../../examples/templates/TmDrawerWrapper/TmDrawerWrapper'
import { SVG_ICONS } from '../../helpers/storybookVariables'

export default {
    title: 'Patterns/McDrawer',
    component: McDrawer,
    subcomponents: {
        TmDrawerWrapper,
    },
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=346%3A2152',
        },
    },
}

const positions = {
    left: 'left',
    right: 'right',
    top: 'top',
    bottom: 'bottom',
}

export const Default = () => ({
    components: {
        McDrawer,
        McRoot,
        McButton,
        McTitle,
        McFieldText,
    },
    data() {
        return {
            panelResult: null,
            userName: '',
            userAge: 0,
        }
    },
    props: {
        width: {
            default: text('width', '392px', 'default'),
        },
        height: {
            default: text('height', '900px', 'default'),
        },
        openOn: {
            default: select('openOn', positions, 'left', 'default'),
        },
        hideBg: {
            default: boolean('hideBg', false, 'default'),
        },
        removeBg: {
            default: boolean('removeBg', false, 'default'),
        },
        disableBgClick: {
            default: boolean('disableBgClick', false, 'default'),
        },
        keepAlive: {
            default: boolean('keepAlive', false, 'default'),
        },
        titleEllipsis: {
            default: boolean('titleEllipsis', false, 'default'),
        },
        closeVisible: {
            default: boolean('closeVisible', true, 'default'),
        },
        iconClose: {
            default: select('iconClose', SVG_ICONS, 'arrow_backward', 'default'),
        },
    },
    watch: {
        panelResult(newValue) {
            newValue.promise.then(res => {
                this.userAge = res.userAge
            })
        }
    },
    methods: {
        showDrawer() {
            this.panelResult = this.$showPanel({
                component: 'TmDrawerWrapper',
                width: this.width,
                height: this.height,
                openOn: this.openOn,
                hideBg: this.hideBg,
                removeBg: this.removeBg,
                disableBgClick: this.disableBgClick,
                keepAlive: this.keepAlive,
                props: {
                    userName: this.userName,
                    userAge: this.userAge,
                    drawerProps: {
                        titleEllipsis: this.titleEllipsis,
                        closeVisible: this.closeVisible,
                        iconClose: this.iconClose,
                    },
                }
            })
        },
    },
    template: `
        <mc-root>
            <mc-button @click.prevent="showDrawer">Show Drawer</mc-button>
            <mc-field-text class="mt-200" name="name" title="What is you name?" placeholder="Enter" v-model="userName" />
            <mc-title v-if="userAge" class="mt-200" variation="subtitle">Your age: {{ userAge }}</mc-title>
        </mc-root>
    `,
})

