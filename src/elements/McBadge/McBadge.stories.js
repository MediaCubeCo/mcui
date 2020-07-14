import {select, boolean, text} from "@storybook/addon-knobs"

import McBadge from './McBadge'
import { getTokensByType } from "../../utils/getTokens"

export default {
  title: 'Elements/McBadge',
  component: McBadge,
};

const colors = getTokensByType('color')

export const Badge = () => ({
  components: { McBadge },
  data() {
    return {
      value: 'Default badge'
    }
  },
  props: {
    color: {
      default: select('color', colors, 'white')
    },
    background: {
      default: select('background', colors, 'red')
    },
    translucent: {
      default: boolean('translucent', false)
    },
    value: {
      default: text('slot default', 'badge content'),
    },
  },
  template: '<mc-badge :color="color" :background="background" :translucent="translucent">{{ value }}</mc-badge>',
});

