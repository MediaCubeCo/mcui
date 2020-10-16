import { text, boolean } from '@storybook/addon-knobs'

import McTableCard from './McTableCard'
import McTableCardHeader from "./McTableCardHeader/McTableCardHeader"
import McTitle from "../../elements/McTitle/McTitle"
import McSvgIcon from "../../elements/McSvgIcon/McSvgIcon"
import McButton from "../../elements/McButton/McButton"
import McRoot from "../../templates/layouts/McRoot/McRoot"

const wrapper = () => {
  return {
    template: `<div style="position: relative; margin-bottom: -3rem; height: calc(100vh - 3rem); width: 100%;">
        <story />
    </div>`,
  }
}

export default {
  title: 'Patterns/McTableCard/McTableCard',
  component: McTableCard,
  subcomponents: { McTableCardHeader },
  parameters: {
    componentSubtitle: 'Status: Ready',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/3gG13Y8ShNTZBxA0GBU40U/Dashboard-Panel?node-id=268%3A66',
    },
  },
  decorators: [wrapper],
}


export const Default = () => ({
  components: { McTableCard, McTableCardHeader, McTitle, McSvgIcon, McButton, McRoot },
  props: {
    ml: {
      default: text('ml (margin-left)', '100px', 'default'),
    },
    hasSlotFooter: {
      default: boolean('slot footer', true, 'default'),
    },
  },
  methods: {
    getCardTopPos() {
      const cards = document.getElementsByClassName('mc-table-card')
      return cards.length ? cards[0].getBoundingClientRect().top : 0
    },
    showChat() {
      this.panelResult = this.$showPanel({
        component: "McChat",
        width: '320px',
        openOn: 'right',
        hideBg: true,
        removeBg: false,
        disableBgClick: false,
        keepAlive: false,
        props: {
          title: 'Chat',
          emptyMessage: 'History is clear',
          showInput: true,
          value: '',
          // loading: this.loading,
          editable: true,
          avatar: 'https://avatars3.githubusercontent.com/u/43079603?s=460&v=4',
          comments: [],
          indentTop: this.getCardTopPos(),
        }
      })
    },
  },
  template: `<mc-root>
      <mc-table-card :ml="ml">
      <mc-table-card-header slot="header" button-back-text="Back to list">
        <template slot="right">
          <mc-button variation="blue-link" size="xs">
            Add channel
            <mc-svg-icon slot="icon-append" name="add" />
          </mc-button>
          <mc-button variation="blue-link" size="xs">
            Amount
            <mc-svg-icon slot="icon-append" name="edit_solid" />
          </mc-button>
          <mc-button variation="blue-link" size="xs" @click.prevent="showChat">
            Chat
            <mc-svg-icon slot="icon-append" name="chat" />
          </mc-button>
        </template>
      </mc-table-card-header>
      <mc-title v-for="num in 3" class="mb-200" :key="num" :ellipsis="false">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consectetur magnam possimus rerum! 
        Cupiditate delectus dolor earum eos eum id inventore, itaque, labore molestiae nobis nulla odio perspiciatis 
        quidem quisquam repudiandae sint temporibus veritatis. Distinctio illo iusto voluptas! Adipisci animi aut cum 
        eius error esse ex hic impedit itaque labore laboriosam natus neque nisi odio porro qui quisquam repellat 
        repellendus, saepe suscipit! At delectus deserunt dicta distinctio modi pariatur perspiciatis quos sed velit 
        voluptates? Ab aliquam assumenda corporis dicta incidunt nihil obcaecati quibusdam quidem? Ad amet at consequuntur 
        cupiditate dolorem, doloribus eaque eius, enim est eum eveniet ex facilis incidunt ipsum minima modi molestias 
        mollitia, provident quae quam repellat reprehenderit sequi similique suscipit tenetur ullam vero voluptates! 
        Dolore est excepturi laboriosam magnam, odit pariatur. Aliquid animi architecto autem consectetur corporis 
        debitis distinctio dolor eius eum exercitationem explicabo id incidunt inventore libero maiores, modi mollitia 
        nemo, nostrum numquam quis quod tempora ut veritatis?
      </mc-title>
      <template v-if="hasSlotFooter" slot="footer">
        <mc-button>Apply</mc-button>
        <mc-button variation="red-invert">Block</mc-button>
        <mc-button disabled>Disabled button</mc-button>
      </template>
    </mc-table-card>
  </mc-root>`,
})

