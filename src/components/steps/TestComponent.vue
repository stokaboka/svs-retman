<template>
  <section>

      <h6>{{phase.title}}</h6>

      <div
        v-if="isBriefMode"
        v-html="phase.briefText">
      </div>

      <div
        v-if="isCheckMode"
        v-html="phase.testText">
      </div>

      <time-progress
        v-if="timer.active"
        :timer="timer">
      </time-progress>

      <component
        v-bind:is="testComponent"
        ref="testComponent"
        v-if="isCheckMode"
        :dictionary="dictionary"
        @word-pair-checked="onWordPairChecked"
        @word-pair-remembered="onWordPairRemembered"
      ></component>

    <q-btn
      class="button__next-phase"
          v-if="showNextBtn"
          label="Продолжить"
          color="primary"
          @click="doNextAction">
    </q-btn>

  </section>
</template>

<script>

import {createNamespacedHelpers} from 'vuex'
import TwoColumnWordsWithCheckBox from './test/TwoColumnWordsWithCheckBox'
import TwoColumnWordsWithMoveWords from './test/TwoColumnWordsWithMoveWords'
import AudioHelper from '../../lib/AudioHelper'
import TimerHelper from '../../lib/TimerHelper'
import TimeProgress from './test/TimeProgress'
// const audio = new AudioHelper()

const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('beginners')

export default {
  name: 'MnemonicTestComponent',
  components: {TimeProgress, TwoColumnWordsWithCheckBox, TwoColumnWordsWithMoveWords},
  data () {
    return {
      audio: new AudioHelper(),
      BRIEF_MODE: 'brief',
      CHECK_MODE: 'check',
      phaseMode: 'brief',
      timer: new TimerHelper(this),
      testComponent: null
    }
  },

  mounted () {
    this.getDictionary(this.dictionaryFilter)
    this.audio.init(this.api, this.sound)
    this.timer
      .on('START', this.onTimerFired)
      .on('PROGRESS', this.onTimerFired)
      .on('COMPLETE', this.onTimerFired)

    this.setStepperVisible(true)
  },

  computed: {
    showNextBtn () {
      let out = true
      if (this.phaseMode === this.CHECK_MODE) {
        if (this.phase.testTime && this.phase.testTime > 0) {
          out = this.timer.complete || this.phase.testNextBtn === 1
        }
      }
      return out
    },

    ...mapGetters(['step', 'phases', 'phase', 'dictionary']),
    ...mapState([ 'api', 'sound', 'error' ])
  },

  methods: {

    start () {
      this.playPhase()
    },

    doNextAction () {
      this.__doNextAction()
    },

    playPhase () {
      this.__playPhase()
    },

    startTimer () {
      if (this.phase.testTime && this.phase.testTime > 0) {
        let seconds = this.phase.testTime
        // if (process.env.MODE === 'DEVELOPMENT' && this.phase.num === 1) {
        if (this.phase.num === 1) {
          seconds = 10
        }
        // this.timer.start(this.phase.testTime)
        this.timer.start(seconds)
      }
    },

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

    setTestResult (value) {
      this.$emit('fixStep', value)
    },

    ...mapMutations(['setPhraseText', 'setStepperVisible']),
    ...mapActions(['getDictionary', 'nextPhase', 'getMnemonicRecommendation'])
  }

}
</script>

<style>
</style>
