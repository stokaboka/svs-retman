<template>
  <div>
    <h1>{{step.title}}</h1>
    <h2>{{step.briefText}}</h2>

    <div>
      <h3>{{phase.title}}</h3>
      <h4>{{phase.briefText}}</h4>
    </div>

    <div>
      <q-btn
        :lable="startLabel"
        @click="startSoundTest"
      ></q-btn>
    </div>
  </div>
</template>

<script>

import {createNamespacedHelpers} from 'vuex'
const { mapState, mapGetters, mapActions } = createNamespacedHelpers('beginners')

export default {
  name: 'TestSoundComponent',

  mounted () {
    this.getPhaseByStep(1)
  },

  data () {
    return {
      playing: false,
      audio: null
    }
  },

  computed: {
    startLabel () {
      return this.playing ? 'Остановить' : 'Звуковой тест'
    },
    ...mapGetters(['step', 'phases', 'phase']),
    ...mapState([ 'api', 'sound', 'error' ])
  },

  methods: {
    playSound (sound) {
      if (sound) {
        const snd = `${this.api}/${this.sound}/${sound}`
        this.audio = new Audio(snd)
        this.audio.play()
        this.playing = true
      }
    },

    stopSound () {
      if (this.audio) {
        this.audio.stop()
        this.playing = false
      }
    },

    startSoundTest () {
      if (this.phase.testSound1) {
        this.playSound(this.phase.testSound1)
      } else if (this.phase.testSound2) {
        this.playSound(this.phase.testSound2)
      }
    },
    ...mapActions(['getPhaseByStep'])
  }
}
</script>

<style>
</style>
