<template>
  <q-table
    :loading="loading"
    :separator="separator"
    :selection="selection"
    :selected.sync="selectedSecond"
    :title="title"
    :data="rows"
    :columns="columns"
    :visible-columns="tableVisibleColumns"
    :filter="filter"
    :row-key="key"
    :pagination.sync="paginationControl"
  >
    <q-tr slot="body" slot-scope="props" :props="props" @click.native="rowClick(props.row)">
      <q-td v-for="column in columns" :key="column.field" :props="props">
        {{ props.row[column.field] }}
        <q-popup-edit v-if="edit.update && column.update" v-model="props.row[column.field]" buttons :title="props.row[column.label]" @save="onEditRow(props.row)">
          <q-field count>
            <q-input v-model="props.row[column.field]" />
          </q-field>
        </q-popup-edit>
        <q-popup-edit v-if="edit.insert && column.insert" v-model="props.row[column.field]" buttons :title="props.row[column.label]" @save="onInsertRow(props.row)">
          <q-field count>
            <q-input v-model="props.row[column.field]" />
          </q-field>
        </q-popup-edit>
      </q-td>
    </q-tr>

    <template slot="top-left" slot-scope="props">
      <span class="table-title">{{title}}</span>
      <q-search
        hide-underline
        color="secondary"
        v-model="filter"
        class="col-6"
      />
    </template>
    <template slot="top-right" slot-scope="props">
      <q-table-columns
        color="secondary"
        class="q-mr-sm"
        v-model="tableVisibleColumns"
        :columns="columns"
      />
      <q-select
        color="secondary"
        v-model="separator"
        :options="[
          { label: 'Horizontal', value: 'horizontal' },
          { label: 'Vertical', value: 'vertical' },
          { label: 'Cell', value: 'cell' },
          { label: 'None', value: 'none' }
        ]"
        hide-underline
      />
    </template>
  </q-table>
</template>

<script>

import {mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  name: 'EditableDataTable',
  props: {
    selection: {
      type: String,
      default () {
        return 'none'
      }
    },
    model: {
      type: Object,
      default () {
        return {
          title: '',
          suffix: '',
          columns: []
        }
      },
      required: true
    },
    params: {
      type: String,
      default () {
        return ''
      },
      required: false
    }
  },
  data () {
    return {
      filter: '',
      separator: 'cell',
      tableVisibleColumns: [],
      rows: [],
      paginationControl: { rowsPerPage: 10, page: 1 },
      selectedSecond: []
    }
  },
  mounted () {
    this.init(this.model)
  },
  computed: {
    ...mapGetters('editor', ['title', 'columns', 'visibleColumns', 'data', 'result', 'error', 'loading', 'edit', 'key'])
  },
  methods: {
    init (model) {
      this.setModel(model)
      this.tableVisibleColumns = this.visibleColumns
    },
    rowClick (row) {
      this.$emit('table-row-click', row)
    },
    onInsertRow (row) {

    },
    async onEditRow (row) {
      const data = Object.assign({}, row)
      console.log('data', data)
      const result = await this.update(data)
      console.log('result', result)
    },
    ...mapMutations('editor', {setModel: 'SET_MODEL'}),
    ...mapActions('editor', ['load', 'insert', 'update', 'delete'])
  },
  watch: {
    model (val) {
      this.init(val)
    },
    async params (val) {
      await this.load(val)
    },
    data (val) {
      this.rows = val.map(e => Object.assign({}, e))
    }
  }
}
</script>

<style scoped>
  .table-title {
    margin-right: 1rem;
  }

  .q-table th {
    padding: 6px 12px;
  }
  .q-table tbody td {
    height: auto;
  }
  .q-table td {
    padding: 6px 12px;
  }
</style>
