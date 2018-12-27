<template>
  <q-stepper ref="stepper" contractable alternative-labels>
    <q-step
      v-for="s in steps"
      title=""
      active-icon="play_arrow"
      :key="s.id"
      :name="s.id"
      :order="s.id"
    >
    </q-step>
  </q-stepper>
</template>

<script>

/*
      <q-stepper-navigation>
        <h3>{{s.title}}</h3>
        <h4>{{s.briefText}}</h4>
      </q-stepper-navigation>
 */

import {createNamespacedHelpers} from 'vuex'
const { mapState, mapGetters, mapActions } = createNamespacedHelpers('beginners')

export default {
  name: 'StepStepperComponent',

  mounted () {
    // this.getSteps()
  },

  data () {
    return {}
  },

  computed: {
    ...mapGetters(['steps', 'step']),
    ...mapState([ 'error' ])
  },

  methods: {
    ...mapActions(['getSteps'])
  },

  watch: {
    step (val, oldVal) {
      this.$refs.stepper.goToStep(val.id)
    }
  }
}
</script>

<style>
  .q-stepper-step-inner {
    display: none;
  }
</style>
