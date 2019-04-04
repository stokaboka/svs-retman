import axios from 'axios'

const state = {
  result: '',
  error: '',
  dictionaryColumns: [
    { name: 'word1', field: 'word1', label: 'Слово/фраза 1', sortable: true },
    { name: 'word2', field: 'word2', label: 'Слово/фраза 2', sortable: true },
    { name: 'lang1', field: 'lang1', label: 'Язык родной', sortable: true },
    { name: 'lang2', field: 'lang2', label: 'Язык обучения', sortable: true },
    { name: 'scope', field: 'scope', label: 'Тест', sortable: true }
  ]
}

const getters = {
  dictionaryColumns (state) {
    return state.dictionaryColumns
  }
}

const mutations = {
  SET_RESULT (state, result) {
    state.result = result
    state.error = ''
  },

  SET_ERROR (state, error) {
    state.result = 'error'
    state.error = error
  }
}

const actions = {
  updateDictionary ({commit, getters, rootGetters}, playload) {
    return axios.put(`${rootGetters['beginners/api']}/words`, playload)
      .then(response => {
        commit('beginners/setDictionaryById', playload, { root: true })
        commit('setResult', 'OK')
      })
      .catch(error => {
        commit('setError', error)
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
