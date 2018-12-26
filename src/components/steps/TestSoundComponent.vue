<template>
  <section>
    <h3>{{step.title}}</h3>
    <h4>{{step.briefText}}</h4>

    <div>
      <h5>{{phase.title}}</h5>
      <h6>{{phase.briefText}}</h6>
    </div>

    <div>
      <q-btn
        :label="startLabel"
        @click="startTest"
      ></q-btn>

      <q-btn
        label="Звук есть"
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

import {createNamespacedHelpers} from 'vuex'
const { mapState, mapGetters, mapActions } = createNamespacedHelpers('beginners')

export default {
  name: 'TestSoundComponent',

  mounted () {
    this.getPhasesByStep(1)
  },

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

    next (test) {
      this.fixPhase(this.phase, test)
      this.fixStep(this.step, test)

      this.$root.$emit('nextStep', test)
    },

    setTestResult (value) {
      this.$store.commit('beginners/setSoundTestResult', value)
      this.next(value)
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
    ...mapActions(['getPhasesByStep', 'nextStep', 'nextPhase', 'fixStep', 'fixPhase'])
  }
}
</script>

<style>
</style>
