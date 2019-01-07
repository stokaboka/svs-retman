<template>
  <q-stepper v-if="steps" ref="stepper" contractable alternative-labels>
    <q-step
      v-for="step in steps"
      active-icon="play_arrow"
      :title="step.title"
      :key="step.id"
      :name="step.id"
      :order="step.id"
    >
    </q-step>
  </q-stepper>
</template>

<script>

import {createNamespacedHelpers} from 'vuex'
const { mapState, mapGetters, mapActions } = createNamespacedHelpers('beginners')

export default {
  name: 'StepStepperComponent',

  data () {
    return {}
  },

  computed: {
    ...mapGetters(['steps', 'step']),
    ...mapState([ 'error' ])
  },

  methods: {
    ...mapActions(['getSteps', 'gotoStep'])
  },

  watch: {
    step (val, oldVal) {
      this.$refs.stepper.goToStep(val.id)
    }
  }
}
</script>

<style>
  .q-stepper-step-inner {
    display: none;
  }
</style>
