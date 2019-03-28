<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header v-if="headerVivible">
      <q-toolbar
        color="white"
        :text-color="color">

        <q-toolbar-title>
          {{title}}
          <version-label slot="subtitle"></version-label>
        </q-toolbar-title>

        <span v-if="user">{{user.login}}</span>

        <q-tabs color="white">
          <q-route-tab slot="title" :color="color" icon="home" to="/about" replace hide="icon" label="Home" ></q-route-tab>
          <user-log-in-out-button :color="color" slot="title"></user-log-in-out-button>
        </q-tabs>

      </q-toolbar>
    </q-layout-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>

/*
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
 */
import { mapGetters } from 'vuex'

import { openURL } from 'quasar'
import VersionLabel from '../components/VersionLabel'
import UserLogInOutButton from '../components/UserLogInOutButton'

export default {
  name: 'Main',
  components: {UserLogInOutButton, VersionLabel},
  data () {
    return {
      color: 'indigo-10',
      // leftDrawerOpen: this.$q.platform.is.desktop
      leftDrawerOpen: false,
      headerVivible: true
    }
  },

  computed: {
    ...mapGetters('beginners', ['title']),
    ...mapGetters('auth', ['isLogged', 'user'])
  },

  methods: {
    openURL
  },

  watch: {
    '$q.fullscreen.isActive' (val) {
      console.log(val ? 'In fullscreen now' : 'Exited fullscreen')
      this.headerVivible = !val
    }
  }
}
</script>

<style>
</style>
