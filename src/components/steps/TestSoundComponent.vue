<template>
  <section>
    <div>
      <h5>{{phase.title}}</h5>
      <div v-html="phase.briefText"></div>
    </div>

    <div>
      <q-btn
        color="primary"
        :label="startLabel"
        @click="startTest"
      ></q-btn>

      <q-btn
        label="Звук есть"
        color="secondary"
        @click="setTestResult(true)"
      ></q-btn>

      <q-btn
        label="Звук НЕ работает"
        @click="setTestResult(false)"
      ></q-btn>

    </div>
  </section>
</template>

<script>
/*
    <h3>{{step.title}}</h3>
    <h4>{{step.briefText}}</h4>
 */
import {createNamespacedHelpers} from 'vuex'
const { mapState, mapGetters, mapActions } = createNamespacedHelpers('beginners')

export default {
  name: 'TestSoundComponent',

  data () {
    return {
      playing: false,
      audio: null,
      tested: false
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

    setTestResult (value) {
      this.$emit('fixStep', value)
    },

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
        this.audio.pause()
        this.playing = false
      }
    },

    startTest () {
      if (this.playing) {
        this.stopSound()
      } else {
        if (this.phase.testSound1) {
          this.playSound(this.phase.testSound1)
        } else if (this.phase.testSound2) {
          this.playSound(this.phase.testSound2)
        }
      }
    },
    ...mapActions(['nextStep', 'nextPhase', 'fixStep', 'fixPhase'])
  }
}
</script>

<style>
</style>
