<template>
  <section>
  <div>
    <h5>{{phase.title}}</h5>
    <div v-html="phase.briefText"></div>
  </div>

  <div>
    <q-btn
      label="Продолжить"
      color="primary"
      @click="setTestResult(true)"
    ></q-btn>

  </div>
  </section>
</template>

<script>

import {createNamespacedHelpers} from 'vuex'
const { mapState, mapGetters, mapActions } = createNamespacedHelpers('beginners')

export default {
  name: 'DescriptionMethodComponent',

  data () {
    return {}
  },

  computed: {
    startLabel () {
      return this.playing ? 'Остановить' : 'Звуковой тест'
    },
    ...mapGetters(['step', 'phases', 'phase', 'soundTestResult']),
    ...mapState([ 'api', 'sound', 'error' ])
  },

  methods: {

    setTestResult (value) {
      this.$emit('fixStep', value)
    },

    ...mapActions(['nextStep', 'nextPhase', 'fixStep', 'fixPhase'])
  }

}
</script>

<style>
</style>
