<template>
  <q-page class="container page-container">
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
      :loading="loading"
      :data="data"
      :columns="columns"
      :showcolumns="showColumns"
      @on-row-update="onRowUpdate"
    >
    </editable-data-table>
  </q-page>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import EditableDataTable from '../../components/admin/table/EditableDataTable'

export default {
  name: 'DictionaryEditor',
  components: {EditableDataTable},
  data () {
    return {
      loading: false,
      scope: '',
      lang1: '',
      lang2: '',
      showColumns: ['word1', 'word2'],
      scopes: [
        {label: 'Мнемонический тест', value: 'mnemic::test'},
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
  computed: {
    ...mapGetters('beginners', {data: 'dictionary'}),
    ...mapGetters('editor', {columns: 'dictionaryColumns'})
  },
  methods: {
    async getData () {
      this.loading = true
      const {scope, lang1, lang2} = this
      await this.getDictionary({scope, lang1, lang2})
      this.loading = false
    },
    onRowUpdate (row) {
      console.log(row)
      console.log('Сохранение отключено')
      // this.updateDictionary(row)
    },
    ...mapActions('beginners', ['getDictionary']),
    ...mapActions('editor', ['updateDictionary'])
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
