<template>
  <q-layout view="lHh Lpr lFf" class="main-layout-container">

    <main-header v-if="headerVivible"/>

    <q-page-container class="main-page-container">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import MainHeader from '../components/layout/MainHeader'

export default {
  name: 'Main',
  components: {MainHeader},
  data () {
    return {
      leftDrawerOpen: false,
      headerVivible: true
    }
  },

  mounted () {
    this.signin()
  },

  methods: {
    ...mapActions('auth', ['signin'])
  },
  computed: {
    ...mapGetters('beginners', ['title'])
  },

  watch: {
    '$q.fullscreen.isActive' (val) {
      this.headerVivible = !val
    }
  }
}
</script>

<style>
  .main-layout-container {
    width: 100vw;
    padding: 0;
  }
  .main-page-container {
    padding-top: 0;
  }
</style>
