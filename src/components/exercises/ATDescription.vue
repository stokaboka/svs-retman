<!--
  - Copyright (c) 2019. Igor Khorev http://orangem.me igorhorev@gmail.com
  -->

<template>
  <div class="gallery-wrapper ">
          <q-carousel
            color="white"
            arrows
            animation
            infinite
            :autoplay="autoplay"
            :easing="easing"
            :swipe-easing="easing"
            height="400px"
          >
            <q-carousel-slide img-src="statics/assets/coachman.jpg">
              <div class="absolute-bottom custom-caption">
                <div class="q-display-1">положение "кучер"</div>
              </div>
            </q-carousel-slide>
            <q-carousel-slide img-src="statics/assets/chair.jpg">
              <div class="absolute-bottom custom-caption">
                <div class="q-display-1">положение "полулежа"</div>
              </div>
            </q-carousel-slide>
          </q-carousel>
  </div>
</template>

<script>

import { easing } from 'quasar'

export default {
  name: 'ATDescription',
  props: {
    audio: {
      type: Object,
      default () {
        return {}
      },
      required: true
    }
  },
  data () {
    return {
      easing: easing.sharp,
      autoplay: true
    }
  },
  mounted () {
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
          break
      }
    }
  }
}

</script>

<style scoped>
.gallery-wrapper {
  width: 500px;
  border-radius: 3px;
  border: 1px solid lightgrey;
  overflow: hidden;
}
</style>
