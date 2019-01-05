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

export default {
  name: 'SelfRatingComponent',
  mixins: [TestMixin],
  components: {SelfLanguageRating},
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
        self: 0,
        control: 0
      }
    }
  },

  methods: {
    onChangedSelfRating (values) {
      this.SelfRating[this.dictionaryFilter.lang1] = values
    },
    onChangedControlRating (values) {
      this.ControlRating[this.dictionaryFilter.lang1] = values
    },

    playPhase_3 () {

    }
  }
}
</script>

<style>
</style>
