import McRoot from "./McRoot"

export default {
  title: 'Templates/McRoot',
  parameters: {
    componentSubtitle: 'Это обязательный компонент, с него начинается любой layout, т.к. здесь находятся глобальные стили.',
  },
}

// default state
export const Default = () => ({
  components: { McRoot },
  template: `<mc-root>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi dolorem eligendi eum illum quibusdam! Doloremque dolores in molestiae nesciunt veritatis!</mc-root>`,
});