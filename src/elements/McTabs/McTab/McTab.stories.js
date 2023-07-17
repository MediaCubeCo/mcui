import McTab from './McTab'

export default {
    title: 'Elements/McTabs/McTab',
    component: McTab,
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=127%3A1199',
        },
    },
}

// mc-tab default
export const Default = () => ({
    template: `<div> Смотреть <a href="/?path=/story/elements-mctabs--default">McTabs</a></div>`,
})


