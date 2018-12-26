<template>
  <q-page padding>
    <step-stepper-component></step-stepper-component>

    <test-sound-component v-if="step.id === 1">
    </test-sound-component>

  </q-page>
</template>

<script>

import {createNamespacedHelpers} from 'vuex'
import StepStepperComponent from '../components/StepStepperComponent'
import TestSoundComponent from '../components/steps/TestSoundComponent'
const { mapState, mapGetters, mapActions } = createNamespacedHelpers('beginners')

export default {
  name: 'BeginnersPage',
  components: {TestSoundComponent, StepStepperComponent},
  mounted () {
    this.$root.$on('stepChanged', this.onStepChanged)
    this.$root.$on('doNextStep', this.onDoNextStep)
    this.$root.$on('phaseChanged', this.onPhaseChanged)
  },

  computed: {
    ...mapGetters(['steps', 'step']),
    ...mapState([ 'error' ])
  },

  methods: {
    onDoNextStep (result) {
      console.log('doNextStep')
    },
    onStepChanged () {

    },
    onPhaseChanged () {

    },
    ...mapActions(['getSteps'])
  }

}
</script>

<style>
</style>
