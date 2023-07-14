import McAccordion from './McAccordion'
import McButton from '../../elements/McButton/McButton'
import McCollapse from '../McCollapse/McCollapse'

export default {
    title: 'Patterns/McAccordion',
    component: McAccordion,
    subcomponents: {
        McCollapse,
    },
    parameters: {
        componentSubtitle: 'Status: Ready',
    },
}

export const Default = () => ({
    components: {
        McAccordion,
        McCollapse,
        McButton,
    },
    data() {
        return {
            content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Autem doloribus est illo laborum libero nostrum suscipit tempora voluptates! Assumenda, provident! Odmen petuh!`,
        }
    },
    template: `
        <mc-accordion>
            <mc-collapse class="mb-100">
                <mc-button slot="activator" variation="dark-green-invert">Title 1</mc-button>
                <template slot="body">{{content}}</template>
            </mc-collapse>
            <mc-collapse class="mb-100">
                <mc-button slot="activator" variation="dark-green-invert">Title 2</mc-button>
                <template slot="body">{{content}}</template>
            </mc-collapse>
            <mc-collapse is-disabled>
                <mc-button slot="activator" disabled>Disabled</mc-button>
                <template slot="body">{{content}}</template>
            </mc-collapse>
        </mc-accordion>
    `,
})

