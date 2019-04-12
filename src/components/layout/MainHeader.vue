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

      <q-tabs color="white" animated v-model="selectedTab">
        <q-route-tab slot="title" name="about" :color="color" icon="home" :to="{name: 'about'}" replace hide="label" default
                     label="Главная"></q-route-tab>
        <user-log-in-out-button :color="color" slot="title" name="login"></user-log-in-out-button>
        <q-route-tab v-if="debug || isOperator" slot="title" name="result" :color="color" icon="edit" :to="{name: 'results'}" replace hide="label"
                     label="Результаты"></q-route-tab>
        <q-tab v-if="debug || isAdmin || isOperator" label="Редактор" name="editor" :color="color" slot="title" icon="edit" replace hide="label">
          <q-popover>
            <q-list item-separator link>
              <q-item
                v-for="editor in editorMenu" :key="editor.label"
                :to="editor.to"
                replace
                v-close-overlay
              >
                {{editor.label}}
              </q-item>
            </q-list>
          </q-popover>
        </q-tab>
      </q-tabs>

    </q-toolbar>
  </q-layout-header>
</template>

<script>
import {mapGetters} from 'vuex'

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
  data () {
    return {
      debug: process.env.NODE_ENV !== 'production',
      selectedTab: 'about',
      editorMenu: [
        {label: 'Словарь', to: {path: 'editor/dictionary'}},
        {label: 'Фазы', to: {path: 'editor/phases'}},
        {label: 'Шаги', to: {path: 'editor/steps'}},
        {label: 'Проходы уроков', to: {path: 'editor/stages'}},
        {label: 'Звуковые метки', to: {path: 'editor/cue'}}
      ]
    }
  },
  computed: {
    ...mapGetters('beginners', ['title']),
    ...mapGetters('auth', ['isLogged', 'isAdmin', 'isOperator', 'isUser', 'user'])
  }
}
</script>

<style scoped>

</style>
