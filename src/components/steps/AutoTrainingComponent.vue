<template>
  <section>
    <div>
      <h6>{{phase.title}}</h6>
      <div v-html="phase.briefText"></div>
    </div>

  </section>
</template>

<script>

import TestMixin from './mixins/TestMixin'

// import {createNamespacedHelpers} from 'vuex'
// const { mapState, mapGetters, mapActions } = createNamespacedHelpers('beginners')

export default {
  name: 'AutoTrainingComponent',
  mixins: [TestMixin],
  data () {
    return {
      phaseComponent: [
        'TwoColumnWordsWithCheckBox',
        'TwoColumnWordsWithMoveWords'
      ],

      results: {
        before: {},
        after: {}
      }
    }
  }
}
</script>

<style>
</style>
