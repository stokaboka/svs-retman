const resultMethods = {
  mnemonic: {
    initResults: (self) => {
      const out = {
        checked: self.checkedWordsPairs.length,
        remembered: 0
      }

      for (let i = 0; i < self.checkedWordsPairs.length; i++) {
        const checkedWordPair = self.dictionary[self.checkedWordsPairs[i] - 1]
        const isRememberedProperly = self.rememberedWordsPairs.findIndex((elem) => {
          return (elem.word1 === checkedWordPair.word1 && elem.word2 === checkedWordPair.word2)
        })
        out.remembered += isRememberedProperly >= 0 ? 1 : 0
      }
      return out
    },

    initRecomendation: (self, results) => {
      let text = ''
      self.getMnemonicRecommendation(results)
        .then((rec) => {
          text = self.phase.text.replace('{{RECOMMENDATION}}', rec.text)
          self.setPhraseText(text)
        })
        .catch((err) => {
          text = self.phase.text.replace('{{RECOMMENDATION}}', err.message)
          self.setPhraseText(text)
        })
      text = self.phase.text
        .replace('{{CHECKED}}', results.checked)
        .replace('{{REMEMBERED}}', results.remembered)
      self.setPhraseText(text)
    }
  }
}

export default {

  data () {
    return {
      // remember word pairs
      checkedWordsPairs: [],
      // restore word pairs
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

    initResults (resultId) {
      const self = this
      if (resultMethods[resultId]) {
        const func = resultMethods[resultId].initResults
        return func(self)
      }
      return null
    },

    initRecomendation (resultId, result) {
      const self = this
      const func = resultMethods[resultId].initRecomendation
      return func(self, result)
    }
  }
}
