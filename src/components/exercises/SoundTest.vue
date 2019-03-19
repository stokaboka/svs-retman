<template>
  <section>

    <div class="row no-wrap justify-between q-mt-md">
      <q-btn
        color="primary"
        :label="startLabel"
        @click="startTest"
        class="col snd-btn"
      ></q-btn>
      <q-btn
        label="Звук есть"
        color="secondary"
        @click="setTestResult(true)"
        class="col snd-btn"
      ></q-btn>
      <q-btn
        label="Звук НЕ работает"
        @click="setTestResult(false)"
        class="col snd-btn"
      ></q-btn>
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
      this.$emit('exercies-action', {id: 'fix-phase', data: value})
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
  .snd-btn {
    margin: 0 1rem;
  }
</style>
