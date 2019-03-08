<template>
<div>
  <q-slider
    v-model="level"
    @input="$emit('changed-atself', level)"
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
import {createNamespacedHelpers} from 'vuex'
const { mapGetters } = createNamespacedHelpers('beginners')

export default {
  name: 'AutoTrainingSelfTest',
  data () {
    return {
      level: 4,
      minLvel: 1,
      maxLevel: 7,
      stepLevel: 1
    }
  },
  computed: {
    label () {
      return this.atLevels[this.level]
    },
    ...mapGetters(['atLevels'])
  }
}
</script>

<style scoped>

</style>
