<template>
  <div v-if="ready" class="row no-wrap justify-around" style="width: 75vw">

    <div class="col-6">
      <div class="row no-wrap justify-between" v-for="i in 25" :key="i">
        <div class="word-pair__left-container">{{dictionary[i-1].word1}}</div>
        <div class="word-pair__checkbox-container">

          <q-checkbox
            :val="i"
            v-model="checkedWordsPairs"
            @input="wordPairChecked"
          >
          </q-checkbox>

        </div>
        <div class="word-pair__right-container">{{dictionary[i-1].word2}}</div>
      </div>
    </div>

    <div class="col-6">
      <div class="row no-wrap justify-between" v-for="i in 25" :key="i">
        <div class="word-pair__left-container">{{dictionary[i+25-1].word1}}</div>
        <div class="word-pair__checkbox-container">

          <q-checkbox
            :val="i+25"
            v-model="checkedWordsPairs"
            @input="wordPairChecked"
          >
          </q-checkbox>

        </div>
        <div class="word-pair__right-container">{{dictionary[i+25-1].word2}}</div>
      </div>
    </div>

  </div>

</template>

<script>

export default {
  name: 'TwoColumnWordsWithCheckBox',
  props: {
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
      checkedWordsPairs: []
    }
  },
  computed: {
    ready () {
      return this.dictionary && this.dictionary.length > 0
    }
  },
  methods: {
    wordPairChecked () {
      const data = this.checkedWordsPairs.map(e => {
        const d = this.dictionary[e - 1]
        return {word1: d.word1, word2: d.word2}
      })
      this.$emit('exercies-action', {id: 'word-pair-checked', data})
    }
  }
}
</script>

<style scoped>

  .word-pair__column {
    min-width: 270px;
  }

  .word-pair__checkbox-container {
    width: 20px;
  }

  .word-pair__left-container {
    width: 30rem;
    text-align: end;
    margin-right: 0.5rem;
  }

  .word-pair__right-container {
    width: 30rem;
    text-align: start;
    margin-left: 0.5rem;
  }
</style>
