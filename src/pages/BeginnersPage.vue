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

import TwoColumnWordsWithCheckBox from '../components/exercises/TwoColumnWordsWithCheckBox'
import TwoColumnWordsWithMoveWords from '../components/exercises/TwoColumnWordsWithMoveWords'

import resultMetods from '../components/exercises/result_metods'
import exerciesMethods from '../components/exercises/exercies_methods'
import exerciesData from '../components/exercises/exercies_data'

// import LexicalLearningLangComponent from '../components/steps/LexicalLearningLangComponent'
// import AutoTrainingComponent from '../components/steps/AutoTrainingComponent'

import TimeProgress from '../components/TimeProgress'
import AudioHelper from '../lib/AudioHelper'
import TimerHelper from '../lib/TimerHelper'

const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('beginners')

export default {
  name: 'BeginnersPage',
  mixins: [
    exerciesData,
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
    ControlLanguageRating

    // LexicalLearningLangComponent,
    // AutoTrainingComponent
  },
  data () {
    return {
      dictionaryFilter: {},
      audio: new AudioHelper(),
      timer: new TimerHelper(this)
      // results: {} // loopback results object
    }
  },

  mounted () {
    this.audio.init(this.api, this.sound)
    this.resetSteps()
    this.getSteps()
      .then(() => {
        this.gotoStep(0)
        this.playStep()
      })
      .catch(() => {})

    this.timer
      .on('START', this.onTimerFired)
      .on('PROGRESS', this.onTimerFired)
      .on('COMPLETE', this.onTimerFired)

    this.setStepperVisible(true)
  },

  computed: {
    stepperVisibleComputed: {
      get () { return this.stepperVisible },
      set (value) { this.setStepperVisible(value) }
    },
    showNextBtn () {
      if (this.phase) {
        // return this.phase.next === 1
        return true
      }
      return true
    },
    ...mapGetters(['steps', 'step', 'phases', 'phase', 'dictionary', 'soundTestResult', 'stepperVisible', 'learningLangNames', 'mnemonicRecommendations', 'results']),
    ...mapState([ 'api', 'sound', 'error' ])
  },

  methods: {
    onTimerFired (event) {
      switch (event.event) {
        case 'START' :
          break
        case 'PROGRESS' :
          break
        case 'COMPLETE' :
          this.doNextAction()
          break
      }
    },

    startTimer () {
      if (this.phase.time && this.phase.time > 0) {
        let seconds = this.phase.time
        // this.timer.start(this.phase.testTime)
        seconds = 10
        this.timer.start(seconds)
      }
    },

    doNextAction () {
      this.timer.stop()
      this.audio.stop()
      this.onFixPhase()
    },

    onFixStep (result) {
      this.fixStep(result)
      this.nextStep()

      if (this.step.complete) {
        this.testComplete()
      } else {
        this.playStep()
      }
    },

    prePhase () {
      if (this.phase.result && this.phase.action === 'BRIEF') {
        if (this.results[this.phase.result]) {
          const results = this.results[this.phase.result]
          const recomendation = this.initRecomendation(this.phase, this.results)
          this.setResults({
            prop: this.phase.result,
            value: Object.assign({}, results, {recomendation})
          })
          this.setPhraseText(recomendation)
        }
      }

      const text = this.initLanguageTestName(this, this.phase.text)
      this.setPhraseText(text)
    },

    onFixPhase () {
      if (this.phase.result && this.phase.action === 'TEST') {
        const results = this.initResults(this.phase.result)
        // const recomendation = this.initRecomendation(this.phase, this.results)
        this.setResults({
          prop: this.phase.result,
          value: Object.assign({}, results, {recomendation: ''})
        })
        // this.results[this.phase.result] = this.initResults(this.phase.result)
        // this.results[this.phase.result]['recomendation'] = this.initRecomendation(this.phase, this.results)
        // this.setPhraseText(this.results[this.phase.result]['recomendation'])
        // this.fixPhase(this.results[this.phase.result])
      }

      this.nextPhase()

      if (this.phase.complete) {
        this.nextStep()
        this.playStep()
      } else {
        this.playPhase()
      }
    },

    playStep () {
      const self = this
      console.log('playStep')
      this.getPhasesByStep(this.step.id)
        .then(() => {
          self.playPhase()
        })
        .catch(() => {})
    },

    playPhase () {
      this.prePhase()

      if (this.phase) {
        this.setStepperVisible(this.phase.action === 'BRIEF')
        const sounds = this.phase.sounds
        this.audio.sounds(sounds).mode(this.phase.mode).play()

        if (this.phase.scope) {
          this.dictionaryFilter = {
            lang1: this.phase.lang1,
            lang2: this.phase.lang2,
            scope: this.phase.scope
          }
          this.getDictionary(this.dictionaryFilter)
        }

        this.startTimer()
      } else {
        this.setStepperVisible(true)
        this.timer.stop()
        this.audio.stop()
      }
    },

    testComplete () {
      console.log('testComplete')
    },

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
