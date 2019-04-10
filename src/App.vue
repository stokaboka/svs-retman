<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
  body {
    font-family: 'Ubuntu', sans-serif;
  }

  #q-app {
    background-color: #fff;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0.5rem 1rem;
  }

  .container {
    padding: 0 0;
  }

  .component-container {
    margin: 1rem 1rem;
  }

  .button__delete-variant {
    height: 30px;
    margin-top: -4px;
    padding: 0 3px;
  }

  .left-word2-container {
    width: 30px;
    height: 26px;
    overflow: hidden;
  }

  q {
    quotes: "\00ab" "\00bb";
  }

</style>
