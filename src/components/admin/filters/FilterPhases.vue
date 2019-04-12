<template>
  <div class="row">
    <q-select
      class="editor-filter_item"
      v-model="step"
      :options="vsteps"
      @input="filterParamsChanged"
      stack-label="Шаг теста"
    />
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'FilterPhases',
  data () {
    return {
      step: ''
    }
  },
  async mounted () {
    await this.getSteps()
    this.step = this.vsteps[0].value
    this.filterParamsChanged()
  },
  computed: {
    vsteps () {
      return this.steps.map(e => {
        return {label: `${e.id} ${e.title}`, value: e.id}
      })
    },
    ...mapGetters('beginners', ['steps'])
  },
  methods: {
    ...mapActions('beginners', ['getSteps', 'resetSteps']),
    async filterParamsChanged () {
      const params = `/step/${this.step}`
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
