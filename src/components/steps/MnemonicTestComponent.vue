<template>
  <section>
    <div>
      <h5>{{phase.title}}</h5>
      <div
        v-if="phase.num === 1"
        v-html="phase.briefText"></div>
      </div>

      <two-column-words-with-chech-box
        v-if="phase.num === 2"
        :dictionary="dictionary"
        @word-pair-checked="onWordPairChecked"
      >
      </two-column-words-with-chech-box>

    {{checkedWordsPairs}}

      <div>

        <q-btn
          :label="startLabel"
          color="primary"
          @click="doNextAction"
        ></q-btn>

      </div>

  </section>
</template>

<script>

import {createNamespacedHelpers} from 'vuex'
import TwoColumnWordsWithChechBox from './test/TwoColumnWordsWithChechBox'
const { mapState, mapGetters, mapActions } = createNamespacedHelpers('beginners')

export default {
  name: 'MnemonicTestComponent',
  components: {TwoColumnWordsWithChechBox},
  data () {
    return {
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
      checkedWordsPairs: []
    }
  },

  mounted () {
    this.getDictionary(this.dictionaryFilter)
  },

  computed: {
    startLabel () {
      if (this.phase.num >= 0 && this.phase.num < this.btnLabels.length) {
        return this.btnLabels[this.phase.num - 1]
      } else {
        return 'Следующий тест'
      }
    },
    ...mapGetters(['step', 'phases', 'phase', 'dictionary']),
    ...mapState([ 'error' ])
  },

  methods: {

    onWordPairChecked (values) {
      this.checkedWordsPairs = values
    },

    initResults () {
      for (let i = 0; i < 50; i++) {
        this.results.push({result: false})
      }
    },

    doNextAction () {
      switch (this.phase.num) {
        case 1 :
        case 2 :
          this.nextPhase()
          break
        case 3 :
          this.setTestResult(true)
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
