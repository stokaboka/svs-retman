<template>
  <div class="row no-wrap justify-between">

    <div class="col-auto"></div>
    <div class="col-3">
      <div class="row no-wrap justify-between" v-for="i in 25" :key="i">
        <div class="col-5">{{dictionary[i-1].word1}}</div>
        <div class="col-2">

          <q-checkbox
            :val="i"
            v-model="checkedWordsPairs"
            @input="wordPairChecked"
          >
          </q-checkbox>

        </div>
        <div class="col-5">{{dictionary[i-1].word2}}</div>
      </div>
    </div>

    <div class="col-auto"></div>

    <div class="col-3">
      <div class="row no-wrap justify-between" v-for="i in 25" :key="i">
        <div class="col-5">{{dictionary[i+25-1].word1}}</div>
        <div class="col-2">

          <q-checkbox
            :val="i+25"
            v-model="checkedWordsPairs"
            @input="wordPairChecked"
          >
          </q-checkbox>

        </div>
        <div class="col-5">{{dictionary[i+25-1].word2}}</div>
      </div>
    </div>
    <div class="col-auto"></div>

  </div>

</template>

<script>
/*
          <input type="checkbox"
            :id="i"
            :value="i"
            v-model="checkedWordsPairs"
            @change="wordPairChecked">
   */
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
  methods: {
    wordPairChecked () {
      this.$emit('word-pair-checked', this.checkedWordsPairs)
    }
  }
}
</script>

<style>
</style>
