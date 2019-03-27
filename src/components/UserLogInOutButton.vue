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

import {createNamespacedHelpers} from 'vuex'
const { mapGetters } = createNamespacedHelpers('user')

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
      return this.loggedIn ? 'logout' : 'person'
    },

    userLabel () {
      return this.loggedIn ? 'Logout' : 'Login'
    },

    userRoute () {
      return this.loggedIn ? '/logout' : '/login'
    },

    ...mapGetters(['user', 'loggedIn'])
  }
}
</script>

<style>
</style>
