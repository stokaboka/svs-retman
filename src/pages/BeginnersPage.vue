<template>
  <q-page padding>

    <q-collapsible icon="explore" label="Шаги тестирования" v-model="stepperVisibleComputed">
      <step-stepper-component>
      </step-stepper-component>
    </q-collapsible>

    <h5 v-if="step">{{step.title}}</h5>

    <section v-if="phase">
      <div>
        <h6>{{phase.title}}</h6>
        <div v-html="phase.text"></div>
      </div>

      <time-progress
        v-if="timer.active"
        :timer="timer">
      </time-progress>

      <component
        v-if="phase.component"
        class="component-container"
        :is="phase.component"
        :dictionary="dictionary"
        :timer="timer"
        ref="phaseComponent"
        @fix-step="onFixStep"
        @fix-phase="onFixPhase"
        @word-pair-checked="onWordPairChecked"
        @word-pair-remembered="onWordPairRemembered"
        @changed-self-rating="onChangedSelfRating"
        @changed-control-rating="onChangedControlRating"
      ></component>

      <q-btn
        class="button__next-phase"
        v-if="showNextBtn"
        label="Продолжить"
        color="primary"
        @click="doNextAction">
      </q-btn>

    </section>

  </q-page>
</template>

<script>

import {createNamespacedHelpers} from 'vuex'
import StepStepperComponent from '../components/StepStepperComponent'
import sound from '../components/exercises/sound'

import SelfLanguageRating from '../components/exercises/SelfLanguageRating'
import ControlLanguageRating from '../components/exercises/ControlLanguageRating'
import SelfLexicalLearningLang from '../components/exercises/SelfLexicalLearningLang'
import TwoColumnWordsWithCheckBox from '../components/exercises/TwoColumnWordsWithCheckBox'
import TwoColumnWordsWithMoveWords from '../components/exercises/TwoColumnWordsWithMoveWords'

import exerciesBase from '../components/exercises/exercies_base'
import resultMetods from '../components/exercises/result_metods'
import exerciesMethods from '../components/exercises/exercies_methods'

// import LexicalLearningLangComponent from '../components/steps/LexicalLearningLangComponent'
// import AutoTrainingComponent from '../components/steps/AutoTrainingComponent'

import TimeProgress from '../components/TimeProgress'

const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('beginners')

export default {
  name: 'BeginnersPage',
  mixins: [
    exerciesBase,
    resultMetods,
    exerciesMethods
  ],
  components: {
    TimeProgress,
    sound,
    TwoColumnWordsWithCheckBox,
    TwoColumnWordsWithMoveWords,
    StepStepperComponent,
    SelfLanguageRating,
    ControlLanguageRating,
    SelfLexicalLearningLang
    // LexicalLearningLangComponent,
    // AutoTrainingComponent
  },

  computed: {
    ...mapGetters(['steps', 'step', 'phases', 'phase', 'dictionary', 'soundTestResult', 'stepperVisible', 'learningLang', 'learningLangNames', 'mnemonicRecommendations', 'results']),
    ...mapState([ 'api', 'sound', 'error' ])
  },

  methods: {
    ...mapMutations(['setPhraseText', 'setStepperVisible', 'setLearningLang', 'setResults']),
    ...mapActions(['getSteps', 'resetSteps', 'nextStep', 'nextPhase', 'fixStep', 'fixPhase', 'getPhasesByStep', 'gotoStep', 'getDictionary'])
  }

}
</script>

<style>
  .step-stepper_layout {
    max-width: 720px;
  }
</style>
