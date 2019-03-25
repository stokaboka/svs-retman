<template>
  <div>
    <gallery class="gallery" path="/statics/assets"></gallery>
  </div>
</template>

<script>
import Gallery from '../Gallery'
export default {
  name: 'AutoTraining',
  components: {Gallery},
  props: {
    audio: {
      type: Object,
      required: true
    }
  },
  mounted () {
    if (this.$q.fullscreen.isCapable && !this.$q.fullscreen.isActive) {
      this.$q.fullscreen.request()
      this.$q.fullscreen.toggle()
    }

    this.audio
      .on('START', this.audioHandler)
      .on('PROGRESS', this.audioHandler)
      .on('COMPLETE', this.audioHandler)
  },

  methods: {
    audioHandler (event) {
      switch (event.event) {
        case 'START' :
          break
        case 'PROGRESS' :
          break
        case 'COMPLETE' :
          if (this.$q.fullscreen.isCapable && this.$q.fullscreen.isActive) {
            this.$q.fullscreen.exit()
          }
          this.$emit('exercies-action', {id: 'do-next-action', data: null})
          break
      }
    }
  }
}
</script>

<style scoped>
  .gallery {
    margin: 0;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
</style>
