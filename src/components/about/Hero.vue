<template>
  <div class="hero-container">
    <div class="hero-body">
      <div class="hero-body-left column justify-center items-start q-mb-md">
          <img src="statics/assets/svs_logo.png"/>
          <span class="hero-body__title">Лингвистический проект</span>
          <span class="hero-body__title ">"Свобода слова"</span>
      </div>

      <div class="hero-body-right column justify-end items-end hero-body-right__text">
        <div class="column justify-center items-end">
          <span class="hero-body__title">Программа CONTROL YOURSELF.<br>Тестирование лингвистических способностей и <q>Пробное обучение</q></span>
        </div>
        <div v-if="offer" class="column justify-center items-end offer-to-enter-container">
          <div class="offer-to-enter__title">
            Вас сегодня не узнать!
          </div>
          <div class="">
            <p>Вы можете пройти тест анонимно, но результаты теста и рекомендации останутся Вам незвестны.</p>
            <p class="">Чтобы получить рекомендации по результатам теста
              <router-link :to="{name: 'auth-signin'}" class="offer-to-enter__link">войдите</router-link>
              или
              <router-link :to="{name: 'auth-register'}" class="offer-to-enter__link">зарегистрируйтесь</router-link>
              .
            </p>
          </div>

        <div class="offer-to-enter__footer">
          <q-btn label="Войти" @click="$router.push({name: 'auth-signin'})" class="offer-to-enter__footer-button"/>
          <q-btn label="Зарегистрироваться" @click="$router.push({name: 'auth-register'})"
                 class="offer-to-enter__footer-button"/>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
  name: 'OfferToEnterOrRegister',

  computed: {
    ...mapGetters('auth', ['isLogged', 'user', 'offer'])
  }

}
</script>

<style scoped>
  .hero-container {
    width: 100vw;
    background: rgb(65,105,225);
    padding: 1rem 2rem;
  }

  .hero-body {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    align-items: center;
    width: 100%;

    color: white;
  }

  .hero-body-left {
    height: 100%;
  }

  .hero-body-right {
    height: 100%;
  }

  .hero-body__title {
    font-size: 1.5rem;
  }

  .offer-to-enter-container {
    min-width: 500px;
    padding: 2rem 0;
    color: white;
  }

  .offer-to-enter__title {
    font-size: larger;
    margin-bottom: 1rem;
  }

  .offer-to-enter__footer {
    display: flex;
    justify-content: flex-end;
  }

  .offer-to-enter__footer-button {
    margin-left: 3rem;
  }

  .hero-body-right__text {
    text-align: end;
  }

  .offer-to-enter__link:link {
    color: #ffffff;
    font-weight: 600;
  }

  /* visited link */
  .offer-to-enter__link:visited {
    color: #ffffff;
  }

  /* mouse over link */
  .offer-to-enter__link:hover {
    color: #ffffff;
  }

  /* selected link */
  .offer-to-enter__link:active {
    color: #ffffff;
  }
</style>
