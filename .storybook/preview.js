import '../src/styles/main.scss'

import { addDecorator, addParameters } from '@storybook/vue';
import { withA11y } from '@storybook/addon-a11y';
import { PaddingDecorator } from './decorators';
import { withKnobs } from '@storybook/addon-knobs';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { setConsoleOptions } from '@storybook/addon-console';

const cssReq = require.context('!!raw-loader!../src', true, /.\.css$/);
const cssTokenFiles = cssReq
  .keys()
  .map(filename => ({ filename, content: cssReq(filename).default }));

const scssReq = require.context('!!raw-loader!../src', true, /.\.scss$/);
const scssTokenFiles = scssReq
  .keys()
  .map(filename => ({ filename, content: scssReq(filename).default }));

const svgIconsReq = require.context('!!raw-loader!../src', true, /.\.svg$/);
const svgIconTokenFiles = svgIconsReq
  .keys()
  .map(filename => ({ filename, content: svgIconsReq(filename).default }));

addDecorator(withKnobs);
addDecorator(withA11y);
addDecorator(PaddingDecorator);

const panelExclude = setConsoleOptions({}).panelExclude;
setConsoleOptions({
  panelExclude: [...panelExclude, /deprecated/],
});

addParameters({
  designToken: {
    files: {
      css: cssTokenFiles,
      scss: scssTokenFiles,
      svgIcons: svgIconTokenFiles
    }
  },
  options: {
    panelPosition: 'right',
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  backgrounds: [
    { name: 'white', value: '#ffffff', default: true },
    { name: 'gray', value: '#cccccc' },
    { name: 'twitter', value: '#00aced' },
    { name: 'facebook', value: '#3b5998' },
  ],
});