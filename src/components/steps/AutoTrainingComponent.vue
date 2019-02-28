<template>
  <section>

    <h6>{{phase.title}}</h6>

    <div
      v-if="isBriefMode"
      v-html="phase.briefText">
    </div>

    <div
      v-if="isCheckMode"
      v-html="phase.testText">
    </div>

    <component
      v-bind:is="testComponent"
      ref="testComponent"
      v-if="isCheckMode"
      class="component-container"
      :dictionary="dictionary"
      :video="video"
      @changed-self-rating="onChangedSelfRating"
      @changed-control-rating="onChangedControlRating"
    ></component>

    <q-btn
      class="button__next-phase"
      v-if="showNextBtn"
      label="Продолжить"
      color="primary"
      @click="doNextAction">
    </q-btn>
  </section>
</template>

<script>

import TestMixin from './mixins/TestMixin'
import AutoTrainingSelfTest from './test/auto_training/auto_training_self_test'
import AutoTraining from './test/auto_training/auto_training'

import {createNamespacedHelpers} from 'vuex'
const { mapGetters } = createNamespacedHelpers('beginners')

export default {
  name: 'AutoTrainingComponent',
  components: {
    AutoTraining,
    AutoTrainingSelfTest
  },
  mixins: [TestMixin],
  data () {
    return {
      phaseComponent: [
        'AutoTrainingSelfTest',
        'AutoTraining',
        'AutoTrainingSelfTest'
      ],

      results: {
        before: 0,
        after: 0
      }
    }
  },

  computed: {
    ...mapGetters('api'),
    video () {
      return `${this.api}/video/BigBuckBunny.mp4`
    }
  },

  methods: {
    onChangedSelfRating (level) {
      this.results.before = level
    },
    onChangedControlRating (level) {
      this.results.after = level
    }
  }
}
</script>

<style>
</style>
