<template>
  <div class="row">
    <q-select
      class="editor-filter_item"
      v-model="file"
      :options="files"
      @input="filterParamsChanged"
      stack-label="Файлы"
    />
  </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  name: 'FilterCues',
  data () {
    return {
      file: '',
      files: [
        {label: '?', value: ''}
      ]
    }
  },
  async mounted () {
    const data = await this.getAllLessons()
    if (data) {
      this.files = data.map(e => {
        return {label: e.sound, value: e.sound}
      })
      this.file = this.files[0].value
      this.filterParamsChanged()
    }
  },
  methods: {
    async filterParamsChanged () {
      const params = `/file/${this.file}`
      this.$emit('filter-params-changed', params)
    },
    ...mapActions('beginners', ['getAllLessons'])
  }
}
</script>

<style scoped>
  .editor-filter_item {
    margin: 0.5rem 1rem;
  }
</style>
