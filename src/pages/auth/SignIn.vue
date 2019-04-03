<template>
  <div class="auth-login-container">
    <q-icon name="person_outline" size="5rem" color="secondary" class="auth-login-icon"></q-icon>
    <span class="auth-login-subtitle">Для входа введите имя пользователя и пароль</span>

    <q-field
      class="auth-input"
      icon="person_outline"
      icon-color="primary"
      :error="$v.form.login.$error"
      :error-label="loginErrorLabel"
    >
      <q-input
        v-model="form.login"
        name="login"
        @blur="$v.form.login.$touch"
        @keyup.enter="submit"
        :error="$v.form.login.$error"
        float-label="Имя пользователя">
      </q-input>
    </q-field>

    <q-field
      class="auth-input"
      icon="vpn_key"
      icon-color="primary"
      count
      :error="$v.form.password.$error"
      :error-label="passwordErrorLabel"
    >
      <q-input
        icon="lock"
        v-model="form.password"
        name="password"
        @blur="$v.form.password.$touch"
        @keyup.enter="submit"
        :error="$v.form.password.$error"
        type="password"
        float-label="Пароль" >
      </q-input>
    </q-field>

    <div class="auth-login-buttons">
      <q-btn @click="onRegistration" color="primary" class=" auth-btn_reg">Регистрация</q-btn>
      <q-btn @click="submit" color="primary" class=" submit auth-btn" :disabled="$v.form.$error">Логин</q-btn>
      <q-btn @click="onCancel" class="auth-btn">Отмена</q-btn>
    </div>
  </div>
</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
  name: 'SignIn',
  data () {
    return {
      form: {
        login: '',
        password: ''
      }
    }
  },

  validations: {
    form: {
      login: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(50)
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(15)
      }
    }
  },

  computed: {

    loginErrorLabel () {
      if (this.$v.form.password.$error) {
        if (!this.$v.form.login.required) return 'Имя пользователя должно быть заполнено'
        if (!this.$v.form.login.alphaNum) return 'Имя пользователя должно содержать буквы и цифры'
        if (!this.$v.form.login.minLength) return `Имя пользователя не менее ${this.$v.form.login.$params.minLength.min} символов`
        if (!this.$v.form.login.maxLength) return `Имя пользователя не более ${this.$v.form.login.$params.maxLength.max} символов`
      }
      return ''
    },
    passwordErrorLabel () {
      if (this.$v.form.password.$error) {
        if (!this.$v.form.password.required) return 'Пароль быть заполнен'
        if (!this.$v.form.password.minLength) return `Длина пароля не менее ${this.$v.form.password.$params.minLength.min} символов. Введено ${this.$v.form.password.$model.length}.`
        if (!this.$v.form.password.maxLength) return `Длина пароля не более ${this.$v.form.password.$params.maxLength.max} символов. Введено ${this.$v.form.password.$model.length}.`
      }
      return ''
    },
    ...mapState('beginners', [ 'error' ]),
    ...mapGetters('auth', ['isLogged', 'user'])
  },

  methods: {
    onRegistration () {
      this.$router.push({name: 'auth-register'})
    },
    onCancel () {
      this.$router.push({name: 'home'})
    },
    async submit () {
      this.$v.form.$touch()

      if (this.$v.form.$error) {
        this.$q.notify({message: 'Пожалуйста, заполните все поля.', type: 'warning'})
        return
      }

      const {login, password} = this.form
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
    margin-bottom: 2rem;
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
