<template>
  <section>
    <div>
      <h5>{{phase.title}}</h5>

    <div v-if="phase.num === 1">

      <div
        v-if="phaseMode === 'brief'"
        v-html="phase.briefText"></div>
      </div>

      <two-column-words-with-check-box
        v-if="phaseMode === 'check'"
        :dictionary="dictionary"
        @word-pair-checked="onWordPairChecked"
      >
      </two-column-words-with-check-box>
    </div>

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
import TwoColumnWordsWithCheckBox from './test/TwoColumnWordsWithCheckBox'
import AudioHelper from '../../lib/AudioHelper'
const audio = new AudioHelper()

const { mapState, mapGetters, mapActions } = createNamespacedHelpers('beginners')

export default {
  name: 'MnemonicTestComponent',
  components: {TwoColumnWordsWithCheckBox},
  data () {
    return {
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
      phaseMode: 'brief'
    }
  },

  mounted () {
    this.getDictionary(this.dictionaryFilter)
    audio.init(this.api, this.sound)
  },

  computed: {
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
      switch (this.phase.num) {
        case 1 :
        case 2 :
          switch (this.phaseMode) {
            case this.BRIEF_MODE :
              sounds = this.phase.briefSounds
              audio.sounds(sounds).once().play()
              break
            case this.CHECK_MODE :
              sounds = this.phase.testSounds
              audio.sounds(sounds).cycle().play()
              break
          }
          break
        case 3 :
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
