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
  template: `<mc-root>
      <h1 class="mb-s">Global classes</h1>

      <h2 class="mb-s">Spaces:</h2>
      <p>margin-bottom - mb-#{value}</p>
      <p>margin-top - mt-#{value}</p>
      <p>padding-bottom - pb-#{value}</p>
      <p>padding-bottom - pb-#{value}</p>

      <h2 class="mb-s">Values:</h2>
      <p>Same as sizes tokens</p>

      <h2 class="mb-s">Visibilities:</h2>
      <p>hidden-m (>768)</p>
      <p>hidden-l (>1024)</p>
      <p>hidden-m-down (<768)</p>
      <p>hidden-l-down (<1024)</p>
  </mc-root>`,
});