<template>

  <div class="stepper-wrapper">
    <div v-for="stp in steps" :key="stp.id" class="stepper-step">
      <q-icon
        v-if="stp.id < step.id"
        name="check_circle_outline"
        :color="stepIconColor(stp)"
        size="2rem"/>
      <q-icon
        v-if="stp.id === step.id"
        name="play_circle_outline"
        :color="stepIconColor(stp)"
        size="2rem"/>
      <q-icon
        v-if="step.id < stp.id"
        name="label_important_outline"
        :color="stepIconColor(stp)"
        size="2rem"/>
      <div v-if="step.id === stp.id" class="stepper-step__title">
        {{stp.title}}
      </div>
    </div>
  </div>

</template>

<script>

/*
  <q-stepper v-if="steps" ref="stepper" contractable alternative-labels>
    <q-step
      v-for="stp in steps"
      active-icon="play_arrow"
      :title="stp.title"
      :key="stp.id"
      :name="stp.id"
      :order="stp.id"
    >
    </q-step>
  </q-stepper>
   */

import {createNamespacedHelpers} from 'vuex'
const { mapState, mapGetters, mapActions } = createNamespacedHelpers('beginners')

export default {
  name: 'StepStepperComponent',

  data () {
    return {}
  },

  computed: {
    ...mapGetters(['steps', 'step']),
    ...mapState([ 'error' ])
  },

  methods: {
    stepIconColor (stp) {
      if (stp.id < this.step.id) {
        return 'green'
      }

      if (stp.id === this.step.id) {
        return 'red'
      }
      if (this.step.id < stp.id) {
        return 'blue'
      }
    },
    ...mapActions(['getSteps', 'gotoStep'])
  }

  // watch: {
  //   step (val, oldVal) {
  //     if (val) {
  //       this.$refs.stepper.goToStep(val.id)
  //     }
  //   }
  // }
}
</script>

<style>
  .q-stepper-step-inner {
    display: none;
  }

  .stepper-wrapper {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
  }

  .stepper-step {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    margin: 3px 9px;
  }

  .stepper-step__title {
    padding: 3px 6px;
  }
</style>
