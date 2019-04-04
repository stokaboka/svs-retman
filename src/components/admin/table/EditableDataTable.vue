<template>
  <q-table
    :title="title"
    :data="data"
    :columns="columns"
    row-key="name"
  />
</template>

<script>
export default {
  name: 'EditableDataTable',
  props: {
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
    }
  }
}
</script>

<style scoped>

</style>
