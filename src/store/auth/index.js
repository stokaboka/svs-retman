import axios from 'axios'
import { Notify } from 'quasar'

const state = {
  user: null
}

const getters = {
  isLogged: s => !!s.user,
  user: s => s.user
}

const mutations = {
  SET_USER (state, playload = null) {
    let result = true
    if (playload) {
      if (Array.isArray(playload) && playload.length > 0) {
        state.user = playload[0]
      } else {
        state.user = playload
      }
    } else {
      result = false
    }

    if (result && state.user) {
      Notify.create({
        message: `Выполнен вход: ${state.user.login}`,
        type: 'positive'
      })
    } else {
      Notify.create({
        message: 'Пользователь не найдет или неверный пароль',
        type: 'warning'
      })
    }
  }

}

const actions = {
  signin ({ commit, rootGetters }, playload) {
    console.log(playload)
    return axios.post(`${rootGetters['beginners/api']}/login`, playload)
      .then(response => {
        commit('SET_USER', response.data)
      })
      .catch(error => {
        commit('SET_USER', null)
        Notify.create({
          message: `Что-то пошло не так...: ${error}`,
          type: 'negative'
        })
      })
  },

  signout ({ commit, rootGetters }, playload) {
    return axios.post(`${rootGetters['beginners/api']}/logout`, playload)
      .then(response => {
        commit('SET_USER', null)
      })
      .catch(error => {
        commit('SET_USER', null)
        console.warn(error)
      })
  },

  register ({ commit, rootGetters }, playload) {
    const data = Object.assign({
      login: '-', password: '-', firstName: '-', secondName: '-', lastName: '-', birthday: new Date()
    }, playload)
    return axios.post(`${rootGetters['beginners/api']}/register`, data)
      .then(response => {
        commit('SET_USER', response.data)
      })
      .catch(error => {
        commit('SET_USER', null)
        console.warn(error)
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
