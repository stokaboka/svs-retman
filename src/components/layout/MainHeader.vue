<template>
  <q-layout-header>
    <q-toolbar
      color="white"
      :text-color="color">

      <q-toolbar-title>
        {{title}}
        <version-label slot="subtitle"></version-label>
      </q-toolbar-title>

      <span v-if="user">{{user.login}}</span>

      <q-tabs color="white">
        <q-route-tab slot="title" :color="color" icon="home" to="/about" replace hide="icon" label="Главная" ></q-route-tab>
        <user-log-in-out-button :color="color" slot="title"></user-log-in-out-button>
      </q-tabs>

    </q-toolbar>
  </q-layout-header>
</template>

<script>
import { mapGetters } from 'vuex'

import VersionLabel from './VersionLabel'
import UserLogInOutButton from './UserLogInOutButton'

export default {
  name: 'MainHeader',
  components: {UserLogInOutButton, VersionLabel},
  props: {
    color: {
      type: String,
      default () {
        return 'dark'
      }
    }
  },
  computed: {
    ...mapGetters('beginners', ['title']),
    ...mapGetters('auth', ['isLogged', 'user'])
  }
}
</script>

<style scoped>

</style>
