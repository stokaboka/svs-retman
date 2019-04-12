<template>
  <div class="row">
    <q-select
      class="editor-filter_item"
      v-model="lang"
      :options="langs"
      @input="filterParamsChanged"
      stack-label="Язык"
    />
  </div>
</template>

<script>
export default {
  name: 'FilterStages',
  data () {
    return {
      lang: '',
      langs: [
        {label: 'RU', value: 'RU'},
        {label: 'EN', value: 'EN'},
        {label: 'DE', value: 'DE'},
        {label: 'FR', value: 'FR'}
      ]
    }
  },
  mounted () {
    this.lang = this.langs[1].value
    this.filterParamsChanged()
  },
  methods: {
    async filterParamsChanged () {
      const params = `/lang/${this.lang}`
      this.$emit('filter-params-changed', params)
    }
  }
}
</script>

<style scoped>
  .editor-filter_item {
    margin: 0.5rem 1rem;
  }
</style>
