import { linkTo } from '@storybook/addon-links';

import Welcome from './Welcome';

export default {
  title: 'Examples',
  component: Welcome,
};

export const ToStorybook = () => ({
  components: { Welcome },
  template: '<welcome :showApp="action" />',
  methods: { action: linkTo('Examples/MyElButton') },
});

ToStorybook.story = {
  name: 'Description',
};
