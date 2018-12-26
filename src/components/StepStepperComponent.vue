<template>
  <q-stepper ref="stepper" contractable>
    <q-step
      v-for="s in steps"
      :key="s.id"
      :name="s.id"
      :title="s.title"
      :order="s.id"
    >
    </q-step>
  </q-stepper>
</template>

<script>

import {createNamespacedHelpers} from 'vuex'
const { mapState, mapGetters, mapActions } = createNamespacedHelpers('beginners')

export default {
  name: 'StepStepperComponent',

  mounted () {
    this.getSteps()
  },

  data () {
    return {}
  },

  computed: {
    ...mapGetters(['steps', 'step']),
    ...mapState([ 'error' ])
  },

  methods: {
    ...mapActions(['getSteps'])
  },

  watch: {
    step (val, oldVal) {
      this.$refs.stepper.goToStep(val.id)
    }
  }
}
</script>

<style>
</style>
