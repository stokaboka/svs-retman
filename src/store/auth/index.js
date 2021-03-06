import axios from 'axios'
import { Notify } from 'quasar'

const showUserNotify = function (user, act) {
  let message = {
    positive: '',
    negative: ''
  }

  switch (act) {
    case 'signin':
      message.positive = `Выполнен вход пользователя: ${user.login}`
      message.negative = 'Пользователь не найден или неверный пароль'
      break
    case 'signout':
      message.positive = `Выполнен выход`
      message.negative = `Выполнен выход`
      break
    case 'register':
      message.positive = `Зарегистрирован пользователь: ${user.login}`
      message.negative = `При регистрирации пользователя произошла ошибка`
      break
  }
  if (user) {
    if (user.login) {
      Notify.create({
        message: message.positive,
        type: 'positive'
      })
    } else {
      Notify.create({
        message: message.negative,
        type: 'warning'
      })
    }
  } else {
    Notify.create({
      message: message.positive,
      type: 'positive'
    })
  }
}

const state = {
  user: null,
  offer: false,
  token: sessionStorage.getItem('token')
}

const getters = {
  isLogged: s => s.user && s.user.login,
  isAdmin: s => s.user && s.user.role === 'admin',
  isOperator: s => s.user && s.user.role === 'operator',
  isUser: s => s.user && s.user.role === 'user',
  user: s => s.user,
  offer: s => s.offer,
  token: s => s.token
}

const mutations = {
  SET_USER (state, playload = null) {
    if (playload) {
      if (Array.isArray(playload) && playload.length > 0) {
        state.user = playload[0]
      } else {
        state.user = playload
      }
    } else {
      state.user = null
    }
  },

  SET_OFFER (state, playload) {
    state.offer = playload
  },

  SET_TOKEN (state, token) {
    state.token = token
    axios.defaults.headers.common['Authorization'] = state.token ? `Bearer ${state.token}` : ''
    sessionStorage.setItem('token', state.token)
  }
}

const actions = {
  signin ({ commit, getters, rootGetters }, playload = {login: '-', password: '-'}) {
    return axios.post(`${rootGetters['app/api']}/login`, playload)
      .then(response => {
        commit('SET_TOKEN', response.data.token)
        commit('SET_USER', response.data.user)
        commit('SET_OFFER', false)
        showUserNotify(getters['user'], 'signin')
      })
      .catch(error => {
        commit('SET_USER', null)
        if (error.response.status === 401 || error.response.status === 403) {
          commit('SET_OFFER', true)
        } else {
          Notify.create({
            message: `Что-то пошло не так...: ${error}`,
            type: 'negative'
          })
        }
      })
  },

  signout ({ commit, getters, rootGetters }) {
    commit('SET_OFFER', false)
    sessionStorage.setItem('token', '')
    axios.defaults.headers.common['Authorization'] = ''
    return axios.post(`${rootGetters['app/api']}/logout`)
      .then(response => {
        commit('SET_USER', null)
      })
      .catch(error => {
        commit('SET_USER', null)
        if (error.response.status === 401 || error.response.status === 403) {
          commit('SET_OFFER', true)
        } else {
          console.warn(error)
          Notify.create({
            message: `Что-то пошло не так...: ${error}`,
            type: 'negative'
          })
        }
      })
  },

  register ({ commit, getters, rootGetters }, playload) {
    const data = Object.assign({
      login: '-', password: '-', firstName: '-', secondName: '-', lastName: '-', birthday: new Date()
    }, playload)

    commit('SET_OFFER', false)

    return axios.post(`${rootGetters['app/api']}/register`, data)
      .then(response => {
        if (response.data.error) {
          commit('SET_TOKEN', '')
          commit('SET_USER', null)
          commit('SET_OFFER', true)
          Notify.create({
            message: response.data.error,
            type: 'negative'
          })
        } else {
          commit('SET_TOKEN', response.data.token)
          commit('SET_USER', response.data.user)
          commit('SET_OFFER', false)
          showUserNotify(getters['user'], 'register')
        }
      })
      .catch(error => {
        commit('SET_USER', null)
        console.warn(error)
        Notify.create({
          message: `Что-то пошло не так...: ${error}`,
          type: 'negative'
        })
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
