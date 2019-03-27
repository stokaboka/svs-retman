<template>
  <div class="self-rating-container">
    <div class="row">
      <div v-for="column in columns"
           class="q-pl-sm q-pr-sm row"
           :class="{
           'col': column.id < 4,
           'col-7': column.id === 4,
           'justify-center': column.id < 4,
           'justify-start': column.id === 4
           }"
           :key="column.id">
        <span class="text-weight-bold">{{column.header}}</span>
      </div>
    </div>
    <div v-for="level in levels" :key="level.id" class="row row-levels">
      <div v-for="column in columns"
           class="q-pl-sm q-pr-sm row"
           :class="{
           'col': column.id < 4,
           'col-7': column.id === 4,
           'justify-center': column.id < 4,
           'justify-start': column.id === 4
           }"
           :key="column.id">
        <q-checkbox
          v-if="column.id < 4"
          :val="level"
          v-model="checked[column.lang]"
          @input="levelChecked"
          class="q-ml-sm q-mr-sm"
        >
        </q-checkbox>
        <span v-if="column.id === 4">{{level.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
  name: 'SelfLanguageRating',
  data () {
    return {
      title: 'Самооценка речевых навыков в общенении на английском, немецком и французском языках',
      checked: {
        EN: [],
        DE: [],
        FR: []
      }
    }
  },
  computed: {
    ...mapGetters('beginners', {levels: 'selfRatingLevels', columns: 'selfRatingColumns'})
  },
  methods: {
    levelChecked () {
      this.$emit('exercies-action', {id: 'changed-self-rating', data: this.checked})
    }
  }
}
</script>

<style>
  .row-levels {
    margin: 0.4rem 0;
    border-bottom: #d9d9d9 solid 1px;
  }

  .row-levels:hover {
    background-color: deepskyblue;
  }

  .self-rating-container {
    width: 75vw;
  }

</style>
