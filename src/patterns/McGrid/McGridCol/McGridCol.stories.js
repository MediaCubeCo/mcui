import McGridCol from './McGridCol'

export default {
  title: 'Patterns/McGrid/McGridCol',
  component: McGridCol,
  parameters: {
    componentSubtitle: 'Status: Ready, Смотреть McGridRow',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=145%3A0',
    },
  },
}

// mc-tab default
export const Default = () => ({
  template: `<div> Смотреть <a href="/?path=/story/patterns-mcgridrow--default">McGridRow</a></div>`,
})


