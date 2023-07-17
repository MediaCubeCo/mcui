import McDropdownPanel from './McDropdownPanel'
import McSvgIcon from '../../../elements/McSvgIcon/McSvgIcon'
import McButton from '../../../elements/McButton/McButton'

export default {
    title: 'Patterns/McDropdown/McDropdownPanel',
    component: McDropdownPanel,
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=19%3A280',
        },
    },
}

export const Default = () => ({
    components: {
        McDropdownPanel,
        McButton,
        McSvgIcon,
    },
    data() {
        return {
            buttons: [
                { icon: 'mc_id', name: 'Identity' },
                { icon: 'mc_assist', name: 'Assist' },
                { icon: 'mc_studio', name: 'Studio' },
                { icon: 'exit_to_app', name: 'Выйти' },
            ],
        }
    },
    template: `
        <mc-dropdown-panel>
            <mc-button
                v-for="(btn, i) in buttons"
                :key="i"
                href="#"
                full-width
                text-align="left"
                :variation="btn.icon === 'exit_to_app' ? 'red-flat' : 'black-flat'" 
                @click.prevent
            >
                <mc-svg-icon slot="icon-prepend" :name="btn.icon" />
                {{ btn.name }}
            </mc-button>
        </mc-dropdown-panel>
    `,
})

