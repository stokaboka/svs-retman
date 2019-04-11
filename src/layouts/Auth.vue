<template>
  <q-page class="page-container">
    <div class="box-container">
      <router-view />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'auth'
}
</script>

<style scoped>
  .page-container {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }

  .box-container {
      min-width: 50vw;

      border: lightgray 1px solid;
      border-radius: 3px;
      overflow: hidden;

      background-color: white;
      box-shadow: 1px 1px 6px 1px rgba(0, 0, 0, .2);

      margin: 1rem 0 0 0;
  }
</style>
