<template>
  <div class="auth-login-container">
    <q-icon name="person_add" size="5rem" color="secondary" class="auth-login-icon"></q-icon>
    <span class="auth-login-subtitle">Для регистрации введите имя пользователя, пароль, ваше имя</span>

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
        v-model="form.password"
        name="password"
        @blur="$v.form.password.$touch"
        @keyup.enter="submit"
        :error="$v.form.password.$error"
        type="password"
        float-label="Пароль" >
      </q-input>
    </q-field>

    <q-field
      class="auth-input"
      icon="vpn_key"
      icon-color="primary"
      count
      :error="$v.form.repeatPassword.$error"
      :error-label="repeatPasswordErrorLabel"
    >
      <q-input
        v-model="form.repeatPassword"
        name="password"
        @blur="$v.form.repeatPassword.$touch"
        @keyup.enter="submit"
        :error="$v.form.repeatPassword.$error"
        type="password"
        float-label="Повтор пароля" >
      </q-input>
    </q-field>

    <q-field
      class="auth-input"
      icon="edit"
      icon-color="primary"
      :error="$v.form.firstName.$error"
      :error-label="firstNameErrorLabel"
    >
      <q-input
        class="auth-input"
        v-model="form.firstName"
        @blur="$v.form.firstName.$touch"
        @keyup.enter="submit"
        :error="$v.form.firstName.$error"
        name="firstName"
        float-label="Имя" >
      </q-input>
    </q-field>

    <q-field
      class="auth-input"
      icon="edit"
      icon-color="secondary"
    >
      <q-input
        class="auth-input"
        v-model="form.lastName"
        @keyup.enter="submit"
        name="lastName"
        float-label="Фамилия" >
      </q-input>
    </q-field>

    <q-field
      class="auth-input"
      icon="date_range"
      icon-color="secondary"
    >
      <q-datetime
        class="auth-input"
        v-model="form.birthday"
        @keyup.enter="submit"
        name="birthday"
        type="date"
        clearable
        :first-day-of-week="1"
        float-label="Дата рождения" >
      </q-datetime>
    </q-field>

    <div class="auth-login-buttons">
      <q-btn @click="submit" color="primary" class="auth-btn">Регистрация</q-btn>
      <q-btn @click="onCancel" class="auth-btn">Отмена</q-btn>
    </div>
  </div>
</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex'
import { required, alphaNum, alpha, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'

export default {
  name: 'SignIn',
  data () {
    return {
      form: {
        login: '',
        password: '',
        repeatPassword: '',
        firstName: '',
        lastName: '',
        birthday: ''
      }
    }
  },

  validations: {
    form: {
      login: {
        required,
        alphaNum,
        minLength: minLength(4),
        maxLength: maxLength(30)
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(15)
      },
      repeatPassword: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(30),
        sameAsPassword: sameAs('password')
      },
      firstName: {
        required,
        alpha,
        minLength: minLength(4),
        maxLength: maxLength(30)
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
    repeatPasswordErrorLabel () {
      if (this.$v.form.repeatPassword.$error) {
        if (!this.$v.form.repeatPassword.required) return 'Подтверждение пароля должен быть заполнен'
        if (!this.$v.form.repeatPassword.minLength) return `Длина пароля не менее ${this.$v.form.repeatPassword.$params.minLength.min} символов. Введено ${this.$v.form.repeatPassword.$model.length}.`
        if (!this.$v.form.repeatPassword.maxLength) return `Длина пароля не более ${this.$v.form.repeatPassword.$params.maxLength.max} символов. Введено ${this.$v.form.repeatPassword.$model.length}.`
        if (!this.$v.form.repeatPassword.sameAsPassword) return 'Пароль и подтверждение пароля не совпадают'
      }
      return ''
    },
    firstNameErrorLabel () {
      if (this.$v.form.password.$error) {
        if (!this.$v.form.firstName.required) return 'Имя должно быть заполнено'
        if (!this.$v.form.firstName.alpha) return 'Имя должно содержать буквы'
        if (!this.$v.form.firstName.minLength) return `Имя не менее ${this.$v.form.firstName.$params.minLength.min} символов`
        if (!this.$v.form.firstName.maxLength) return `Имя не более ${this.$v.form.firstName.$params.maxLength.max} символов`
      }
      return ''
    },
    ...mapState('beginners', [ 'error' ]),
    ...mapGetters('auth', ['isLogged', 'user'])
  },

  methods: {
    onCancel () {
      this.$router.push({name: 'home'})
    },
    async submit () {
      if (this.$v.form.$error) {
        this.$q.notify({message: 'Пожалуйста, заполните все поля.', type: 'warning'})
        return
      }

      const {login, password, firstName, lastName, birthday} = this.form
      await this.register({login, password, firstName, lastName, birthday})

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
