<template>
  <div class="row no-wrap">

    <div class="col">
      <div class="row no-wrap words-row" v-for="i in 25" :key="i">
        <div class="col left-word1">{{leftWords[i-1].word1}}</div>
      </div>
    </div>

      <Container
        v-if="leftWords"
        class="col q-mr-sm q-ml-sm"
        group-name="left_1"
        behaviour="copy"
        :get-child-payload="getChildPayloadLeft_1"
        :should-accept-drop="shouldAcceptDropToLeft"
        @drop="onDrop('left_1', $event)">

          <Draggable class="row no-wrap words-row"  v-for="i in 25" :key="i">
            <div class="col left-word2 q-ml-md">{{leftWords[i-1].word2}}</div>
          </Draggable>

      </Container>

    <div class="col">
      <div class="row no-wrap words-row" v-for="i in 25" :key="i">
        <div class="col left-word1">{{leftWords[i+25-1].word1}}</div>
      </div>
    </div>

    <Container
      v-if="leftWords"
      class="col q-mr-sm q-ml-sm"
      group-name="left_2"
      behaviour="copy"
      :get-child-payload="getChildPayloadLeft_2"
      :should-accept-drop="shouldAcceptDropToLeft"
      @drop="onDrop('left_2', $event)">
      <Draggable class="row no-wrap words-row"  v-for="i in 25" :key="i">
        <div class="col left-word2 q-ml-md">{{leftWords[i+25-1].word2}}</div>
      </Draggable>

    </Container>

    <div class="col"></div>

    <Container
      v-if="rightWords"
      class="col q-mr-sm q-ml-sm"
      group-name="right_1"
      behaviour="copy"
      :get-child-payload="getChildPayloadRight_1"
      :should-accept-drop="shouldAcceptDropToRight"
      @drop="onDrop('1-25', $event)">
      <Draggable class="row no-wrap words-row"  v-for="i in 25" :key="i">
        <div class="col right-word2 draggable-item">{{rightWords[i-1].word2}}</div>
      </Draggable>
    </Container>

    <Container
      v-if="rightWords"
      class="col q-mr-sm q-ml-sm"
      group-name="right_2"
      behaviour="copy"
      :get-child-payload="getChildPayloadRight_2"
      :should-accept-drop="shouldAcceptDropToRight"
      @drop="onDrop('26-50', $event)">
      <Draggable class="row no-wrap words-row"  v-for="i in 25" :key="i">
        <div class="col right-word2 draggable-item">{{rightWords[i+25-1].word2}}</div>
      </Draggable>
    </Container>

  </div>

</template>

<script>

/*

    <div class="col-6">
      <div class="row no-wrap words-row" v-for="i in 25" :key="i">
        <div class="col left-word1">{{leftWords[i-1].word1}}</div>
        <div class="col left-word2 q-ml-md" :id="i">{{leftWords[i-1].word2}}</div>
        <div class="col left-word1">{{leftWords[i+25-1].word1}}</div>
        <div class="col left-word2  q-ml-md" :id="i+25">{{leftWords[i+25-1].word2}}</div>
      </div>
    </div>

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
      leftWords: [{}],
      rightWords: [{}],
      checkedWordsPairs: []
    }
  },
  methods: {
    shouldAcceptDropToLeft (sourceContainerOptions, payload) {
      // console.log('shouldAcceptDropToLeft')
      // console.log(sourceContainerOptions)
      // console.log(payload)
      return sourceContainerOptions.groupName === 'right_1' || sourceContainerOptions.groupName === 'right_2'
    },
    shouldAcceptDropToRight (sourceContainerOptions, payload) {
      // console.log('shouldAcceptDropToRight')
      // console.log(sourceContainerOptions)
      // console.log(payload)
      return sourceContainerOptions.groupName === 'left_1' || sourceContainerOptions.groupName === 'left_2'
    },
    onDrop (collection, dropResult) {
      // this[collection] = applyDrag(this[collection], dropResult)
      console.log('onDrop')
      console.log(collection)
      console.log(dropResult)
    },
    getChildPayloadLeft_1 (index) {
      return this.leftWords[index]
    },
    getChildPayloadLeft_2 (index) {
      return this.leftWords[index + 25]
    },
    getChildPayloadRight_1 (index) {
      return this.rightWords[index]
    },
    getChildPayloadRight_2 (index) {
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
