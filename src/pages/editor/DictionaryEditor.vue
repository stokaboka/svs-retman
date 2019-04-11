<template>
  <q-page class="container page-container">
    <div class="row">
      <span>{{model.title}}</span>
    </div>
    <div class="row">
      <q-select
        class="editor-filter_item"
        v-model="lang1"
        :options="langs"
        @input="getData"
        stack-label="Язык 1"
      />
      <q-select
        class="editor-filter_item"
        v-model="lang2"
        :options="langs"
        @input="getData"
        stack-label="Язык 2"
      />
      <q-select
        class="editor-filter_item"
        v-model="scope"
        :options="scopes"
        @input="getData"
        stack-label="Тест / урок"
      />
    </div>
    <editable-data-table
      title="Словари"
      :model="model"
      :params="params"
    >
    </editable-data-table>
  </q-page>
</template>

<script>

import EditableDataTable from '../../components/admin/table/EditableDataTable'

export default {
  name: 'DictionaryEditor',
  components: {EditableDataTable},
  data () {
    return {
      scope: '',
      lang1: '',
      lang2: '',
      model: {
        title: 'Словарь',
        suffix: 'words',
        key: 'id',
        edit: {
          insert: false,
          update: true,
          delete: false
        },
        columns: [
          { name: 'id', field: 'id', label: 'id', sortable: true, visible: false, update: false, insert: true },
          { name: 'word1', field: 'word1', label: 'Слово/фраза 1', sortable: true, visible: true, update: true, insert: true },
          { name: 'word2', field: 'word2', label: 'Слово/фраза 2', sortable: true, visible: true, update: true, insert: true },
          { name: 'lang1', field: 'lang1', label: 'Язык родной', sortable: true, visible: false, update: false, insert: true },
          { name: 'lang2', field: 'lang2', label: 'Язык обучения', sortable: true, visible: false, update: false, insert: true },
          { name: 'scope', field: 'scope', label: 'Тест', sortable: true, visible: false, update: false, insert: true }
        ]
      },
      params: null,
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
    this.getData()
  },
  methods: {
    async getData () {
      const {scope, lang1, lang2} = this
      this.params = `/scope/${scope}/lang1/${lang1}/lang2/${lang2}`
    }
  }
}
</script>

<style scoped>
  .page-container {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;

    padding: 0.5rem 3rem;
  }

  .editor-filter_item {
    margin: 0.5rem 1rem;
  }

</style>
