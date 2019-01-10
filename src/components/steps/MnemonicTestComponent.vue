<template>
  <section>

      <h6>{{phase.title}}</h6>

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
        @word-pair-remembered="onWordPairRemembered"
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

import TestMixin from './mixins/TestMixin'
import TwoColumnWordsWithCheckBox from './test/TwoColumnWordsWithCheckBox'
import TwoColumnWordsWithMoveWords from './test/TwoColumnWordsWithMoveWords'

export default {
  name: 'MnemonicTestComponent',
  mixins: [TestMixin],
  components: {TwoColumnWordsWithCheckBox, TwoColumnWordsWithMoveWords},
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

    initResults () {
      this.results = {
        checked: this.checkedWordsPairs.length,
        remembered: 0
      }

      for (let i = 0; i < this.checkedWordsPairs.length; i++) {
        const checkedWordPair = this.dictionary[this.checkedWordsPairs[i] - 1]
        const isRememberedProperly = this.rememberedWordsPairs.findIndex((elem) => {
          return (elem.word1 === checkedWordPair.word1 && elem.word2 === checkedWordPair.word2)
        })
        this.results.remembered += isRememberedProperly >= 0 ? 1 : 0
      }
    },

    playPhase_3 () {
      this.setStepperVisible(true)
      let briefText = ''
      this.initResults()
      this.getMnemonicRecommendation(this.results)
        .then((rec) => {
          briefText = this.phase.briefText.replace('{{RECOMMENDATION}}', rec.text)
          this.setPhraseBriefText(briefText)
        })
        .catch((err) => {
          this.phase.briefText = this.phase.briefText.replace('{{RECOMMENDATION}}', err.message)
        })
      briefText = this.phase.briefText
        .replace('{{CHECKED}}', this.results.checked)
        .replace('{{REMEMBERED}}', this.results.remembered)
      this.setPhraseBriefText(briefText)
    }

  }

}
</script>

<style>
</style>
