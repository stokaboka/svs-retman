<template>
  <div>
    <GlobalEvents @keyup.space.prevent="onPressSpace"></GlobalEvents>

      <div v-if="testDictionary" class="row no-wrap justify-between q-mt-xs" v-for="i in 25" :key="i">

        <div
          class="col-3 q-ml-xs q-mr-xs q-pa-xs"
          :class="testDictionary[i-1].class">
          {{testDictionary[i-1].word1}}
        </div>

        <div
          class="col-3 q-ml-xs q-mr-xs q-pa-xs"
          :class="testDictionary[i+25-1].class">
          {{testDictionary[i+25-1].word1}}
        </div>

        <div
          class="col-3 q-ml-xs q-mr-xs q-pa-xs"
          :class="testDictionary[i+50-1].class">
          {{testDictionary[i+50-1].word1}}
        </div>

        <div
          class="col-3 q-ml-xs q-mr-xs q-pa-xs"
          :class="testDictionary[i+75-1].class">
          {{testDictionary[i+75-1].word1}}
        </div>

      </div>

  </div>
</template>

<script>

import GlobalEvents from 'vue-global-events'

export default {
  name: 'SelfLexicalLearningLang',
  components: {GlobalEvents},
  props: {
    timer: {
      type: Object,
      default () {
        return []
      },
      required: true
    },
    dictionary: {
      type: Array,
      default () {
        return []
      },
      required: true
    }
  },
  mounted () {
    this.timer
      .on('START', this.onTimerFired)
      .on('PROGRESS', this.onTimerFired)
      .on('COMPLETE', this.onTimerFired)

    this.testDictionary = this.dictionary.map((elem, index) => {
      return Object.assign(
        {}, elem,
        {
          hide: elem.word2,
          selected: index === 0,
          class: index === 0 ? 'current-word' : ''
        })
    })
    this.ready = true
  },
  data () {
    return {
      ready: false,
      indexTestDictionary: 0,
      testDictionary: null,
      checkedWordsPairs: []
    }
  },
  methods: {

    onPressSpace () {
      this.testDictionary[this.indexTestDictionary].selected = true
      this.refreshTestDictionary()

      this.checkedWordsPairs = this.testDictionary
        .filter((elem) => { return elem.selected })
        .map((elem, index) => { return index })

      this.$emit('word-pair-checked', this.checkedWordsPairs)
    },

    refreshTestDictionary () {
      this.testDictionary = this.testDictionary.map((elem, index) => {
        let cls = ''
        if (index === this.indexTestDictionary) {
          cls = 'current-word'
        }
        if (elem.selected) {
          cls = 'check-word'
        }
        return Object.assign({}, elem, {class: cls})
      }, this)
    },

    wordPairChecked () {
      this.$emit('word-pair-checked', this.checkedWordsPairs)
    },
    onTimerFired (event) {
      switch (event.event) {
        case 'START' :
          break
        case 'PROGRESS' :
          this.indexTestDictionary++
          break
        case 'COMPLETE' :
          break
      }
      this.refreshTestDictionary()
    }
  }
}
</script>

<style>
  .current-word {
    background-color: royalblue;
    color: white;
  }
  .check-word {
    background-color: greenyellow;
  }
</style>
