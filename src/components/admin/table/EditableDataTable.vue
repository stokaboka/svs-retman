<template>
  <q-table
    :loading="loading"
    :separator="separator"
    :selection="selection"
    :selected.sync="selected"
    :title="title"
    :data="rows"
    :columns="columns"
    :visible-columns="tableVisibleColumns"
    :filter="filter"
    row-key="id"
    :pagination.sync="paginationControl"
    @request="request"
  >
    <q-tr slot="body" slot-scope="props" :props="props" @click.native="rowClick(props.row)">
      <q-td auto-width>
        <q-checkbox dense v-model="props.selected" @input="rowMark()"></q-checkbox>
      </q-td>
      <q-td v-for="column in columns" :key="column.field" :props="props">
        {{format(props.row[column.field], column)}}
        <q-popup-edit v-if="edit.update && column.update" v-model="props.row[column.field]" buttons :title="props.row[column.label]" @save="onEditRow(props.row)">
          <q-field count>
            <q-input v-model="props.row[column.field]"></q-input>
          </q-field>
        </q-popup-edit>
        <q-popup-edit v-if="edit.insert && column.insert" v-model="props.row[column.field]" buttons :title="props.row[column.label]" @save="onInsertRow(props.row)">
          <q-field count>
            <q-input v-model="props.row[column.field]"></q-input>
          </q-field>
        </q-popup-edit>
      </q-td>
    </q-tr>

    <template slot="top-left" slot-scope="props">
      <q-search
        hide-underline
        color="secondary"
        v-model="filter"
        class="col-6"></q-search>
    </template>
    <template slot="top-right" slot-scope="props">
      <q-table-columns
        :columns="columns"
        class="q-mr-sm"
        color="secondary"
        v-model="tableVisibleColumns">
      </q-table-columns>
      <q-select
        :options="[
          { label: 'Horizontal', value: 'horizontal' },
          { label: 'Vertical', value: 'vertical' },
          { label: 'Cell', value: 'cell' },
          { label: 'None', value: 'none' }
        ]"
        color="secondary"
        hide-underline
        v-model="separator"></q-select>
    </template>
  </q-table>
</template>

<script>
//  <!--    :selected.sync="selectedSecond"-->
// <span class="table-title">{{title}}</span>
import {mapGetters, mapMutations, mapActions} from 'vuex'
import {toDDMMYYYY} from '../../../lib/utils'

export default {
  name: 'EditableDataTable',
  props: {
    selection: {
      type: String,
      default () {
        return 'single'
      }
    },
    srow: {
      type: Object,
      default () {
        return null
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
      paginationControl: {
        sortBy: null, // String, column "name" property value
        descending: false,
        rowsPerPage: 10,
        page: 1,
        rowsNumber: 0
      },
      selected: [],
      loadedParams: '*'
    }
  },
  mounted () {
    if (this.srow) {
      this.selected = [this.srow]
    }

    this.init(this.model)
    if (!this.filterComponent) {
      this.request({
        pagination: this.paginationControl,
        filter: this.filter
      })
    }
  },
  computed: {
    ...mapGetters('editor', ['title', 'columns', 'visibleColumns', 'data', 'query', 'result', 'error', 'loading', 'edit', 'key', 'pagination', 'rowsNumber', 'filterComponent'])
  },
  methods: {
    init (model) {
      this.setModel(model)
      this.tableVisibleColumns = this.visibleColumns
    },
    rowClick (row) {
      this.$emit('table-row-click', row)
      this.selected = [row]
    },
    onInsertRow (row) {
    },
    rowMark () {
      if (this.selected.length > 0) {
        this.$emit('table-row-click', this.selected[0])
      } else {
        this.$emit('table-row-click', null)
      }
    },
    async onEditRow (row) {
      const data = Object.assign({}, row)
      // console.log('data', data)
      const result = await this.update(data)
      console.log('result', result)
    },
    format (value, column) {
      if (column.mask) {
        switch (column.mask) {
          case 'DD-MM-YYYY':
            return toDDMMYYYY(value)
          default:
            return value
        }
      } else {
        return value
      }
    },

    async request ({ pagination, filter }) {
      let query = ''

      if (this.query || this.loadedParams !== this.params) {
        if (this.query) {
          let ap = []

          if (pagination.rowsPerPage > 0) {
            ap.push(`page=${pagination.page}`)
            ap.push(`limit=${pagination.rowsPerPage}`)
          }

          if (pagination.sortBy) {
            ap.push(`sortBy=${pagination.sortBy}`)
            ap.push(`descending=${pagination.descending}`)
          }

          if (filter) {
            ap.push(`filter=${filter}`)
          }

          if (ap.length > 0) {
            query = `?${ap.join('&')}`
          }
        } else {
          pagination.rowsPerPage = 0
        }

        await this.load(`${this.params || ''}${query}`)

        this.loadedParams = this.params
      }

      pagination.rowsNumber = this.rowsNumber

      this.paginationControl = pagination
    },
    ...mapMutations('editor', {setModel: 'SET_MODEL'}),
    ...mapActions('editor', ['load', 'insert', 'update', 'delete'])
  },
  watch: {
    model (val) {
      this.init(val)
    },
    params (val) {
      this.request({
        pagination: this.paginationControl,
        filter: this.filter
      })
    },
    data (val) {
      this.rows = val.map(e => Object.assign({}, e))
      // if (this.rows && this.rows.length > 0) {
      //   // this.selected = [this.rows[0]]
      //   this.selected = []
      // } else {
      //   this.selected = []
      // }
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
