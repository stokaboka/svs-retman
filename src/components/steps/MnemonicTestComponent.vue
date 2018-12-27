<template>
  <section>
    <div>
      <h5>{{phase.title}}</h5>
      <div
        v-if="phase.num === 1"
        v-html="phase.briefText"></div>
      </div>

      <div v-if="phase.num === 2" class="row no-wrap justify-between">
        <div class="col-auto"></div>
          <div class="col-3">
            <div class="row no-wrap justify-between" v-for="i in 25" :key="i">
              <div class="col-5">{{dictionary[i-1].word1}}</div>
              <div class="col-2"><input type="checkbox" :id="i" :value="i" v-model="checkedWordsPairs"></div>
              <div class="col-5">{{dictionary[i-1].word2}}</div>
            </div>
          </div>

        <div class="col-auto"></div>

          <div class="col-3">
            <div class="row no-wrap justify-between" v-for="i in 25" :key="i">
              <div class="col-5">{{dictionary[i+25-1].word1}}</div>
              <div class="col-2"><input type="checkbox" :id="i+25" :value="i+25" v-model="checkedWordsPairs"></div>
              <div class="col-5">{{dictionary[i+25-1].word2}}</div>
            </div>
          </div>
        <div class="col-auto"></div>
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
const { mapState, mapGetters, mapActions } = createNamespacedHelpers('beginners')

export default {
  name: 'MnemonicTestComponent',

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
