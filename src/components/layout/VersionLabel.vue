<template>
  <div>v{{ version }}</div>
</template>

<script>

import {createNamespacedHelpers} from 'vuex'
const { mapGetters } = createNamespacedHelpers('beginners')

export default {
  name: 'VersionLabel',
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['version'])
  }
}
</script>

<style>
</style>
