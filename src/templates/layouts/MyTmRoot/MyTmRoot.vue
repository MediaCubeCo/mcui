<template>
    <div class="my-tm-root">
        <slot />
    </div>
</template>

<script>
  import "normalize.css/normalize.css"

  /**
   * Это обязательный компонент, с него начинается любой layout,
   * т.к. здесь находятся глобальные стили.
   */
  export default {
    name: "MyTmRoot",
  }
</script>

<style lang="scss">
html {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -ms-overflow-style: scrollbar;
    -ms-text-size-adjust: 100%;
    min-height: 100%;
    font-size: $font-size-m;
}

body {
    overflow-y: hidden;
}

body,
#__nuxt,
#__layout,
.my-tm-root { //todo: заменить название класса
    display: flex;
    flex-direction: column;
    min-height: 100%;
}

*,
*:before,
*:after {
    box-sizing: inherit;
}

body {
    background-color: $color-white;
    margin: 0;
    overflow-y: auto;
    word-break: break-word;

    font-family: $font-family-heading;
    font-size: $font-size-m;
    line-height: $line-height-s;
    color: $color-black;
}

[tabindex="-1"]:focus {
    outline: none !important;
}

[role="button"] {
    cursor: pointer;
}

input[type="search"] {
    -webkit-appearance: textfield;
}

a,
button,
[role="button"],
input,
label,
select,
textarea {
    touch-action: manipulation;
    margin: 0;
}

button,
input {
    overflow: visible;
    text-transform: none;
}

button,
html [type="button"],
[type="reset"],
[type="submit"] {
    -webkit-appearance: button;
}

button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
    padding: 0;
    border-style: none;
}

input[type="date"],
input[type="time"],
input[type="datetime-local"],
input[type="month"] {
    -webkit-appearance: listbox;
}

textarea {
    overflow: auto;
    resize: vertical;
}

svg {
    fill: currentColor;

    a &,
    button & {
        pointer-events: none;
    }

    &:not(:root) {
        overflow: hidden;
    }
}

img {
    max-width: 100%;
    height: auto;
}

a {
    background-color: transparent;
    text-decoration-skip-ink: auto;
    transition: color $duration-s;
}

::selection {
    background: fade-out($color-blue, 0);
    color: $color-white;
}

::-moz-selection {
    background: fade-out($color-blue, 0);
    color: $color-white;
}

button {
    -webkit-appearance: none;
}

a,
button {
    outline: none;

    &:focus {
        outline: none;
    }
}

hr {
    box-sizing: content-box;
    overflow: visible;
}

pre {
    font-size: 0.7em;
}

.my-tm-root {
    $block-name: &;
}
</style>