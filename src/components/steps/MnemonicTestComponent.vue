<template>
  <section>

      <h5>{{phase.title}}</h5>

      <div
        v-if="phaseMode === BRIEF_MODE"
        v-html="phase.briefText">
      </div>

      <div
        v-if="phaseMode === CHECK_MODE"
        v-html="phase.testText">
      </div>

      <time-progress
        v-if="timer.active"
        :timer="timer">
      </time-progress>

      <component
        v-bind:is="testComponent"
        ref="testComponent"
        v-if="phaseMode === CHECK_MODE"
        :dictionary="dictionary"
        @word-pair-checked="onWordPairChecked"
      ></component>

    <q-btn
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
const audio = new AudioHelper()

const { mapState, mapGetters, mapActions } = createNamespacedHelpers('beginners')

export default {
  name: 'MnemonicTestComponent',
  components: {TimeProgress, TwoColumnWordsWithCheckBox, TwoColumnWordsWithMoveWords},
  data () {
    return {
      phaseComponent: [
        'TwoColumnWordsWithCheckBox',
        'TwoColumnWordsWithMoveWords',
        'TwoColumnWordsWithMoveWords__'
      ],
      BRIEF_MODE: 'brief',
      CHECK_MODE: 'check',
      dictionaryFilter: {
        lang1: 'RU',
        lang2: 'RU',
        scope: 'mnemonic::test'
      },
      btnLabels: [
        'Начать',
        'Проверить',
        'Продолжить'
      ],
      results: [],
      checkedWordsPairs: [],
      phaseMode: 'brief',
      timer: new TimerHelper(this),
      testComponent: null
    }
  },

  mounted () {
    this.getDictionary(this.dictionaryFilter)
    audio.init(this.api, this.sound)
    this.timer
      .on('START', this.onTimerFired)
      .on('PROGRESS', this.onTimerFired)
      .on('COMPLETE', this.onTimerFired)
  },

  computed: {
    showNextBtn () {
      let out = true
      if (this.phaseMode === this.CHECK_MODE) {
        if (this.phase.testTime && this.phase.testTime > 0) {
          out = this.timer.complete && this.phase.testNextBtn === 1
        }
      }
      return out
    },

    startLabel () {
      return this.btnLabels[this.phase.num - 1] || 'Следующий тест'
    },

    ...mapGetters(['step', 'phases', 'phase', 'dictionary']),
    ...mapState([ 'api', 'sound', 'error' ])
  },

  methods: {

    start () {
      this.playPhase()
    },

    onWordPairChecked (values) {
      this.checkedWordsPairs = values
    },

    initResults () {
      for (let i = 0; i < 50; i++) {
        this.results.push({result: false})
      }
    },

    doNextAction () {
      audio.stop()
      switch (this.phase.num) {
        case 1 :
        case 2 :
          switch (this.phaseMode) {
            case this.BRIEF_MODE :
              this.phaseMode = this.CHECK_MODE
              break
            case this.CHECK_MODE :
              this.nextPhase()
              this.phaseMode = this.BRIEF_MODE
              break
          }
          this.playPhase()
          break
        case 3 :
          this.setTestResult(true)
          break
      }
    },

    playPhase () {
      let sounds = []
      this.testComponent = null

      switch (this.phase.num) {
        case 1 :
        case 2 :
          switch (this.phaseMode) {
            case this.BRIEF_MODE :
              sounds = this.phase.briefSounds
              audio.sounds(sounds).mode(this.phase.briefModeSounds).play()
              break
            case this.CHECK_MODE :
              sounds = this.phase.testSounds
              audio.sounds(sounds).mode(this.phase.testModeSounds).play()
              this.startTimer()
              this.testComponent = this.phaseComponent[this.phase.num - 1]
              break
          }
          break
        case 3 :
          break
      }
    },

    startTimer () {
      if (this.phase.testTime && this.phase.testTime > 0) {
        let seconds = this.phase.testTime
        if (this.phase.num === 1) {
          seconds = 1
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

    ...mapActions(['getDictionary', 'nextPhase'])
  }

}
</script>

<style>
</style>
