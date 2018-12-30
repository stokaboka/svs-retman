<template>
  <q-page padding>
    <step-stepper-component></step-stepper-component>

    <component
      v-bind:is="step.component"
      ref="testComponent"
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
    this.resetSteps()
    this.getSteps()
      .then(() => {
        this.playStep()
      })
      .catch(() => {})
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
        // ?????
      } else {
        this.playPhase()
      }
    },

    playStep () {
      console.log('playStep')
      this.getPhasesByStep(this.step.id)
        .then(() => {
          this.$refs.testComponent.start()
        })
        .catch(() => {})
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
