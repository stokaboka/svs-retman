<template>
  <div class="row no-wrap items-center justify-between">
    <q-btn flat class="col" :label="timer.passedTime"></q-btn>
    <q-progress
      v-if="timer.active"
      :percentage="timer.progress"
      animate
      class="col-10 self-center"
      style="height: 4px"
    ></q-progress>
    <q-btn flat class="col" :label="timer.leftTime"></q-btn>
  </div>
</template>

<script>
export default {
  name: 'TimeProgress',

  props: {
    timer: {
      type: Object,
      required: true
    }
  },

  data () {
    return {}
  }
}
</script>

<style>
</style>
