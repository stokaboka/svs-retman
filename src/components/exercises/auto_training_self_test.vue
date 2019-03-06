<template>
<div>
  <q-slider
    v-model="level"
    @input="emit('changed-self-rating', level)"
    :min="minLvel"
    :max="maxLevel"
    :step="stepLevel"
    label-always
    :label-value="label"
    color="primary"
    snap
    markers />
</div>
</template>

<script>
export default {
  name: 'AutoTrainingSelfTest',
  data () {
    return {
      level: 4,
      minLvel: 1,
      maxLevel: 7,
      stepLevel: 1,
      levels: [
        'Умер',
        'Отвратительное',
        'Плохое',
        'Ниже среднего',
        'Нормальное',
        'Отличное',
        'Великолепное',
        'Готов двигать горы'
      ]
    }
  },
  computed: {
    label () {
      return this.levels[this.level]
    }
  }
}
</script>

<style scoped>

</style>
