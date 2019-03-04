const MnemonicTestMixin = {
  data () {
    return {
      phaseComponent: [
        'TwoColumnWordsWithCheckBox',
        'TwoColumnWordsWithMoveWords'
      ],

      dictionaryFilter: {
        lang1: 'RU',
        lang2: 'RU',
        scope: 'mnemonic::test'
      },

      results: {
        checked: 0,
        remembered: 0
      },

      // phase 1 - remember word pairs
      checkedWordsPairs: [],
      // phase 2 - restore word pairs
      rememberedWordsPairs: []
    }
  },

  methods: {
    onWordPairChecked (values) {
      this.checkedWordsPairs = values
    },

    onWordPairRemembered (values) {
      this.rememberedWordsPairs = values
    },

    __doNextAction () {
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

    __playPhase () {
      let sounds = []
      this.testComponent = null

      switch (this.phase.num) {
        case 1 :
        case 2 :
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
          break
        case 3 :
          this.setStepperVisible(true)
          let briefText = ''
          this.results = this.initResults()
          this.getMnemonicRecommendation(this.results)
            .then((rec) => {
              briefText = this.phase.briefText.replace('{{RECOMMENDATION}}', rec.text)
              this.setPhraseText(briefText)
            })
            .catch((err) => {
              this.phase.briefText = this.phase.briefText.replace('{{RECOMMENDATION}}', err.message)
            })
          briefText = this.phase.briefText
            .replace('{{CHECKED}}', this.results.checked)
            .replace('{{REMEMBERED}}', this.results.remembered)
          this.setPhraseText(briefText)
          break
      }
    },

    initResults () {
      const out = {
        checked: this.checkedWordsPairs.length,
        remembered: 0
      }

      for (let i = 0; i < this.checkedWordsPairs.length; i++) {
        const checkedWordPair = this.dictionary[this.checkedWordsPairs[i] - 1]
        const isRememberedProperly = this.rememberedWordsPairs.findIndex((elem) => {
          return (elem.word1 === checkedWordPair.word1 && elem.word2 === checkedWordPair.word2)
        })
        out.remembered += isRememberedProperly >= 0 ? 1 : 0
      }
      return out
    }
  }
}

export default MnemonicTestMixin
