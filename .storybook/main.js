const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.js'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    'storybook-design-token',
    '@storybook/addon-knobs/register',
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

    return config;
  },
};
