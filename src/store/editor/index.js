import axios from 'axios'

const state = {
  suffix: '',
  result: '',
  error: '',
  title: '',
  data: [],
  columns: [],
  edit: {
    insert: false,
    update: false,
    delete: false
  },
  key: 'id',
  loading: false
}

const getters = {
  loading (state) {
    return state.loading
  },
  key (state) {
    return state.key
  },
  edit (state) {
    return state.edit
  },

  suffix (state) {
    return state.suffix
  },
  columns (state) {
    return state.columns
  },
  visibleColumns (state) {
    return state.columns.filter(e => e.visible).map(e => e.name)
  },
  updateColumns (state) {
    return state.columns.filter(e => e.update)
  },
  insertColumns (state) {
    return state.columns.filter(e => e.insert)
  },
  title (state) {
    return state.title
  },
  data (state) {
    return state.data
  },
  result (state) {
    return state.result
  },
  error (state) {
    return state.error
  }
}

const mutations = {

  SET_MODEL (state, model) {
    state.title = model.title
    state.suffix = model.suffix
    state.columns = model.columns
    state.edit = model.edit
    state.key = model.key
  },

  SET_EDIT (state, edit) {
    state.edit = edit
  },

  SET_LOADING (state, loading) {
    state.loading = loading
  },

  SET_TITLE (state, title) {
    state.title = title
  },

  SET_COLUMNS (state, columns) {
    state.columns = columns
  },

  SET_API_SUFFIX (state, playload) {
    state.suffix = playload
  },

  SET_BY_ID (state, playload) {
    const idx = state.data.findIndex(e => e.id === playload.id)
    if (idx >= 0) {
      state.data[idx] = playload
    } else {
      state.data.push(playload)
    }
  },

  SET_DATA (state, data) {
    state.data = data
  },

  SET_RESULT (state, result) {
    state.result = result
    state.error = ''
    state.loading = false
  },

  SET_ERROR (state, error) {
    state.result = 'error'
    state.error = error
    state.loading = false
  }
}

const actions = {
  /**
   *
   * @param commit
   * @param getters
   * @param rootGetters
   * @param params String, start with /
   * @returns {Promise<AxiosResponse<any> | boolean>}
   */
  load ({commit, getters, rootGetters}, params = '') {
    // console.log(params)
    const api = rootGetters['beginners/api']
    const suffix = getters['suffix']
    const url = `${api}/${suffix}${params}`
    commit('SET_LOADING', true)
    return axios.get(url)
      .then(response => {
        const data = response.data
        commit('SET_DATA', data)
        commit('SET_RESULT', 'OK')
        return data
      })
      .catch(error => {
        commit('SET_ERROR', error)
        return false
      })
  },
  insert ({commit, getters, rootGetters}, playload) {
    // console.log(playload)
    const api = rootGetters['beginners/api']
    const suffix = getters['suffix']
    const url = `${api}/${suffix}`
    commit('SET_LOADING', true)
    return axios.post(url, playload)
      .then(response => {
        commit('SET_BY_ID', playload)
        commit('SET_RESULT', 'OK')
        return true
      })
      .catch(error => {
        commit('SET_ERROR', error)
        return false
      })
  },
  update ({commit, getters, rootGetters}, playload) {
    // console.log(playload)
    const api = rootGetters['beginners/api']
    const suffix = getters['suffix']
    const url = `${api}/${suffix}`
    commit('SET_LOADING', true)
    return axios.put(url, playload)
      .then(response => {
        commit('SET_BY_ID', playload)
        commit('SET_RESULT', 'OK')
        return true
      })
      .catch(error => {
        commit('SET_ERROR', error)
        return false
      })
  },
  delete ({commit, getters, rootGetters}, playload) {
    // console.log(playload)
    const api = rootGetters['beginners/api']
    const suffix = getters['suffix']
    const url = `${api}/${suffix}`
    commit('SET_LOADING', true)
    return axios.delete(url, playload)
      .then(response => {
        commit('SET_RESULT', 'OK')
        return true
      })
      .catch(error => {
        commit('SET_ERROR', error)
        return false
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
