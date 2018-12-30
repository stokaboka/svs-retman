<template>
  <div class="row no-wrap">

    <div class="col-6">
      <div class="row no-wrap words-row" v-for="i in 25" :key="i">
        <div class="col left-word1">{{leftWords[i-1].word1}}</div>
        <div class="col left-word2 q-ml-md" :id="i">{{leftWords[i-1].word2}}</div>
        <div class="col left-word1">{{leftWords[i+25-1].word1}}</div>
        <div class="col left-word2  q-ml-md" :id="i+25">{{leftWords[i+25-1].word2}}</div>
      </div>
    </div>

    <div class="col"></div>

    <Container
      class="col q-mr-sm q-ml-sm"
      group-name="rightwords1"
      :get-child-payload="getChildPayload1"
      :should-accept-drop="shouldAcceptDrop"
      @drop="onDrop('1-25', $event)">
      <Draggable class="row no-wrap words-row"  v-for="i in 25" :key="i">
        <div class="col right-word2 draggable-item">{{rightWords[i-1].word2}}</div>
      </Draggable>
    </Container>

    <Container
      class="col q-mr-sm q-ml-sm"
      group-name="rightwords2"
      :get-child-payload="getChildPayload2"
      @drop="onDrop('26-50', $event)">
      <Draggable class="row no-wrap words-row"  v-for="i in 25" :key="i">
        <div class="col right-word2 draggable-item">{{rightWords[i+25-1].word2}}</div>
      </Draggable>
    </Container>

  </div>

</template>

<script>

/*
    <div class="col-5">
      <div class="row no-wrap words-row" v-for="i in 25" :key="i">
        <div class="col right-word2">{{rightWords[i-1].word2}}</div>
        <div class="col right-word2  q-ml-md">{{rightWords[i+25-1].word2}}</div>
      </div>
    </div>
 */

import { Container, Draggable } from 'vue-smooth-dnd'

export default {
  name: 'TwoColumnWordsWithMoveWords',
  components: {Container, Draggable},
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
      leftWords: [],
      rightWords: [],
      checkedWordsPairs: []
    }
  },
  methods: {
    shouldAcceptDrop (sourceContainerOptions, payload) {
      console.log('shouldAcceptDrop')
      console.log(sourceContainerOptions)
      console.log(payload)
      return (sourceContainerOptions.groupName === 'leftwords1' || sourceContainerOptions.groupName === 'leftwords2')
    },
    onDrop (collection, dropResult) {
      // this[collection] = applyDrag(this[collection], dropResult)
      console.log('onDrop')
      console.log(collection)
      console.log(dropResult)
    },
    getChildPayload1 (index) {
      return this.rightWords[index]
    },
    getChildPayload2 (index) {
      return this.rightWords[index + 25]
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
          if (a.word2 > b.word2) {
            return 1
          }
          if (a.word2 < b.word2) {
            return -1
          }
          return 0
        })
    },

    wordPairChecked () {
      this.$emit('word-pair-checked', this.checkedWordsPairs)
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
    height: 20px;
  }
  /*.left-word2::before {*/
    /*content: '-';*/
  /*}*/

  .right-word2 {
    border: solid 1px #999;
    min-width: 50px;
    height: 20px;
    cursor: pointer;
  }

  .words-row {
    height: 22px;
  }

</style>
