<template>
  <div id="app">
    <img alt="MediaCube logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "./elements/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld
  }
};
</script>

<style>
  body,
  html {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  #app {
    height: 100%;
  }
</style>
