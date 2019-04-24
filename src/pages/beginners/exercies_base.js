const mode = process.env.MODE

import AudioHelper from '../../lib/AudioHelper'
import TimerHelper from '../../lib/TimerHelper'

export default {
  beforeDestroy () {
    this.audio.stop()
    this.audio = null
  },
  data () {
    return {
      startStep: 0,
      // startStep: 8,  // results
      // startStep: 5, // AT
      // startStep: 3,
      audio: new AudioHelper(this),
      timer: new TimerHelper(this),
      baseMethods: {
        'fix-step': this.onFixStep,
        'fix-phase': this.onFixPhase,
        'do-next-action': this.doNextAction
      },
      showCancelBtn: false,
      progressVisible: true,
      stepperFullScreenVisible: true,
      briefVisible: true,
      // mnemic: remember word pairs
      checkedWordsPairs: [],
      // mnemic: restore word pairs
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
        before: {
          level: 4,
          label: ''
        },
        after: {
          level: 4,
          label: ''
        }
      },

      SANexpress: {
        before: { s: 3, a: 3, n: 3 },
        after: { s: 3, a: 3, n: 3 }
      },

      SAN: {
        before: { s: 3, a: 3, n: 3 },
        after: { s: 3, a: 3, n: 3 }
      },

      AT0: {
        before: { s: 3, a: 3, n: 3 },
        after: { s: 3, a: 3, n: 3 }
      },

      lesson: [null, null, null, null]
    }
  },

  mounted () {
    this.audio.init(this.api, this.sound).theme(this.soundTheme)
    this.resetSteps()
    this.getSteps()
      .then(() => {
        this.gotoStep(this.startStep)
        this.playStep()
      })
      .catch(() => {})

    this.timer
      .on('START', this.onTimerFired)
      .on('PAUSE', this.onTimerFired)
      .on('RESUME', this.onTimerFired)
      .on('PROGRESS', this.onTimerFired)
      .on('COMPLETE', this.onTimerFired)

    this.setStepperVisible(true)
  },

  computed: {
    showAudioPlayPauseBtn () {
      return !this.timer.active && (this.audio.playing || this.audio.paused)
    },
    showTimerPlayPauseBtn () {
      return this.phase && this.timer.active
    },
    styleTestComponent () {
      if (this.showTimerPlayPauseBtn) {
        return (this.timer && this.timer.paused) ? {opacity: 0} : {opacity: 1}
      } else {
        return {opacity: 1}
      }
    },
    playPauseIcon () {
      if (this.showTimerPlayPauseBtn) {
        return (this.timer && this.timer.paused) ? 'play_circle_filled' : 'pause_circle_filled'
      }
      if (this.showAudioPlayPauseBtn) {
        return (this.audio && this.audio.paused) ? 'play_circle_filled' : 'pause_circle_filled'
      }
      return ''
    },
    showBrief () {
      return !this.phase.component
    },
    phaseIcon () {
      if (this.phase.action === 'BRIEF' && this.phase.result && this.results[this.phase.result]) {
        return 'check_circle_outline'
      } else {
        return 'error_outline'
      }
    },
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
      if (this.phase.video) {
        return this.phase.video.split('.')[0]
      }
      return ''
      // return `${this.api}/video/${this.phase.video}`
    },
    videoH264 () {
      return `${this.api}/video/${this.video}.h264.mp4`
    },
    videoAV1 () {
      return `${this.api}/video/${this.video}.av1.mp4`
    },
    videoHEVC () {
      return `${this.api}/video/${this.video}.hevc.mp4`
    }
  },

  methods: {
    onPlayPause () {
      if (this.showTimerPlayPauseBtn) {
        if (this.timer) {
          if (this.timer.paused) {
            this.timer.resume()
          } else {
            this.timer.pause()
          }
        }
      }

      if (this.showAudioPlayPauseBtn) {
        if (this.audio) {
          if (this.audio.paused) {
            this.audio.resume()
          } else {
            this.audio.pause()
          }
        }
      }
    },
    onTimerFired (event) {
      switch (event.event) {
        case 'START' :
          break
        case 'PAUSE':
          if (this.audio) {
            this.audio.pause()
          }
          break
        case 'RESUME' :
          if (this.audio) {
            this.audio.resume()
          }
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

    doCancel () {
      this.setAllowResume(false)
      this.setLockResume()
      this.$router.push({name: 'home'})
    },

    doNextAction () {
      if (!this.$q.fullscreen.isActive) {
        this.$q.fullscreen.exit()
      }
      this.showCancelBtn = false
      this.timer.stop()
      this.audio.stop()

      if (this.restartStep) {
        this.playStep()
      } else {
        this.onFixPhase()
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
      // console.log('playStep')

      this.setRestartStep(false)
      this.setAllowCancel(false)

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
        this.audio
          .sounds(sounds)
          .mode(this.phase.mode)
          .volume(this.phase.soundVolume)
          .play()

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
    },

    async loadTestingResult () {
      const result = await this.loadResult()
      if (result) {
        this.$q.notify({message: 'Выполнена обработка результатов.', type: 'info'})
      } else {
        this.$q.notify({message: 'Выполненить обработку результатов не удалось. Попробуйте еще раз позднее.', type: 'negative'})
      }
    },

    async save () {
      if (this.isLogged) {
        const result = await this.saveResult()
        if (result) {
          this.$q.notify({message: 'Результы теста успешно сохранены.', type: 'info'})
          this.loadTestingResult()
        } else {
          this.$q.notify({message: 'Результы теста не удалось сохранить.', type: 'negative'})
        }
      } else {
        this.$q.notify({message: 'Вы не выполнили вход. Результаты теста не будут сохранены.', type: 'info'})
      }
    }
  },

  watch: {
    isLastStep (val) {
      if (val) {
        this.save()
      }
    }
  }
}
