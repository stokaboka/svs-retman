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
  #q-app {
    background-color: #fff;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0.5rem 1rem;
  }

  .container {
    padding: 0 6rem;
  }

  .component-container {
    margin: 1rem 1rem;
  }

  .button__delete-variant {
    padding-left: 3px;
  }

</style>
