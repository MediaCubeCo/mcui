# MediaCube UI

This design system based on [Storybook](https://storybook.js.org/) and [Storybook Design Token Addon](https://github.com/UX-and-I/storybook-design-token).
**Storybook** is an open source tool for developing UI components in isolation for React, Vue, and Angular. It makes building stunning UIs organized and efficient.

**Storybook** is a user interface development environment and playground for UI components. The tool enables developers to create components independently and showcase components interactively in an isolated development environment.

**Storybook** runs outside of the main app so users can develop UI components in isolation without worrying about app specific dependencies and requirements.

[![Screenshot](./public/preview.png)](https://storybook.js.org/)

## Project setup
```
yarn install
```

### Start design system
```
yarn start
```

### Lints and fixes files
```
yarn lint
```

### Run your unit tests
```
yarn test:unit
```

### Compiles and hot-reloads for development (see that vue-cli service also works)
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Usage

The [plugin](https://github.com/UX-and-I/storybook-design-token) tries to organize your tokens into token groups. You can annotate token groups by adding specific comment blocks to your stylesheets. Only annotated tokens will be listed by the plugin. The specified presenter is used to render examples of your tokens. See [Presenters](#presenters) for further information.

**CSS example:**

```css
/**
 * @tokens Colors
 * @presenter Color
 */

:root {
  --n0: #fff; /* Token Description */
  --n100: #fbfbfb;
  --n200: #edeeef;
  --n300: #e4e5e7;
  --primary: var(--n300);
}

/**
 * @tokens Border Radius
 * @presenter BorderRadius
 */

:root {
  --border-radius-m: 4px;
  --border-radius-l: 8px;
}
```

**SCSS example:**

```scss
/**
 * @tokens Colors
 * @presenter Color
 */

$n0: #fff; /* Token Description */
$n100: #fbfbfb;
$n200: #edeeef;
$n300: #e4e5e7;
$primary: $n300;

/**
 * @tokens Border Radius
 * @presenter BorderRadius
 */

$border-radius-m: 4px;
$border-radius-l: 8px;
```

**SVG example:**

```html
<?xml version="1.0" encoding="UTF-8"?>
<svg
  data-token-name="check"
  width="24px"
  height="24px"
  viewBox="0 0 24 24"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
>
  <path
    d="M9.35221912,16.3536125 L19.5004166,5.34255149 C19.9029667,4.90884428 20.5808871,4.88358644 21.0145944,5.28613652 C21.4483016,5.6886866 21.4735594,6.36660707 21.0710093,6.80031428 L10.1375155,18.6574532 C9.71359736,19.1141823 8.99084087,19.1141823 8.56692275,18.6574532 L3.28613652,12.890538 C2.88358644,12.4568308 2.90884428,11.7789103 3.34255149,11.3763602 C3.77625869,10.9738101 4.45417917,10.999068 4.85672925,11.4327752 L9.35221912,16.3536125 Z"
    fill="currentColor"
  ></path>
</svg>
```

Make sure to specify the `data-token-name` attribute.

## Presenters

Presenters are used to render examples for your design tokens. The following presenters are available:

- Animation
- BorderRadius
- Border
- Color
- Easing
- FontFamily
- FontSize
- FontWeight
- Gradient
- LineHeight
- Opacity
- Shadow
- Spacing
- Svg
