<template>
  <q-page class="page-container">
      <router-view />
  </q-page>
</template>

<script>
export default {
  name: 'Editor'
}
</script>

<style scoped>
  .page-container {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }
</style>
