<template>
  <q-table
    :loading="loading"
    :separator="separator"
    :title="title"
    :data="rows"
    :columns="columns"
    :visible-columns="tableVisibleColumns"
    :filter="filter"
    :row-key="key"
    :pagination.sync="paginationControl"
  >
    <q-tr slot="body" slot-scope="props" :props="props">
      <q-td v-for="column in columns" :key="column.field" :props="props">
        {{ props.row[column.field] }}
        <q-popup-edit v-if="edit.insert || edit.update" v-model="props.row[column.field]" buttons :title="props.row[column.label]" @save="onEditRow(props.row)">
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
      paginationControl: { rowsPerPage: 10, page: 1 }
    }
  },
  async mounted () {
    this.setModel(this.model)
    this.tableVisibleColumns = this.visibleColumns
  },
  computed: {
    ...mapGetters('editor', ['title', 'columns', 'visibleColumns', 'data', 'result', 'error', 'loading', 'edit', 'key'])
  },
  methods: {
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
