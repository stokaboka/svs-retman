<template>
  <section>

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

import {createNamespacedHelpers} from 'vuex'

import AudioHelper from '../../lib/AudioHelper'
const audio = new AudioHelper()

const { mapState, mapGetters } = createNamespacedHelpers('beginners')

export default {
  name: 'SoundTest',

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
    ...mapGetters(['step', 'phases', 'phase']),
    ...mapState([ 'api', 'sound', 'error' ])
  },

  methods: {

    start () {
    },

    setTestResult (value) {
      audio.stop()
      this.$emit('fix-phase', value)
    },

    startTest () {
      if (audio.playing) {
        audio.stop()
      } else {
        audio
          .sounds(this.phase.sounds)
          .mode(this.phase.mode)
          .play()
      }
    }
  }
}
</script>

<style>
</style>
