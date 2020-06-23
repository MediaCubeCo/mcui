import MyTmRoot from "./MyTmRoot"

export default {
  title: 'Templates/MyTmRoot',
}

// default task state
export const Default = () => ({
  components: { MyTmRoot },
  template: `<my-tm-root>
      <h2 class="mb-s">Global classes:</h2>
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
  </my-tm-root>`,
});