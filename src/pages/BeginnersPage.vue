<template>
  <q-page padding>

    <step-stepper-component>
    </step-stepper-component>

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
        :lessons="lessons"
        :lang1="learningLang"
        :video="video"
        :timer="timer"
        ref="phaseComponent"
        @exercies-action="onExerciesAction"
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

// @fix-step="onFixStep"
// @fix-phase="onFixPhase"
// @word-pair-checked="onWordPairChecked"
// @word-pair-remembered="onWordPairRemembered"
// @changed-self-rating="onChangedSelfRating"
// @changed-control-rating="onChangedControlRating"
// @changed-atself="onChangedAtSelf"

import {createNamespacedHelpers} from 'vuex'
import StepStepperComponent from '../components/StepStepperComponent'
import SoundTest from '../components/exercises/SoundTest'

import SelfLanguageRating from '../components/exercises/SelfLanguageRating'
import ControlLanguageRating from '../components/exercises/ControlLanguageRating'
import SelfLexicalLearningLang from '../components/exercises/SelfLexicalLearningLang'
import TwoColumnWordsWithCheckBox from '../components/exercises/TwoColumnWordsWithCheckBox'
import TwoColumnWordsWithMoveWords from '../components/exercises/TwoColumnWordsWithMoveWords'

import AutoTrainingSelfTest from '../components/exercises/AutoTrainingSelfTest'
import AutoTraining from '../components/exercises/AutoTraining'

import Lesson from '../components/exercises/Lesson'

import exerciesBase from '../components/exercises/exercies_base'
import resultMetods from '../components/exercises/result_metods'
import exerciesMethods from '../components/exercises/exercies_methods'

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
    SoundTest,
    TwoColumnWordsWithCheckBox,
    TwoColumnWordsWithMoveWords,
    StepStepperComponent,
    SelfLanguageRating,
    ControlLanguageRating,
    SelfLexicalLearningLang,
    AutoTrainingSelfTest,
    AutoTraining,
    Lesson
  },

  computed: {
    ...mapGetters([
      'steps',
      'step',
      'phases',
      'phase',
      'dictionary',
      'lessons',
      'soundTestResult',
      'stepperVisible',
      'learningLang',
      'learningLangNames',
      'mnemonicRecommendations',
      'results',
      'learningTime',
      'atLevels']),
    ...mapState([ 'api', 'sound', 'error' ])
  },

  methods: {
    ...mapMutations([
      'setPhraseText',
      'setStepperVisible',
      'setLearningLang',
      'setResults',
      'setDictionary'
    ]),
    ...mapActions([
      'getSteps',
      'resetSteps',
      'nextStep',
      'nextPhase',
      'fixStep',
      'fixPhase',
      'getPhasesByStep',
      'gotoStep',
      'getDictionary',
      'getLessons'
    ])
  }

}
</script>

<style>
</style>
