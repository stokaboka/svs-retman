<template>
  <div class="rows-container">
    <div v-if="ready" class="row-container words-row" v-for="i in dictionaryLength" :key="i">

      <div class="left-word1">{{leftWords[i-1].word1}}</div>

        <drop @drop="onDrop(i-1, ...arguments)" class="left-word2 q-ml-md">
          {{leftWords[i-1].word2}}
        </drop>
      <div class="left-word2-container">
        <q-btn
          flat
          class="button__delete-variant"
          v-if="leftWords[i-1].word2"
          icon="highlight_off"
          size="md"
          color="red"
          @click="onRemoveWordFromLeft(leftWords[i-1].word2)">
        </q-btn>
      </div>

      <drag
        class="right-word2"
        :transfer-data="rightWords[i-1].word2">
        {{rightWords[i-1].word2}}
      </drag>

    </div>
  </div>
</template>

<script>

import { Drag, Drop } from 'vue-drag-drop'
import {TouchDragDrop} from '../../directives'

export default {
  name: 'ControlLanguageRating',
  components: { Drag, Drop },
  directives: {TouchDragDrop},
  props: {

    title: {
      type: String,
      default () {
        return ''
      },
      required: false
    },

    dictionary: {
      type: Array,
      default () {
        return []
      },
      required: true
    }

  },

  data () {
    return {
      ready: false,
      leftWords: [{word1: '', word2: ''}],
      rightWords: [{word1: '', word2: ''}]
    }
  },

  computed: {
    dictionaryLength () {
      return this.dictionary.length
    }
  },

  methods: {

    onDrop (index, data, event) {
      if (this.leftWords[index].word2) {
        this.onRemoveWordFromLeft(this.leftWords[index].word2)
      }
      const wrd2 = Object.assign({}, this.leftWords[index], {word2: data})
      this.$set(this.leftWords, index, wrd2)
      this.hideWordOnLeft(data)
      this.wordPairSelected()
    },

    onRemoveWordFromLeft (word) {
      this.showWordOnLeft(word)
      this.hideWordOnRight(word)
      this.wordPairSelected()
    },

    showWordOnLeft (word) {
      this.rightWords = this.rightWords.map((elem) => {
        return {
          word2: elem.hide === word ? elem.hide : elem.word2,
          hide: elem.hide
        }
      })
    },

    hideWordOnRight (word) {
      this.leftWords = this.leftWords.map((elem) => {
        return {
          word1: elem.word1,
          word2: elem.word2 === word ? '' : elem.word2
        }
      })
    },

    hideWordOnLeft (word) {
      this.rightWords = this.rightWords.map((elem) => {
        return {
          word2: elem.hide === word ? '' : elem.word2,
          hide: elem.hide
        }
      })
    },

    init () {
      this.leftWords = this.dictionary
        .map((elem) => {
          return {
            word1: elem.word1,
            word2: '',
            hide: elem.word2
          }
        })

      this.rightWords = this.dictionary
        .map(elem => {
          return {
            word2: elem.word2,
            hide: elem.word2
          }
        })
        .sort((a, b) => {
          if (a.word2 > b.word2) {
            return 1
          }
          if (a.word2 < b.word2) {
            return -1
          }
          return 0
        })
      this.ready = true
    },

    wordPairSelected () {
      this.$emit('exercies-action', {id: 'changed-control-rating', data: this.leftWords})
    }
  },

  watch: {
    dictionary () {
      this.init()
    }
  }
}
</script>

<style scoped>
  .rows-container {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }

  .row-container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    padding: 0 6rem;
  }

  .words-row {
    min-height: 26px;
    margin-bottom: 3px;
  }

  .left-word1 {
    text-align: right;
    width: 20vw;
  }

  .left-word2 {
    border: solid 1px #999;
    min-width: 50px;
    min-height: 26px;
    padding: 0 3px 0 3px;
    width: 20vw;
    background-color: white;
  }

  .right-word2 {
    border: solid 1px #999;
    min-width: 50px;
    min-height: 26px;
    cursor: pointer;
    text-align: center;
    width: 20vw;
    background-color: white;
  }
</style>
