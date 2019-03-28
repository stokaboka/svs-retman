<template>
  <div class="auth-login-container">
    <q-icon name="person" size="5rem" color="secondary" class="auth-login-icon"></q-icon>
    <span class="auth-login-subtitle">Для регистрации введите имя пользователя, пароль, ваше имя</span>

    <q-field
      :error="!!veeerrors.first('Логин')"
      :error-label="veeerrors.first('Логин')"
    >
      <q-input
        class="auth-input"
        v-model="login"
        name="Логин"
        v-validate="'required'"
        float-label="Имя пользователя">
      </q-input>
    </q-field>

    <q-field
      :error="!!veeerrors.first('Пароль')"
      :error-label="veeerrors.first('Пароль')"
    >
      <q-input
        class="auth-input"
        v-model="password"
        ref="password"
        name="Пароль"
        v-validate="'required|min:6'"
        type="password"
        float-label="Пароль" >
      </q-input>
    </q-field>

    <q-field
      :error="!!veeerrors.first('Повтор_Пароля')"
      :error-label="veeerrors.first('Повтор_Пароля')"
    >
      <q-input
        class="auth-input"
        v-model="repeatPassword"
        v-validate="'required|min:6|confirmed:password'"
        name="Повтор_Пароля"
        type="password"
        float-label="Повтор Пароля" >
      </q-input>
    </q-field>

    <q-field
      :error="!!veeerrors.first('Имя')"
      :error-label="veeerrors.first('Имя')"
    >
      <q-input
        class="auth-input"
        v-model="firstName"
        v-validate="'required'"
        name="Имя"
        float-label="Имя" >
      </q-input>
    </q-field>

    <q-field
      :error="!!veeerrors.first('Фамилия')"
      :error-label="veeerrors.first('Фамилия')"
    >
      <q-input
        class="auth-input"
        v-model="lastName"
        name="Фамилия"
        float-label="Фамилия" >
      </q-input>
    </q-field>

    <div class="auth-login-buttons">
      <q-btn @click="onRegister" color="primary" class="auth-btn">Регистрация</q-btn>
      <q-btn @click="onCancel" class="auth-btn">Отмена</q-btn>
    </div>
  </div>
</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'SignIn',
  data () {
    return {
      login: '',
      password: '',
      repeatPassword: '',
      firstName: '',
      lastName: ''
    }
  },

  computed: {
    ...mapState('beginners', [ 'error' ]),
    ...mapGetters('auth', ['isLogged', 'user'])
  },

  methods: {
    onCancel () {
      this.$router.push({name: 'home'})
    },
    async onRegister () {
      const {login, password, firstName, lastName} = this
      await this.register({login, password, firstName, lastName})

      if (this.isLogged) {
        this.$router.push({name: 'home'})
      }
    },
    ...mapActions('auth', ['register'])
  }
}
</script>

<style scoped>
  .auth-input {
    margin-bottom: 1rem;
  }

  .auth-btn {
    margin-left: 1rem;
  }

  .auth-login-icon {
  }

  .auth-login-container {
    display: flex;
    flex-flow: column wrap;
    justify-content: space-around;

    height: 100%;

    padding: 2rem;
  }

  .auth-login-buttons {
    display: flex;
    justify-content: flex-end;

    margin: 1rem;
  }

  .auth-login-subtitle {
    text-align: center;
  }
</style>
