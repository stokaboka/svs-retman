<template>
  <div class="offer-to-enter-container">
    <div class="offer-to-enter-body">
      <div class="offer-to-enter__title">
        Вас сегодня не узнать!
      </div>
      <div class="offer-to-enter__text">
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
</template>

<script>
export default {
  name: 'OfferToEnterOrRegister'
}
</script>

<style scoped>
  .offer-to-enter-container {
    width: 100vw;
    background-color: royalblue;

    padding: 0 2rem;
  }

  .offer-to-enter-body {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: flex-end;
    width: 100%;

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

  .offer-to-enter__text {
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
