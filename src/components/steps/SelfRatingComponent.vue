<template>
  <section>

    <h5>{{phase.title}}</h5>

    <div
      v-if="phaseMode === BRIEF_MODE"
      v-html="phase.briefText">
    </div>

    <div
      v-if="phaseMode === CHECK_MODE"
      v-html="phase.testText">
    </div>

    <component
      v-bind:is="testComponent"
      ref="testComponent"
      v-if="phaseMode === CHECK_MODE"
      :dictionary="dictionary"
      @changed-self-rating="onChangedSelfRating"
      @changed-control-rating="onChangedControlRating"
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
import SelfLanguageRating from './test/SelfLanguageRating'
import ControlLanguageRating from './test/ControlLanguageRating'

const testWordReducer = (acc, val) => {
  if (val.word2 && val.word2 === val.hide) {
    return acc + 1
  }
  return acc
}

const testLevelReducer = (acc, val) => {
  return acc + val
}

const minKeysValues = (keys, values) => {
  let outKey = keys[0]
  let min = values[outKey]
  for (let key of keys) {
    if (min > values[key]) {
      outKey = key
      min = values[outKey]
    }
  }
  return outKey
}

const reduce = (arr, reducer, value) => {
  let out = value
  for (let elem of arr) {
    out = reducer(out, elem)
  }
  return out
}

export default {
  name: 'SelfRatingComponent',
  mixins: [TestMixin],
  components: {SelfLanguageRating, ControlLanguageRating},
  data () {
    return {
      phaseComponent: [
        'SelfLanguageRating',
        'ControlLanguageRating'
      ],
      dictionaryFilters: [
        {
          lang1: 'EN',
          lang2: 'RU',
          scope: 'vocabulary::test'
        },
        {
          lang1: 'DE',
          lang2: 'RU',
          scope: 'vocabulary::test'
        },
        {
          lang1: 'FR',
          lang2: 'RU',
          scope: 'vocabulary::test'
        }
      ],

      dictionaryFilterIndex: 0,

      dictionaryFilter: {
        lang1: 'EN',
        lang2: 'RU',
        scope: 'vocabulary::test'
      },
      SelfRating: {
        EN: [],
        DE: [],
        FR: []
      },
      ControlRating: {
        EN: [],
        DE: [],
        FR: []
      },
      results: {
        SelfRating: {},
        ControlRating: {}
      }
    }
  },

  methods: {
    onChangedSelfRating (values) {
      // this.SelfRating[this.dictionaryFilter.lang1] = values
      this.SelfRating = values
    },
    onChangedControlRating (values) {
      this.ControlRating[this.dictionaryFilter.lang1] = values
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
              if (++this.dictionaryFilterIndex < this.dictionaryFilters.length) {
                this.dictionaryFilter = this.dictionaryFilters[this.dictionaryFilterIndex]
                this.getDictionary(this.dictionaryFilter)
                  .then(() => {
                    this.$refs.testComponent.init()
                  })
                  .catch(() => {})
              } else {
                this.nextPhase()
                this.phaseMode = this.BRIEF_MODE
              }
              break
          }
          this.playPhase()
          break
        case 3 :
          // this.setTestResult(this.results)
          break
      }
    },

    playPhase_3 () {
      this.results = {
        SelfRating: {
          EN: reduce(this.SelfRating.EN, testLevelReducer, 0),
          DE: reduce(this.SelfRating.DE, testLevelReducer, 0),
          FR: reduce(this.SelfRating.FR, testLevelReducer, 0)
        },
        ControlRating: {
          EN: reduce(this.ControlRating.EN, testWordReducer, 0),
          DE: reduce(this.ControlRating.DE, testWordReducer, 0),
          FR: reduce(this.ControlRating.FR, testWordReducer, 0)
        },
        langSelfRating: '',
        langControlRating: '',
        langResult: ''
      }

      this.results.langSelfRating = minKeysValues(['EN', 'DE', 'FR'], this.results.SelfRating)

      this.results.langControlRating = minKeysValues(['EN', 'DE', 'FR'], this.results.ControlRating)

      this.results.langResult = this.results.langControlRating

      this.setTestResult(this.results)
    }
  }
}
</script>

<style>
</style>
