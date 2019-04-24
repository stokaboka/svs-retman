<template>
  <div>v{{ version }}</div>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
  name: 'VersionLabel',
  data () {
    return {}
  },
  computed: {
    ...mapGetters('app', ['version'])
  }
}
</script>

<style>
</style>
