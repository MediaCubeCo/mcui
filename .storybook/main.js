const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.js'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    'storybook-design-token',
    '@storybook/addon-knobs/register',
    '@storybook/addon-storysource',
    '@storybook/addon-docs',
    '@storybook/addon-viewport/register',
    '@storybook/addon-backgrounds/register',
    'storybook-addon-designs',
    '@storybook/addon-a11y/register',
  ],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader',
        {
          loader: 'sass-resources-loader',
          options: {
            resources: './src/styles/main.scss',
          },
        },
      ],
      include: path.resolve(__dirname, '../'),
    });

    config.module.rules.push({
      test: /\.stories\.jsx?$/,
      loaders: [
        {
          loader: require.resolve('@storybook/source-loader'),
          options: {
            prettierConfig: {
              printWidth: 100,
              singleQuote: false,
            },
          },
        },
      ],
      enforce: 'pre',
    });

    return config;
  },
};
