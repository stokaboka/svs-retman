<template>
  <q-stepper v-if="steps" ref="stepper" contractable alternative-labels>
    <q-step
      v-for="stp in steps"
      active-icon="play_arrow"
      :title="stp.title"
      :key="stp.id"
      :name="stp.id"
      :order="stp.id"
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
      if (val) {
        this.$refs.stepper.goToStep(val.id)
      }
    }
  }
}
</script>

<style>
  .q-stepper-step-inner {
    display: none;
  }
</style>
