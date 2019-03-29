<template>
  <q-page padding :style-fn="myTweak" class="shadow-6 page-container__layout">
    <div class="doc-container">
      <div class="column justify-center items-center">

          <about-service-component ></about-service-component>

          <q-btn
            label="Старт !"
            color="primary"
            size="xl"
            @click="onStartBtnClick"
            >
          </q-btn>

        <q-card v-if="!isLogged" class="about-info-card">
          <q-card-title>
            Вас сегодня не узнать!
          </q-card-title>
          <q-card-main>
            <p>Вы можете пройти тест анонимно, но результаты теста и рекомендации останутся Вам незвестны.</p>
            <p class="">Чтобы получить рекомендации по результатам теста <router-link :to="{name: 'auth-signin'}">войдите</router-link> или <router-link :to="{name: 'auth-register'}">зарегистрируйтесь</router-link>.</p>
          </q-card-main>
          <q-card-separator />
          <q-card-actions>
            <q-btn label="Войти" color="primary" @click="$router.push({name: 'auth-signin'})"/>
            <q-btn label="Зарегистрироваться" color="secondary" @click="$router.push({name: 'auth-register'})"/>
          </q-card-actions>
        </q-card>

      </div>
    </div>
  </q-page>
</template>

<script>
// to="/beginners"
import AboutServiceComponent from '../components/AboutServiceComponent'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {AboutServiceComponent},

  name: 'AboutServicePage',

  computed: {
    ...mapState('beginners', [ 'error' ]),
    ...mapGetters('auth', ['isLogged', 'user'])
  },

  methods: {
    onStartBtnClick () {
      this.resetSteps()
      this.$router.push({name: 'beginners'})
    },

    myTweak (offset) {
      // "offset" is a Number (pixels) that refers to the total
      // height of header + footer that occupies on screen,
      // based on the QLayout "view" prop configuration

      // this is actually what the default style-fn does in Quasar
      // offset = offset + 30 * 2
      return { minHeight: offset ? `calc(100vh - ${offset}px)` : '100vh' }
    },

    ...mapActions('beginners', ['resetSteps'])
  }
}
</script>

<style>
.about-info-card {
  width: 40vw;
  margin-top: 3rem;
}
</style>
