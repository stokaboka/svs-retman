<template>
  <q-page class="container page-container">
    <div class="column">
      <q-tabs>
        <!-- Tabs - notice slot="title" -->
        <q-tab default slot="title" name="tab-users" icon="message" label="Пользователи" />
        <q-tab slot="title" name="tab-user" icon="fingerprint" label="Пользователь"/>
        <q-tab slot="title" name="tab-3" icon="account_box" />
        <q-tab slot="title" name="tab-4" icon="accessibility" />
        <q-tab slot="title" name="tab-5" icon="build" />

        <!-- Targets -->
        <q-tab-pane name="tab-users">
          <editor
            module="users"
            :selection="selection"
            @table-row-click="onTableRowClick"
          ></editor>
        </q-tab-pane>
        <q-tab-pane name="tab-user">
          <q-card v-if="user" >
            <q-card-title>
              {{user.login}}
            </q-card-title>
            <q-card-separator />
            <q-card-main>
              <div class="column">
                <div class="row" v-for="c in model.columns" :key="c.name">
                  <span class="col-2">{{c.label}}</span>
                  <span class="col">{{user[c.field]}}</span>
                </div>
              </div>
            </q-card-main>
          </q-card>

        </q-tab-pane>
        <q-tab-pane name="tab-3">Tab Three</q-tab-pane>
        <q-tab-pane name="tab-4">Tab Four</q-tab-pane>
        <q-tab-pane name="tab-5">Tab Five</q-tab-pane>
      </q-tabs>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import Editor from '../editor/Editor'
export default {
  name: 'Users',
  components: {Editor},
  data () {
    return {
      selection: 'none',
      user: null
    }
  },
  computed: {
    ...mapGetters('users', ['model'])
  },
  methods: {
    onTableRowClick (row) {
      console.log(row)
      this.user = row
    }
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
</style>
