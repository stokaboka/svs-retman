<template>
  <q-page class="container page-container">
    <div class="row">
      <span>{{model.title}}</span>
    </div>
    <component
      v-if="filterComponent"
      :is="filterComponent"
      @filter-params-changed="onFilterParamsChanged">
    </component>
    <editable-data-table
      title="Словари"
      :model="model"
      :params="params"
      :selection="selection"
      :srow="srow"
      @table-row-click="onTableRowClick"
    >
    </editable-data-table>
  </q-page>
</template>

<script>

import EditableDataTable from '../../components/admin/table/EditableDataTable'
import FilterDictionary from '../../components/admin/filters/FilterDictionary'
import FilterPhases from '../../components/admin/filters/FilterPhases'

import FilterCues from '../../components/admin/filters/FilterCues'
import FilterStages from '../../components/admin/filters/FilterStages'
import FilterSteps from '../../components/admin/filters/FilterSteps'

import FilterUsers from '../../components/admin/filters/FilterUsers'

export default {
  name: 'Editor',
  components: {
    EditableDataTable,
    FilterDictionary,
    FilterPhases,
    FilterCues,
    FilterStages,
    FilterSteps,
    FilterUsers
  },
  props: {
    srow: {
      type: Object,
      default () {
        return null
      }
    },
    selection: {
      type: String,
      default () {
        return 'single'
      }
    },
    module: {
      type: String,
      required: true
    },
    filter: {
      type: String,
      default () {
        return ''
      },
      required: false
    }
  },
  data () {
    return {
      params: null
    }
  },
  mounted () {
    // console.log('Editor mounted', this.filter)
    if (this.filter) {
      this.setFilterParams(this.filter)
    }
  },
  computed: {
    model () {
      return this.$store.getters[`${this.module}/model`]
    },
    filterComponent () {
      return this.$store.getters[`${this.module}/filter`]
    }
  },
  methods: {
    onTableRowClick (row) {
      this.$emit('table-row-click', row)
    },
    onFilterParamsChanged (params) {
      this.setFilterParams(params)
    },
    setFilterParams (params) {
      this.params = params
    }
  },
  watch: {
    filter (val) {
      // console.log('Editor', val)
      this.setFilterParams(val)
    }
  }
}
</script>

<style scoped>
  .page-container {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;

    min-height: auto;

    padding: 0.5rem 3rem;
  }

</style>
