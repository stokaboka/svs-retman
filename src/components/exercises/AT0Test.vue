<template>
<div> AT-0 Under construction</div>
</template>

<script>
export default {
  name: 'AT0Test',
  mounted () {
    this.onChangedInput()
  },
  methods: {
    onChangedInput () {
      const data = {s: 0, a: 0, n: 0}
      this.$emit('exercies-action', {id: 'changed-at0', data})
    }
  }
}
</script>

<style scoped>

</style>
