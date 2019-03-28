<template>
  <div class="auth-login-container">
    <q-icon name="person" size="5rem" color="secondary" class="auth-login-icon"></q-icon>
    <span class="auth-login-subtitle">Для входа введите имя пользователя и пароль</span>

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
        name="Пароль"
        v-validate="'required|min:6'"
        type="password"
        float-label="Пароль" >
      </q-input>
    </q-field>

    <div class="auth-login-buttons">
      <q-btn @click="onReg" color="primary" class=" auth-btn_reg">Регистрация</q-btn>
      <q-btn @click="onLogin" color="primary" class=" auth-btn">Логин</q-btn>
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
      password: ''
    }
  },

  computed: {
    ...mapState('beginners', [ 'error' ]),
    ...mapGetters('auth', ['isLogged', 'user'])
  },

  methods: {
    onReg () {
      this.$router.push({name: 'auth-register'})
    },
    onCancel () {
      this.$router.push({name: 'home'})
    },
    async onLogin () {
      const {login, password} = this
      await this.signin({login, password})

      if (this.isLogged) {
        this.$router.push({name: 'home'})
      }
    },
    ...mapActions('auth', ['signin'])
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
