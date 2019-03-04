import {createNamespacedHelpers} from 'vuex'
// import TimeProgress from '../test/TimeProgress'
import AudioHelper from '../../../lib/AudioHelper'
import TimerHelper from '../../../lib/TimerHelper'

const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('beginners')

const TestMixin = {
  components: {TimeProgress},
  data () {
    return {
      audio: new AudioHelper(),
      timer: new TimerHelper(this),
      phaseComponent: [],
      dictionaryFilter: {},
      BRIEF_MODE: 'brief',
      CHECK_MODE: 'check',
      END_MODE: 'end',
      phaseMode: 'brief',
      // phasesModesMap: {
      //   1: {
      //     brief: {nextMode: 'check', nextPhase: false, initResults: false, setTestResult: false},
      //     check: {nextMode: 'brief', nextPhase: true, initResults: false, setTestResult: false}
      //   },
      //   2: {
      //     brief: {nextMode: 'check', nextPhase: false, initResults: false, setTestResult: false},
      //     check: {nextMode: 'brief', nextPhase: true, initResults: true, setTestResult: false}
      //   },
      //   3: {
      //     brief: {nextMode: 'end', nextPhase: false, initResults: false, setTestResult: true},
      //     check: {nextMode: 'end', nextPhase: false, initResults: false, setTestResult: true}
      //   }
      // },
      testComponent: null,
      results: {} // loopback results object
    }
  },

  mounted () {
    this.initComponentOnMounted()
    this.getDictionary(this.dictionaryFilter)
    this.audio.init(this.api, this.sound)
    this.timer
      .on('START', this.onTimerFired)
      .on('PROGRESS', this.onTimerFired)
      .on('COMPLETE', this.onTimerFired)

    this.setStepperVisible(true)
  },

  computed: {
    isBriefMode () {
      return this.phaseMode === this.BRIEF_MODE
    },
    isCheckMode () {
      return this.phaseMode === this.CHECK_MODE
    },
    showNextBtn () {
      let out = true
      if (this.phaseMode === this.CHECK_MODE) {
        if (this.phase.testTime && this.phase.testTime > 0) {
          out = this.timer.complete || this.phase.testNextBtn === 1
        }
      }
      out = true
      return out
    },

    ...mapGetters(['step', 'phases', 'phase', 'dictionary', 'learningLang', 'learningLangNames']),
    ...mapState([ 'api', 'sound', 'error' ])
  },

  methods: {

    start () {
      this.playPhase()
    },

    initComponentOnMounted () {

    },

    // doNextAction () {
    //   this.timer.stop()
    //   this.audio.stop()
    //
    //   const phaseModeMap = this.phasesModesMap[this.phase.num][this.phaseMode]
    //   this.phaseMode = phaseModeMap.nextMode
    //   if (phaseModeMap.nextPhase) {
    //     this.nextPhase()
    //   }
    //
    //   if (phaseModeMap.initResults) {
    //     this.initResults()
    //   }
    //
    //   if (phaseModeMap.setTestResult) {
    //     this.setTestResult()
    //   }
    //
    //   if (this.phaseMode === this.END_MODE) {
    //   } else {
    //     this.playPhase()
    //   }
    // },

    doNextAction () {
      this.timer.stop()
      this.audio.stop()
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
          this.setTestResult(this.results)
          break
      }
    },

    playPhase_1_2 () {
      let sounds = []
      switch (this.phaseMode) {
        case this.BRIEF_MODE :
          this.setStepperVisible(true)
          sounds = this.phase.briefSounds
          this.audio.sounds(sounds).mode(this.phase.briefModeSounds).play()
          break
        case this.CHECK_MODE :
          this.setStepperVisible(false)
          sounds = this.phase.testSounds
          this.audio.sounds(sounds).mode(this.phase.testModeSounds).play()
          this.startTimer()
          this.testComponent = this.phaseComponent[this.phase.num - 1]
          break
      }
    },

    playPhase_1 () {
      this.playPhase_1_2()
    },

    playPhase_2 () {
      this.playPhase_1_2()
    },

    playPhase () {
      this.testComponent = null

      let briefText = this.phase.briefText
        .replace('{{LANGUAGE_NAME_1}}', this.learningLangNames.p1)
        .replace('{{LANGUAGE_NAME_2}}', this.learningLangNames.p2)
        .replace('{{LANGUAGE_NAME_3}}', this.learningLangNames.p3)
        .replace('{{LANGUAGE_NAME}}', this.learningLang)

      this.setPhraseText(briefText)

      switch (this.phase.num) {
        case 1:
          this.playPhase_1()
          break
        case 2:
          this.playPhase_2()
          break
        case 3:
          this.playPhase_3()
          break
        case 4:
          this.playPhase_4()
          break
      }
    },

    startTimer () {
      if (this.phase.testTime && this.phase.testTime > 0) {
        let seconds = this.phase.testTime
        // if (process.env.MODE === 'DEVELOPMENT' && this.phase.num === 1) {
        if (this.phase.num === 1) {
          // seconds = 5
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

    initResults () {},

    setTestResult (value) {
      this.$emit('fixStep', value)
    },

    ...mapMutations(['setPhraseText', 'setStepperVisible']),
    ...mapActions(['getDictionary', 'nextPhase', 'getMnemonicRecommendation'])
  }
}

export default TestMixin
