
const mode = process.env.MODE
// const developmentTimeSeconds = 10

import AudioHelper from '../../lib/AudioHelper'
import TimerHelper from '../../lib/TimerHelper'

export default {
  data () {
    return {
      startStep: 7,
      // startStep: 5,
      // startStep: 3,
      audio: new AudioHelper(this),
      timer: new TimerHelper(this),
      baseMethods: {
        'fix-step': this.onFixStep,
        'fix-phase': this.onFixPhase,
        'do-next-action': this.doNextAction
      },
      progressVisible: true,
      stepperFullScreenVisible: true,
      briefVisible: true,
      // mnemonic: remember word pairs
      checkedWordsPairs: [],
      // mnemonic: restore word pairs
      rememberedWordsPairs: [],
      rememberedWordsPairs1: [],
      rememberedWordsPairs2: [],

      // self language test
      SelfRating: {
        EN: [],
        DE: [],
        FR: []
      },
      // self language test
      ControlRating: {
        EN: [],
        DE: [],
        FR: []
      },

      AT: {
        before: 4,
        after: 4
      },

      lesson: [null, null, null, null]
    }
  },

  mounted () {
    this.audio.init(this.api, this.sound)
    this.resetSteps()
    this.getSteps()
      .then(() => {
        this.gotoStep(this.startStep)
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
      if (this.isLastStep) {
        return false
      }
      if (this.phase) {
        const out = mode === 'PRODUCTION' ? this.phase.next === 1 : true
        return out && !this.$q.fullscreen.isActive
      }
      return true
    },

    video () {
      // return `${this.api}/video/BigBuckBunny.mp4`
      return ''
    }
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
        // let seconds = mode === 'PRODUCTION' ? this.phase.time : developmentTimeSeconds
        // console.log('startTimer', seconds, mode, developmentTimeSeconds)
        // if (this.phase.result === 'lexical') {
        //   seconds = this.phase.time
        // }
        this.timer.start(this.phase.time)
      }
    },

    onExerciesAction (event) {
      let fn
      if (this.baseMethods[event.id]) {
        fn = this.baseMethods[event.id]
      } else if (this.exerciesMethods[event.id]) {
        fn = this.exerciesMethods[event.id]
      }
      if (fn) {
        fn(event.data)
      } else {
        console.error(`unknown event ${event.id}`)
      }
    },

    doNextAction () {
      if (!this.$q.fullscreen.isActive) {
        this.$q.fullscreen.exit()
      }
      this.timer.stop()
      this.audio.stop()
      this.onFixPhase()
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

    onFixPhase (data) {
      if (this.phase.result && this.phase.action === 'TEST') {
        const results = this.initResults(this.phase.result)
        this.setResults({
          prop: this.phase.result,
          value: Object.assign({}, results, {recomendation: ''})
        })
      }

      this.nextPhase()

      if (this.phase.complete) {
        this.nextStep()
        this.playStep()
      } else {
        this.playPhase()
      }
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

    playStep () {
      const self = this
      console.log('playStep')

      this.checkedWordsPairs = []
      this.rememberedWordsPairs = []

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
          this.getDictionary(this.phase)
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
    }

  }
}
