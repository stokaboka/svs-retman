<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary">

        <q-toolbar-title>
          {{title}}
          <version-label slot="subtitle"></version-label>
        </q-toolbar-title>

        <q-tabs color="primary">
          <q-route-tab slot="title" icon="view_quilt" to="/about" replace hide="icon" label="About" ></q-route-tab>
          <user-log-in-out-button slot="title"></user-log-in-out-button>
        </q-tabs>

      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>Essential Links</q-list-header>
        <q-item @click.native="openURL('/about')">
          <q-item-side icon="school" />
          <q-item-main label="Информация" sublabel="quasar-framework.org" />
        </q-item>
      </q-list>
    </q-layout-drawer>

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
import {createNamespacedHelpers} from 'vuex'
const { mapGetters } = createNamespacedHelpers('beginners')

import { openURL } from 'quasar'
import VersionLabel from '../components/VersionLabel'
import UserLogInOutButton from '../components/UserLogInOutButton'

export default {
  name: 'Main',
  components: {UserLogInOutButton, VersionLabel},
  data () {
    return {
      // leftDrawerOpen: this.$q.platform.is.desktop
      leftDrawerOpen: false
    }
  },

  computed: {
    ...mapGetters(['title'])
  },

  methods: {
    openURL
  }
}
</script>

<style>
</style>
