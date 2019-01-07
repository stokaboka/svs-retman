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
      :dictionary="testDictionary"
      :timer="timer"
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
import SelfLexicalLearningLang from './test/SelfLexicalLearningLang'
import TwoColumnWordsWithMoveWords from './test/TwoColumnWordsWithMoveWords'

export default {
  name: 'LexicalLearningLangComponent',
  mixins: [TestMixin],
  components: {SelfLexicalLearningLang, TwoColumnWordsWithMoveWords},

  data () {
    return {
      phaseComponent: [
        'SelfLexicalLearningLang',
        'TwoColumnWordsWithMoveWords',
        'TwoColumnWordsWithMoveWords'
      ],

      dictionaryFilter: {},

      results: {
        checked: 0,
        remembered: 0
      },

      // phase 1 - remember word pairs
      checkedWordsPairs: [],
      // phase 2 - restore word pairs
      rememberedWordsPairs1: [],
      // phase 3 - restore word pairs
      rememberedWordsPairs2: []
    }
  },

  computed: {
    /**
     * TODO DELETE !!! showNextBtn
     * @returns {boolean}
     */
    // showNextBtn () {
    //   return true
    // },

    testDictionary () {
      switch (this.phase.num) {
        case 1 :
          return this.dictionary.map((elem) => { return elem })
        case 2 :
          return this.dictionary
            .filter((elem, index) => { return index < 50 })
            .map((elem) => { return elem })
        case 3 :
          return this.dictionary
            .filter((elem, index) => { return index > 49 })
            .map((elem) => { return elem })
        case 4 :
          return this.dictionary.map((elem) => { return elem })
      }
    }
  },

  methods: {

    initComponentOnMounted () {
      this.dictionaryFilter = {
        lang1: this.learningLang,
        lang2: 'RU',
        scope: 'vocabulary::learn'
      }
    },

    onWordPairChecked (values) {
      this.checkedWordsPairs = values
    },

    onWordPairRemembered (values) {
      switch (this.phase.num) {
        case 2 :
          this.rememberedWordsPairs1 = values
          break
        case 3 :
          this.rememberedWordsPairs2 = values
          break
      }
    },

    doNextAction () {
      this.timer.stop()
      this.audio.stop()
      switch (this.phase.num) {
        case 1 :
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
        case 2 :
          switch (this.phaseMode) {
            case this.BRIEF_MODE :
              this.phaseMode = this.CHECK_MODE
              break
            case this.CHECK_MODE :
              this.nextPhase()
              this.phaseMode = this.CHECK_MODE
              break
          }
          this.playPhase()
          break
        case 3 :
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
        case 4 :
          this.setTestResult(this.results)
          break
      }
    },

    initResults () {
      const out = {
        checked: this.checkedWordsPairs.length,
        remembered: 0
      }

      for (let i = 0; i < this.checkedWordsPairs.length; i++) {
        const checkedWordPair = this.dictionary[this.checkedWordsPairs[i]]

        let isRememberedProperly = this.rememberedWordsPairs1.findIndex((elem) => {
          return (elem.word1 === checkedWordPair.word1 && elem.word2 === checkedWordPair.word2)
        })

        out.remembered += isRememberedProperly >= 0 ? 1 : 0

        isRememberedProperly = this.rememberedWordsPairs2.findIndex((elem) => {
          return (elem.word1 === checkedWordPair.word1 && elem.word2 === checkedWordPair.word2)
        })

        out.remembered += isRememberedProperly >= 0 ? 1 : 0
      }
      return out
    },

    playPhase_3 () {
      this.playPhase_1_2()
    },

    playPhase_4 () {
      this.setStepperVisible(true)
      let briefText = ''
      this.results = this.initResults()
      // this.getMnemonicRecommendation(this.results)
      //   .then((rec) => {
      //     briefText = this.phase.briefText.replace('{{RECOMMENDATION}}', rec.text)
      //     this.setPhraseBriefText(briefText)
      //   })
      //   .catch((err) => {
      //     this.phase.briefText = this.phase.briefText.replace('{{RECOMMENDATION}}', err.message)
      //   })
      briefText = this.phase.briefText
        .replace('{{CHECKED}}', this.results.checked)
        .replace('{{REMEMBERED}}', this.results.remembered)
      this.setPhraseBriefText(briefText)
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
  }

}
</script>

<style>
</style>
