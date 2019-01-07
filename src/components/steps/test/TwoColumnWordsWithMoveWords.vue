<template>
  <div>
      <div class="row no-wrap words-row" v-for="i in 25" :key="i">

        <div class="col left-word1">{{leftWords[i-1].word1}}</div>

        <drop @drop="onDrop(i-1, ...arguments)" class="col left-word2 q-ml-md">
          {{leftWords[i-1].word2}}
        </drop>
        <q-btn
          :disable="!leftWords[i-1].word2"
          icon="close"
          size="xs"
          flat
          @click="onRemoveWordFromLeft(leftWords[i-1].word2)">
        </q-btn>

        <div class="col left-word1">{{leftWords[i+25-1].word1}}</div>

        <drop @drop="onDrop(i+25-1, ...arguments)" class="col left-word2 q-ml-md">
          {{leftWords[i+25-1].word2}}
        </drop>
        <q-btn
          :disable="!leftWords[i+25-1].word2"
            icon="close"
            size="xs"
            flat
            @click="onRemoveWordFromLeft(leftWords[i+25-1].word2)">
        </q-btn>

        <div class="col"></div>
        <drag
          class="col right-word2"
          :transfer-data="rightWords[i-1].word2">
          {{rightWords[i-1].word2}}
        </drag>

        <drag
          class="col right-word2 q-ml-md"
          :transfer-data="rightWords[i+25-1].word2">
          {{rightWords[i+25-1].word2}}
        </drag>

      </div>
  </div>
</template>

<script>
import { Drag, Drop } from 'vue-drag-drop'
import {TouchDragDrop} from '../../../directives'

export default {
  name: 'TwoColumnWordsWithMoveWords',
  components: { Drag, Drop },
  directives: {TouchDragDrop},
  props: {
    dictionary: {
      type: Array,
      default () {
        return []
      },
      required: true
    }
  },

  mounted () {
    this.init()
  },

  data () {
    return {
      leftWords: [{}],
      rightWords: [{}],
      checkedWordsPairs: []
    }
  },

  methods: {

    onDrop (index, data, event) {
      const wrd2 = Object.assign({}, this.leftWords[index], {word2: data})
      this.$set(this.leftWords, index, wrd2)
      this.hideWordOnLeft(data)
      this.wordPairRemembered()
    },

    onRemoveWordFromLeft (word) {
      this.showWordOnLeft(word)
      this.hideWordOnRight(word)
      this.wordPairRemembered()
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
            word2: ''
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
          if (a.word2.toUpperCase() > b.word2.toUpperCase()) {
            return 1
          }
          if (a.word2.toUpperCase() < b.word2.toUpperCase()) {
            return -1
          }
          return 0
        })
    },

    wordPairRemembered () {
      this.$emit('word-pair-remembered', this.leftWords)
    }
  },

  watch: {
    dictionary: function (val) {
      if (val) {
        this.init()
      }
    }
  }
}
</script>

<style>
.left-word1 {
  text-align: right;
}

  .left-word2 {
    border: solid 1px #999;
    min-width: 50px;
    height: 26px;
    padding: 0 3px 0 3px;
  }

  .right-word2 {
    border: solid 1px #999;
    min-width: 50px;
    height: 26px;
    cursor: pointer;
    text-align: center;
  }

  .words-row {
    height: 26px;
    margin-bottom: 3px;
  }

</style>
