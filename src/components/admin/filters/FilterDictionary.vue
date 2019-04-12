<template>
  <div class="row">
    <q-select
      class="editor-filter_item"
      v-model="lang1"
      :options="langs"
      @input="filterParamsChanged"
      stack-label="Язык 1"
    />
    <q-select
      class="editor-filter_item"
      v-model="lang2"
      :options="langs"
      @input="filterParamsChanged"
      stack-label="Язык 2"
    />
    <q-select
      class="editor-filter_item"
      v-model="scope"
      :options="scopes"
      @input="filterParamsChanged"
      stack-label="Тест"
    />
  </div>
</template>

<script>
export default {
  name: 'FilterDictionary',
  data () {
    return {
      scope: '',
      lang1: '',
      lang2: '',
      scopes: [
        {label: 'Мнемический тест', value: 'mnemic::test'},
        {label: 'Урок 1', value: 'test::lesson::1'},
        {label: 'Урок 2', value: 'test::lesson::2'},
        {label: 'Урок 3', value: 'test::lesson::3'},
        {label: 'Урок 4', value: 'test::lesson::4'},
        {label: 'Лексика 1', value: 'vocabulary::learn'},
        {label: 'Лексика 2', value: 'vocabulary::test'}
      ],
      langs: [
        {label: 'RU', value: 'RU'},
        {label: 'EN', value: 'EN'},
        {label: 'DE', value: 'DE'},
        {label: 'FR', value: 'FR'}
      ]
    }
  },
  mounted () {
    this.scope = this.scopes[0].value
    this.lang1 = this.langs[0].value
    this.lang2 = this.langs[0].value
    this.filterParamsChanged()
  },
  methods: {
    async filterParamsChanged () {
      const {scope, lang1, lang2} = this
      const params = `/scope/${scope}/lang1/${lang1}/lang2/${lang2}`
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
