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
    >
    </editable-data-table>
  </q-page>
</template>

<script>

import EditableDataTable from '../../components/admin/table/EditableDataTable'
import FilterDictionary from '../../components/admin/filters/FilterDictionary'
import FilterPhases from '../../components/admin/filters/FilterPhases'

export default {
  name: 'Editor',
  components: {
    EditableDataTable,
    FilterDictionary,
    FilterPhases
  },
  props: {
    module: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      params: null
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
    async onFilterParamsChanged (params) {
      this.params = params
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

</style>
