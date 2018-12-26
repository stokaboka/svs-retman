<template>
  <q-page padding>
    <!-- content -->
  </q-page>
</template>

<script>

import {createNamespacedHelpers} from 'vuex'
const { mapState, mapGetters, mapActions } = createNamespacedHelpers('beginners')

export default {
  name: 'BeginnersPage',

  mounted () {
    this.getSteps()
  },

  computed: {

    step: {
      get () {
        return this.$store.state.beginners.step
      },
      set (value) {
        this.$store.commit('beginners/setStep', value)
      }
    },

    ...mapGetters(['steps']),
    ...mapState([ 'error' ])
  },

  methods: {
    ...mapActions(['getSteps'])
  }
}
</script>

<style>
</style>
