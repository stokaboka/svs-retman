<template>
  <q-table
    :loading="loading"
    :separator="separator"
    :title="title"
    :data="rows"
    :columns="columns"
    :visible-columns="visibleColumns"
    :filter="filter"
    row-key="id"
  >
    <q-tr slot="body" slot-scope="props" :props="props">
      <q-td v-for="column in columns" :key="column.field" :props="props">
        {{ props.row[column.field] }}
        <q-popup-edit v-model="props.row[column.field]" buttons :title="props.row[column.label]" @save="onSave(props.row)">
          <q-field count>
            <q-input v-model="props.row[column.field]" />
          </q-field>
        </q-popup-edit>
      </q-td>
    </q-tr>

    <template slot="top-left" slot-scope="props">
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
        v-model="visibleColumns"
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
export default {
  name: 'EditableDataTable',
  props: {
    loading: false,
    title: {
      type: String,
      default () {
        return ''
      },
      required: false
    },
    data: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    showcolumns: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      filter: '',
      separator: 'horizontal',
      // visibleColumns: ['word1', 'word2', 'lang1', 'lang2'],
      visibleColumns: [],
      rows: []
    }
  },
  mounted () {
    this.visibleColumns = this.showcolumns.map(e => e)
  },
  methods: {
    onSave (row) {
      const data = Object.assign({}, row)
      console.log(data)
      this.$emit('on-row-update', data)
    }
  },
  watch: {
    data (val) {
      this.rows = val.map(e => Object.assign({}, e))
    },
    showcolumns (val) {
      if (val) {
        this.visibleColumns = val.map(e => e)
      } else {
        this.visibleColumns = []
      }
      console.log('visibleColumns', this.visibleColumns)
    }
  }
}
</script>

<style scoped>

</style>
