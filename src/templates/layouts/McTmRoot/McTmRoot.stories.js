import McTmRoot from "./McTmRoot"

export default {
  title: 'Templates/McTmRoot',
  parameters: {
    componentSubtitle: 'Это обязательный компонент (это не точно), с него начинается любой layout, т.к. здесь находятся глобальные стили.',
  },
}

// default state
export const Default = () => ({
  components: { McTmRoot },
  template: `<mc-tm-root>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi dolorem eligendi eum illum quibusdam! Doloremque dolores in molestiae nesciunt veritatis!</mc-tm-root>`,
});