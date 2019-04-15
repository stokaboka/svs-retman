<template>
  <q-page class="container page-container">
    <div class="column">
      <q-tabs color="secondary">
        <!-- Tabs - notice slot="title" -->
        <q-tab default slot="title" name="tab-users" icon="people" label="Пользователи" />
        <q-tab slot="title" name="tab-user" icon="person" label="Пользователь"/>
        <q-tab slot="title" name="tab-tests" icon="offline_pin" label="Тесты" />
        <q-tab slot="title" name="tab-result" icon="ballot" label="Результат"/>
        <q-tab slot="title" name="tab-log" icon="pets" label="Лог"/>

        <!-- Targets -->
        <q-tab-pane name="tab-users">
          <editor
            module="users"
            :selection="selection"
            @table-row-click="onUsersTableRowClick"
          ></editor>
        </q-tab-pane>
        <q-tab-pane name="tab-user">
          <q-card v-if="user" >
            <q-card-title class="column">
              <div>{{userInfo}}</div>
            </q-card-title>
            <q-card-separator />
            <q-card-main>
              <div class="column">
                <div class="row q-mb-xs" v-for="c in model.columns" :key="c.name">
                  <div class="col-2">{{c.label}}</div>
                  <div class="col">{{user[c.field]}}</div>
                </div>
              </div>
            </q-card-main>
          </q-card>

        </q-tab-pane>
        <q-tab-pane name="tab-tests">
          <q-card v-if="user" >
            <q-card-title class="column">
              <div>{{userInfo}}</div>
              <div>{{testInfo}}</div>
            </q-card-title>
            <q-card-separator />
            <q-card-main>
              <editor
                module="usersResults"
                :filter="userResultsFilterParams"
                :selection="selection"
                @table-row-click="onUsersResultsTableRowClick"
              ></editor>
            </q-card-main>
          </q-card>
        </q-tab-pane>
        <q-tab-pane name="tab-result">
          <q-card v-if="testing" >
            <q-card-title class="column">
              <div>{{userInfo}}</div>
              <div>{{testInfo}}</div>
            </q-card-title>
            <q-card-separator />
            <q-card-main>
              <beginner-final-result :testing="testing" :onlyzero="false">
              </beginner-final-result>
            </q-card-main>
          </q-card>
        </q-tab-pane>
        <q-tab-pane name="tab-log">
          <q-card v-if="results" >
            <q-card-title class="column">
              <div>{{userInfo}}</div>
              <div>{{testInfo}}</div>
            </q-card-title>
            <q-card-separator />
            <q-card-main>
              <log :results="results"></log>
            </q-card-main>
          </q-card>
        </q-tab-pane>
      </q-tabs>
    </div>
  </q-page>
</template>

<script>
import get from 'lodash/get'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Editor from '../editor/Editor'
import BeginnerFinalResult from '../../components/exercises/BeginnerFinalResult'
import Log from '../../components/exercises/Log'
import {toDDMMYYYY} from '../../lib/utils'

export default {
  name: 'Users',
  components: {BeginnerFinalResult, Editor, Log},
  data () {
    return {
      selection: 'none',
      user: null,
      results: null,
      testing: null
    }
  },
  computed: {
    userInfo () {
      const out = this.user ? `${this.user.login}: ${this.user.firstName || ''} ${this.user.secondName || ''} ${this.user.lastName || ''}` : ''
      return out
    },
    testInfo () {
      return this.testing ? `Тест от ${toDDMMYYYY(get(this.testing, '[0].date', ''))}, набранные баллы: ${get(this.testing, '[0].rating', '')}` : ''
    },
    userResultsFilterParams () {
      const out = this.user ? `/${this.user.login}` : ''
      return out
    },
    ...mapGetters('users', ['model']),
    ...mapGetters('beginners', ['userResults'])
  },
  methods: {
    onUsersTableRowClick (row) {
      this.user = row
    },
    onUsersResultsTableRowClick (row) {
      this.testing = [row]
      try {
        this.results = JSON.parse(row.results)
      } catch (e) {
        console.warn(e)
      }
    },
    ...mapMutations('beginners', ['setTesting']),
    ...mapActions('beginners', [
      'loadResult',
      'loadUserResults'
    ])
  }
}
</script>

<style scoped>
  .page-container {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;

    min-height: auto;

    padding: 0.5rem 3rem;
  }

  main {
    min-height: auto;
  }
</style>
