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
import AudioHelper from '../../lib/AudioHelper'
const audio = new AudioHelper()
const { mapState, mapGetters, mapActions } = createNamespacedHelpers('beginners')

export default {
  name: 'DescriptionMethodComponent',

  mounted () {
    audio.init(this.api, this.sound)
  },

  data () {
    return {
      phaseMode: 'brief'
    }
  },

  computed: {

    startLabel () {
      return this.playing ? 'Остановить' : 'Звуковой тест'
    },
    ...mapGetters(['step', 'phases', 'phase', 'soundTestResult']),
    ...mapState([ 'api', 'sound', 'error' ])
  },

  methods: {

    start () {
      this.playPhase()
    },

    playPhase () {
      audio.sounds(this.phase.briefSounds).play()
    },

    setTestResult (value) {
      audio.stop()
      this.$emit('fixStep', value)
    },

    ...mapActions(['nextStep', 'nextPhase', 'fixStep', 'fixPhase'])
  }

}
</script>

<style>
</style>
