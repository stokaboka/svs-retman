<template>
  <div>
    <video :src="video" autoplay>
      Sorry, your browser doesn't support embedded videos.
    </video>
  </div>
</template>

<script>
export default {
  name: 'AutoTraining',
  props: {
    video: {
      type: String,
      default () {
        return ''
      },
      required: true
    }
  }
}
</script>

<style scoped>
  video {
    width: 100%;
  }
</style>
