<template>
  <q-page padding>
    <step-stepper-component></step-stepper-component>
  </q-page>
</template>

<script>

import {createNamespacedHelpers} from 'vuex'
import StepStepperComponent from '../components/StepStepperComponent'
const { mapState, mapGetters, mapActions } = createNamespacedHelpers('beginners')

export default {
  name: 'BeginnersPage',
  components: {StepStepperComponent},
  // mounted () {
  //   this.getSteps()
  // },

  computed: {
    ...mapGetters(['steps', 'step']),
    ...mapState([ 'error' ])
  },

  methods: {
    ...mapActions(['getSteps'])
  }

}
</script>

<style>
</style>
