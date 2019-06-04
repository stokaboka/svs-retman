<template>
  <div class="rows-container" @touchend="onTouchEnd">
    <GlobalEvents @keyup.space.prevent="onPressSpace" @keyup.enter.prevent="onPressSpace"></GlobalEvents>

      <div v-if="ready" class="row-container q-mt-xs" v-for="i in 25" :key="i">

        <div
          class="word q-ml-xs q-mr-xs q-pa-xs"
          :class="testDictionary[i-1].class"
        >
          {{testDictionary[i-1].word1}}
        </div>

        <div
          class="word q-ml-xs q-mr-xs q-pa-xs"
          :class="testDictionary[i+25-1].class"
        >
          {{testDictionary[i+25-1].word1}}
        </div>

        <div
          class="word q-ml-xs q-mr-xs q-pa-xs"
          :class="testDictionary[i+50-1].class"
        >
          {{testDictionary[i+50-1].word1}}
        </div>

        <div
          class="word q-ml-xs q-mr-xs q-pa-xs"
          :class="testDictionary[i+75-1].class"
        >
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
    phase: {
      type: Object,
      default () {
        return {}
      },
      required: false
    },
    results: {
      type: Object,
      default () {
        return {}
      },
      required: false
    },
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
  },
  data () {
    return {
      ready: false,
      indexTestDictionary: 0,
      testDictionary: null,
      checkedWordsPairs: []
    }
  },

  watch: {
    dictionary () {
      this.init()
    }
  },

  methods: {

    init () {
      let checked = []
      if (this.results && this.phase) {
        if (this.phase.result && this.phase.action === 'TEST') {
          if (this.results[this.phase.result]) {
            const result = this.results[this.phase.result]
            checked = result.checkedWordsPairs
          }
        }
      }
      this.testDictionary = this.dictionary.map((elem, index) => {
        return Object.assign(
          {}, elem,
          {
            hide: elem.word2,
            selected: checked.length > 0 ? checked.findIndex(e => e.word1 === elem.word1) >= 0 : false,
            class: index === 0 ? 'current-word' : ''
          })
      })
      this.wordPairChecked()
      this.ready = this.testDictionary.length === 100
    },

    onTouchEnd (event) {
      // console.log('onTouchEnd')
      event.stopPropagation()
      this.onPressSpace()
    },

    onPressSpace () {
      this.testDictionary[this.indexTestDictionary].selected = !this.testDictionary[this.indexTestDictionary].selected
      this.refreshTestDictionary()

      this.wordPairChecked()
    },

    wordPairChecked () {
      this.checkedWordsPairs = this.testDictionary.filter(elem => elem.selected)
      this.$emit('exercies-action', {id: 'word-pair-checked', data: this.checkedWordsPairs})
    },

    refreshTestDictionary () {
      this.testDictionary = this.testDictionary.map((elem, index) => {
        let cls = ''
        if (elem.selected) {
          cls = 'check-word'
        }
        if (index === this.indexTestDictionary) {
          cls = 'current-word'
        }
        return Object.assign({}, elem, {class: cls})
      }, this)
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

  .word {
    width: 20vw;
  }

  .rows-container {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    padding: 0 6rem;
  }

  .row-container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    align-items: center;
  }

  .words-row {
    min-height: 26px;
    margin-bottom: 3px;
  }
</style>
