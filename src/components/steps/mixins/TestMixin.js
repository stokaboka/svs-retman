import {createNamespacedHelpers} from 'vuex'
import TimeProgress from '../test/TimeProgress'
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
      phaseMode: 'brief',
      testComponent: null,
      results: {} // loopback results object
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

    initResults () {},

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
      }
    },

    startTimer () {
      if (this.phase.testTime && this.phase.testTime > 0) {
        let seconds = this.phase.testTime
        // if (process.env.MODE === 'DEVELOPMENT' && this.phase.num === 1) {
        if (this.phase.num === 1) {
          seconds = 2
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

    ...mapMutations(['setPhraseBriefText', 'setStepperVisible']),
    ...mapActions(['getDictionary', 'nextPhase', 'getMnemonicRecommendation'])
  }
}

export default TestMixin
