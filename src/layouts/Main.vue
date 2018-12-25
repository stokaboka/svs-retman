<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Тестирование Лингвистических Способностей
          <div slot="subtitle">v{{ version }}</div>
        </q-toolbar-title>

        <q-tabs color="amber" text-color="black">
          <q-route-tab slot="title" icon="view_quilt" to="/about" replace hide="icon" label="About" ></q-route-tab>
          <q-route-tab slot="title" :icon="userIcon" :to="userRoute" replace hide="icon" :label="userLabel" ></q-route-tab>
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
        <q-item @click.native="openURL('http://quasar-framework.org')">
          <q-item-side icon="school" />
          <q-item-main label="Docs" sublabel="quasar-framework.org" />
        </q-item>
        <q-item @click.native="openURL('https://github.com/quasarframework/')">
          <q-item-side icon="code" />
          <q-item-main label="GitHub" sublabel="github.com/quasarframework" />
        </q-item>
        <q-item @click.native="openURL('https://discord.gg/5TDhbDg')">
          <q-item-side icon="chat" />
          <q-item-main label="Discord Chat Channel" sublabel="https://discord.gg/5TDhbDg" />
        </q-item>
        <q-item @click.native="openURL('http://forum.quasar-framework.org')">
          <q-item-side icon="record_voice_over" />
          <q-item-main label="Forum" sublabel="forum.quasar-framework.org" />
        </q-item>
        <q-item @click.native="openURL('https://twitter.com/quasarframework')">
          <q-item-side icon="rss feed" />
          <q-item-main label="Twitter" sublabel="@quasarframework" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import {createNamespacedHelpers} from 'vuex'
const { mapGetters } = createNamespacedHelpers()

export default {
  name: 'Main',

  data () {
    return {
      // leftDrawerOpen: this.$q.platform.is.desktop
      leftDrawerOpen: false
    }
  },

  computed: {

    userIcon: () => {
      return this.loggedIn ? 'logout' : 'person'
    },

    userLabel: () => {
      return this.loggedIn ? 'Logout' : 'Login'
    },

    userRoute: () => {
      return this.loggedIn ? '/logout' : '/login'
    },

    ...mapGetters('beginners', ['version']),
    ...mapGetters('user', ['user', 'loggedIn'])
  },

  methods: {
    openURL
  }
}
</script>

<style>
</style>
