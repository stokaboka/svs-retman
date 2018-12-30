<template>
  <section>
    <div>
      <h5>{{phase.title}}</h5>
      <div v-html="phase.briefText"></div>
    </div>

    <div class="row no-wrap justify-between q-mt-md">
      <div class="col"></div>
      <q-btn
        color="primary"
        :label="startLabel"
        @click="startTest"
        class="col"
      ></q-btn>
      <div class="col"></div>
      <q-btn
        label="Звук есть"
        color="secondary"
        @click="setTestResult(true)"
        class="col"
      ></q-btn>
      <div class="col"></div>
      <q-btn
        label="Звук НЕ работает"
        @click="setTestResult(false)"
        class="col"
      ></q-btn>
      <div class="col"></div>
    </div>
  </section>
</template>

<script>
/*
    <h3>{{step.title}}</h3>
    <h4>{{step.briefText}}</h4>
 */
import {createNamespacedHelpers} from 'vuex'

import AudioHelper from '../../lib/AudioHelper'
const audio = new AudioHelper()

const { mapState, mapGetters, mapActions } = createNamespacedHelpers('beginners')

export default {
  name: 'TestSoundComponent',

  mounted () {
    audio.init(this.api, this.sound)
  },

  data () {
    return {
      tested: false,
      audio: audio
    }
  },

  computed: {
    startLabel () {
      return this.audio.playing ? 'Остановить звук' : 'звуковой тест'
    },
    ...mapGetters(['step', 'phases', 'phase', 'soundTestResult']),
    ...mapState([ 'api', 'sound', 'error' ])
  },

  methods: {

    start () {
    },

    setTestResult (value) {
      audio.stop()
      this.$emit('fixStep', value)
    },

    startTest () {
      if (audio.playing) {
        audio.stop()
      } else {
        audio.sounds(this.phase.testSounds).mode(this.phase.testModeSounds).play()
      }
    },
    ...mapActions(['nextStep', 'nextPhase', 'fixStep', 'fixPhase'])
  }
}
</script>

<style>
</style>
