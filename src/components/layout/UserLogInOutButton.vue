<template>
  <q-route-tab
    :icon="userIcon"
    :color="color"
    :to="userRoute"
    replace
    hide="icon"
    :label="userLabel" >
  </q-route-tab>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
  name: 'UserLogInOutButton',
  data () {
    return {}
  },

  props: {
    color: {
      type: String,
      default () {
        return 'black'
      },
      required: true
    }
  },

  computed: {

    userIcon () {
      return this.isLogged ? 'logout' : 'person'
    },

    userLabel () {
      return this.isLogged ? 'Выход' : 'Войти'
    },

    userRoute () {
      const name = this.isLogged ? 'auth-signout' : 'auth-signin'
      return {name}
      // return `/auth${this.isLogged ? '/signout' : '/signin'}`
    },

    // ...mapGetters('user', ['user', 'loggedIn']),
    ...mapGetters('auth', ['isLogged', 'user'])
  }
}
</script>

<style>
</style>
