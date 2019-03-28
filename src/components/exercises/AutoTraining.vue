<template>
  <div class="gallery-container">
    <gallery class="gallery" path="/statics/assets" :images="images"></gallery>
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
  data () {
    return {
      images: [
        '1.jpg',
        '2.jpg',
        '3.jpg',
        '4.jpg',
        '5.jpg',
        '6.jpg',
        '7.jpg',
        '7.jpg',
        '8.jpg',
        '10.jpg',
        '11.jpg',
        '12.jpg',
        '13.jpg',
        '14.jpg',
        '15.jpg',
        '16.jpg',
        '17.jpg',
        '18.jpg',
        '19.jpg',
        '20.jpg'
      ]
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
  .gallery-container {
    margin: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .gallery {
    margin: 0;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
</style>
