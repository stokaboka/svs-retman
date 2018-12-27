<template>
  <q-page padding>
    <step-stepper-component></step-stepper-component>

    <component
      v-bind:is="step.component"
      @fixStep="onFixStepListener"
      @fixPhase="onFixPhaseListener"
    ></component>

  </q-page>
</template>

<script>

import {createNamespacedHelpers} from 'vuex'
import StepStepperComponent from '../components/StepStepperComponent'
import TestSoundComponent from '../components/steps/TestSoundComponent'
import DescriptionMethodComponent from '../components/steps/DescriptionMethodComponent'
import MnemonicTestComponent from '../components/steps/MnemonicTestComponent'
const { mapState, mapGetters, mapActions } = createNamespacedHelpers('beginners')

export default {
  name: 'BeginnersPage',
  components: {
    TestSoundComponent,
    StepStepperComponent,
    DescriptionMethodComponent,
    MnemonicTestComponent},
  mounted () {
    this.getSteps()
      .then(() => {
        this.getPhasesByStep(this.step.id)
      })
      .catch(() => {})
    // this.resetSteps()
    // this.getPhasesByStep(this.step.id)
  },

  computed: {
    ...mapGetters(['steps', 'step', 'phases', 'phase', 'soundTestResult']),
    ...mapState([ 'error' ])
  },

  methods: {

    onFixStepListener (result) {
      this.fixStep(result)
      this.nextStep()

      if (this.step.complete) {
        this.testComplete()
      } else {
        this.playStep()
      }
    },

    onFixPhaseListener (result) {
      this.fixPhase(result)
      this.nextPhase()

      if (this.phase.complete) {
        this.nextStep()
      } else {
        this.playPhase()
      }
    },

    playStep () {
      console.log('playStep')
      this.getPhasesByStep(this.step.id)
    },

    playPhase () {
      console.log('playPhase')
    },

    testComplete () {
      console.log('testComplete')
    },

    ...mapActions(['getSteps', 'resetSteps', 'nextStep', 'nextPhase', 'fixStep', 'fixPhase', 'getPhasesByStep'])
  }

}
</script>

<style>
</style>
