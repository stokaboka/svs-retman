<template>
  <q-page padding>
    <q-collapsible icon="explore" label="Шаги тестирования" v-model="stepperVisibleComputed">
      <step-stepper-component>
      </step-stepper-component>
    </q-collapsible>

    <h5 v-if="step">{{step.title}}</h5>

    <component
      v-if="step"
      class="component-container"
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
import SelfRatingComponent from '../components/steps/SelfRatingComponent'
import LexicalLearningLangComponent from '../components/steps/LexicalLearningLangComponent'
import AutoTrainingComponent from '../components/steps/AutoTrainingComponent'
const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('beginners')

export default {
  name: 'BeginnersPage',
  components: {
    TestSoundComponent,
    StepStepperComponent,
    DescriptionMethodComponent,
    MnemonicTestComponent,
    SelfRatingComponent,
    LexicalLearningLangComponent,
    AutoTrainingComponent},
  mounted () {
    this.resetSteps()
    this.getSteps()
      .then(() => {
        this.gotoStep(0)
        this.playStep()
      })
      .catch(() => {})
  },

  computed: {
    stepperVisibleComputed: {
      get () { return this.stepperVisible },
      set (value) { this.setStepperVisible(value) }
    },
    ...mapGetters(['steps', 'step', 'phases', 'phase', 'soundTestResult', 'stepperVisible']),
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

    ...mapMutations(['setStepperVisible']),
    ...mapActions(['getSteps', 'resetSteps', 'nextStep', 'nextPhase', 'fixStep', 'fixPhase', 'getPhasesByStep', 'gotoStep'])
  }

}
</script>

<style>
  .step-stepper_layout {
    max-width: 720px;
  }
</style>
