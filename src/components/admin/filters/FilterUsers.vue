<template>
  <div class="row editor-filter_container">
    <q-field
      icon="person_outline"
      icon-color="primary"
    >
      <q-input
        v-model="search"
        name="search"
        @keyup.enter="filterParamsChanged"
        float-label="Поиск">
      </q-input>
    </q-field>
    <q-btn @click="filterParamsChanged" color="primary" class="btn-search">Найти</q-btn>
  </div>
</template>

<script>
export default {
  name: 'FilterUsers',
  data () {
    return {
      search: ''
    }
  },
  mounted () {
    this.filterParamsChanged()
  },
  methods: {
    async filterParamsChanged () {
      const params = `/${this.search}`
      this.$emit('filter-params-changed', params)
    }
  }
}
</script>

<style scoped>
  .editor-filter_container {
    padding: 0.5rem 1rem;
  }

  .btn-search {
    margin: 0.5rem 1rem;
  }
</style>
