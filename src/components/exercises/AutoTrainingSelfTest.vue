<template>
<div class="at-self-container">
  <q-slider
    v-model="level"
    @input="onChangedInput"
    :min="minLvel"
    :max="maxLevel"
    :step="stepLevel"
    label-always
    :label-value="label"
    color="primary"
    snap
    markers >
    </q-slider>
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
  mounted () {
    this.onChangedInput()
  },
  methods: {
    onChangedInput () {
      this.$emit('exercies-action', {id: 'changed-atself', data: this.level})
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
.at-self-container {
  width: 60vw;
}
</style>
