import '../src/styles/main.scss'

import { addDecorator, addParameters } from '@storybook/vue';
import { PaddingDecorator } from './decorators';
import { themes } from '@storybook/theming';
import { withKnobs } from '@storybook/addon-knobs';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

const cssReq = require.context('!!raw-loader!../src', true, /.\.css$/);
const cssTokenFiles = cssReq
  .keys()
  .map(filename => ({ filename, content: cssReq(filename).default }));

const scssReq = require.context('!!raw-loader!../src', true, /.\.scss$/);
const scssTokenFiles = scssReq
  .keys()
  .map(filename => ({ filename, content: scssReq(filename).default }));

// const lessReq = require.context('!!raw-loader!../src', true, /.\.less$/);
// const lessTokenFiles = lessReq
//   .keys()
//   .map(filename => ({ filename, content: lessReq(filename).default }));

const svgIconsReq = require.context('!!raw-loader!../src', true, /.\.svg$/);
const svgIconTokenFiles = svgIconsReq
  .keys()
  .map(filename => ({ filename, content: svgIconsReq(filename).default }));

addDecorator(withKnobs);
addDecorator(PaddingDecorator);

addParameters({
  designToken: {
    files: {
      css: cssTokenFiles,
      scss: scssTokenFiles,
      // less: lessTokenFiles,
      svgIcons: svgIconTokenFiles
    }
  },
  options: {
    panelPosition: 'right',
    theme: themes.normal,
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    // defaultViewport: 'someDefault',
  },
  backgrounds: [
    { name: 'white', value: '#ffffff', default: true },
    { name: 'gray', value: '#cccccc' },
    { name: 'twitter', value: '#00aced' },
    { name: 'facebook', value: '#3b5998' },
  ],
});